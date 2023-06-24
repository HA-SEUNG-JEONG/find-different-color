import { initialGameInfo } from "./data/initialGameInfo";

export interface GameState {
  stage: number;
  score: number;
  answerIndex: number;
  remainingTime: number;
}

interface Action {
  type: string;
  payload: Partial<GameState>;
}

export const gameReducer = (
  state: typeof initialGameInfo,
  action: Action
): GameState => {
  switch (action.type) {
    case "UPDATE_GAME_STATE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
