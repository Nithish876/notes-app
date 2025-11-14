import { Fab } from '@/components/Fab';
import { NoteCard } from '@/components/NoteCard';
import { noteApi } from '@/features/notes/api/noteStorage';
import { useNotes } from '@/features/notes/hooks/useNotes';
import { globalStyles } from '@/styles/globals';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Alert, FlatList, Text, View } from 'react-native';

export default function FolderScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { notes, loading, refresh } = useNotes(id);
  const router = useRouter();
 
  const handleDelete = (noteId: string) => {
    Alert.alert('Delete Note', 'Are you sure?', [
      { text: 'Cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await noteApi.delete(noteId, id);
          refresh();
        },
      },
    ]);
  };

  return (
    <View style={globalStyles.container}>
      <FlatList
        data={notes}
        keyExtractor={(i) => i.id}
        refreshing={loading}
        onRefresh={refresh}
        renderItem={({ item }) => (
          // @ts-ignore
          <Link href={`/note/${item.id}?folderId=${id}`} asChild>
            <NoteCard onLongPress={()=>handleDelete(item.id)} note={item} onPress={() => {}} />
          </Link>
        )}
        ListEmptyComponent={<Text style={globalStyles.empty}>No notes yet</Text>}
      />
      <Link href={`/note/new?folderId=${id}`} asChild>
        <Fab onPress={()=>{
          
        }} />
      </Link>
    </View>
  );
}