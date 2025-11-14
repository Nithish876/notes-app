import { useEffect, useState } from 'react';
import { noteApi } from '../api/noteStorage';
import { Note } from '../types';

export const useNotes = (folderId: string) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    const list = await noteApi.list(folderId);
    setNotes(list);
    setLoading(false);
  };

  useEffect(() => {
    if (folderId) refresh();
  }, [folderId]);

  return { notes, loading, refresh };
};