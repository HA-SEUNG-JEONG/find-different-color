import { ScoreProps } from "../data/scoreProps";

const Score = ({ state }: ScoreProps) => {
  return (
    <>
      <p>현재 Stage: {state.stage}</p>
      <p>현재 Score: {state.score}</p>
      <p>남은 시간: {state.remainingTime}초</p>
    </>
  );
};

export default Score;
