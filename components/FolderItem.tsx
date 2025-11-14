import { Folder } from '@/features/folders/types';
import { globalStyles } from '@/styles/globals';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface Props {
  folder: Folder;
  onPress: () => void;
  onLongPress:() => void;
}

export const FolderItem = ({ folder, onPress,onLongPress }: Props) => (
  <TouchableOpacity style={globalStyles.item} onLongPress={onLongPress} onPress={onPress}>
    <Text style={globalStyles.title}>{folder.name}</Text>
    <Text style={globalStyles.subtitle}>
      {new Date(folder.updatedAt).toLocaleDateString()}
    </Text>
  </TouchableOpacity>
);