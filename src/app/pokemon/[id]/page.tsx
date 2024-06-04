import React from "react";
import PokemonDetails from "./components/PokemonDetails";

export default function page() {
  return (
    <section className="w-screen p-4">
      <section className="mx-auto max-w-7xl p-4 bg-white m-4 shadow-md rounded-md">
        <PokemonDetails />
      </section>
    </section>
  );
}
