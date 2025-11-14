import { z } from 'zod';

export const FolderSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(50),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Folder = z.infer<typeof FolderSchema>;