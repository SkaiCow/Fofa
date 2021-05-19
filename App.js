import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import NavBar from './modules/NavBar.js'
import PageManager from './managers/PageManager.js'

export default function App() {
  return (
    <View style={styles.container}>
      <NavBar/>
      <PageManager/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
