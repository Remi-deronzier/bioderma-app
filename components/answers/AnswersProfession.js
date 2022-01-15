import React, { Fragment } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import theme from "../../UI/theme";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: -50,
  },
  button: {
    backgroundColor: theme.colors["button"],
    height: 60,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 5,
    marginTop: 15,
    elevation: 10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 30,
    fontWeight: "bold",
    color: "white",
  },
});

const AnswersProfession = ({ answers, setUserStatus }) => {
  const navigation = useNavigation();

  return (
    <View style={{ ...styles.container }}>
      {answers.map((answer, index) => (
        <Fragment key={index}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setUserStatus("professional");
              // if (answer == "Nurse") {
              //   // navigation.navigate("ProfessionalQuestionScreen", {
              //   //   question: questions[1].question,
              //   //   answers: questions[1].answers,
              //   // });
              // } else if (answer == "Pharmacist") {
              //   // navigation.navigate("PatientQuestionScreen", {
              //   //   question: questions[2].question,
              //   //   answers: questions[2].answers,
              //   // });
              // } else {
              // }
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

export default AnswersProfession;
