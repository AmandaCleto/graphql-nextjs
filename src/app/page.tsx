import { Suspense } from 'react';
import client from './graphql/apolloClient';
import { GET_POKEMONS } from './graphql/queries/getPokemons';

type Pokemon = {
  id: number;
  name: string;
};

async function fetchGen3Pokemon() {
  const { data } = await client.query<{ gen3_species: Pokemon[] }>({
    query: GET_POKEMONS,
  });
  return data.gen3_species;
}

export default async function Home() {
  const gen3Species = await fetchGen3Pokemon();

  return (
    <div>
      <h1>Generation 3 Pokémon Species</h1>
      <ul>
        {gen3Species.map((pokemon) => (
          <li key={pokemon.id}>
            #{pokemon.id} - {pokemon.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
