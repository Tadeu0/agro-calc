import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Pressable,
  Platform,
} from "react-native";
import { Ionicons, FontAwesome, Feather } from "@expo/vector-icons";
import Zocial from "@expo/vector-icons/Zocial";
import { useForm, Controller } from "react-hook-form";
import { router } from "expo-router";

const image1 = {
  uri: "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/087933cd6602ba9437e981dacc320608",
};

export default function Criar() {
  const [ver, setVer] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      usuario: "",
      nome: "",
      email: "",
      senha: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Dados:", data);
    router.push("/(tabs)/index");
  };

  return (
    <ImageBackground source={image1} style={styles.fundo}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.criar}
      >
        <View style={styles.estrutura}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={28} color="black" />
          </Pressable>
          <Text style={styles.titulo}>Criar Conta</Text>

          <Controller
            control={control}
            name="usuario"
            rules={{ required: "Usuário é obrigatório" }}
            render={({ field: { onChange, value } }) => (
              <View style={styles.espaco}>
                <TextInput
                  placeholder="Usuário"
                  style={[styles.input, errors.usuario && styles.inputError]}
                  value={value}
                  onChangeText={onChange}
                />
                <FontAwesome name="user-o" size={22} style={styles.icon} />
                {errors.usuario && (
                  <Text style={styles.errorText}>{errors.usuario.message}</Text>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            name="nome"
            rules={{ required: "Nome é obrigatório" }}
            render={({ field: { onChange, value } }) => (
              <View style={styles.espaco}>
                <TextInput
                  placeholder="Nome Completo"
                  style={[styles.input, errors.nome && styles.inputError]}
                  value={value}
                  onChangeText={onChange}
                />
                <Feather name="user" size={22} style={styles.icon} />
                {errors.nome && (
                  <Text style={styles.errorText}>{errors.nome.message}</Text>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            name="email"
            rules={{
              required: "Email obrigatório",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email inválido",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <View style={styles.espaco}>
                <TextInput
                  placeholder="Email"
                  style={[styles.input, errors.email && styles.inputError]}
                  value={value}
                  onChangeText={onChange}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <Zocial name="gmail" size={22} style={styles.icon} />
                {errors.email && (
                  <Text style={styles.errorText}>{errors.email.message}</Text>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            name="senha"
            rules={{ required: "Senha é obrigatória" }}
            render={({ field: { onChange, value } }) => (
              <View style={styles.espaco}>
                <TextInput
                  placeholder="Senha"
                  style={[styles.input, errors.senha && styles.inputError]}
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry={ver}
                />
                <TouchableOpacity
                  onPress={() => setVer(!ver)}
                  style={styles.icon}
                >
                  <FontAwesome name={ver ? "eye-slash" : "eye"} size={22} />
                </TouchableOpacity>
                {errors.senha && (
                  <Text style={styles.errorText}>{errors.senha.message}</Text>
                )}
              </View>
            )}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.buttonText}>CRIAR CONTA</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
  },
  criar: {
    flex: 1,
    justifyContent: "center",
  },
  estrutura: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 20,
    elevation: 10,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  titulo: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  espaco: {
    marginBottom: 26,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingRight: 45,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  inputError: {
    borderColor: "red",
  },
  icon: {
    position: "absolute",
    right: 15,
    top: 14,
  },
  errorText: {
    color: "red",
    marginTop: 5,
    fontSize: 13,
  },
  button: {
    backgroundColor: "#006400",
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
