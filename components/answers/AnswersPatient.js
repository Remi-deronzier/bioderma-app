import React, { Fragment } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import theme from "../../UI/theme";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: -300,
  },
  button: {
    backgroundColor: theme.colors["button"],
    height: 140,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 5,
    marginTop: 20,
    elevation: 10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 25,
    fontWeight: "bold",
    color: "white",
  },
});

const AnswersPatient = ({ answers, setUserStatus }) => {
  const navigation = useNavigation();

  return (
    <View style={{ ...styles.container }}>
      {answers.map((answer, index) => (
        <Fragment key={index}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (
                answer ==
                "I have atopic dermatitis, following a proven diagnosis by a health professional"
              ) {
                setUserStatus("illPatient");
              } else if (
                answer ==
                "I have symptoms that are similar to atypical dermatitis but I have not been diagnosed with atopic dermatitis"
              ) {
                setUserStatus("notIllPatient");
              } else {
                setUserStatus("illPatient");
              }
              navigation.navigate("Home");
            }}
          >
            <Text style={styles.buttonText}>{answers[index]}</Text>
          </TouchableOpacity>
        </Fragment>
      ))}
    </View>
  );
};

export default AnswersPatient;
