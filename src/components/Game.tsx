import styled from "styled-components";
import { useCallback, useEffect, useState } from "react";
import Square from "./Square";
import useCreateRandomSquare from "../hooks/useCreateRandomSquare";
import { initialGameState } from "../data/initialGameState";
import CurrentGameInfo from "./CurrentGameInfo";
import FinalGameInfo from "./FinalGameInfo";

import { toast } from "react-toastify";

interface GameProps {
  stage: number;
  square: number;
}

const Game = () => {
  const [state, setState] = useState(initialGameState);

  const square = useCreateRandomSquare(state.stage);

  const updateGameState = useCallback((newState: Partial<typeof state>) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      updateGameState({ remainingTime: state.remainingTime - 1 });
    }, 1000);

    const handleGameOver = () => {
      clearInterval(timer);
    };

    if (state.remainingTime <= 0) {
      handleGameOver();
      toast.info(`게임 종료 ${state.stage}단계, ${state.score}점`);
    }

    return () => {
      clearInterval(timer);
    };
  }, [state.score, state.stage, state.remainingTime, updateGameState]);

  const initializeGame = (square: number) => {
    const randomIndex = Math.floor(Math.random() * square);
    updateGameState({ remainingTime: 15, answerIndex: randomIndex });
  };

  const moveToNextStage = (stage: number) => {
    updateGameState({ stage: stage + 1 });
    initializeGame(square);
  };

  const handleCorrectAnswer = () => {
    const stageScore = Math.pow(state.stage, 3) * state.remainingTime;
    updateGameState({ score: state.score + stageScore });
    moveToNextStage(state.stage);
  };

  const handleWrongAnswer = () => {
    updateGameState({ remainingTime: Math.max(state.remainingTime - 3, 0) });
  };

  const handleSquareClick = (index: number) => {
    index === state.answerIndex ? handleCorrectAnswer() : handleWrongAnswer();
  };

  const startNewGame = () => {
    updateGameState({ stage: 1, score: 0 });
    initializeGame(square);
  };

  const randomSquareNumber = Math.pow(
    Math.round((state.stage + 0.5) / 2) + 1,
    2
  );

  const squareData = { answerIndex: state.answerIndex, stage: state.stage };

  return state.remainingTime > 0 ? (
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

const Wrapper = styled.section<GameProps>`
  display: grid;
  grid-template-columns: repeat(
    ${(props) => Math.round((props.stage + 0.5) / 2) + 1},
    3rem
  );
  grid-auto-rows: repeat(${(props) => Math.round((props.stage + 0.5) / 2) + 1});
`;

export default Game;
