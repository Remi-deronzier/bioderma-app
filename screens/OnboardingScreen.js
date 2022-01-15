import React from "react";
import { Image } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { COLORS } from "../assets/ressources/constants";
import { StackActions } from "@react-navigation/native";

const OnboardingScreen = ({ navigation }) => {
  return (
    <Onboarding
      onS
      onDone={() => navigation.dispatch(StackActions.replace("Survey"))}
      onSkip={() => navigation.dispatch(StackActions.replace("Survey"))}
      pages={[
        {
          backgroundColor: `${COLORS.blueColor}`,
          image: (
            <Image
              resizeMode="contain"
              source={require("../assets/images/first-onboarding-screen.png")}
            />
          ),
          title: "No more itching",
          subtitle:
            "If you suffer from atopic dermatitis or simply have dry or very dry skin, the solution to your problems can be found a few screens further down",
        },
        {
          backgroundColor: `${COLORS.blueColor}`,
          image: (
            <Image
              source={require("../assets/images/second-onboarding-screen.png")}
            />
          ),
          title: "Always be informed",
          subtitle:
            "As a healthcare professional, it is your duty to keep up to date with new scientific advances, but it is sometimes difficult to find the time to learn about scientific advances in dermatology. You may be holding the solution in your hands",
        },
        {
          backgroundColor: `${COLORS.blueColor}`,
          image: (
            <Image
              source={require("../assets/images/third-onboarding-screen.png")}
            />
          ),
          title: "Don't wait any longer",
          subtitle: "Join many others who are taking advantage of MySkinMate",
        },
      ]}
    />
  );
};

export default OnboardingScreen;
