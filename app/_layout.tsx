import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { useColorScheme } from "react-native";

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName="(tabs)">
        <Stack.Screen name="(tabs)"  options={{ headerTitle:"Notes"}} />
        <Stack.Screen name="note/[id]" options={{ title:"test" }} />
        <Stack.Screen name="folder/[id]" options={{ headerTitle:"test",headerTitleAlign:"center" }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
