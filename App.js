import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput, Button, Snackbar } from "react-native-paper";

export default function App() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [hasError, setHasError] = useState(false);

  const changeNameInput = (value) => {
    setName(value);
  };

  const changeLastNameInput = (value) => {
    setLastName(value);
  };

  const changeAge = (value) => {
    setAge(value);
  };

  const changePassword = (value) => {
    setPassword(value);
  };
  const changeConfirmPassword = (value) => {
    setConfirmPassword(value);
  };

  const postUser = () => {
    if (password !== confirmPassword) {
      setVisible(true);
      setHasError(true);
      return;
    }

    setHasError(false);
    axios.post(
      "https://crudcrud.com/api/a555d0b58ac742e4a26f2c8be1741a60/usuario",
      {
        name: name,
        lastName: lastName,
        age: age,
        password: password,
      }
    );
  };

  const onDismissSnackBar = () => {
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.marginTop}
        label="Primeiro nome"
        placeholder="Digite seu nome"
        value={name}
        onChangeText={changeNameInput}
      />
      <TextInput
        label="Sobrenome"
        style={styles.marginTop}
        placeholder="Digite seu sobrenome"
        value={lastName}
        onChangeText={changeLastNameInput}
      />
      <TextInput
        label="Idade"
        style={styles.marginTop}
        placeholder="Digite sua idade"
        value={age}
        onChangeText={changeAge}
      />
      <TextInput
        label="Senha"
        style={styles.marginTop}
        placeholder="Digite sua senha"
        value={password}
        onChangeText={changePassword}
        secureTextEntry
        error={hasError}
      />
      <TextInput
        label="Confirmação de senha"
        style={styles.marginTop}
        placeholder="Confirme sua senha"
        value={confirmPassword}
        onChangeText={changeConfirmPassword}
        secureTextEntry
        error={hasError}
      />
      <Button mode="contained" style={styles.marginTop} onPress={postUser}>
        Enviar Informações
      </Button>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: "Fechar",
          onPress: () => {},
        }}
      >
        Suas senhas não conferem, verifique
      </Snackbar>
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
  marginTop: {
    marginTop: "10px",
  },
});
