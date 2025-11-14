import { storage } from '@/utils/storage';
import { uuidv4 } from '@/utils/uuid';
import Constants from "../../../constants/keys";
import { Note, NoteSchema } from '../types';

const notesKey = (folderId: string) => `${Constants.STORAGE.NOTES_PREFIX}${folderId}`;

export const noteApi = {
  async list(folderId: string): Promise<Note[]> {
    const raw = await storage.get<Note[]>(notesKey(folderId));
    return raw ?? [];
  },

  async create(folderId: string, title: string, content = ''): Promise<Note> {
    const notes = await noteApi.list(folderId);
    const now = new Date().toISOString();
    const note: Note = {
      id: uuidv4(),
      folderId,
      title: title.trim(),
      content,
      createdAt: now,
      updatedAt: now,
    };
    notes.push(note);
    await storage.set(notesKey(folderId), notes);
    return note;
  },

  async update(id: string, folderId: string, updates: Partial<Pick<Note, 'title' | 'content'>>): Promise<Note> {
    const notes = await noteApi.list(folderId);
    const idx = notes.findIndex((n) => n.id === id);
    if (idx === -1) throw new Error('Note not found');

    const updated = {
      ...notes[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    NoteSchema.parse(updated);
    notes[idx] = updated;
    await storage.set(notesKey(folderId), notes);
    return updated;
  },

  async delete(id: string, folderId: string): Promise<void> {
    const notes = await noteApi.list(folderId);
    const filtered = notes.filter((n) => n.id !== id);
    await storage.set(notesKey(folderId), filtered);
  },

  async deleteByFolder(folderId: string): Promise<void> {
    await storage.remove(notesKey(folderId));
  },
};