import Image from "next/image";
import { capitalise, getFrontImage } from "../services/utils";
import Link from "next/link";

export default function PokemonCard({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  return (
    <Link
      href={`/pokemon/${id}`}
      className="transition-colors hover:transition-colors hover:text-green-800 bg-white shadow-md rounded-md p-4 flex flex-col items-center"
    >
      <div>
        <Image
          src={getFrontImage(id)}
          alt={`iamge of pokemon ${name}`}
          width={150}
          height={150}
        />
      </div>
      <p>{capitalise(name)}</p>
    </Link>
  );
}
