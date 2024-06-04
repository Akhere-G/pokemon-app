import { QueryClient, useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Pokemon, PokemonList, PokemonSpecies } from "../types/pokemonTypes";

export const queryClient = new QueryClient();

export const useFetchPokemonList = (limit: number = 3, offset: number = 0) => {
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
    queryFn: () =>
      axios
        .get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((res) => res.data),
  });
};

export const useFetchPokemonSpecies = (id: string) => {
  return useQuery({
    queryKey: ["pokemon-species", id],
    queryFn: () =>
      axios
        .get<PokemonSpecies>(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
        .then((res) => res.data),
  });
};
