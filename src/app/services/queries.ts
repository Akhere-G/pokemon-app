import { QueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PokemonList } from "../types/pokemonTypes";

export const queryClient = new QueryClient();

export const useFetchPokemonList = (limit: number = 20, offset: number = 0) => {
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
