import { ExportButton } from '@/components/ExportButton';
import { Fab } from '@/components/Fab';
import { FolderItem } from '@/components/FolderItem';
import { folderApi } from '@/features/folders/api/folderStorage';
import { useFolders } from '@/features/folders/hooks/useFolders';
import { globalStyles } from '@/styles/globals';
import { Link } from 'expo-router';
import React from 'react';
import { Alert, FlatList, Text, View } from 'react-native';

export default function Home() {
  const { folders, loading, refresh } = useFolders();

  const handleDelete = async (id: string) => {
    Alert.alert('Delete Folder', 'This will delete all notes inside.', [
      { text: 'Cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await folderApi.delete(id);
          refresh();
        },
      },
    ]);
  };

  return (
    <View style={globalStyles.container}>
      <ExportButton onRefresh={refresh} />
      <FlatList
        data={folders}
        keyExtractor={(i) => i.id}
        refreshing={loading}
        onRefresh={refresh}
        renderItem={({ item }) => (
          <Link href={`/folder/${item.id}`} asChild>
            <FolderItem onLongPress={()=>handleDelete(item.id)} folder={item} onPress={() => {}} />
          </Link>
        )}
        ListEmptyComponent={<Text style={globalStyles.empty}>No folders. Create one!</Text>}
      />
      <Link href="/folder/new" asChild>
        <Fab  onPress={()=>{}}/>
      </Link>
    </View>
  );
}