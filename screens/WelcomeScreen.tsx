import React from "react";
import {
  Dimensions,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
const { height, width } = Dimensions.get("window");
import {
  moderateVerticalScale,
  verticalScale,
} from "react-native-size-matters";
import theme, { Box, Text } from "../UI/theme";
import Animated from "react-native-reanimated";
import { questions } from "../data/data";

export const welcomeAssets = require("../assets/images/welcome-quizz.png");

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Box flex={1} backgroundColor="white" justifyContent="flex-start">
        <Box height={height * 0.4} justifyContent="center" alignItems="center">
          <Box
            padding="m"
            height={verticalScale(250)}
            width={moderateVerticalScale(250)}
            backgroundColor="white"
            alignItems="center"
            justifyContent="center"
          >
            <Image
              source={welcomeAssets}
              style={styles.image}
              resizeMode="contain"
            />
          </Box>
        </Box>
      </Box>

      <Animated.View style={styles.shape} />
      <Animated.View style={styles.animatedView}>
        <Text variant="title" marginBottom="m" textAlign="center">
          First contact
        </Text>
        <Text
          variant="subtitle"
          color="white"
          textAlign="center"
          marginBottom="xl"
        >
          To know yourself better, answer these questions
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("QuestionScreen", {
              question: questions[0].question,
              answers: questions[0].answers,
              questionStep: "firstQuestion",
            })
          }
        >
          <Text style={styles.buttonText}>Answer questions</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors["button"],
    height: 60,
    width: 250,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    padding: 5,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 20,
    lineHeight: 30,
    fontWeight: "bold",
    color: "white",
  },
  shape: {
    backgroundColor: theme.colors["primary"],
    height: 500 + height,
    width: width * 2,
    borderRadius: 1000,
    position: "absolute",
    alignSelf: "center",
    top: 0.52 * height,
  },
  animatedView: {
    backgroundColor: theme.colors["primary"],
    height: height * 0.35,
    width: width,
    position: "absolute",
    alignItems: "center",
    bottom: 0,
    alignSelf: "center",
  },
  safeArea: { flex: 1 },
  innerBox: {
    height: height * 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
  },
});

export default WelcomeScreen;
