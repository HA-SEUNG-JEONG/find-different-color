import { ScoreProps } from "../data/scoreProps";

const FinalScore = ({ state }: ScoreProps) => {
  return (
    <>
      <p>게임 종료</p>
      <p>최종 stage: {state.stage}</p>
      <p>score: {state.score}</p>
    </>
  );
};

export default FinalScore;
