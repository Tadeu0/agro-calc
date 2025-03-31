import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
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
  const [erro, setErro] = useState(null);

  return (
    <ImageBackground source={image1} style={x.imagefundo}>
      <View style={x.coles}>
        <KeyboardAvoidingView behavior="padding" style={x.key}>
          <View>
            <View style={x.org}>
              <View style={x.icone1}>
                <FontAwesome
                  name="user"
                  size={28}
                  color="#363636"
                  style={x.localico}
                />
                <TextInput placeholder="Usuário" style={x.marg} />
              </View>

              <View style={x.icone1}>
                <TextInput
                  placeholder="Senha"
                  style={x.marg}
                  value={olho}
                  onChangeText={(texto) => setOlho(texto)}
                  secureTextEntry={ver}
                />
              </View>
              <TouchableOpacity onPress={() => setVer(!ver)}>
                {ver ? (
                  <FontAwesome
                    name="eye"
                    size={32}
                    color="black"
                    style={x.olho}
                  />
                ) : (
                  <Entypo
                    name="eye-with-line"
                    size={24}
                    color="black"
                    style={x.olho}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity>
                <Text style={x.esquesenh}> Esqueci a senha </Text>
              </TouchableOpacity>
              <TouchableOpacity style={x.corbotao}>
                <Text style={x.botaotext}> ACESSAR </Text>
              </TouchableOpacity>
              <Text style={x.criarcont}> Não tem conta?</Text>
              <TouchableOpacity>
                <Link href="/criar" style={x.criacont}>
                  Criar conta
                </Link>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
}

const x = StyleSheet.create({
  imagefundo: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    marginTop: "1%",
  },
  coles: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  marg: {
    color: "black",
    fontSize: 26,
    marginBottom: 15,
    borderBottomColor: "#363636",
    padding: 8,

    borderRadius: 40,
  },
  corbotao: {
    backgroundColor: "#006400",
    alignItems: "center",
    justifyContent: "center",
    height: "8%",
    width: "100%",
    left: "1%",
    borderRadius: 120,
    marginTop: 20,
    elevation: 17,
  },
  botaotext: {
    color: "#fff",
    fontSize: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  org: {
    backgroundColor: "transparent",
    marginTop: 328,
    height: "70%",
    right: "14%",
    width: "90%",
    marginLeft: "19%",
    marginRight: "40%",
    padding: 20,
  },
  key: {
    flex: 1,
  },
  icone1: {
    flexDirection: "row",
    borderWidth: 4,
    borderRadius: 50,
    marginBottom: 20,
  },
  localico: {
    marginTop: 20,
    left: "87%",
  },
  olho: {
    marginTop: -67,
    left: "86%",
    width: 30,
  },
  esquesenh: {
    left: "60%",
    color: "blue",
    marginTop: 9,
    fontSize: 20,
  },
  criarcont: {
    marginTop: 18,
    left: "15%",
    fontSize: 24,
    alignItems: "center",
  },
  criacont: {
    left: "65%",
    color: "blue",
    marginTop: -33,
    alignItems: "center",
    fontSize: 24,
  },
});
