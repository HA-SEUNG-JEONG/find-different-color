import { useEffect, useState } from "react";
import styled from "styled-components";
import Square from "./Square";
import useRandomSquare from "../hooks/useRandomSquare";
import { gameData } from "../utils/gameData";

const Game = () => {
  const [state, setState] = useState(gameData);
  const square = useRandomSquare(state.stage);

  const updateState = (newState: Partial<typeof state>) => {
    setState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      updateState({ remainingTime: state.remainingTime - 1 });
    }, 1000);

    const handleGameOver = () => {
      clearInterval(timer);
      updateState({ isGameOver: true });
    };

    if (state.remainingTime <= 0 && state.isGameOver) handleGameOver();

    return () => {
      clearInterval(timer);
    };
  }, []);

  const initializeGame = (square: number) => {
    updateState({ remainingTime: 15, answerIndex: square + 1 });
  };

  const moveToNextStage = () => {
    updateState({ stage: state.stage + 1 });
    initializeGame(square);
  };

  const handleCorrectAnswer = () => {
    const stageScore = Math.pow(state.stage, 3) * state.remainingTime;
    updateState({ score: state.score + stageScore });
    moveToNextStage();
  };

  const handleWrongAnswer = () => {
    updateState({ remainingTime: Math.max(state.remainingTime - 3, 0) });
  };

  const handleSquareClick = (index: number) => {
    index === state.answerIndex ? handleCorrectAnswer() : handleWrongAnswer();
  };

  const startNewGame = () => {
    updateState({ stage: 1, score: 0, isGameOver: false });
    initializeGame(square);
  };

  const randomSquareNumber = Math.pow(
    Math.round((state.stage + 0.5) / 2) + 1,
    2
  );

  const squareData = {
    answerIndex: state.answerIndex,
    stage: state.stage,
  };

  return state.remainingTime > 0 ? (
    <>
      <Title>Game</Title>
      <p>현재 Stage: {state.stage}</p>
      <p>현재 Score: {state.score}</p>
      <p>남은 시간: {state.remainingTime}초</p>
      <Wrapper stage={state.stage}>
        {[...Array(randomSquareNumber)].map((_, index) => (
          <Square
            key={index}
            index={index}
            squareData={squareData}
            onClick={handleSquareClick}
          />
        ))}
      </Wrapper>
    </>
  ) : (
    <>
      <GameDisplay>
        <p>게임 종료</p>
        <p>최종 stage: {state.stage}</p>
        <p>score: {state.score}</p>
      </GameDisplay>
      <button onClick={startNewGame}>새로운 게임시작</button>
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
