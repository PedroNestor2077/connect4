import { boardCols } from "const";
import { atom } from "recoil";
import { Board, Player } from "types";

export const boardState = atom<Board>({
  key: "boardState",
  default: Array(boardCols).fill([]),
});

export const playerState = atom<Player>({
  key: "playerState",
  default: 1,
});

export const gameOverState = atom<boolean>({
  key: "gameOverState",
  default: false,
});

export const playerInfo = atom<any>({
  key: "playerInfo",
  default: {
    1: { color: "Red", name: "Red" },
    2: { color: "Yellow", name: "Yellow" },
  },
});

export const isBot = atom<any>({
  key: "isBot",
  default: false,
});
