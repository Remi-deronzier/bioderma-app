import "react-native-gesture-handler";
import React from "react";

import WelcomeScreen from "../screens/WelcomeScreen";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import QuestionScreen from "../screens/QuestionScreen";

const Stack = createNativeStackNavigator();

const InitialSurveyRouting = ({ setUserStatus }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="WelcomeScreen" options={{ headerShown: false }}>
        {(props) => <WelcomeScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen name="QuestionScreen" options={{ headerShown: false }}>
        {(props) => <QuestionScreen {...props} setUserStatus={setUserStatus} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default InitialSurveyRouting;
