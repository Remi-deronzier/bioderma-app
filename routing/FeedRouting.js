import "react-native-gesture-handler";
import React from "react";

import FeedScreen from "../screens/FeedScreen";
import ArticleScreen from "../screens/ArticleScreen";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const FeedRouting = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FeedScreen" options={{ headerShown: false }}>
        {(props) => <FeedScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen name="ArticleScreen" options={{ headerShown: false }}>
        {(props) => <ArticleScreen {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default FeedRouting;
