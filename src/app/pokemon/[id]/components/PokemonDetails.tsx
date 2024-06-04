"use client";
import React from "react";
import { useParams } from "next/navigation";
import {
  queryClient,
  useFetchPokemon,
  useFetchPokemonSpecies,
} from "@/app/services/queries";
import { QueryClientProvider } from "@tanstack/react-query";
import Image from "next/image";
import { capitalise, getFrontImage, typeToColor } from "@/app/services/utils";

const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex justify-between gap-2 border-b-2 mb-2 items-baseline w-full py-2">
      <p>{label}</p>
      {children}
    </div>
  );
};
function PokemonDetails() {
  const { id } = useParams<{ id: string }>();

  const pokemonDetails = useFetchPokemon(id);
  const pokemonSpeciesDetails = useFetchPokemonSpecies(id);

  if (pokemonDetails.isLoading || pokemonSpeciesDetails.isLoading) {
    return <p>Loading...</p>;
  }

  if (!pokemonDetails.data || !pokemonDetails.data) {
    return <p>No pokemon with this id exists</p>;
  }

  const { abilities, cries, name, stats, types } = pokemonDetails.data;

  const { base_happiness, capture_rate } = pokemonSpeciesDetails.data;

  console.log(pokemonSpeciesDetails.data);

  return (
    <div>
      <div className="p-4 flex flex-col items-center">
        <Image
          src={getFrontImage(id)}
          alt={`iamge of pokemon ${name}`}
          width={200}
          height={200}
        />

        <div className="w-full">
          <Field label="Name">
            <p>{capitalise(name)}</p>
          </Field>
          <Field label="Type">
            <p className="flex gap-2">
              {types.map(({ type: { name } }) => (
                <span
                  style={{ backgroundColor: typeToColor(name) }}
                  className="pill"
                  key={name}
                >
                  {name}
                </span>
              ))}
            </p>
          </Field>
          <Field label="Abilities">
            <p className="flex gap-2 ">
              {abilities.map(({ ability: { name } }) => (
                <span
                  style={{ backgroundColor: typeToColor(name) }}
                  className="pill"
                  key={name}
                >
                  {name}
                </span>
              ))}
            </p>
          </Field>
          <Field label="Base Happiness">
            <p>{base_happiness}</p>
          </Field>
          <Field label="Capture Rate">
            <p>{capture_rate}</p>
          </Field>
        </div>
      </div>
    </div>
  );
}

export default function PokemonDetailsWithQueryClient() {
  return (
    <QueryClientProvider client={queryClient}>
      <PokemonDetails />
    </QueryClientProvider>
  );
}
