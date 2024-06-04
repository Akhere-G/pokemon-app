import { capitalise } from "@/app/services/utils";
import { FlavorTextEntry } from "@/app/types/pokemonTypes";

export default function FlavourTextEntries({
  entries,
  max = 5,
}: {
  entries: FlavorTextEntry[];
  max?: number;
}) {
  return (
    <div className="flex flex-col gap-5">
      {entries
        .filter((entry, i) => entry.language.name === "en" && i < max)
        .map((entry) => {
          return (
            <section key={entry.version.name} className="border-b-2">
              <p className="text-xl mb-1 text-green-900 font-semibold">
                {capitalise(entry.version.name)}
              </p>
              <p>{entry.flavor_text}</p>
            </section>
          );
        })}
    </div>
  );
}
