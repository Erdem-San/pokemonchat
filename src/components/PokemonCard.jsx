import { Link } from 'react-router-dom'

function PokemonCard({ pokemon }) {
  return (
    <Link to={`/pokemon/${pokemon.id}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-200">
        <img 
          src={pokemon.sprites.front_default} 
          alt={pokemon.name}
          className="w-32 h-32 mx-auto"
        />
        <h2 className="text-xl font-bold text-center capitalize text-gray-800 dark:text-white">
          {pokemon.name}
        </h2>
        <div className="flex gap-2 justify-center mt-2">
          {pokemon.types.map(type => (
            <span 
              key={type.type.name}
              className="px-2 py-1 rounded-full text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            >
              {type.type.name}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}

export default PokemonCard 