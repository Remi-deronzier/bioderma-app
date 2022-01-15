import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@shopify/restyle";
import theme from "./UI/theme";

import AppointmentsScreen from "./screens/AppointmentsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import EcommerceRouting from "./routing/EcommerceRouting";
import CustomDrawerContent from "./components/CustomDrawerContent";
import SignInScreen from "./screens/SigninScreen";
import SignUpScreen from "./screens/SignupScreen";

import { COLORS } from "./assets/ressources/constants";

import { StatusBar } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import SettingsScreen from "./screens/SettingsScreen";
import FeedRouting from "./routing/FeedRouting";
import InitialSurveyRouting from "./routing/InitialSurveyRouting";
import OnboardingScreen from "./screens/OnboardingScreen";
import DiagnosticsRouting from "./routing/DiagnosticsRouting";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userUsername, setUserUsername] = useState(null);
  const [userStatus, setUserStatus] = useState("");

  const setToken = async (token, id, username) => {
    if (token) {
      await AsyncStorage.setItem("userToken", token);
      await AsyncStorage.setItem("userId", id);
      await AsyncStorage.setItem("userUsername", username);
    } else {
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("userId");
      await AsyncStorage.removeItem("userUsername");
    }
    setUserUsername(username);
    setUserId(id);
    setUserToken(token);
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");
      const userId = await AsyncStorage.getItem("userId");
      const userUsername = await AsyncStorage.getItem("userUsername");
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setUserUsername(userUsername);
      setUserId(userId);
      setUserToken(userToken);
      setIsLoading(false);
    };
    bootstrapAsync();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StatusBar backgroundColor={`${COLORS.blueColor}`} />
        {isLoading ? null : userToken === null ? ( // We haven't finished checking for the token yet
          // No token found, user isn't signed in
          <Stack.Navigator>
            <Stack.Screen name="SignUp" options={{ headerShown: false }}>
              {(props) => <SignUpScreen {...props} setToken={setToken} />}
            </Stack.Screen>
            <Stack.Screen name="SignIn" options={{ headerShown: false }}>
              {(props) => <SignInScreen {...props} setToken={setToken} />}
            </Stack.Screen>
          </Stack.Navigator>
        ) : (
          // User is signed in
          <Stack.Navigator>
            <Stack.Screen
              name="Onboarding"
              options={{ headerShown: false }}
              component={OnboardingScreen}
            />
            <Stack.Screen name="Survey" options={{ headerShown: false }}>
              {(props) => (
                <InitialSurveyRouting
                  {...props}
                  setUserStatus={setUserStatus}
                />
              )}
            </Stack.Screen>
            {userStatus === "notIllPatient" ? (
              <Stack.Screen name="Home" options={{ headerShown: false }}>
                {(props) => (
                  <Drawer.Navigator
                    drawerContent={(props) => (
                      <CustomDrawerContent
                        {...props}
                        setToken={setToken}
                        username={userUsername}
                        userId={userId}
                        token={userToken}
                        userStatus={userStatus}
                      />
                    )}
                  >
                    <Drawer.Screen name="Diagnostics">
                      {(props) => (
                        <DiagnosticsRouting
                          {...props}
                          id={userId}
                          token={userToken}
                        />
                      )}
                    </Drawer.Screen>
                    <Drawer.Screen name="Profile" component={ProfileScreen} />
                    <Drawer.Screen name="Settings" component={SettingsScreen} />
                  </Drawer.Navigator>
                )}
              </Stack.Screen>
            ) : (
              <Stack.Screen name="Home" options={{ headerShown: false }}>
                {(props) => (
                  <Drawer.Navigator
                    drawerContent={(props) => (
                      <CustomDrawerContent
                        {...props}
                        setToken={setToken}
                        username={userUsername}
                        userId={userId}
                        token={userToken}
                        userStatus={userStatus}
                      />
                    )}
                  >
                    <Drawer.Screen name="Feed" component={FeedRouting} />
                    <Drawer.Screen name="Shop" component={EcommerceRouting} />
                    <Drawer.Screen name="Profile" component={ProfileScreen} />
                    <Drawer.Screen
                      name="Appointments"
                      component={AppointmentsScreen}
                    />
                    <Drawer.Screen name="Settings" component={SettingsScreen} />
                  </Drawer.Navigator>
                )}
              </Stack.Screen>
            )}
            <Stack.Screen name="SignIn" options={{ headerShown: false }}>
              {(props) => <SignInScreen {...props} setToken={setToken} />}
            </Stack.Screen>
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </ThemeProvider>
  );
}
