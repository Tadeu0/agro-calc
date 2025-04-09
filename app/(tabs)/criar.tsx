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
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import Zocial from "@expo/vector-icons/Zocial";
import { useForm, Controller } from "react-hook-form";

const image1 = {
  uri: "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/087933cd6602ba9437e981dacc320608",
};

export default function Criar() {
  const [ver, setVer] = useState(true);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    router.push("/inicio");
  };

  return (
    <ImageBackground source={image1} style={x.imagefundo}>
      <KeyboardAvoidingView behavior="height" enabled>
        <View style={x.criar}>
          <Text style={x.ali}>Criar Conta</Text>
          <TouchableOpacity>
            <Pressable onPress={() => router.back()}>
              <Ionicons
                name="arrow-back"
                size={32}
                color="black"
                style={x.al}
              />
            </Pressable>
          </TouchableOpacity>

          <Controller
            control={control}
            rules={{ required: "Campo obrigatório" }}
            render={({ field: { onChange, value } }) => (
              <View>
                <TextInput
                  placeholder="Usuário"
                  style={x.text}
                  value={value}
                  onChangeText={onChange}
                />
                <FontAwesome
                  name="user-o"
                  size={32}
                  color="black"
                  style={x.user}
                />
                {errors.usuario && (
                  <Text style={x.errorText}>
                    {errors.usuario.message?.toString()}
                  </Text>
                )}
              </View>
            )}
            name="usuario"
          />

          <Controller
            control={control}
            rules={{ required: "Campo obrigatório" }}
            render={({ field: { onChange, value } }) => (
              <View>
                <TextInput
                  placeholder="Nome Completo"
                  style={x.text}
                  value={value}
                  onChangeText={onChange}
                />
                <Feather name="user" size={32} color="black" style={x.user} />
                {errors.nome && (
                  <Text style={x.errorText}>
                    {errors.nome.message?.toString()}
                  </Text>
                )}
              </View>
            )}
            name="nome"
          />

          <Controller
            control={control}
            rules={{
              required: " Email obrigatório",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Email inválido",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <View>
                <TextInput
                  placeholder="Email"
                  style={x.text}
                  value={value}
                  onChangeText={onChange}
                />
                <Zocial name="gmail" size={32} color="black" style={x.user} />
                {errors.email && (
                  <Text style={x.errorText}>
                    {errors.email.message?.toString()}
                  </Text>
                )}
              </View>
            )}
            name="email"
          />

          <Controller
            control={control}
            rules={{ required: "Campo Senha é obrigatório" }}
            render={({ field: { onChange, value } }) => (
              <View>
                <TextInput
                  placeholder="Senha"
                  style={x.text}
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry={ver}
                />
                <TouchableOpacity onPress={() => setVer(!ver)}>
                  {ver ? (
                    <FontAwesome
                      name="eye-slash"
                      size={32}
                      color="black"
                      style={x.olho}
                    />
                  ) : (
                    <FontAwesome
                      name="eye"
                      size={32}
                      color="black"
                      style={x.olho}
                    />
                  )}
                </TouchableOpacity>
                {errors.senha && (
                  <Text style={x.errorText}>
                    {errors.senha.message?.toString()}
                  </Text>
                )}
              </View>
            )}
            name="senha"
          />

          <TouchableOpacity style={x.bota} onPress={handleSubmit(onSubmit)}>
            <Text style={x.botatext}>ACESSAR</Text>
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
    marginTop: "56%",
    height: "66%",
    right: "14%",
    width: "90%",
    marginLeft: "19%",
    marginRight: "40%",
    borderRadius: 30,
    padding: 20,
  },
  text: {
    fontSize: 24,
    marginTop: 124,
    marginLeft: 10,
    borderWidth: 5,
    borderRadius: 20,
    marginBottom: -96,
    width: "100%",
  },
  ali: {
    backgroundColor: "green",
    marginTop: -198,
    marginLeft: "-56%",
    marginRight: "8%",
    fontSize: 55,
    fontWeight: "bold",
    width: "696%",
    paddingLeft: 250,
  },
  al: {
    marginTop: -68,
    marginLeft: "-85%",
    marginRight: "8%",
    fontSize: 55,
    fontWeight: "bold",
    width: "696%",
    paddingLeft: 250,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  bota: {
    backgroundColor: "#006400",
    height: "14%",
    width: "70%",
    left: "1%",
    borderRadius: 120,
    marginTop: 130,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 50,
    elevation: 18,
  },
  botatext: {
    color: "#fff",
    fontSize: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  olho: {
    marginTop: -20,
    left: "89%",
  },
  user: {
    marginTop: -10,
    left: "88%",
  },
  errorText: {
    color: "#ff375b",
    fontSize: 17,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginTop: 8,
  },
});
