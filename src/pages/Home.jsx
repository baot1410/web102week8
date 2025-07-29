import { Link } from "react-router-dom"
import { supabase } from '../client'


export default function Home() {
  return (
    <div className="app">
      <nav className="sidebar">
        <Link to="/" className="nav-link active">
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
        <div className="home-container">
          <h1>Welcome to the Pokemon Creator!</h1>
          <p>Here is where you can create your very own set of Pokemon before sending them off into battle!</p>

          <div className="pokemon-display">
            <div className="pokemon-grid">
              <div className="pokemon-sprite">🔥</div>
              <div className="pokemon-sprite">💧</div>
              <div className="pokemon-sprite">🌿</div>
              <div className="pokemon-sprite">⚡</div>
              <div className="pokemon-sprite">🌙</div>
              <div className="pokemon-sprite">☀️</div>
            </div>
          </div>

          <div className="pokeball">
            <div className="pokeball-inner"></div>
          </div>

          <Link to="/create" className="create-button">
            Create Your First Pokemon!
          </Link>
        </div>
      </main>
    </div>
  )
}
