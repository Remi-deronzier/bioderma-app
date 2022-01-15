import React, { useRef, useEffect } from "react";

import { View, StyleSheet, Text } from "react-native";

import LottieView from "lottie-react-native";

const SettingsScreen = () => {
  const animation = useRef(null);

  const launchAnimation = async () => {
    if (animation.current) {
      animation.current.play();
    }
  };

  useEffect(() => {
    launchAnimation();
  }, []);

  return (
    <View style={styles.animationContainer}>
      <Text style={styles.text}>Work in Progress</Text>
      <LottieView
        ref={animation}
        style={styles.animation}
        source={require("../assets/work-in-progress.json")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 30,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  animationContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  animation: {
    width: 400,
    height: 400,
  },
});

export default SettingsScreen;
