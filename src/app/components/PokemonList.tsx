"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { queryClient, useFetchPokemonList } from "../services/queries";

function PokemonList() {
  const pokemonListData = useFetchPokemonList();

  if (!pokemonListData.data) {
    return <h2>Loading...</h2>;
  }

  console.log("aaaaaa", pokemonListData);
  return (
    <div>
      {pokemonListData.data.results.map((pokemon) => (
        <div>
          {pokemon.name}
          {pokemon.url}
        </div>
      ))}
    </div>
  );
}

export default function PokemonListWithQueryProvider() {
  return (
    <QueryClientProvider client={queryClient}>
      <PokemonList />
    </QueryClientProvider>
  );
}
