import styled from "styled-components";
import { ScoreProps } from "../data/scoreProps";

const FinalScore = ({ state }: ScoreProps) => {
  return (
    <FinalInfo>
      <p>게임 종료</p>
      <p>최종 stage: {state.stage}</p>
      <p>score: {state.score}</p>
    </FinalInfo>
  );
};

const FinalInfo = styled.div`
  display: flex;
  width: 20rem;
  gap: 1rem;
  font-weight: bold;
`;

export default FinalScore;
