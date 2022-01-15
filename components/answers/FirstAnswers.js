import React, { Fragment } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import theme from "../../UI/theme";
import { useNavigation } from "@react-navigation/native";
import { questions } from "../../data/data";

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

const FirstAnswers = ({ answers }) => {
  const navigation = useNavigation();

  return (
    <View style={{ ...styles.container }}>
      {answers.map((answer, index) => (
        <Fragment key={index}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (answer == "Yes") {
                navigation.navigate("QuestionScreen", {
                  question: questions[1].question,
                  answers: questions[1].answers,
                  questionStep: "questionForProfessionnals",
                });
              } else {
                navigation.navigate("QuestionScreen", {
                  question: questions[2].question,
                  answers: questions[2].answers,
                  questionStep: "questionForNonProfessionnals",
                });
              }
            }}
          >
            <Text style={styles.buttonText}>{answers[index]}</Text>
          </TouchableOpacity>
        </Fragment>
      ))}
    </View>
  );
};

export default FirstAnswers;
