import { noteApi } from '@/features/notes/api/noteStorage';
import { storage } from '@/utils/storage';
import { uuidv4 } from '@/utils/uuid';
import Constants from "../../../constants/keys";
import { Folder, FolderSchema } from '../types';

const FOLDERS_KEY = Constants.STORAGE.FOLDERS;

export const folderApi = {
  async list(): Promise<Folder[]> {
    const raw = await storage.get<Folder[]>(FOLDERS_KEY);
    return raw ?? [];
  },

  async create(name: string): Promise<Folder> {
    const folders = await folderApi.list();
    const now = new Date().toISOString();
    const folder: Folder = {
      id: uuidv4(),
      name: name.trim(),
      createdAt: now,
      updatedAt: now,
    };
    folders.push(folder);
    await storage.set(FOLDERS_KEY, folders);
    return folder;
  },

  async update(id: string, updates: Partial<Pick<Folder, 'name'>>): Promise<Folder> {
    const folders = await folderApi.list();
    const idx = folders.findIndex((f) => f.id === id);
    if (idx === -1) throw new Error('Folder not found');

    const updated = {
      ...folders[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    FolderSchema.parse(updated);
    folders[idx] = updated;
    await storage.set(FOLDERS_KEY, folders);
    return updated;
  },

  async delete(id: string): Promise<void> {
    const folders = await folderApi.list();
    const filtered = folders.filter((f) => f.id !== id);
    await storage.set(FOLDERS_KEY, filtered);
    await noteApi.deleteByFolder(id);
  },
};