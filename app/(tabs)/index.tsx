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

import { Link } from "expo-router";

const image1 = {
  uri: "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9a6a22ea96151cafd3292e41d6c79f06",
};

export default function Index() {
  const [olho, setOlho] = useState("");
  const [ver, setVer] = useState(true);
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [login, setLogin] = useState(false);

  function verificador() {
    const sav = {
      usuario,
      senha,
    };
    console.log(sav);
  }

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
              <TextInput
                placeholder="Usuário"
                style={x.marg}
                value={usuario}
                onChangeText={setUsuario}
              />
            </View>

            <View style={x.icone1}>
              <TextInput
                placeholder="Senha"
                style={x.marg}
                value={senha}
                onChangeText={setSenha}
                secureTextEntry={ver}
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

            <TouchableOpacity>
              <Text style={x.esquesenh}>Esqueci a senha</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={x.corbotao}
              onPress={verificador}
              activeOpacity={0.8}
            >
              {login ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={x.botaotext}>ACESSAR</Text>
              )}
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
    padding: 20,
    borderRadius: 15,
    elevation: 5,
    marginTop: 300,
    height: -270,
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
    marginTop: 40,
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
    marginTop: -20,
    left: 55,
  },
});
