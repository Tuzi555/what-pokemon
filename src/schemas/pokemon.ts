import { z } from 'zod';

export const Pokemon = z.object({
    name: z.string(),
    sprites: z.object({
        front_default: z.string(),
    }),
});

export type Pokemon = z.infer<typeof Pokemon>;
