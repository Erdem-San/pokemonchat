import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Loading from '../components/Loading'
import { useTheme } from '../context/ThemeContext'

function PokemonDetail() {
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const { toggleTheme, theme } = useTheme()

  useEffect(() => {
    fetchPokemon()
  }, [id])

  const fetchPokemon = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      const data = await response.json()
      setPokemon(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching pokemon:', error)
      setLoading(false)
    }
  }

  if (loading) return <Loading />
  if (!pokemon) return <div>Pokemon not found</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <Link 
          to="/"
          className="text-gray-800 dark:text-white hover:underline"
        >
          ← Back to Pokédex
        </Link>
        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <img 
            src={pokemon.sprites.front_default} 
            alt={pokemon.name}
            className="w-48 h-48"
          />
          <div>
            <h1 className="text-4xl font-bold capitalize text-gray-900 dark:text-white mb-4">
              {pokemon.name}
            </h1>
            <div className="flex gap-2 mb-4">
              {pokemon.types.map(type => (
                <span 
                  key={type.type.name}
                  className="px-3 py-1 rounded-full text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                >
                  {type.type.name}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-gray-700 dark:text-gray-300">
                <p>Height: {pokemon.height / 10}m</p>
                <p>Weight: {pokemon.weight / 10}kg</p>
              </div>
              <div className="text-gray-700 dark:text-gray-300">
                <p>Base Experience: {pokemon.base_experience}</p>
                <p>Abilities: {pokemon.abilities.map(a => a.ability.name).join(', ')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokemonDetail 