import styled from "styled-components";
import { useCallback, useEffect, useReducer } from "react";
import Square from "./Square";
import { initialGameInfo } from "../data/initialGameInfo";
import CurrentGameInfo from "./CurrentGameInfo";
import FinalGameInfo from "./FinalGameInfo";

import { toast } from "react-toastify";
import { gameReducer } from "../gameReducerreducer";

interface GameProps {
  stage: number;
  square: number;
}

const Game = () => {
  const [state, dispatch] = useReducer(gameReducer, initialGameInfo);

  const { stage, score, answerIndex, remainingTime } = state;

  const getBoardData = (stage: number) => {
    const gridSize = Math.round((stage + 0.5) / 2) + 1;
    const totalCells = Math.pow(gridSize, 2);
    return Math.floor(Math.random() * totalCells);
  };

  const square = getBoardData(stage);

  const updateGameState = useCallback((newState: Partial<typeof state>) => {
    dispatch({ type: "UPDATE_GAME_STATE", payload: newState });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      updateGameState({ remainingTime: remainingTime - 1 });
    }, 1000);

    const handleGameOver = () => {
      clearInterval(timer);
    };

    if (remainingTime <= 0) {
      handleGameOver();
      toast.info(`게임 종료 ${stage}단계, ${score}점`);
    }

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
    const stageScore = Math.pow(stage, 3) * state.remainingTime;
    updateGameState({ score: score + stageScore });
    moveToNextStage(stage);
  };

  const handleWrongAnswer = () => {
    updateGameState({ remainingTime: Math.max(remainingTime - 3, 0) });
  };

  const handleSquareClick = (index: number) => {
    index === answerIndex ? handleCorrectAnswer() : handleWrongAnswer();
  };

  const startNewGame = () => {
    updateGameState({ stage: 1, score: 0 });
    initializeGame(square);
  };

  const randomSquareNumber = Math.pow(Math.round((stage + 0.5) / 2) + 1, 2);

  return remainingTime > 0 ? (
    <>
      <Title>Game</Title>
      <CurrentGameInfo state={state} />
      <Wrapper square={square} stage={stage}>
        {[...Array(randomSquareNumber)].map((_, index) => (
          <Square
            key={index}
            index={index}
            answerIndex={answerIndex}
            stage={stage}
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
      <Button onClick={startNewGame}>새로운 게임시작</Button>
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

const Button = styled.button`
  background-color: #e7ebef;
  color: #3b82f6;
  border: none;
  border-radius: 0.5rem;
  width: 9rem;
  height: 3rem;
  transition: 0.3s;
  font-weight: bold;

  &:hover {
    background-color: #3b82f6;
    box-shadow: 0 0 0 5px #3b83f65f;
    color: #fff;
    cursor: pointer;
  }
`;

export default Game;
