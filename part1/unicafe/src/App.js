import { useState } from "react";

const Display = (props) => {
  return (
    <>
      <h1>{props.text}</h1>
    </>
  );
};

const Button = ({ text, handleClick }) => {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  );
};

const StatisticsLine = ({ text, value }) => {
  if (text === "positive") {
    return (
      <tr>
        <td>{text}</td>
        <td>{value} %</td>
      </tr>
    );
  }
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = (good / all) * 100;

  if (all === 0) {
    return <div>No feedback given</div>;
  }

  return (
    <div>
      <table>
        <tbody>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="all" value={all} />
          <StatisticsLine text="average" value={average} />
          <StatisticsLine text="positive" value={positive} />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [buttons, clicks] = useState({ good: 0, neutral: 0, bad: 0 });

  const handleGoodClick = () => {
    clicks({ ...buttons, good: buttons.good + 1 });
  };
  const handleNeutralClick = () => {
    clicks({ ...buttons, neutral: buttons.neutral + 1 });
  };
  const handleBadClick = () => {
    clicks({ ...buttons, bad: buttons.bad + 1 });
  };

  return (
    <div>
      <Display text="give feedback" />
      <Button text="good" handleClick={(handleGoodClick)} />
      <Button text="neutral" handleClick={handleNeutralClick} />
      <Button text="bad" handleClick={handleBadClick} />
      <Display text="statistics" />
      <Statistics
        good={buttons.good}
        neutral={buttons.neutral}
        bad={buttons.bad}
      />
    </div>
  );
};

export default App;
