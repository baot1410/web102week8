import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { supabase } from '../client'

export default function Edit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    description: "",
    level: 1,
  })
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [deleting, setDeleting] = useState(false)

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

  useEffect(() => {
    if (id) {
      fetchPokemon()
    }
  }, [id])

  const fetchPokemon = async () => {
    try {
      const { data, error } = await supabase.from("pokemondb").select("*").eq("id", id).single()

      if (error) throw error

      setFormData({
        title: data.title || "",
        type: data.type || "",
        description: data.description || "",
        level: data.level || 1,
      })
    } catch (error) {
      console.error("Error fetching Pokemon:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    if (!formData.title || !formData.type) return

    setUpdating(true)
    try {
      const { error } = await supabase.from("pokemondb").update(formData).eq("id", id)

      if (error) throw error

      navigate(`/details/${id}`)
    } catch (error) {
      console.error("Error updating Pokemon:", error)
    } finally {
      setUpdating(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this Pokemon? This action cannot be undone.")) {
      return
    }

    setDeleting(true)
    try {
      const { error } = await supabase.from("pokemondb").delete().eq("id", id)

      if (error) throw error

      navigate("/gallery")
    } catch (error) {
      console.error("Error deleting Pokemon:", error)
    } finally {
      setDeleting(false)
    }
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
        <Link to="/gallery" className="nav-link">
          Pokemon Gallery
        </Link>
      </nav>

      <main className="main-content">
        <div className="edit-container">
          <h1>Update Your Pokemon :)</h1>

          <div className="pokemon-display">
            <div className="pokemon-grid">
              <div className="pokemon-sprite">🔥</div>
              <div className="pokemon-sprite">💧</div>
              <div className="pokemon-sprite">🌿</div>
              <div className="pokemon-sprite">⚡</div>
              <div className="pokemon-sprite">🌙</div>
              <div className="pokemon-sprite">❄️</div>
              <div className="pokemon-sprite">🐉</div>
              <div className="pokemon-sprite">🌑</div>
            </div>
          </div>

          <div className="current-info">
            <h3>Current Pokemon Info:</h3>
            <p>
              Name: {formData.title}, Level: {formData.level}, Type: {formData.type}
            </p>
          </div>

          <form onSubmit={handleUpdate} className="edit-form">
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

            <div className="form-actions">
              <button type="submit" disabled={updating} className="update-button">
                {updating ? "Updating..." : "Update Pokemon"}
              </button>

              <button type="button" onClick={handleDelete} disabled={deleting} className="delete-button">
                {deleting ? "Deleting..." : "Delete Pokemon"}
              </button>
            </div>
          </form>

          <Link to={`/details/${id}`} className="back-link">
            Back to Details
          </Link>
        </div>
      </main>
    </div>
  )
}
