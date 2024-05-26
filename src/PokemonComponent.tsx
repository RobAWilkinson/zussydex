import React, {useEffect, useState} from 'react';
import usePokemonStore from './stores/pokedex';
import {BasicPokemon, DetailedPokemon} from "./PokemonTypes/Pokemon";
import {throttle} from 'lodash';
import pokedex from "./stores/pokedex";

interface PokemonProps {
    pokemon: BasicPokemon | DetailedPokemon;
    fetchDetails: Function;
    index: number;
}

type DivClickEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;


const useScrollToBottom = (onScrollToBottom: () => void) => {
    useEffect(() => {
        const handleScroll = throttle(() => {
            const scrollPosition = window.innerHeight + window.scrollY;
            const threshold = document.body.offsetHeight - 100; // Adjust the threshold as needed

            if (scrollPosition >= threshold) {
                onScrollToBottom();
            }
        }, 2000);

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [onScrollToBottom]);
};

const PokemonComponent: React.FC<PokemonProps> = ({pokemon, fetchDetails, index}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const handleClick = (event: DivClickEvent): void => {
        event.preventDefault();
        fetchDetails(pokemon, index)
        setIsExpanded(!isExpanded);
    };

    const isDetailedPokemon = (pokemon: BasicPokemon | DetailedPokemon): pokemon is DetailedPokemon => {
        return 'base_experience' in pokemon || 'height' in pokemon || 'weight' in pokemon || 'abilities' in pokemon;
    };

    return (
        <div className="bg-gameboy-light-green p-4 rounded border-2 border-gameboy-black" onClick={handleClick}>
            <div className="flex justify-between items-center mb-2">
                <span className="font-gameboy text-sm text-gameboy-dark-green">#{pokemon.id}</span>
                <span className="font-gameboy text-sm text-gameboy-dark-green">{pokemon.name.toUpperCase()}</span>
            </div>
            {isDetailedPokemon(pokemon) &&
                <DetailedPokemonView pokemon={pokemon as DetailedPokemon}/>
            }
        </div>
    )
};

interface DetailedPokemonViewProps {
    pokemon: DetailedPokemon;
}

const DetailedPokemonView: React.FC<DetailedPokemonViewProps> = ({pokemon}) => {
    return (
        <div className="mt-4 bg-gameboy-gray p-2 rounded border-2 border-gameboy-black">
            <img
                src={pokemon.sprites?.front_default || ""}
                alt={pokemon.name}
                className="w-16 h-16 mx-auto"
            />
            <h2 className="font-gameboy text-lg text-gameboy-dark-green mb-2">Details</h2>
            <p className="font-gameboy text-gameboy-dark-green text-sm mb-1">
                <strong>Type:</strong> {pokemon.types[0].type.name}
            </p>
            <p className="font-gameboy text-gameboy-dark-green text-sm mb-1">
                <strong>Height:</strong> 0.7m
            </p>
            <p className="font-gameboy text-gameboy-dark-green text-sm mb-1">
                <strong>Weight:</strong> 6.9kg
            </p>
            <p className="font-gameboy text-gameboy-dark-green text-sm mb-1">
                <strong>Abilities:</strong> Overgrow, Chlorophyll (hidden)
            </p>
            <p className="font-gameboy text-gameboy-dark-green text-sm">
                <strong>Base Experience:</strong> 64
            </p>
        </div>


    )
}
const PokemonListComponent: React.FC = () => {
    const {resetState, pokemon, loading, error, fetchPokemon, fetchDetails, fetchMorePokemon} = usePokemonStore();

    const handleScrollToBottom = () => {
        fetchMorePokemon();
        console.log('User has scrolled to the bottom of the page');
        // Perform any action you need when the user scrolls to the bottom
    };

    useScrollToBottom(handleScrollToBottom);
    return (
        <div className="min-h-screen bg-gameboy-green flex items-center justify-center">
            <div className="w-full max-w-md bg-gameboy-gray p-4 rounded-lg shadow-lg border-4 border-gameboy-black">
                <h1 className="text-2xl font-gameboy text-gameboy-dark-green text-center mb-4">Pokedex</h1>
                <button onClick={resetState} disabled={loading}>
                    {loading ? 'Loading...' : 'Reset Pokemon'}
                </button>
                <button onClick={fetchPokemon} disabled={loading}>
                    {loading ? 'Loading...' : 'Fetch Pokemon'}
                </button>

                {error && <div style={{color: 'red'}}>{error}</div>}
                {pokemon && pokemon.map((pokemon, index) => (
                    <PokemonComponent pokemon={pokemon} index={index} fetchDetails={fetchDetails}/>
                ))}
                {loading ? 'Loading...' : 'Fetch Pokemon'}
            </div>
        </div>
    )
}

export default PokemonListComponent;