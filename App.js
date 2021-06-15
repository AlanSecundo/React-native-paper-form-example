import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput, Button } from "react-native-paper";

export default function App() {

  const [name, setName] = useState('');

  const changeNameInput = value => {
    setName(value);
  }

  return (
    <View style={styles.container}>
      <TextInput 
        label="Primeiro nome"
        value={name}
        onChangeText={changeNameInput}
      />
      <Button 
        mode="contained"
        onPress={() => console.log(name)}>
        Enviar Informações
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
