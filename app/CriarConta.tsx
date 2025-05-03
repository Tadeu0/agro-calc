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

    router.push("./inicio");
  };
  return (
    <ImageBackground source={image1} style={x.fundo}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={x.criar}
      >
        <View style={x.estrutura}>
          <Pressable onPress={() => router.back()} style={x.backButton}>
            <Ionicons name="arrow-back" size={28} color="black" />
          </Pressable>
          <Text style={x.titulo}>Criar Conta</Text>

          <Controller
            control={control}
            name="usuario"
            rules={{
              required: "Usuário é obrigatório",
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[\d\W]).{6,}$/,
                message:
                  "Usuário deve ter pelo menos 6 caracteres, uma letra maiúscula e um número ou símbolo",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <View style={x.espaco}>
                <TextInput
                  placeholder="Usuário"
                  style={[x.input, errors.usuario && x.inputError]}
                  value={value}
                  onChangeText={onChange}
                  autoCapitalize="none"
                />
                <FontAwesome name="user-o" size={22} style={x.icon} />
                {errors.usuario && (
                  <Text style={x.errorText}>{errors.usuario.message}</Text>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            name="nome"
            rules={{ required: "Nome é obrigatório" }}
            render={({ field: { onChange, value } }) => (
              <View style={x.espaco}>
                <TextInput
                  placeholder="Nome Completo"
                  style={[x.input, errors.nome && x.inputError]}
                  value={value}
                  onChangeText={onChange}
                />
                <Feather name="user" size={22} style={x.icon} />
                {errors.nome && (
                  <Text style={x.errorText}>{errors.nome.message}</Text>
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
              <View style={x.espaco}>
                <TextInput
                  placeholder="Email"
                  style={[x.input, errors.email && x.inputError]}
                  value={value}
                  onChangeText={onChange}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <Zocial name="gmail" size={22} style={x.icon} />
                {errors.email && (
                  <Text style={x.errorText}>{errors.email.message}</Text>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            name="senha"
            rules={{
              required: "Senha é obrigatória",
              minLength: {
                value: 6,
                message: "Senha deve ter pelo menos 6 caracteres",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <View style={x.espaco}>
                <TextInput
                  placeholder="Senha"
                  style={[x.input, errors.senha && x.inputError]}
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry={ver}
                  autoCapitalize="none"
                />
                <TouchableOpacity onPress={() => setVer(!ver)} style={x.icon}>
                  <FontAwesome name={ver ? "eye-slash" : "eye"} size={22} />
                </TouchableOpacity>
                {errors.senha && (
                  <Text style={x.errorText}>{errors.senha.message}</Text>
                )}
              </View>
            )}
          />

          <TouchableOpacity style={x.button} onPress={handleSubmit(onSubmit)}>
            <Text style={x.buttonText}>CRIAR CONTA</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const x = StyleSheet.create({
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
