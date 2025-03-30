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
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
const image1 = {
  uri: "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/087933cd6602ba9437e981dacc320608",
};

export default function Criar() {
  return (
    <ImageBackground source={image1} style={x.imagefundo}>
      <KeyboardAvoidingView behavior="height" enabled>
        <View style={x.criar}>
          <View>
            <View>
              <View>
                <Text style={x.ali}>Criar Conta</Text>
              </View>
              <View>
                <Pressable onPress={() => router.back()}>
                  <Ionicons
                    name="arrow-back"
                    size={24}
                    color="black"
                    style={x.al}
                  />
                </Pressable>
              </View>
              <TextInput placeholder="Usuário" style={x.text} />
            </View>
            <TextInput placeholder="Nome Completo" style={x.text} />
          </View>
          <View>
            <TextInput placeholder="Email" style={x.text} />
          </View>
          <View>
            <TextInput placeholder="Senha" style={x.text} />
          </View>
          <TouchableOpacity style={x.bota}>
            <Text style={x.botatext}> ACESSAR </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const x = StyleSheet.create({
  imagefundo: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    marginTop: "-5%",
  },
  criar: {
    backgroundColor: "#fcfdff",
    marginTop: "50%",
    height: "70%",
    right: "14%",
    width: "90%",
    marginLeft: "19%",
    marginRight: "40%",
    borderRadius: 30,
    padding: 20,
  },
  text: {
    fontSize: 24,
    marginTop: 62,
    marginLeft: 10,
    borderWidth: 5,
    borderRadius: 20,
    marginBottom: -40,
  },

  ali: {
    backgroundColor: "#fcfdff",
    marginTop: -188,
    marginLeft: "-56%",
    marginRight: "8%",
    fontSize: 55,
    fontWeight: "bold",
    width: "696%",
    paddingLeft: 250,
  },
  al: {
    backgroundColor: "rgba(12, 12, 12, 0.55)",
    marginTop: -175,
    marginLeft: "-85%",
    marginRight: "8%",
    fontSize: 55,
    fontWeight: "bold",
    width: "696%",
    paddingLeft: 250,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  key: {
    flex: 1,
  },
  bota: {
    backgroundColor: "#006400",
    height: "14%",
    width: "70%",
    left: "1%",
    borderRadius: 120,
    marginTop: 80,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 50,
  },
  botatext: {
    color: "#fff",
    fontSize: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
