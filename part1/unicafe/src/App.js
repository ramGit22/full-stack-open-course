import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodCount = () => {
    setGood(good + 1);
  };

  const neutralCount = () => {
    setNeutral(neutral + 1);
  };

  const badCount = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={goodCount}>good</button>
      <button onClick={neutralCount}>neutral</button>
      <button onClick={badCount}>bad</button>
      <h2>statistics</h2>
      <p>good:{good} </p>
      <p>neutral:{neutral} </p>
      <p>bad:{bad} </p>
      <p>all:{good + neutral + bad}</p>
      <p>average: {(good + neutral + bad) / 3}</p>
      <p>positive:{good ? (good / (good + neutral + bad)) * 100 : 0}% </p>
    </div>
  );
};

export default App;
