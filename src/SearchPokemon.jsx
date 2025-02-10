import React from 'react'
import { useState } from 'react'
import { usePokemon } from './PokemonContext'

export const SearchPokemon = ({ onSearch }) => {

    const { search, setSearch } = usePokemon()

    const handleSearch = (e) => {
        const value = e.target.value
        setSearch(value.toLowerCase())
    }

    return (
        <div className="flex justify-center py-8">
            <div className="relative">
                <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Buscar Pokemon"
                    className="bg-white px-6 py-3 rounded-full shadow-lg w-80
                    border-2 border-gray-200 focus:border-blue-500 
                    focus:outline-none transition-all duration-300
                    placeholder:text-gray-400 text-gray-700"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    🔍
                </span>
            </div>
        </div>
    )
}
