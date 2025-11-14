import { Note } from '@/features/notes/types';
import { globalStyles } from '@/styles/globals';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface Props {
  note: Note;
  onPress: () => void;
  onLongPress:() => void;
}

export const NoteCard = ({ note, onPress ,onLongPress}: Props) => (
  <TouchableOpacity style={globalStyles.item} onPress={onPress} onLongPress={onLongPress}>
    <Text style={globalStyles.title}>{note.title}</Text>
    {note.content ? (
      <Text numberOfLines={2} style={globalStyles.subtitle}>
        {note.content}
      </Text>
    ) : (
      <Text style={[globalStyles.subtitle, { fontStyle: 'italic' }]}>No content</Text>
    )}
  </TouchableOpacity>
);