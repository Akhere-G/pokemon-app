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
import { FlavorTextEntry } from "@/app/types/pokemonTypes";
import Link from "next/link";

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

const Entries = ({
  entries,
  max = 5,
}: {
  entries: FlavorTextEntry[];
  max?: number;
}) => {
  return (
    <div className="flex flex-col gap-5">
      {entries
        .filter((entry, i) => entry.language.name === "en" && i < max)
        .map((entry) => {
          return (
            <section className="border-b-2">
              <p className="text-xl mb-1 text-green-900 font-semibold">
                {capitalise(entry.version.name)}
              </p>
              <p>{entry.flavor_text}</p>
            </section>
          );
        })}
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

  if (!pokemonDetails.data || !pokemonSpeciesDetails.data) {
    return <p>No pokemon with this id exists</p>;
  }

  const { abilities, cries, name, stats, types } = pokemonDetails.data;

  const {
    base_happiness,
    capture_rate,
    flavor_text_entries,
    genera,
    evolves_from_species,
  } = pokemonSpeciesDetails.data;

  let evolvesFromSpeciesId = "";

  if (evolves_from_species) {
    const paths = evolves_from_species.url.split("/");
    evolvesFromSpeciesId = paths[paths.length - 2];
  }
  return (
    <div className="flex gap-2 flex-col sm:flex-row sm:p-4">
      <div className=" flex flex-col items-center flex-[0.4] relative">
        <h2 className="text-2xl">{capitalise(name)}</h2>
        <small>
          {genera.find((g) => g.language.name === "en")?.genus ?? ""}
        </small>
        <Image
          src={getFrontImage(id)}
          alt={`iamge of pokemon ${name}`}
          width={200}
          height={200}
        />

        <div className="w-full">
          <Field label="Type">
            <p className="flex gap-2 flex-wrap justify-end">
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
            <p className="flex gap-2 flex-wrap justify-end">
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
          {evolves_from_species && (
            <Field label="Evolves from">
              <Link className="link" href={`pokemon/${evolvesFromSpeciesId}`}>
                {capitalise(evolves_from_species.name)}
              </Link>
            </Field>
          )}
          <Field label="Base Happiness">
            <p>{base_happiness}</p>
          </Field>
          <Field label="Capture Rate">
            <p>{capture_rate}</p>
          </Field>
        </div>
      </div>
      <div className="md:w-[1.5px] md:bg-slate-200 md:mx-4" />
      <div className="flex-[0.6] sm:h-[100%]">
        <Entries entries={flavor_text_entries} />
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
