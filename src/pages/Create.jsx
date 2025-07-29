import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { supabase } from '../client'

export default function Create() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    description: "",
    level: 1,
  })
  const [loading, setLoading] = useState(false)

  const pokemonTypes = [
    "Fire",
    "Water",
    "Grass",
    "Electric",
    "Psychic",
    "Ice",
    "Dragon",
    "Dark",
    "Fighting",
    "Poison",
    "Ground",
    "Flying",
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.title || !formData.type) return

    console.log("Submitting data:", formData)

    setLoading(true)
    try {
      const { data, error } = await supabase.from("pokemondb").insert([formData])

      if (error) {
        console.error("Supabase error:", error)
        throw error
      }

      console.log("Success! Created:", data)
      navigate("/gallery")
    } catch (error) {
      console.error("Error creating Pokemon:", error)
      console.error("Error message:", error.message)
      console.error("Error details:", error.details)
      alert(`Error creating Pokemon: ${error.message || "Unknown error"}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <nav className="sidebar">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/create" className="nav-link active">
          Create a Pokemon
        </Link>
        <Link to="/gallery" className="nav-link">
          Pokemon Gallery
        </Link>
      </nav>

      <main className="main-content">
        <div className="create-container">
          <h1>Create a New Pokemon</h1>

          <div className="pokemon-display">
            <div className="pokemon-grid">
              <div className="pokemon-sprite">🔥</div>
              <div className="pokemon-sprite">💧</div>
              <div className="pokemon-sprite">🌿</div>
              <div className="pokemon-sprite">⚡</div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="create-form">
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter Pokemon name"
                required
              />
            </div>

            <div className="form-group">
              <label>Level:</label>
              <input
                type="number"
                min="1"
                max="100"
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: Number.parseInt(e.target.value) })}
              />
            </div>

            <div className="form-group">
              <label>Type:</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                required
              >
                <option value="">Select Type</option>
                {pokemonTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Description:</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your Pokemon..."
                rows="3"
              />
            </div>

            <button type="submit" disabled={loading} className="submit-button">
              {loading ? "Creating..." : "Create Pokemon"}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
