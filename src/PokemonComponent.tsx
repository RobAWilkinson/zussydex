import React, {useEffect} from 'react';
import usePokemonStore from './stores/pokedex';
import {Pokemon} from "./PokemonTypes/Pokemon";
import { throttle } from 'lodash';

interface PokemonProps {
    pokemon: Pokemon;
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

const PokemonComponent: React.FC<PokemonProps> = ({pokemon, fetchDetails, index }) => {
    const handleClick = (event: DivClickEvent): void => {
        event.preventDefault();
        fetchDetails(pokemon, index)
    };
    return (
        <div onClick={handleClick}>
            <p>Name: {pokemon.name}</p>
            <p>URL: <a href={pokemon.url}>{pokemon.url}</a></p>
            {pokemon.sprites?.front_default &&
            <img src={pokemon.sprites.front_default} />}
        </div>
    );
};

const PokemonListComponent: React.FC = () => {
    const {pokemon, loading, error, fetchPokemon, fetchDetails, fetchMorePokemon} = usePokemonStore();

    const handleScrollToBottom = () => {
        fetchMorePokemon();
        console.log('User has scrolled to the bottom of the page');
        // Perform any action you need when the user scrolls to the bottom
    };

    useScrollToBottom(handleScrollToBottom);
    return (
        <div>
            <button onClick={fetchPokemon} disabled={loading}>
                {loading ? 'Loading...' : 'Fetch Pokemon'}
            </button>

            {error && <div style={{color: 'red'}}>{error}</div>}
            {pokemon && pokemon.map((pokemon, index) => (
                <PokemonComponent pokemon={pokemon} index={index} fetchDetails={fetchDetails}/>
            ))}
            {loading ? 'Loading...' : 'Fetch Pokemon'}
        </div>
    )
}

export default PokemonListComponent;