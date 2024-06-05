import { QueryClient, useQuery, useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Pokemon, PokemonList, PokemonSpecies } from "../types/pokemonTypes";

export const queryClient = new QueryClient();

export const useFetchPokemonList = (
  limit: number = 3,
  offset: number = 0,
  search?: string
) => {
  return useQuery({
    queryKey: ["pokemon", limit, offset],

    queryFn: () =>
      axios
        .get<PokemonList>(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        )
        .then((res) => res.data),
  });
};
export const useFetchMorePokemon = (limit: number = 3, offset: number = 0) => {
  return useMutation({
    mutationKey: ["pokemon", limit, offset],

    mutationFn: ({ limit, offset }: { limit: number; offset: number }) =>
      axios
        .get<PokemonList>(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        )
        .then((res) => res.data),
  });
};

export const useFetchPokemon = (id: string) => {
  return useQuery({
    queryKey: ["pokemon", id],
    queryFn: async () => {
      try {
        const pokemonDetailsResponse = await axios.get<Pokemon>(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        const pokemonSpeciesResponse = await axios.get<PokemonSpecies>(
          `https://pokeapi.co/api/v2/pokemon-species/${id}`
        );

        const pokemonData = pokemonDetailsResponse.data;
        const pokemonSpeciesData = pokemonSpeciesResponse.data;
        return { pokemonData, pokemonSpeciesData };
      } catch (err: any) {
        console.log(err?.message);
      }
    },
  });
};
