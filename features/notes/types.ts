import { z } from 'zod';

export const NoteSchema = z.object({
  id: z.string().uuid(),
  folderId: z.string().uuid(),
  title: z.string().min(1).max(100),
  content: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Note = z.infer<typeof NoteSchema>;