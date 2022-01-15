import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import DiagnosticsCreateScreen from "../screens/DiagnosticsCreateScreen";
import DiagnosticsEditScreen from "../screens/DiagnosticsEditScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppointmentsScreen from "../screens/AppointmentsScreen";

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

const DiagnosticsRouting = ({ id, token }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CreateAnEditDiagnosis"
        options={{ headerShown: false }}
      >
        {() => (
          <Tab.Navigator>
            <Tab.Screen name="Create a diagnosis">
              {(props) => (
                <DiagnosticsCreateScreen {...props} id={id} token={token} />
              )}
            </Tab.Screen>
            <Tab.Screen name="See old diagnosis">
              {(props) => (
                <DiagnosticsEditScreen {...props} id={id} token={token} />
              )}
            </Tab.Screen>
          </Tab.Navigator>
        )}
      </Stack.Screen>
      <Stack.Screen
        name="MyAppointment"
        options={{ headerShown: false }}
        component={AppointmentsScreen}
      />
    </Stack.Navigator>
  );
};

export default DiagnosticsRouting;
