
import React from 'react'
import { useParams, Link } from 'react-router'
import { useState, useEffect } from "react";

export const PokemonDetail = () => {

    const { id } = useParams();
    const [pokemon, setPokemon] = useState(null);

    const fetchPokemonData = async () => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const data = await response.json();
            setPokemon(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchPokemonData();
    }, [id]);

    if (!pokemon) {
        return
    }

    return (
        <div className="flex flex-col items-center justify-center p-8">
            <Link to="/" className="bg-yellow-600 text-white px-4 py-2 rounded-md transition-colors duration-500 hover:bg-yellow-500 mb-4">VOLVER</Link>
            <div className="bg-white rounded-lg shadow-lg py-8 px-4 max-w-md w-full">
                <div className='flex gap-4 items-center'></div>
                <div className='flex-1'>
                    <img
                        width={130}
                        src={pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default}
                        alt={pokemon.name}
                        className="mx-auto mb-4 hover:scale-110 transition-transform"
                    />
                    <h1 className="text-3xl font-semibold capitalize text-gray-700 mt-4 text-center py-4">{pokemon.name.toUpperCase()}</h1>
                </div>

                <div className='flex flex-col flex-1 items-center'>
                    <div className="mt-4 text-gray-600"></div>
                    <div className="text-center">
                        <p className="mb-2">
                            <span>
                                <span className="font-semibold">HP: </span>
                                {pokemon.stats[0].base_stat}

                            </span>
                        </p>
                        <p className="mb-2">
                            <span>
                                <span className="font-semibold">ATAQUE: </span>
                                {pokemon.stats[1].base_stat}
                            </span>
                        </p>
                        <p className="mb-2">
                            <span>
                                <span className="font-semibold">DEFENSA: </span>
                                {pokemon.stats[2].base_stat}
                            </span>
                        </p>
                    </div>
                    <p className="mb-2">
                        <span>
                            <span className="font-semibold">PESO: </span>
                            {pokemon.weight / 10} kg
                        </span>
                    </p>
                    <p className="mb-2">
                        <span>
                            <span className="font-semibold">ALTURA: </span>
                            {pokemon.height / 10} m
                        </span>
                    </p>

                </div>

            </div>
        </div>
    )
}
