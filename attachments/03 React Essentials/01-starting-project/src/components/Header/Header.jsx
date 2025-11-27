import reactImg from '../../assets/react-core-concepts.png';
import './Header.css';

const reactDescriptions = ['Fundamental', 'Crucial', 'Core', 'Essential'];

function genRandomInt(max) {
  return Math.floor(Math.random() * (max));
}

export default function Header() {
  return (
    <header>
      <img src={reactImg} className="react-logo" alt="Stylized atom" />
      <h1>React Essentials</h1>
      <p>
        {reactDescriptions[genRandomInt(reactDescriptions.length)]} React concepts you will need for almost any app you are
        going to build!
      </p>
    </header>
  );
}