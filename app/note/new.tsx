import { Fab } from '@/components/Fab';
import { noteApi } from '@/features/notes/api/noteStorage';
import { globalStyles } from '@/styles/globals';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, TextInput, View } from 'react-native';

export default function NewNote() {
  const { folderId } = useLocalSearchParams<{ folderId: string }>();
  console.log("Folder Id : ",folderId)
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Title is required');
      return;
    }
    await noteApi.create(folderId, title, content);
    router.back();
  };

  return (
    <View style={globalStyles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={{ ...globalStyles.item, fontSize: 20, fontWeight: 'bold' }}
        autoFocus
      />
      <TextInput
        placeholder="Start typing..."
        value={content}
        onChangeText={setContent}
        multiline
        style={{ flex: 1, ...globalStyles.item, textAlignVertical: 'top', paddingTop: 16 }}
        onSubmitEditing={handleSave}
      />
      <Fab label='✓' onPress={handleSave} />
    </View>
  );
}