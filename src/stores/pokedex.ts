import {create} from 'zustand';
import {Pokemon} from "../PokemonTypes/Pokemon";
import {createJSONStorage, devtools, persist} from 'zustand/middleware'

interface PokemonState {
    pokemon: Pokemon[];
    loading: boolean;
    error: string | null;
    fetchPokemon: () => void;
    fetchDetails: (pokemon: Pokemon, index: number) => void;
    fetchMorePokemon: () => void;
}

const usePokemonStore = create<PokemonState>()(
    devtools(
        persist(
            (set, get) => ({
                pokemon: [],
                loading: false,
                error: null,
                fetchPokemon: async () => {
                    set({loading: true, error: null});
                    try {
                        const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
                        const data = await response.json();
                        set({pokemon: data.results as Pokemon[], loading: false});
                    } catch (error) {
                        set({error: 'Failed to fetch data', loading: false});
                    }
                },
                fetchDetails: async (pokemon: Pokemon, index: number) => {
                    set({loading: true, error: null});
                    try {
                        const response = await fetch(pokemon.url);
                        const data = await response.json();
                        const updatedPokemon = data as Pokemon;
                        set(state => ({
                            pokemon: [...state.pokemon.slice(0, index) as Pokemon[], updatedPokemon, ...state.pokemon.slice(index + 1)],
                            loading: false
                        }));
                    } catch (error) {
                        set({error: 'Failed to fetch data', loading: false});
                    }
                },
                fetchMorePokemon: async () => {
                    set({loading: true, error: null});
                    const offset = get().pokemon.length
                    try {
                        const response = await fetch('https://pokeapi.co/api/v2/pokemon?offset=' + offset);
                        const data = await response.json();
                        set(state => ({pokemon: [...state.pokemon, ...data.results as Pokemon[]], loading: false}));
                    } catch (error) {
                        set({error: 'Failed to fetch data', loading: false});
                    }

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