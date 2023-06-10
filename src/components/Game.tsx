import styled from "styled-components";
import { useCallback, useEffect, useState } from "react";
import Square from "./Square";
import useCreateRandomSquare from "../hooks/useCreateRandomSquare";
import { initialGameState } from "../data/initialGameState";
import CurrentGameInfo from "./CurrentGameInfo";
import FinalGameInfo from "./FinalGameInfo";

const Game = () => {
  const [state, setState] = useState(initialGameState);

  const stage = state.stage;
  const score = state.score;
  const answerIndex = state.answerIndex;
  const remainingTime = state.remainingTime;

  const square = useCreateRandomSquare(stage);

  const updateGameState = useCallback((newState: Partial<typeof state>) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      updateGameState({ remainingTime: remainingTime - 1 });
    }, 1000);

    const handleGameOver = () => {
      clearInterval(timer);
      alert(`게임 종료 ${stage}단계, ${score}점`);
    };

    if (remainingTime <= 0) handleGameOver();

    return () => {
      clearInterval(timer);
    };
  }, [score, stage, remainingTime, updateGameState]);

  const initializeGame = (square: number) => {
    const randomIndex = Math.floor(Math.random() * square);
    updateGameState({ remainingTime: 15, answerIndex: randomIndex });
  };

  const moveToNextStage = (stage: number) => {
    updateGameState({ stage: stage + 1 });
    initializeGame(square);
  };

  const handleCorrectAnswer = () => {
    const stageScore = Math.pow(stage, 3) * remainingTime;
    updateGameState({ score: score + stageScore });
    moveToNextStage(stage);
  };

  const handleWrongAnswer = () => {
    updateGameState({ remainingTime: Math.max(remainingTime - 3, 0) });
  };

  const handleSquareClick = (index: number) => {
    index === state.answerIndex ? handleCorrectAnswer() : handleWrongAnswer();
  };

  const startNewGame = () => {
    updateGameState({ stage: 1, score: 0 });
    initializeGame(square);
  };

  const randomSquareNumber = Math.pow(Math.round((stage + 0.5) / 2) + 1, 2);

  const squareData = { answerIndex, stage };

  return remainingTime > 0 ? (
    <>
      <Title>Game</Title>
      <CurrentGameInfo state={state} />
      <Wrapper square={square} stage={state.stage}>
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
        <FinalGameInfo state={state} />
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

const Wrapper = styled.section<{ stage: number; square: number }>`
  display: grid;
  grid-template-columns: repeat(
    ${(props) => Math.round((props.stage + 0.5) / 2) + 1},
    3rem
  );
  grid-auto-rows: repeat(${(props) => Math.round((props.stage + 0.5) / 2) + 1});
`;

export default Game;
