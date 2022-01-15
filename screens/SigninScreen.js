import React, { useState } from "react";

import SubmissionButton from "../components/SubmissionButton";

import { COLORS } from "../assets/ressources/constants";

import {
  Text,
  TextInput,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";

import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StackActions } from "@react-navigation/native";

export default function SignUpScreen({ setToken, navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRevealedPassword, setIsRevealedPassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [onSubmission, setOnSubmission] = useState(false);

  const handleSubmit = async () => {
    try {
      if (email && password) {
        setErrorMessage("");
        setOnSubmission(true);
        const response = await axios.post(
          "https://bioderma-api.herokuapp.com/user/login",
          {
            email,
            password,
          }
        );
        if (response.data.token) {
          setTimeout(() => {}, 3000);
          await setToken(
            response.data.token,
            response.data.id_,
            response.data.account.username
          );
          setOnSubmission(false);
          navigation.dispatch(StackActions.replace("Onboarding"));
        }
      } else {
        setErrorMessage("All the fields must be filled in");
      }
    } catch (error) {
      setOnSubmission(false);
      if (error.response.data.message === "Unauthorized") {
        setErrorMessage("Wrong email or password");
      }
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      //   extraHeight={50}
      //   enableOnAndroid={true}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Image
          style={styles.logoBioderma}
          source={require("../assets/images/bioderma-logo.png")}
          resizeMode="contain"
        />
        <TextInput
          onChangeText={(text) => {
            setEmail(text);
          }}
          value={email}
          placeholder="email"
          autoCorrect={false}
          keyboardType="email-address"
          style={styles.textInput}
          autoCapitalize="none"
        />
        <View style={styles.viewPassWord}>
          <TextInput
            onChangeText={(text) => {
              setPassword(text);
            }}
            autoCapitalize="none"
            value={password}
            placeholder="password"
            style={styles.textInputPassword}
            secureTextEntry={isRevealedPassword}
          />
          {isRevealedPassword ? (
            <Ionicons
              style={styles.iconEye}
              name="eye-outline"
              size={24}
              color="black"
              onPress={() => setIsRevealedPassword(!isRevealedPassword)}
            />
          ) : (
            <Ionicons
              name="eye-off-outline"
              size={24}
              color="black"
              onPress={() => setIsRevealedPassword(!isRevealedPassword)}
              style={styles.iconEye}
            />
          )}
        </View>
        <Text style={styles.textError}>{errorMessage}</Text>
        <SubmissionButton
          uploading={onSubmission}
          handleUpdate={handleSubmit}
          text="Sign in"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("SignUp")}
          style={styles.buttonNoAccount}
        >
          <Text style={styles.text}>No account? Register</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    borderBottomColor: `${COLORS.blueColor}`,
    borderBottomWidth: 1,
    width: "80%",
    marginBottom: 40,
  },
  textInputPassword: {
    borderBottomColor: `${COLORS.blueColor}`,
    borderBottomWidth: 1,
    width: "100%",
    marginBottom: 40,
  },
  scrollView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#fff",
  },
  logoBioderma: {
    height: 50,
    marginTop: 30,
    marginBottom: 50,
  },
  text: {
    color: "gray",
  },
  titlePage: {
    fontSize: 25,
    fontWeight: "700",
    marginBottom: 30,
  },
  buttonNoAccount: {
    marginBottom: 100,
    padding: 20,
  },
  textError: {
    color: `${COLORS.blueColor}`,
    marginBottom: 10,
  },
  viewPassWord: {
    position: "relative",
    width: "80%",
  },
  iconEye: {
    position: "absolute",
    right: 0,
    top: Platform.OS === "ios" ? -10 : 0,
  },
  loader: {
    marginBottom: 16,
  },
});
