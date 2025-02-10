import React from 'react'
import { Link } from 'react-router'
import { SearchPokemon } from './SearchPokemon';
import { usePokemon } from './PokemonContext';


export const Home = () => {

  const {
    isLoading,
    setSearch,
    getCurrentPagePokemons,
    currentPage,
    setCurrentPage,
    totalPages,
    getPageNumbers
  } = usePokemon();

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-screen">
      <div className="w-32 h-32 relative">
        <div className="w-full h-full rounded-full border-8 border-gray-200 animate-spin">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-red-500 rounded-t-full"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white rounded-b-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full border-8 border-gray-800"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">

      {isLoading ? (<LoadingSpinner />) : (

        <div>
          <SearchPokemon />

          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {getCurrentPagePokemons().map((pokemon, index) => (
              <li key={pokemon.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center">
                <img
                  src={pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default}
                  alt={pokemon.name}
                  className="w-32 h-32 object-contain"
                  loading='lazy'
                />
                <p className="mt-2 text-xl font-semibold capitalize text-gray-700">
                  {pokemon.name}
                </p>
                <div className="flex gap-2">
                  {pokemon.types?.map((type, typeIndex) => (
                    <span
                      key={typeIndex}
                      className={`px-2 py-1 rounded-full text-base font-bold capitalize type-${type}`}
                    >
                      {type}
                    </span>
                  ))}
                </div>

                <Link
                  to={`/pokemon/${pokemon.id}`}
                  className="mt-4 bg-yellow-400 text-white p-3 rounded-full transition-colors duration-300 hover:bg-yellow-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
                </Link>



              </li>
            ))}
          </ul>

          <div className="flex justify-center gap-2 mt-8">

            <button
              className={`px-4 py-2 rounded-md bg-red-500 text-white transition-colors duration-300 hover:bg-yellow-800`}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Anterior
            </button>

            {getPageNumbers().map(pageNumber => (
              <button
                key={pageNumber}
                className={`px-4 py-2 rounded-md ${pageNumber === currentPage ? 'bg-red-500 text-white' : 'bg-white text-gray-700 hover:text-white'} transition-colors duration-300 hover:bg-yellow-800`}
                onClick={() => setCurrentPage(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}

            <button
              className={`px-4 py-2 rounded-md bg-red-500 text-white transition-colors duration-300 hover:bg-yellow-800`}
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Siguiente

            </button>

          </div>

        </div>

      )}
    </div >
  );
}
