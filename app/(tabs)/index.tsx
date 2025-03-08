import { useState } from "react";

import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
} from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import Zocial from "@expo/vector-icons/Zocial";
import Entypo from "@expo/vector-icons/Entypo";

const image1 = {
  uri: "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9a6a22ea96151cafd3292e41d6c79f06",
};

export default function Index() {
  const [olho, setOlho] = useState("");
  const [ver, setver] = useState(true);

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
                  color="	#363636"
                  style={x.localico}
                />

                <TextInput placeholder="Usuário" style={x.marg} />
              </View>
              <View style={x.icone1}>
                <Zocial
                  name="gmail"
                  size={24}
                  color="black"
                  style={x.localico}
                />
                <TextInput placeholder="exemplo@gmail.com" style={x.marg} />
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
              <View>
                <TouchableOpacity onPress={() => setver(!ver)}>
                  <Entypo name="eye" size={32} color="black" style={x.olho} />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity>
                  <Text style={x.esquesenh}> Esqueci a senha </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={x.corbotao}>
                <Text style={x.botaotext}> ACESSSAR </Text>
              </TouchableOpacity>
              <Text style={x.criarcont}> Não tem conta?</Text>

              <TouchableOpacity>
                <Text style={x.criacont}> Criar conta </Text>
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
    color: "black", // color das caracteres
    fontSize: 13, // tmanho dos caracteres
    marginBottom: 5, // serve para dar espaçamento
    //borderWidth: 0.5, // serve para borda
    borderBottomColor: "#363636", // para dar cor da borda
    padding: 18, // espaçamento das caracteres e a borda
    flexDirection: "row",
  },
  corbotao: {
    flex: 0,
    backgroundColor: "#006400",
    alignItems: "center",
    justifyContent: "center",
    height: "8%",
    width: "100%",
    left: "1%",
    borderRadius: 120,
    marginTop: 30,
  },
  botaotext: {
    color: "#fff",
    fontSize: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  org: {
    backgroundColor: "transparent",
    marginTop: "110%",
    height: "40%",
    right: "9%",
    width: "80%",
    marginVertical: "190%",
    marginHorizontal: 70,
  },
  key: {
    flex: 1,
  },
  icone1: {
    flexDirection: "row",
    borderWidth: 1.9,
  },
  localico: {
    marginTop: 20,
    left: "87%",
  },
  olho: {
    marginTop: -47,
    left: "86%",
  },
  esquesenh: {
    left: "66%",
    color: "blue",
    marginTop: 9,
  },
  criarcont: {
    marginTop: 30,
    left: "24%",
    fontSize: 14,
    alignItems: "center",
  },
  criacont: {
    left: "67%",
    color: "blue",
    marginTop: -22,
    alignItems: "center",
  },
});
