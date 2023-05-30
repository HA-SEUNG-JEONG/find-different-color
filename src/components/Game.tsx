import { useEffect, useState } from "react";
import styled from "styled-components";
import Square from "./Square";

const Game = () => {
  const [stage, setStage] = useState(1);
  const [score, setScore] = useState(0);
  const [remainingTime, setRemainingTime] = useState(15);
  const [answerIndex, setAnswerIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    if (remainingTime <= 0) {
      clearInterval(timer);
      setGameOver(true);
    }

    return () => {
      clearInterval(timer);
    };
  }, [remainingTime]);

  const generateRandomIndex = (stage: number) => {
    const gridSize = Math.round((stage + 0.5) / 2) + 1;
    const totalCells = Math.pow(gridSize, 2);
    return Math.floor(Math.random() * totalCells);
  };

  const handleSquareClick = (index: number) => {
    if (index === answerIndex) {
      const stageScore = Math.pow(stage, 3) * remainingTime;
      setScore((prevScore) => prevScore + stageScore);
      moveToNextStage();
    } else setRemainingTime((prevTime) => Math.max(prevTime - 3, 0));
  };

  const moveToNextStage = () => {
    setStage((prevStage) => prevStage + 1);
    setRemainingTime(15);
    setAnswerIndex(generateRandomIndex(stage + 1));
  };

  const restartGame = () => {
    setStage(1);
    setScore(0);
    setRemainingTime(15);
    setAnswerIndex(generateRandomIndex(stage + 1));
    setGameOver(false);
  };

  if (remainingTime <= 0) {
    return (
      <div>
        <div>Game</div>
        <p>게임 종료</p>
        <p>최종 stage: {stage}</p>
        <p>누적 score: {score}</p>
        <button onClick={restartGame}>새로운 게임시작</button>
      </div>
    );
  }
  return (
    <div>
      <p>Stage: {stage}</p>
      <p>Score: {score}</p>
      <p>남은 시간: {remainingTime}초</p>

      <Wrapper stage={stage}>
        {[...Array(Math.pow(Math.round((stage + 0.5) / 2) + 1, 2))].map(
          (_, index) => (
            <Square
              key={index}
              index={index}
              answerIndex={answerIndex}
              stage={stage}
              onClick={handleSquareClick}
            />
          )
        )}
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.section<{ stage: number }>`
  display: grid;
  grid-template-columns: repeat(
    ${(props) => Math.round((props.stage + 0.5) / 2) + 1},
    50px
  );
  gap: 5px;
`;

export default Game;
