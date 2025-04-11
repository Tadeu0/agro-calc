import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Zocial from "@expo/vector-icons/Zocial";
import Entypo from "@expo/vector-icons/Entypo";
import { useForm, Controller } from "react-hook-form";
import { router } from "expo-router";

import { Link } from "expo-router";

const image1 = {
  uri: "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9a6a22ea96151cafd3292e41d6c79f06",
};

export default function Index() {
  const [ver, setVer] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      usuario: "",
      senha: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Dados:", data);
  };

  return (
    <ImageBackground source={image1} style={x.fundo}>
      <View style={x.coles}>
        <KeyboardAvoidingView style={x.key}>
          <View style={x.org}>
            <View style={x.icone1}>
              <FontAwesome
                name="user"
                size={28}
                color="#363636"
                style={x.localico}
              />
              <Controller
                control={control}
                name="usuario"
                rules={{
                  required: "Campo  obrigatório",
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[\d\W]).{6,}$/,
                    message:
                      "usuario deve ter pelo menos uma letra maiúscula e pelo menos 6 caracteristicas com simbolos",
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Usuário"
                    style={x.marg}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
            </View>
            {errors.usuario && (
              <Text style={x.erro}>{errors.usuario.message}</Text>
            )}

            <View style={x.icone1}>
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
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Senha"
                    style={x.marg}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    secureTextEntry={ver}
                  />
                )}
              />
              <TouchableOpacity onPress={() => setVer(!ver)}>
                <FontAwesome
                  name={ver ? "eye-slash" : "eye"}
                  size={28}
                  color="black"
                  style={x.olho}
                />
              </TouchableOpacity>
            </View>
            {errors.senha && <Text style={x.erro}>{errors.senha.message}</Text>}

            <TouchableOpacity>
              <Text style={x.esquesenh}>Esqueci a senha</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={x.corbotao}
              onPress={handleSubmit(onSubmit)}
              activeOpacity={0.8}
            >
              <Text style={x.botaotext}>ACESSAR</Text>
            </TouchableOpacity>

            <Text style={x.criarcont}>Não tem conta?</Text>
            <TouchableOpacity>
              <Link href="/criar" style={x.criacont}>
                Criar conta
              </Link>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
}

const x = StyleSheet.create({
  fundo: {
    flex: 1,
    resizeMode: "cover",
  },
  coles: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 25,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  key: {
    flex: 1,
    justifyContent: "center",
  },
  org: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 15,
    elevation: 10,
    marginTop: 360,
    height: -80,
  },
  icone1: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: -25,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 60,
  },
  localico: {
    marginRight: 10,
  },
  marg: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  olho: {
    marginLeft: 10,
  },
  esquesenh: {
    textAlign: "right",
    color: "blue",
    marginBottom: 35,
    marginTop: 50,
  },
  corbotao: {
    backgroundColor: "#006400",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 5,
  },
  botaotext: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  criarcont: {
    textAlign: "center",
    color: "#444",
    marginTop: 10,
    right: 45,
    fontSize: 16,
  },
  criacont: {
    textAlign: "center",
    color: "blue",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: -23,
    left: 75,
  },
  erro: {
    color: "#B22222",
    fontSize: 14,
    marginTop: 20,
    marginBottom: -10,
    marginLeft: 5,
    fontStyle: "italic",
  },
});
