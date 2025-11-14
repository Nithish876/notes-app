import { globalStyles } from "@/styles/globals";
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface FabProps {
  onPress: () => void;
  label?: string;
}

export const Fab = ({ onPress, label = '+' }: FabProps) => (
  <TouchableOpacity style={globalStyles.fab} onPress={onPress}>
    <Text style={globalStyles.fabIcon}>{label}</Text>
  </TouchableOpacity>
);