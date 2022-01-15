import React from "react";
import FirstQuestion from "../components/questions/FirstQuestion";
import QuestionProfession from "../components/questions/QuestionProfession";
import QuestionPatient from "../components/questions/QuestionPatient";

const QuestionScreen = ({ route, setUserStatus }) => {
  if (route.params.questionStep === "firstQuestion") {
    return (
      <FirstQuestion
        answers={route.params.answers}
        question={route.params.question}
      />
    );
  } else if (route.params.questionStep === "questionForProfessionnals") {
    return (
      <QuestionProfession
        answers={route.params.answers}
        question={route.params.question}
        setUserStatus={setUserStatus}
      />
    );
  } else {
    return (
      <QuestionPatient
        answers={route.params.answers}
        question={route.params.question}
        setUserStatus={setUserStatus}
      />
    );
  }
};

export default QuestionScreen;
