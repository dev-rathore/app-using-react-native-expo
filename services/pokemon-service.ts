import axios from "axios";

export const getPokemonDetails = async (
  pokemon: {
    name: string;
    url: string;
  },
) => {
  const pokemonDetails = await axios.get(pokemon.url);

  return {
    abilities: pokemonDetails.data.abilities.map((ability: { ability: { name: string } }) => ability.ability.name),            
    height: pokemonDetails.data.height,
    image: pokemonDetails.data.sprites.other['official-artwork'].front_default,
    name: pokemon.name,
    type: pokemonDetails.data.types[0].type.name,
    url: pokemon.url,
    weight: pokemonDetails.data.weight,
  };
};
