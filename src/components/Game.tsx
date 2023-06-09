import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Square from "./Square";
import useCreateRandomSquare from "../hooks/useCreateRandomSquare";
import { initialGameState } from "../data/initialGameState";
import CurrentScore from "./CurrentScore";
import FinalScore from "./FinalScore";

const Game = () => {
  const [state, setState] = useState(initialGameState);

  const square = useCreateRandomSquare(state.stage);

  const updateState = useCallback((newState: Partial<typeof state>) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      updateState({ remainingTime: state.remainingTime - 1 });
    }, 1000);

    const handleGameOver = () => {
      clearInterval(timer);
      alert(`게임 종료 ${state.stage}단계, ${state.score}점`);
    };

    if (state.remainingTime <= 0) handleGameOver();

    return () => {
      clearInterval(timer);
    };
  }, [state.remainingTime, updateState]);

  const initializeGame = (square: number) => {
    updateState({ remainingTime: 15, answerIndex: square + 1 });
  };

  const moveToNextStage = (stage: number) => {
    updateState({ stage: stage + 1 });
    initializeGame(square);
  };

  const checkCorrectAnswer = () => {
    const stageScore = Math.pow(state.stage, 3) * state.remainingTime;
    updateState({ score: state.score + stageScore });
    moveToNextStage(state.stage);
  };

  const checkWrongAnswer = () => {
    updateState({ remainingTime: Math.max(state.remainingTime - 3, 0) });
  };

  const handleSquareClick = (index: number) => {
    index === state.answerIndex ? checkCorrectAnswer() : checkWrongAnswer();
  };

  const startNewGame = () => {
    updateState({ stage: 1, score: 0 });
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
      <CurrentScore state={state} />
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
        <FinalScore state={state} />
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
    5rem
  );
  grid-auto-rows: repeat(${(props) => Math.round((props.stage + 0.5) / 2) + 1});
  /* background-color: black; */
`;

export default Game;
