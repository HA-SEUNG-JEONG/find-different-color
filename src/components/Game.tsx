import { useEffect, useState } from "react";
import styled from "styled-components";
import Square from "./Square";
import useRandomSquare from "../hooks/useRandomSquare";

const Game = () => {
  const [stage, setStage] = useState(1);
  const [score, setScore] = useState(0);
  const [remainingTime, setRemainingTime] = useState(15);
  const [answerIndex, setAnswerIndex] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const square = useRandomSquare(stage);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    const handleGameOver = () => {
      clearInterval(timer);
      setGameOver(true);
    };

    if (remainingTime <= 0 && gameOver) handleGameOver();

    return () => {
      clearInterval(timer);
    };
  }, []);

  const resetGame = (square: number) => {
    setRemainingTime(15);
    setAnswerIndex(square + 1);
  };

  const moveToNextStage = () => {
    setStage((prevStage) => prevStage + 1);
    resetGame(square);
  };

  const handleSquareClick = (index: number) => {
    //정답인 경우
    if (index === answerIndex) {
      const stageScore = Math.pow(stage, 3) * remainingTime;
      setScore((prevScore) => prevScore + stageScore);
      moveToNextStage();
    } //오답인 경우
    else setRemainingTime((prevTime) => Math.max(prevTime - 3, 0));
  };

  const restartGame = () => {
    setStage(1);
    setScore(0);
    resetGame(square);
    setGameOver(false);
  };

  const randomSquareNumber = Math.pow(Math.round((stage + 0.5) / 2) + 1, 2);

  const squareData = { answerIndex, stage };

  return remainingTime > 0 ? (
    <div>
      <Title>Game</Title>
      <p>현재 Stage: {stage}</p>
      <p>현재 Score: {score}</p>
      <p>남은 시간: {remainingTime}초</p>
      <Wrapper stage={stage}>
        {[...Array(randomSquareNumber)].map((_, index) => (
          <Square
            key={index}
            index={index}
            squareData={squareData}
            onClick={handleSquareClick}
          />
        ))}
      </Wrapper>
    </div>
  ) : (
    <>
      <GameDisplay>
        <p>게임 종료</p>
        <p>최종 stage: {stage}</p>
        <p>누적 score: {score}</p>
      </GameDisplay>
      <button onClick={restartGame}>새로운 게임시작</button>
    </>
  );
};

const Title = styled.p`
  font-size: 2rem;
  font-weight: bold;
  text-align: left;
  margin-top: 2rem;
`;

const GameDisplay = styled.div`
  width: 18rem;
  padding-left: 1.25rem;
`;

const Wrapper = styled.section<{ stage: number }>`
  display: grid;
  grid-template-columns: repeat(
    ${(props) => Math.round((props.stage + 0.5) / 2) + 1},
    3rem
  );
  gap: 0.3rem;
`;

export default Game;
