import { useRef } from 'react';

export default function Answers({ answers, selectedAnswer, answerState, onSelect }) {
  const shuffledAnswers = useRef();
  // const [shuffledAnswers, setShuffledAnswers] = useState([]); // Minimize the use of state. Use useRef instead.

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => { // shuffle answers only once per component instance, make sure to use shuffledAnswers.current
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
              disabled={answerState !== ''} // so that user can't change answer after selecting
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
