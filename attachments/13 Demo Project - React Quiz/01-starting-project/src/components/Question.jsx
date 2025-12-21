import { useState } from 'react';
import QuestionTimer from './QuestionTimer.jsx';
import Answers from './Answers.jsx';
import QUESTIONS from '../questions.js';

export default function Question({ index, onSelectAnswer, onSkipAnswer }) {
  const [answer, setAnswer] = useState({
    selectedAnswer: '',
    isCorrect: null,
  });

  let timer = 10000; // 10 seconds default

  if (answer.selectedAnswer) {
    timer = 1000; // 1 second to show correct/wrong
  }

  if (answer.isCorrect !== null) {
    timer = 2000; // 2 seconds before next question
  }

  function handleSelectAnswer(answer) {
    // Another way to update userAnswers in Quiz.jsx
    // setUserAnswers((prevUserAnswers) => {
        // return [...prevUserAnswers, selectedAnswer];
    // });
    // This way, we can add delays and show correct/wrong states
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[index].answers[0] === answer,
      });

      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  }

  let answerState = '';

  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? 'correct' : 'wrong';
  } else if (answer.selectedAnswer) {
    answerState = 'answered';
  }

  return (
    <div id="question">
      <QuestionTimer
        key={timer} // Recreate timer on each change in answer state, a nice trick. The reason why this key requires even if Quesion component has a key in Quiz.jsx is that we want to reset timer also when answer state changes, not only on new question. To force the interval to create a new timer.
        timeout={timer}
        // onTimeout={() => handleSelectAnswer(null)} // Alternative way to skip on timeout. This way a new function is created on each render. Wrapped in useCallback in Quiz.jsx to avoid that.
        onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null} // This way we skip silently on timeout
        mode={answerState}
      />
      <h2>{QUESTIONS[index].text}</h2>
      <Answers
        // key={index} // Reset Answers component state (shuffling) on each new question, if Question is not a separate component
        answers={QUESTIONS[index].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}
