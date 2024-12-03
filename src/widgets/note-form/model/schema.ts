import { z } from "zod";

export const createNoteSchema = z.object({
  title: z
    .string()
    .min(3, "Название должно содержать минимум 3 символа")
    .max(50, "Название не должно превышать 50 символов"),
  completed: z.boolean().default(false),
});

export type TCreateNoteValues = z.infer<typeof createNoteSchema>;
