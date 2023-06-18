import styled from "styled-components";
import { ScoreProps } from "../data/scoreProps";

const Score = ({ state }: ScoreProps) => {
  return (
    <CurrentInfo>
      <p>현재 Stage: {state.stage}</p>
      <p>현재 Score: {state.score}</p>
      <p>남은 시간: {state.remainingTime}초</p>
    </CurrentInfo>
  );
};

const CurrentInfo = styled.div`
  display: flex;
  width: 25rem;
  gap: 1rem;
  font-weight: bold;
`;

export default Score;
