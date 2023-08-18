import { useState } from "react";
import Statistics from "./components/Statistics";
import Button from "./components/Button";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodCount = () => {
    setGood((prevGood) => prevGood + 1);
  };

  const neutralCount = () => {
    setNeutral((prevNeutral) => prevNeutral + 1);
  };

  const badCount = () => {
    setBad((prevBad) => prevBad + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <div style={{ display: "flex" }}>
        <Button label="good" onClick={goodCount} />
        <Button label="neutral" onClick={neutralCount} />
        <Button label="bad" onClick={badCount} />
      </div>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
