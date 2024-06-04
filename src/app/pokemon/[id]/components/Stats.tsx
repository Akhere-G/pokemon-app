import { capitalise } from "@/app/services/utils";

interface Stat {
  base_stat: number;
  stat: {
    name: string;
  };
}
export default function Stats({ stats }: { stats: Stat[] }) {
  return (
    <div className="flex justify-center md:justify-between gap-2 flex-wrap items-center mb-4">
      {stats.map(({ stat, base_stat }) => (
        <div
          className="text-center rounded-full border-4 p-4 w-36 h-36 flex items-center justify-center flex-col gap-4"
          key={stat.name}
        >
          <p>{stat.name.split("-").map(capitalise).join(" ")}</p>
          <p>{base_stat}</p>
        </div>
      ))}
    </div>
  );
}
