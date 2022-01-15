import React from "react";

import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Avatar } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";

import { COLORS } from "../assets/ressources/constants";
import { Divider } from "react-native-elements";

const CustomDrawerContent = ({ state, navigation, ...props }) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <Avatar
          rounded
          elevation={10}
          title={props.username ? props.username[0].toUpperCase() : ""} // take the inital
          size={100}
          overlayContainerStyle={{
            backgroundColor: `${COLORS.blueColor}`,
          }}
        />
        <Text style={styles.username}>{props.username ?? ""}</Text>
      </View>
      <Divider style={styles.divider} />
      {(props.userStatus === "illPatient" ||
        props.userStatus === "professional") && (
        <DrawerItem
          label="Feed"
          icon={() => (
            <Ionicons name="newspaper-outline" size={24} color="black" />
          )}
          onPress={() => navigation.navigate("Feed")}
        />
      )}
      {props.userStatus === "illPatient" && (
        <DrawerItem
          label="Shop"
          icon={() => <Ionicons name="cart-outline" size={24} color="black" />}
          onPress={() => navigation.navigate("Shop")}
        />
      )}
      {props.userStatus === "notIllPatient" && (
        <DrawerItem
          label="Diagnostics"
          icon={() => <Ionicons name="heart-outline" size={24} color="black" />}
          onPress={() =>
            navigation.navigate("Diagnostics", { id: props.userId })
          }
        />
      )}
      <DrawerItem
        label="Profile"
        icon={() => <Ionicons name="person-outline" size={24} color="black" />}
        onPress={() =>
          navigation.navigate("Profile", {
            id: props.userId,
            token: props.token,
          })
        }
      />
      <DrawerItem
        label="Settings"
        icon={() => (
          <Ionicons name="ios-settings-outline" size={24} color="black" />
        )}
        onPress={() => navigation.navigate("Settings")}
      />
      {props.userStatus === "illPatient" && (
        <DrawerItem
          label="Appointments"
          icon={() => (
            <MaterialIcons name="book-online" size={24} color="black" />
          )}
          onPress={() => navigation.navigate("Appointments")}
        />
      )}
      <DrawerItem
        label="Log out"
        icon={() => <Ionicons name="eye-outline" size={24} color="black" />}
        onPress={() => props.setToken(null, null, null)}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  divider: {
    marginBottom: 10,
  },
  username: {
    marginTop: 10,
    color: `${COLORS.blackColor}`,
  },
});

export default CustomDrawerContent;
