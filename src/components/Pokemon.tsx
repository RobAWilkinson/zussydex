import React, {useState} from "react";
import {BasicPokemon, DetailedPokemon} from "../PokemonTypes/Pokemon";
import {DetailedPokemonView} from "./DetailedPokemonView";

interface PokemonProps {
    pokemon: BasicPokemon | DetailedPokemon;
    fetchDetails: Function;
    index: number;
}

type DivClickEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;


export const Pokemon: React.FC<PokemonProps> = ({pokemon, fetchDetails, index}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const handleClick = (event: DivClickEvent): void => {
        event.preventDefault();
        if (!isDetailedPokemon(pokemon)) {
            fetchDetails(pokemon, index)
            setIsExpanded(!isExpanded);
        } else {
            setIsExpanded(!isExpanded);
        }
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
            {isExpanded && isDetailedPokemon(pokemon) &&
                <DetailedPokemonView pokemon={pokemon as DetailedPokemon}/>
            }
        </div>
    )
};