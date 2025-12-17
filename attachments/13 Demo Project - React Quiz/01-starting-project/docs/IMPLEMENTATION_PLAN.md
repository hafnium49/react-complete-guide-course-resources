# React Quiz App - Implementation Plan

## Overview
Build a React Quiz app practicing useEffect, dependencies, and cleanup functions.

## UI Features
- Header with quiz logo and "REACTQUIZ" title
- Progress bar showing time remaining for current question
- Question text display
- 4 answer buttons (highlighted when selected - purple for selected)
- Results/summary screen when quiz completes

## File Structure
```
src/
├── App.jsx                    (modify - main component)
├── main.jsx                   (no changes)
├── index.css                  (no changes - already complete)
├── questions.js               (copy from project root)
├── assets/
│   ├── quiz-logo.png          (existing)
│   └── quiz-complete.png      (existing)
└── components/
    ├── Header.jsx             (new - logo and title)
    ├── Quiz.jsx               (new - main quiz logic)
    ├── Question.jsx           (new - single question display)
    ├── Answers.jsx            (new - answer buttons)
    ├── QuestionTimer.jsx      (new - progress bar with timer)
    └── Summary.jsx            (new - results screen)
```

## State Architecture

### Quiz.jsx State
```jsx
const [userAnswers, setUserAnswers] = useState([]);
// Each answer can be: string (selected answer) or null (skipped)

// Derived state:
const activeQuestionIndex = userAnswers.length;
const quizIsComplete = activeQuestionIndex === QUESTIONS.length;
```

### QuestionTimer.jsx State
```jsx
const [remainingTime, setRemainingTime] = useState(timeout);
// Uses useEffect with setInterval for countdown
// Uses cleanup to clear interval on unmount
```

---

## Implementation Phases

### Phase 1: Setup & Header

#### 1. Copy questions.js to src directory
Copy from project root to `src/questions.js`

#### 2. Create Header.jsx
```jsx
import logoImg from '../assets/quiz-logo.png';

export default function Header() {
  return (
    <header>
      <img src={logoImg} alt="Quiz logo" />
      <h1>ReactQuiz</h1>
    </header>
  );
}
```

#### 3. Update App.jsx
```jsx
import Header from './components/Header.jsx';
import Quiz from './components/Quiz.jsx';

function App() {
  return (
    <>
      <Header />
      <main>
        <Quiz />
      </main>
    </>
  );
}

export default App;
```

---

### Phase 2: Quiz Structure

#### 4. Create Quiz.jsx
Main quiz container with state management.

```jsx
import { useState, useCallback } from 'react';
import QUESTIONS from '../questions.js';
import Question from './Question.jsx';
import Summary from './Summary.jsx';

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
    setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);
  }, []);

  const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

  if (quizIsComplete) {
    return <Summary userAnswers={userAnswers} />;
  }

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
```

#### 5. Create Question.jsx
```jsx
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
        key={timer}
        timeout={timer}
        onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null}
        mode={answerState}
      />
      <h2>{QUESTIONS[index].text}</h2>
      <Answers
        answers={QUESTIONS[index].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}
```

#### 6. Create Answers.jsx
```jsx
import { useRef } from 'react';

export default function Answers({ answers, selectedAnswer, answerState, onSelect }) {
  const shuffledAnswers = useRef();

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        const isSelected = selectedAnswer === answer;
        let cssClass = '';

        if (answerState === 'answered' && isSelected) {
          cssClass = 'selected';
        }

        if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
          cssClass = answerState;
        }

        return (
          <li key={answer} className="answer">
            <button
              onClick={() => onSelect(answer)}
              className={cssClass}
              disabled={answerState !== ''}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
```

---

### Phase 3: Timer with useEffect (Core Focus)

#### 7. Create QuestionTimer.jsx
This is the core component for practicing useEffect patterns.

```jsx
import { useState, useEffect } from 'react';

export default function QuestionTimer({ timeout, onTimeout, mode }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  // Effect for auto-timeout
  useEffect(() => {
    console.log('Setting timeout');
    const timer = setTimeout(onTimeout, timeout);

    return () => {
      console.log('Clearing timeout');
      clearTimeout(timer);
    };
  }, [timeout, onTimeout]);

  // Effect for countdown interval
  useEffect(() => {
    console.log('Setting interval');
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 100);
    }, 100);

    return () => {
      console.log('Clearing interval');
      clearInterval(interval);
    };
  }, []);

  return (
    <progress
      id="question-time"
      max={timeout}
      value={remainingTime}
      className={mode}
    />
  );
}
```

**Key useEffect Concepts:**
- Two separate effects: one for timeout, one for interval
- Cleanup functions to prevent memory leaks
- Dependency arrays to control when effects run
- `key` prop on component forces re-mount and resets timer

---

### Phase 4: Summary Screen

#### 8. Create Summary.jsx
```jsx
import quizCompleteImg from '../assets/quiz-complete.png';
import QUESTIONS from '../questions.js';

export default function Summary({ userAnswers }) {
  const skippedAnswers = userAnswers.filter((answer) => answer === null);
  const correctAnswers = userAnswers.filter(
    (answer, index) => answer === QUESTIONS[index].answers[0]
  );

  const skippedAnswersShare = Math.round(
    (skippedAnswers.length / userAnswers.length) * 100
  );
  const correctAnswersShare = Math.round(
    (correctAnswers.length / userAnswers.length) * 100
  );
  const wrongAnswersShare = 100 - skippedAnswersShare - correctAnswersShare;

  return (
    <div id="summary">
      <img src={quizCompleteImg} alt="Trophy icon" />
      <h2>Quiz Completed!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedAnswersShare}%</span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">{correctAnswersShare}%</span>
          <span className="text">answered correctly</span>
        </p>
        <p>
          <span className="number">{wrongAnswersShare}%</span>
          <span className="text">answered incorrectly</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
          let cssClass = 'user-answer';

          if (answer === null) {
            cssClass += ' skipped';
          } else if (answer === QUESTIONS[index].answers[0]) {
            cssClass += ' correct';
          } else {
            cssClass += ' wrong';
          }

          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{QUESTIONS[index].text}</p>
              <p className={cssClass}>{answer ?? 'Skipped'}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
```

---

## Key useEffect Patterns Practiced

### 1. Timer with Cleanup
```jsx
useEffect(() => {
  const timer = setTimeout(onTimeout, timeout);
  return () => clearTimeout(timer); // Cleanup
}, [timeout, onTimeout]);
```

### 2. Interval with Cleanup
```jsx
useEffect(() => {
  const interval = setInterval(() => {
    setRemainingTime(prev => prev - 100);
  }, 100);
  return () => clearInterval(interval); // Cleanup
}, []);
```

### 3. Using key to Reset Component
```jsx
<QuestionTimer key={timer} timeout={timer} ... />
// Changing key unmounts/remounts component, resetting all state
```

---

## React Concepts Practiced

| Concept | Component |
|---------|-----------|
| useEffect | QuestionTimer.jsx |
| Cleanup functions | QuestionTimer.jsx |
| Dependency arrays | QuestionTimer.jsx |
| useCallback | Quiz.jsx |
| useRef (for shuffle) | Answers.jsx |
| useState | Quiz.jsx, Question.jsx, QuestionTimer.jsx |
| Derived state | Quiz.jsx (activeQuestionIndex, quizIsComplete) |
| Conditional rendering | Quiz.jsx, Answers.jsx |
| key prop for reset | Question.jsx, QuestionTimer.jsx |

---

## CSS Classes (already in index.css)

- `#quiz` - Main quiz container
- `#question` - Question section
- `#question-time` - Progress bar for timer
- `#answers` - Answer buttons container
- `.answer` - Individual answer li
- `.selected` - Selected answer style (purple)
- `.correct` - Correct answer style (green)
- `.wrong` - Wrong answer style (red)
- `#summary` - Results screen
- `#summary-stats` - Statistics display
- `.user-answer` - User's answer in summary
- `.skipped` - Skipped answer style
- `.correct` - Correct answer in summary
- `.wrong` - Wrong answer in summary

---

## How to Run

```bash
cd "attachments/13 Demo Project - React Quiz/01-starting-project"
npm run dev
```

---

## Features to Implement

- [x] Header with logo and title
- [x] Display quiz questions one at a time
- [x] Shuffle answer options
- [x] Timer progress bar for each question
- [x] Auto-skip when timer expires
- [x] Visual feedback for selected answer
- [x] Show correct/wrong after selection
- [x] Auto-advance to next question
- [x] Summary screen with statistics
- [x] List of all questions with user answers

---

## Implementation Status: COMPLETE

All features have been implemented. The app is fully functional with:
- 6 components created in `src/components/`
- `questions.js` copied to `src/`
- `App.jsx` updated to render Header and Quiz
