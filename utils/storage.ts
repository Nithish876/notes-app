import AsyncStorage from '@react-native-async-storage/async-storage';
import { z } from 'zod';

/** Generic safe JSON storage */
export const storage = {
  async get<T>(key: string, schema?: z.ZodType<T>): Promise<T | null> {
    try {
      const raw = await AsyncStorage.getItem(key);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return schema ? schema.parse(parsed) : parsed;
    } catch {
      return null;
    }
  },

  async set<T>(key: string, value: T): Promise<void> {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },

  async remove(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  },
};