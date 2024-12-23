import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PokemonDetail from './pages/PokemonDetail'
import { ThemeProvider } from './context/ThemeContext'
import Chat from './pages/Chat'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokemon/:id" element={<PokemonDetail />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
