import { folderApi } from '@/features/folders/api/folderStorage';
import { noteApi } from '@/features/notes/api/noteStorage';
import { File, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export interface BackupData {
  version: '1.0';
  exportedAt: string;
  folders: Awaited<ReturnType<typeof folderApi.list>>;
  notes: Record<string, Awaited<ReturnType<typeof noteApi.list>>>;
}

// EXPORT: Use Paths.document + new File API
export const exportBackup = async (): Promise<void> => {
  const folders = await folderApi.list();
  const notes: BackupData['notes'] = {};

  for (const f of folders) {
    notes[f.id] = await noteApi.list(f.id);
  }

  const backup: BackupData = {
    version: '1.0',
    exportedAt: new Date().toISOString(),
    folders,
    notes,
  };

  // Use Paths.document (stable for sharing)
  const fileName = `notes-backup-${Date.now()}.json`;
  const dir = Paths.document;
  const file = new File(dir, fileName);

  try { 
      file.create(); 
      file.write(JSON.stringify(backup, null, 2));
  } catch (error) {
    console.error('File write failed:', error);
    throw new Error(`Export failed: ${error}`);
  }

  // Get the full URI for sharing
  const fileUri = file.uri;
  await Sharing.shareAsync(fileUri, {
    mimeType: 'application/json',
    dialogTitle: 'Export Notes Backup',
  });
};

// IMPORT: Use new File API + DocumentPicker
export const importBackup = async (uri: string): Promise<void> => {
  let file: File;
  try {
    file = new File(uri);
    file.exists;  
  } catch (error) {
    throw new Error('Invalid or inaccessible backup file');
  }

  let raw: string;
  try {
     
    raw = await file.text();
  } catch (error) {
    console.error('File read failed:', error);
    throw new Error('Failed to read backup file');
  }

  let data: BackupData;
  try {
    data = JSON.parse(raw);
  } catch {
    throw new Error('Invalid backup file format (not JSON)');
  }

  if (data.version !== '1.0') {
    throw new Error(`Unsupported backup version: ${data.version}`);
  }

  // Clear existing data
  const existingFolders = await folderApi.list();
  for (const f of existingFolders) {
    await folderApi.delete(f.id);
  }

  // Restore folders and notes
  for (const f of data.folders) {
    const folder = await folderApi.create(f.name);
    const folderNotes = data.notes[f.id] ?? [];
    for (const n of folderNotes) {
      await noteApi.create(folder.id, n.title, n.content);
    }
  }
};