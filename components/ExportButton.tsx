import { exportBackup, importBackup } from '@/services/backup/backupService';
import { globalStyles } from '@/styles/globals';
import * as DocumentPicker from 'expo-document-picker';
import React from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  onRefresh: () => void;
}

export const ExportButton = ({ onRefresh }: Props) => { 
    const handleExport = async () => {
      try {
        await exportBackup();
        Alert.alert('Success', 'Backup exported successfully');
      } catch (e: any) {
        Alert.alert('Export Failed', e.message || 'Unknown error');
      }
    };
  
    const handleImport = async () => {
      try {
        const result = await DocumentPicker.getDocumentAsync({
          type: 'application/json',
          copyToCacheDirectory: true,
        });
  
        if (result.canceled || !result.assets?.[0]?.uri) {
          return; 
        }
  
        const uri = result.assets[0].uri;
        await importBackup(uri);  
        onRefresh();
        Alert.alert('Success', 'Backup restored successfully');
      } catch (e: any) {
        Alert.alert('Import Failed', e.message || 'Unknown error');
      }
    };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
      <TouchableOpacity style={globalStyles.btn} onPress={handleExport}>
        <Text>Export</Text>
      </TouchableOpacity>
      <TouchableOpacity style={globalStyles.btn} onPress={handleImport}>
        <Text>Import</Text>
      </TouchableOpacity>
    </View>
  );
};