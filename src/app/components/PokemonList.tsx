"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import {
  queryClient,
  useFetchMorePokemon,
  useFetchPokemonList,
} from "../services/queries";
import PokemonCard from "./PokemonCard";
import { PokemonList as IPokemonList } from "../types/pokemonTypes";

const pokemonPerPage = 20;
function PokemonList() {
  const [offset, setOffset] = useState(0);
  const [pokemonList, setPokemonList] = useState<IPokemonList | null>(null);
  const pokemonListData = useFetchPokemonList(pokemonPerPage);
  const {
    mutate: fetchMorePokemon,
    isPending: isFetchMorePokemonPending,
    data: morePokemonData,
  } = useFetchMorePokemon();

  useEffect(() => {
    if (pokemonListData.data && !pokemonList) {
      setPokemonList(pokemonListData.data);
    }
  }, [pokemonListData]);

  useEffect(() => {
    if (morePokemonData) {
      setPokemonList((prev) => ({
        ...morePokemonData,
        results: prev?.results?.concat(morePokemonData.results) ?? [],
      }));
    }
  }, [morePokemonData]);

  if (pokemonListData.isLoading) {
    return <h2>Loading...</h2>;
  }

  if (!pokemonList) {
    return <h2>No pokemon available</h2>;
  }

  const loadMorePokemon = async () => {
    const newOffset = offset + pokemonPerPage;
    fetchMorePokemon({ limit: pokemonPerPage, offset: newOffset });
    setOffset(newOffset);
  };
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
        {pokemonList.results.map((pokemon) => {
          const url = new URL(pokemon.url);
          const paths = url.pathname.split("/");
          const id = paths[paths.length - 2];
          return <PokemonCard key={id} id={id} name={pokemon.name} />;
        })}
      </div>

      <button
        className="block mx-auto mt-8 primary-btn text-xl"
        onClick={loadMorePokemon}
        disabled={isFetchMorePokemonPending}
      >
        <span className="px-4">
          {isFetchMorePokemonPending ? "Loading..." : "More Pokemon"}
        </span>
      </button>
    </>
  );
}

export default function PokemonListWithQueryProvider() {
  return (
    <QueryClientProvider client={queryClient}>
      <PokemonList />
    </QueryClientProvider>
  );
}
