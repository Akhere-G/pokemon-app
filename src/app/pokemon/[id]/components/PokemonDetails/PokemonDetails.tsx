"use client";
import React, { useRef } from "react";
import { useParams } from "next/navigation";
import { queryClient, useFetchPokemon } from "@/app/services/queries";
import { QueryClientProvider } from "@tanstack/react-query";
import Image from "next/image";
import { capitalise, getFrontImage, typeToColor } from "@/app/services/utils";

import Link from "next/link";
import Field from "../Field";
import FlavourTextEntries from "../FlavourTextEntries";
import Stats from "../Stats";

export function PokemonDetails() {
  const { id } = useParams<{ id: string }>();

  const audioRef = useRef<null | HTMLAudioElement>(null);
  const allPokemonData = useFetchPokemon(id);

  if (allPokemonData.isLoading) {
    return <p>Loading...</p>;
  }

  if (!allPokemonData.data) {
    return <p>No pokemon with this id exists</p>;
  }
  const pokemonDetails = allPokemonData.data.pokemonData;
  const pokemonSpeciesDetails = allPokemonData.data.pokemonSpeciesData;

  const { abilities, cries, name, stats, types } = pokemonDetails;

  const {
    base_happiness,
    capture_rate,
    flavor_text_entries,
    genera,
    evolves_from_species,
    is_baby,
    is_legendary,
    is_mythical,
  } = pokemonSpeciesDetails;

  let evolvesFromSpeciesId = "";

  if (evolves_from_species) {
    const paths = evolves_from_species.url.split("/");
    evolvesFromSpeciesId = paths[paths.length - 2];
  }

  const tags: string[] = [];
  if (is_baby) {
    tags.push("Baby");
  }
  if (is_legendary) {
    tags.push("Lengendary");
  }
  if (is_mythical) {
    tags.push("Mythical");
  }

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <div>
      <div className="flex gap-2 flex-col sm:flex-row sm:p-4">
        <div className=" flex flex-col items-center flex-1 relative">
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
            <Field label="Cry">
              <button onClick={playSound} className="primary-btn">
                Play Cry
              </button>
              <audio ref={audioRef}>
                <source src={cries.latest} type="audio/ogg" />
                Your browser does not support the audio element.
              </audio>
            </Field>
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
                <Link
                  className="link"
                  href={`/pokemon/${evolvesFromSpeciesId}`}
                >
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
            {tags.length > 0 && (
              <Field label="Tags">
                {tags.map((name) => (
                  <span
                    style={{ backgroundColor: typeToColor("dragon") }}
                    className="pill"
                    key={name}
                  >
                    {name}
                  </span>
                ))}
              </Field>
            )}
          </div>
        </div>
        <div className="md:w-[1.5px] md:bg-slate-200 md:mx-4" />
        <div className="flex-1 sm:h-[100%]">
          <FlavourTextEntries entries={flavor_text_entries} />
        </div>
      </div>
      <h2 className="text-2xl text-center mb-4">Stats</h2>
      <Stats stats={stats} />
    </div>
  );
}

export default function PokemonDetailsConnected() {
  return (
    <QueryClientProvider client={queryClient}>
      <PokemonDetails />
    </QueryClientProvider>
  );
}
