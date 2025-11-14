import { noteApi } from '@/features/notes/api/noteStorage';
import { Note } from '@/features/notes/types';
import { globalStyles } from '@/styles/globals';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { TextInput, View } from 'react-native';

export default function EditNote() {
  const { id, folderId } = useLocalSearchParams<{ id: string; folderId: string }>();
  const [note, setNote] = useState<Note | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const notes = await noteApi.list(folderId);
      const found = notes.find((n) => n.id === id);
      if (found) setNote(found);
    })();
  }, [id, folderId]);

  const handleSave = async () => {
    if (!note) return;
    await noteApi.update(id, folderId, { title: note.title, content: note.content });
    router.back();
  };

  if (!note) return null;

  return (
    <View style={globalStyles.container}>
      <TextInput
        value={note.title}
        onChangeText={(t) => setNote({ ...note, title: t })}
        style={{ ...globalStyles.item, fontSize: 20, fontWeight: 'bold' }}
      />
      <TextInput
        value={note.content}
        onChangeText={(c) => setNote({ ...note, content: c })}
        multiline
        style={{ flex: 1, ...globalStyles.item, textAlignVertical: 'top', paddingTop: 16 }}
        onSubmitEditing={handleSave}
      />
    </View>
  );
}