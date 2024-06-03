"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { queryClient, useFetchPokemonList } from "../services/queries";
import Image from "next/image";
import PokemonCard from "./PokemonCard";

function PokemonList() {
  const pokemonListData = useFetchPokemonList();

  if (!pokemonListData.data) {
    return <h2>Loading...</h2>;
  }

  console.log("aaaaaa", pokemonListData);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
      {pokemonListData.data.results.map((pokemon) => {
        const url = new URL(pokemon.url);
        const paths = url.pathname.split("/");
        const id = paths[paths.length - 2];
        return <PokemonCard key={id} id={id} name={pokemon.name} />;
      })}
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
