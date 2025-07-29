import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { supabase } from '../client'

export default function Gallery() {
  const [pokemon, setPokemon] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPokemon()
  }, [])

  const fetchPokemon = async () => {
    try {
      const { data, error } = await supabase.from("pokemondb").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setPokemon(data || [])
    } catch (error) {
      console.error("Error fetching Pokemon:", error)
    } finally {
      setLoading(false)
    }
  }

  const getTypeEmoji = (type) => {
    const typeEmojis = {
      Fire: "🔥",
      Water: "💧",
      Grass: "🌿",
      Electric: "⚡",
      Psychic: "🌙",
      Ice: "❄️",
      Dragon: "🐉",
      Dark: "🌑",
      Fighting: "👊",
      Poison: "☠️",
      Ground: "🌍",
      Flying: "🦅",
    }
    return typeEmojis[type] || "❓"
  }

  const getTypeColor = (type) => {
    const typeColors = {
      Fire: "#ff6b6b",
      Water: "#4ecdc4",
      Grass: "#95e1d3",
      Electric: "#fce38a",
      Psychic: "#d63384",
      Ice: "#a8e6cf",
      Dragon: "#8b5cf6",
      Dark: "#495057",
      Fighting: "#e74c3c",
      Poison: "#9b59b6",
      Ground: "#d4a574",
      Flying: "#87ceeb",
    }
    return typeColors[type] || "#6c757d"
  }

  if (loading) {
    return (
      <div className="app">
        <nav className="sidebar">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/create" className="nav-link">
            Create a Pokemon
          </Link>
          <Link to="/gallery" className="nav-link active">
            Pokemon Gallery
          </Link>
        </nav>
        <main className="main-content">
          <div className="loading">Loading Pokemon...</div>
        </main>
      </div>
    )
  }

  return (
    <div className="app">
      <nav className="sidebar">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/create" className="nav-link">
          Create a Pokemon
        </Link>
        <Link to="/gallery" className="nav-link active">
          Pokemon Gallery
        </Link>
      </nav>

      <main className="main-content">
        <div className="gallery-container">
          <h1>Your Pokemon Gallery!</h1>

          {pokemon.length === 0 ? (
            <div className="empty-state">
              <p>You haven't created any Pokemon yet!</p>
              <Link to="/create" className="create-link">
                Create one here!
              </Link>
            </div>
          ) : (
            <div className="pokemon-grid-gallery">
              {pokemon.map((poke) => (
                <div key={poke.id} className="pokemon-card" style={{ borderColor: getTypeColor(poke.type) }}>
                  <div className="pokemon-avatar">{getTypeEmoji(poke.type)}</div>
                  <h3>Name of Pokemon: {poke.title}</h3>
                  <p>Level of Pokemon: {poke.level}</p>
                  <p>Type of Pokemon: {poke.type}</p>

                  <div className="card-actions">
                    <Link to={`/details/${poke.id}`} className="view-button">
                      View Details
                    </Link>
                    <Link to={`/edit/${poke.id}`} className="edit-button">
                      Edit Pokemon
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
