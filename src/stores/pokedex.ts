import {create} from 'zustand';
import {BasicPokemon, DetailedPokemon} from "../PokemonTypes/Pokemon";
import {createJSONStorage, devtools, persist} from 'zustand/middleware'
import {produce} from "immer";


const initialState = {
    pokemon: [],
    loading: false,
    error: null,
}
type PokemonArray = (BasicPokemon | DetailedPokemon)[];
interface PokemonState {
    pokemon: PokemonArray;
    loading: boolean;
    error: string | null;
    fetchPokemon: (offset?: number) => void;
    fetchDetails: (pokemon: BasicPokemon, index: number) => void;
    fetchMorePokemon: () => void;
    resetState: () => void
}

const usePokemonStore = create<PokemonState>()(
    devtools(
        persist(
            (set, get) => ({
                pokemon: [],
                loading: false,
                error: null,
                fetchPokemon: async (offset?: number) => {
                    // TODO: somehow this is firing twice, need to setup the state monitor so it only adds UNIQUE pokemon based on their ID
                    // I imagine this could be achievable via a findIndex call, but this feels really slow, at that point we're doing a fully array scan and then a push for each indiviaul pokemon
                    set({loading: true, error: null});
                    let url = offset ? 'https://pokeapi.co/api/v2/pokemon?offset=' + offset : "https://pokeapi.co/api/v2/pokemon/";
                    try {
                        const response = await fetch(url);
                        const data = await response.json();

                        let pokemon = data.results.map((obj: any) => ({
                            ...obj,
                            id: parseInt(obj.url.match(/\/(\d+)\/$/)[1], 10)
                        }));

                        set(
                            produce(state => {
                                const existingPokemon = state.pokemon;
                                const newPokemon = pokemon.filter(
                                    (i: BasicPokemon) => existingPokemon.findIndex((a: BasicPokemon) => a.id === i.id) === -1
                                );
                                state.pokemon.push(...newPokemon);
                                state.loading = false;
                            })
                        );
                    } catch (error) {
                        set({error: 'Failed to fetch data', loading: false});
                    }
                },
                fetchDetails: async (pokemon: BasicPokemon, index: number) => {
                    set({loading: true, error: null});
                    try {
                        const response = await fetch(pokemon.url);
                        const data = await response.json();
                        const updatedPokemon = data as DetailedPokemon;
                        set(
                            produce(state => {
                                state.pokemon = [...state.pokemon.slice(0, index), updatedPokemon, ...state.pokemon.slice(index + 1)];
                                state.loading = false;
                            })
                        );
                    } catch (error) {
                        set({error: 'Failed to fetch data', loading: false});
                    }
                },
                fetchMorePokemon: async () => {
                    set({loading: true, error: null});
                    const pokemon = get().pokemon;
                    const offset = pokemon.length

                    await get().fetchPokemon(offset)
                },
                resetState: () => {
                    set(initialState);
                }
            }),
            {
                name: 'pokemon-storage',
                storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
            }
        )
    )
);


export default usePokemonStore;