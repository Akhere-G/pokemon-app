import Image from "next/image";
import PokemonList from "./components/PokemonList";

export default function Home() {
  return (
    <section className="w-screen">
      <section className="mx-auto max-w-7xl p-4">
        <h2 className="font-bold text-xl text-green-900 pb-4">
          Welcome to the pokemon app!
        </h2>
        <PokemonList />
      </section>
    </section>
  );
}
