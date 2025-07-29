import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { supabase } from '../client'

export default function Details() {
  const { id } = useParams()
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      fetchPokemon()
    }
  }, [id])

  const fetchPokemon = async () => {
    try {
      const { data, error } = await supabase.from("pokemondb").select("*").eq("id", id).single()

      if (error) throw error
      setPokemon(data)
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

  const getLevelComment = (level) => {
    if (level >= 80) return "This Pokemon is incredibly powerful! 🌟"
    if (level >= 60) return "This Pokemon is quite strong! 💪"
    if (level >= 40) return "This Pokemon is getting stronger! 📈"
    if (level >= 20) return "This Pokemon has potential! ✨"
    return "This Pokemon is just starting its journey! 🌱"
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
          <Link to="/gallery" className="nav-link">
            Pokemon Gallery
          </Link>
        </nav>
        <main className="main-content">
          <div className="loading">Loading Pokemon details...</div>
        </main>
      </div>
    )
  }

  if (!pokemon) {
    return (
      <div className="app">
        <nav className="sidebar">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/create" className="nav-link">
            Create a Pokemon
          </Link>
          <Link to="/gallery" className="nav-link">
            Pokemon Gallery
          </Link>
        </nav>
        <main className="main-content">
          <div className="error">Pokemon not found!</div>
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
        <Link to="/gallery" className="nav-link">
          Pokemon Gallery
        </Link>
      </nav>

      <main className="main-content">
        <div className="details-container">
          <h1>Pokemon: {pokemon.title}</h1>

          <div className="pokemon-details-card" style={{ borderColor: getTypeColor(pokemon.type) }}>
            <div className="pokemon-avatar-large">{getTypeEmoji(pokemon.type)}</div>

            <div className="stats-section">
              <h2>Stats:</h2>
              <div className="stat-item">
                <strong>Type:</strong> {pokemon.type}
              </div>
              <div className="stat-item">
                <strong>Level:</strong> {pokemon.level}
              </div>
              {pokemon.description && (
                <div className="stat-item">
                  <strong>Description:</strong> {pokemon.description}
                </div>
              )}
              <div className="stat-item">
                <strong>Created:</strong> {new Date(pokemon.created_at).toLocaleDateString()}
              </div>
            </div>

            <div className="level-comment">{getLevelComment(pokemon.level)}</div>

            <div className="details-actions">
              <Link to={`/edit/${pokemon.id}`} className="edit-button">
                Want to edit this Pokemon?
              </Link>
              <Link to="/gallery" className="back-button">
                Back to Gallery
              </Link>
            </div>
          </div>

          <div className="pokemon-sprites">
            <span className="sprite">🔥</span>
            <span className="sprite">💧</span>
          </div>
        </div>
      </main>
    </div>
  )
}
