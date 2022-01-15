import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Text,
  Image,
  Dimensions,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import { COLORS } from "../assets/ressources/constants";

const AppointmentsScreen = () => {
  handleGoToDoctolib = () => {
    WebBrowser.openBrowserAsync("https://www.doctolib.fr/");
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../assets/images/appointment-background.png")}
        resizeMode="contain"
      >
        <View style={styles.padding}></View>
        <View style={styles.containerButtonAndLogo}>
          <TouchableOpacity style={styles.button} onPress={handleGoToDoctolib}>
            <Text style={styles.buttonText}>
              MAKE AN APPOINTMENT WITH A PROFESSIONAL
            </Text>
          </TouchableOpacity>
          <Image
            style={styles.logoDoctolib}
            source={require("../assets/images/logo-doctolib.png")}
            resizeMode="cover"
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  padding: {
    marginTop: Dimensions.get("window").height * 0.5,
  },
  button: {
    backgroundColor: `${COLORS.blueColor}`,
    height: 90,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    padding: 5,
    elevation: 10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 20,
    lineHeight: 30,
    fontWeight: "bold",
    color: "white",
  },
  containerButtonAndLogo: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoDoctolib: {
    width: 200,
    height: 100,
  },
});

export default AppointmentsScreen;
