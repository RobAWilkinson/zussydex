import React from "react";
import {DetailedPokemon} from "../PokemonTypes/Pokemon";

interface DetailedPokemonViewProps {
    pokemon: DetailedPokemon;
}

export const DetailedPokemonView: React.FC<DetailedPokemonViewProps> = ({pokemon}) => {
    return (
        <div className="transition-max-height duration-500 ease-in-out overflow-hidden">
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
        </div>
    )
}