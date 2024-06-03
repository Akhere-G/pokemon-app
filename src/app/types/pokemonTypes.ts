import { z } from "zod";

export const PokemonListSchema = z.object({
  count: z.number(),
  next: z.string().optional(),
  previous: z.string().optional(),
  results: z.array(z.object({ name: z.string(), url: z.string() })),
});

export type PokemonList = z.infer<typeof PokemonListSchema>;

export const PokemonSchema = z.object({
  abilities: z.array(z.object({ name: z.string(), url: z.string() })),
  cries: z.object({ latest: z.string() }),
  id: z.number(),
  name: z.string(),
  sprites: z.object({
    front_default: z.string(),
    back_default: z.string(),
  }),
  stats: z.array(
    z.object({
      base_stat: z.number(),
      stat: z.object({ name: z.string() }),
    })
  ),
  types: z.array(z.object({ type: z.object({ name: z.string() }) })),
});

export type Pokemon = z.infer<typeof PokemonSchema>;
