import { createContext, useState, useEffect, useMemo, useContext } from 'react';

const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
    const [allPokemons, setAllPokemons] = useState([]);
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const limit = 20;

    useEffect(() => {
        const fetchPokemonData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=251`);
                const data = await response.json();

                const pokemonDetails = await Promise.all(
                    data.results.map(pokemon =>
                        fetch(pokemon.url).then(res => res.json())
                    )
                );

                const processedData = pokemonDetails.map(pokemon => ({
                    ...pokemon,
                    types: pokemon.types.map(type => type.type.name)
                }));
                setAllPokemons(processedData);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching Pokemon data:", error);
                setIsLoading(false);
            }
        };
        fetchPokemonData();
    }, []);

    const filteredPokemons = useMemo(() =>
        allPokemons.filter(pokemon =>
            pokemon.name.toLowerCase().includes(search.toLowerCase())
        ),
        [allPokemons, search]
    );

    useEffect(() => {
        setTotalPages(Math.ceil(filteredPokemons.length / limit));
        setCurrentPage(1);
    }, [filteredPokemons.length]);

    const getCurrentPagePokemons = () => {
        const start = (currentPage - 1) * limit;
        const end = start + limit;
        return filteredPokemons.slice(start, end);
    };

    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 3;

        if (currentPage <= maxVisiblePages) {
            for (let i = 1; i <= Math.min(totalPages, maxVisiblePages); i++) {
                pageNumbers.push(i);
            }
        } else if (currentPage > totalPages - maxVisiblePages) {
            for (let i = Math.max(totalPages - maxVisiblePages + 1, 1); i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                pageNumbers.push(i);
            }
        }

        return pageNumbers;
    };

    const value = {
        allPokemons,
        search,
        setSearch,
        isLoading,
        currentPage,
        setCurrentPage,
        totalPages,
        getCurrentPagePokemons,
        getPageNumbers
    };

    return (
        <PokemonContext.Provider value={value}>
            {children}
        </PokemonContext.Provider>
    );
};

export const usePokemon = () => {
    const context = useContext(PokemonContext);
    if (!context) {
        throw new Error('usePokemon debe usarse dentro de un PokemonProvider');
    }
    return context;
};