import axios from "axios";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput, Button, Snackbar } from "react-native-paper";

export default function App() {
  const initialState = {
    name: "",
    lastName: "",
    age: "",
    password: "",
    confirmPassword: "",
    visible: false,
    hasError: false,
    id: "",
    snackbarMessage: "Suas senhas não conferem, verifique",
  };

  const [state, setState] = useState(initialState);

  const handleChange = (value, target) => {
    setState((state) => ({ ...state, [target]: value }));
  };

  const postUser = () => {
    if (state.password !== state.confirmPassword) {
      handleChange(true, "visible");
      handleChange(true, "hasError");
      return;
    }

    handleChange(false, "hasError");
    axios
      .post("https://crudcrud.com/api/0bf7c7bb18494bc0ba9d018a2e1f29da/user", {
        name: state.name,
        lastName: state.lastName,
        age: state.age,
        password: state.password,
      })
      .then((response) => {
        handleChange("Usuário salvo com sucesso!", "snackbarMessage");
        handleChange(true, "visible");
        handleChange(response.data._id, "id");
      });
  };

  const putUser = () => {
    axios
      .put(
        `https://crudcrud.com/api/0bf7c7bb18494bc0ba9d018a2e1f29da/user/${state.id}`,
        {
          name: state.name,
          lastName: state.lastName,
          age: state.age,
          password: state.password,
        }
      )
      .then((response) => {
        handleChange("Usuário editado com sucesso!", "snackbarMessage");
        handleChange(true, "visible");
      });
  };

  const deleteUser = () => {
    axios
      .delete(
        `https://crudcrud.com/api/0bf7c7bb18494bc0ba9d018a2e1f29da/user/${state.id}`
      )
      .then((response) => {
        setState(initialState);
        handleChange("Usuário apagado com sucesso!", "snackbarMessage");
        handleChange(true, "visible");
      });
  };

  const onDismissSnackBar = () => {
    handleChange(false, "visible");
  };

  return (
    <View style={styles.container}>
      <Text>Cadastro</Text>
      <TextInput
        style={styles.marginTop}
        label="Primeiro nome"
        placeholder="Digite seu nome"
        value={state.name}
        onChangeText={(text) => handleChange(text, "name")}
      />
      <TextInput
        label="Sobrenome"
        style={styles.marginTop}
        placeholder="Digite seu sobrenome"
        value={state.lastName}
        onChangeText={(text) => handleChange(text, "lastName")}
      />
      <TextInput
        label="Idade"
        style={styles.marginTop}
        placeholder="Digite sua idade"
        value={state.age}
        onChangeText={(text) => handleChange(text, "age")}
      />
      <TextInput
        label="Senha"
        style={styles.marginTop}
        placeholder="Digite sua senha"
        value={state.password}
        onChangeText={(text) => handleChange(text, "password")}
        secureTextEntry
        error={state.hasError}
      />
      <TextInput
        label="Confirmação de senha"
        style={styles.marginTop}
        placeholder="Confirme sua senha"
        value={state.confirmPassword}
        onChangeText={(text) => handleChange(text, "confirmPassword")}
        secureTextEntry
        error={state.hasError}
      />
      <Button
        mode="contained"
        style={styles.marginTop}
        onPress={state.id ? putUser : postUser}
      >
        {state.id ? "PUT user" : "POST user"}
      </Button>
      {state.id && (
        <Button mode="contained" style={styles.marginTop} onPress={deleteUser}>
          DELETE user
        </Button>
      )}
      <Snackbar
        visible={state.visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: "Fechar",
          onPress: () => {},
        }}
      >
        {state.snackbarMessage}
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
