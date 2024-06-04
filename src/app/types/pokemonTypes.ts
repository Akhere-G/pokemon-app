import { version } from "os";
import { z } from "zod";

export const LinkSchema = z.object({ name: z.string(), url: z.string() });
export const PokemonListSchema = z.object({
  count: z.number(),
  next: z.string().optional(),
  previous: z.string().optional(),
  results: z.array(z.object({ name: z.string(), url: z.string() })),
});

export type PokemonList = z.infer<typeof PokemonListSchema>;

export const PokemonSchema = z.object({
  abilities: z.array(z.object({ ability: z.object({ name: z.string() }) })),
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

const FlavourTextEntrySchema = z.object({
  flavor_text: z.string(),
  language: LinkSchema,
  version: LinkSchema,
});

export type FlavorTextEntry = z.infer<typeof FlavourTextEntrySchema>;

export const PokemonSpeciesSchema = z.object({
  base_happiness: z.number(),
  capture_rate: z.number(),
  color: z.object({ name: z.string() }),
  evolves_from_species: z.object({ name: z.string(), url: z.string() }),
  flavor_text_entries: z.array(FlavourTextEntrySchema),
  genera: z.array(z.object({ genus: z.string(), language: LinkSchema })),
  is_baby: z.boolean(),
  is_legendary: z.boolean(),
  is_mythical: z.boolean(),
});

export type PokemonSpecies = z.infer<typeof PokemonSpeciesSchema>;
