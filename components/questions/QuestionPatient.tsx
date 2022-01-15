import React, { Fragment, useRef } from "react";
import { Dimensions, TouchableOpacity, StyleSheet, Text } from "react-native";
import { verticalScale } from "react-native-size-matters";
import QuestionSlide from "../QuestionSlide";
import QuizzContainer from "../QuizzContainer";
import theme, { Box } from "../../UI/theme";
import AnswersPatient from "../answers/AnswersPatient";
const { height, width } = Dimensions.get("window");

const QuestionPatient = ({ question, answers, setUserStatus }) => {
  return (
    <QuizzContainer>
      <Box flex={1}>
        <Box justifyContent="flex-start" flex={1} flexDirection="column">
          <Box height={verticalScale(height * 0.18)} backgroundColor="primary">
            <QuestionSlide question={question} number={2} />
          </Box>
        </Box>
        <AnswersPatient answers={answers} setUserStatus={setUserStatus} />
      </Box>
    </QuizzContainer>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors["button"],
    height: 60,
    width: 250,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    padding: 5,
    marginTop: 15,
  },
  buttonText: {
    textTransform: "uppercase",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 30,
    fontWeight: "bold",
    color: "white",
  },
});

export default QuestionPatient;
