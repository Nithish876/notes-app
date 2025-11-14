import { useEffect, useState } from 'react';
import { folderApi } from '../api/folderStorage';
import { Folder } from '../types';

export const useFolders = () => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    const list = await folderApi.list();
    setFolders(list);
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  return { folders, loading, refresh };
};