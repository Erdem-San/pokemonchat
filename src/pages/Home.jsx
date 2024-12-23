import { useState, useEffect, useCallback, useRef } from 'react'
import PokemonCard from '../components/PokemonCard'
import Loading from '../components/Loading'
import { useTheme } from '../context/ThemeContext'
import { Link } from 'react-router-dom'

function Home() {
  const [pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(true)
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const limit = 20
  const observer = useRef()
  const { toggleTheme, theme } = useTheme()

  const lastPokemonRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setOffset(prevOffset => prevOffset + limit)
      }
    })
    
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  const fetchPokemons = async () => {
    try {
      setLoading(true)
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
      const data = await response.json()
      
      if (data.results.length === 0) {
        setHasMore(false)
        return
      }

      const results = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url)
          return res.json()
        })
      )
      
      setPokemons(prevPokemons => [...prevPokemons, ...results])
      setLoading(false)
    } catch (error) {
      console.error("Pokemon verileri çekilemedi:", error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPokemons()
  }, [offset])

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Pokédex</h1>
        <Link
          to="/chat"
          className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transform transition-transform hover:scale-105 active:scale-95"
        >
          Sohbet Odası
        </Link>
        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemons.map((pokemon, index) => {
          const uniqueKey = `${pokemon.id}-${index}`
          
          if (pokemons.length === index + 1) {
            return (
              <div key={uniqueKey} ref={lastPokemonRef}>
                <PokemonCard pokemon={pokemon} />
              </div>
            )
          }
          return <div key={uniqueKey}><PokemonCard pokemon={pokemon} /></div>
        })}
      </div>
      {loading && <Loading />}
      {!hasMore && (
        <p className="text-center mt-4 text-gray-600 dark:text-gray-400">
          Tüm Pokemonlar yüklendi!
        </p>
      )}
    </div>
  )
}

export default Home 