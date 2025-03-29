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
import AntDesign from "@expo/vector-icons/AntDesign";

const image1 = {
  uri: "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/087933cd6602ba9437e981dacc320608",
};

export default function Criar() {
  return (
    <ImageBackground source={image1} style={x.imagefundo}>
      <View style={x.criar}>
        <View>
          <View>
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
      </View>
      <View style={x.sub}>
        <TouchableOpacity>
          <AntDesign name="leftcircle" size={24} color="black" style={x.al} />
        </TouchableOpacity>
        <Text style={x.ali}>CRIAR CONTA</Text>
      </View>
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
    marginTop: "65%",
    height: "60%",
    right: "14%",
    width: "90%",
    marginLeft: "19%",
    marginRight: "40%",
    borderRadius: 30,
  },
  text: {
    fontSize: 24,
    marginTop: 62,
    marginLeft: 10,
    borderWidth: 3,
    borderRadius: 40,
    marginBottom: -40,
  },
  sub: {
    backgroundColor: "#fcfdff",
    marginTop: "-248%",
    height: "60%",
    right: "14%",
    width: "190%",
    marginLeft: "10%",
    marginRight: "40%",
    borderRadius: 30,
  },
  ali: {
    marginTop: -42,
    marginLeft: "17%",
    fontSize: 38,
    fontWeight: "bold",
  },
  al: {
    marginTop: 378,
    marginLeft: "3%",
    fontSize: 38,
    fontWeight: "bold",
  },
});
