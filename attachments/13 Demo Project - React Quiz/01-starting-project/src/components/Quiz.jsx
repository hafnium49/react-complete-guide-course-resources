import { useState, useCallback } from 'react';
import QUESTIONS from '../questions.js';
import Question from './Question.jsx';
import Summary from './Summary.jsx';

export default function Quiz() {
  // const [activeQuestionIndex, setActiveQuestionIndex] = useState(0); // Not necessarily the best way
  // const [answerState, setAnswerState] = useState(null); // Another way to track answer state. Moved to Question.jsx as let answerState
  const [userAnswers, setUserAnswers] = useState([]);

  // const activeQuestionIndex = answerState === "" ? userAnswers.length : userAnswers.length - 1; // Another way to update selectedAnswer? right away.
  const activeQuestionIndex = userAnswers.length; // Instead of activeQuestionIndex state, derive it from userAnswers
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) { // Use callback to avoid re-creating the function on each render
    // setAnswerState("answered"); // Another way to track answer state. Moved to Question.jsx as let answerState
    setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);
    // setTimeout(() => {
    //   if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
    //     setAnswerState("correct");
    //   } else {
    //     setAnswerState("wrong");
    //   }
    //   setTimeout(() => {
    //     setAnswerState(null);
    // }, 2000);
    // }, 1000); // Moved to Question.jsx
  }, []);

  const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]); // Use callback to avoid re-creating the function on each render

  if (quizIsComplete) {
    return <Summary userAnswers={userAnswers} />;
  }

  // const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers]; // Move to Answers.jsx
  // shuffledAnswers.sort(() => Math.random() - 0.5);


  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
