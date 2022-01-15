import React, { ReactElement } from "react";
import { SafeAreaView } from "react-native";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import theme from "../UI/theme";

interface QuizzContainerProps {
  children: ReactElement;
}

const QuizzContainer = ({ children }: QuizzContainerProps) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {children}
      <StatusBar backgroundColor={theme.colors["primary"]} style="light" />
    </SafeAreaView>
  );
};

export default QuizzContainer;
