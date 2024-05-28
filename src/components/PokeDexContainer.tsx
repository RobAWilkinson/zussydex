import React, {useEffect} from "react";
import usePokemonStore from "../stores/pokedex";
import Pokemon from "./Pokemon";
import {useScrollToBottom} from "../helpers/UseScrollToBottom";


const PokeDexContainer: React.FC = () => {
    const {resetState, pokemon, loading, error, fetchPokemon, fetchDetails, fetchMorePokemon} = usePokemonStore();

    useEffect(() => {
        fetchPokemon();
    }, [fetchPokemon]);
    const handleScrollToBottom = () => {
        fetchMorePokemon();
        console.log('User has scrolled to the bottom of the page');
        // Perform any action you need when the user scrolls to the bottom
    };

    useScrollToBottom(handleScrollToBottom);
    return (
        <div className="min-h-screen bg-gameboy-green flex items-center justify-center">
            <div className="w-full max-w-md bg-gameboy-gray p-4 rounded-lg shadow-lg border-4 border-gameboy-black">
                <h1 className="text-2xl font-gameboy text-gameboy-dark-green text-center mb-4">PokeDex</h1>
                <button onClick={resetState} disabled={loading}>
                    {loading ? 'Loading...' : 'Reset Pokemon'}
                </button>
                {error && <div style={{color: 'red'}}>{error}</div>}
                {pokemon && pokemon.map((pokemon, index) => (
                    <Pokemon pokemon={pokemon} index={index} fetchDetails={fetchDetails} key={pokemon.id}/>
                ))}
                {loading ? 'Loading...' : 'Fetch Pokemon'}
            </div>
        </div>
    )
}
export default PokeDexContainer;