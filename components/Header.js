import React from "react";

import { View, StyleSheet, Image, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Header({ goBackButton }) {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View
        style={[
          styles.container,
          { flexDirection: goBackButton ? "row" : "column" },
        ]}
      >
        <Image
          style={styles.image}
          source={require("../assets/images/bioderma-logo.png")}
          resizeMode="contain"
        />
        {goBackButton && (
          <Ionicons
            name="close-circle"
            size={50}
            color="black"
            onPress={() => navigation.goBack()}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
  },
  image: {
    height: 50,
    width: 300,
  },
});
