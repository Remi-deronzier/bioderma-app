import React from "react";
import { View, Dimensions } from "react-native";
import { Box, Text } from "../UI/theme";
const { width, height } = Dimensions.get("window");

interface QuestionSlideProps {
  question: string;
  number: number;
}

const QuestionSlide = ({ question, number }: QuestionSlideProps) => {
  return (
    <Box {...{ width }} alignItems="center" padding="xl">
      <Text variant="title" fontSize={24} marginTop="m">
        {`Question n°${number}`}
      </Text>
      <Text variant="body" color="white" marginTop="xl">
        {question}
      </Text>
    </Box>
  );
};

export default QuestionSlide;
