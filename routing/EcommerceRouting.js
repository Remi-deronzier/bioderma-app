import "react-native-gesture-handler";
import React from "react";

import ShopScreen from "../screens/ShopScreen";
import ProductScreen from "../screens/ProductScreen";
import AroundMeScreen from "../screens/AroundMeScreen";

import { COLORS } from "../assets/ressources/constants";

import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const EcommerceRouting = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tab" options={{ headerShown: false }}>
        {() => (
          <Tab.Navigator
            screenOptions={{
              activeTintColor: `${COLORS.blueColor}`,
              inactiveTintColor: "gray",
            }}
          >
            <Tab.Screen
              name="ShopTab"
              options={{
                headerShown: false,
                tabBarLabel: "Shop",
                tabBarIcon: ({ color, size }) => (
                  <Feather name="shopping-bag" size={size} color={color} />
                ),
              }}
            >
              {() => (
                <Stack.Navigator>
                  <Stack.Screen name="Shop" options={{ headerShown: false }}>
                    {(props) => <ShopScreen {...props} />}
                  </Stack.Screen>
                  <Stack.Screen name="Product" options={{ headerShown: false }}>
                    {(props) => <ProductScreen {...props} />}
                  </Stack.Screen>
                </Stack.Navigator>
              )}
            </Tab.Screen>
            <Tab.Screen
              name="AroundMeTab"
              options={{
                tabBarLabel: "Around me",
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <FontAwesome name="map-marker" size={size} color={color} />
                ),
              }}
            >
              {() => (
                <Stack.Navigator>
                  <Stack.Screen
                    name="AroundMe"
                    options={{ headerShown: false }}
                  >
                    {(props) => <AroundMeScreen {...props} />}
                  </Stack.Screen>
                </Stack.Navigator>
              )}
            </Tab.Screen>
          </Tab.Navigator>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default EcommerceRouting;
