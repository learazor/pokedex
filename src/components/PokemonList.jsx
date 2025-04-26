import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function PokemonList() {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [offset, setOffset] = useState(0);
  
    useEffect(() => {
      async function fetchPokemons() {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
          if (!response.ok) {
            throw new Error('Failed to fetch Pokémon');
          }
          const data = await response.json();
          setPokemons(data.results);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
  
      fetchPokemons();
    }, [offset]);
  
    function handleNext() {
      setOffset(prev => prev + 20);
    }
  
    function handlePrevious() {
      setOffset(prev => Math.max(0, prev - 20));
    }
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
  
    return (
      <div style={{ textAlign: 'center' }}>
        <div className="pokemon-grid">
          {pokemons.map((pokemon) => {
            const id = pokemon.url.split('/').filter(Boolean).pop();
            const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  
            return (
              <Link to={`/pokemon/${pokemon.name}`} key={pokemon.name} className="pokemon-card">
                <img src={imageUrl} alt={pokemon.name} />
                <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
              </Link>
            );
          })}
        </div>
  
        <div class='lower-navbar'>
          <button onClick={handlePrevious} disabled={offset === 0}>Previous</button>
          <button onClick={handleNext} style={{ marginLeft: '10px' }}>Next</button>
        </div>
      </div>
    );
  }
  