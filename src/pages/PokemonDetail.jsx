import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PokemonDetail() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!response.ok) {
          throw new Error('Failed to fetch Pokémon details');
        }
        const data = await response.json();
        setPokemon(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemon();
  }, [name]);

  if (loading) return <p>Loading Pokémon details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!pokemon) return null;

  return (
    <div class='pokemon-detail'>
      <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p><strong>Height:</strong> {pokemon.height}</p>
      <p><strong>Weight:</strong> {pokemon.weight}</p>
      <p><strong>Types:</strong> {pokemon.types.map(t => t.type.name).join(', ')}</p>
      <p><strong>Abilities:</strong> {pokemon.abilities.map(a => a.ability.name).join(', ')}</p>
    </div>
  );
}
