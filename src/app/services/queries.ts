import { QueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Pokemon, PokemonList } from "../types/pokemonTypes";

export const queryClient = new QueryClient();

export const useFetchPokemonList = (limit: number = 3, offset: number = 0) => {
  return useQuery({
    queryKey: ["pokemon"],

    queryFn: () =>
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
