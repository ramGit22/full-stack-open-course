import StatisticLine from "./StatisticLine";

const Statistics = (props) => {
  const totalFeedback = props.good + props.neutral + props.bad;

  if (totalFeedback === 0) {
    return <h1>No feedback given</h1>;
  }
  return (
    <div>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine
        text="all"
        value={props.good + props.neutral + props.bad}
      />
      <StatisticLine
        text="average"
        value={(props.good + props.neutral + props.bad) / 3}
      />
      <StatisticLine
        text="positive"
        value={
          props.good
            ? `${
                (props.good / (props.good + props.neutral + props.bad)) * 100
              }%`
            : "0%"
        }
      />
    </div>
  );
};

export default Statistics;
