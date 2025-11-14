import { folderApi } from '@/features/folders/api/folderStorage';
import { globalStyles } from '@/styles/globals';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, TextInput, View } from 'react-native';

export default function NewFolder() {
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Folder name is required');
      return;
    }
    try {
      await folderApi.create(name);
      router.back();
    } catch (e: any) {
      Alert.alert('Error', e.message);
    }
  };

  return (
    <View style={globalStyles.container}>
      <TextInput
        placeholder="Folder name"
        value={name}
        onChangeText={(txt)=>setName(txt)}
        style={{ ...globalStyles.item, fontSize: 18 }}
        autoFocus
        onSubmitEditing={handleSave}
      />
    </View>
  );
}