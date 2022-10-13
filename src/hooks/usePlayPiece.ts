import { boardRows } from "const";
import {
  getDiagonalsFromLeft,
  reverseDiagonal,
  testBoardWin,
  testWin,
} from "domain/winCases";
import { useRecoilState } from "recoil";
import { boardState, gameOverState, playerState } from "state";

const usePlayPiece = () => {
  const [board, setBoard] = useRecoilState(boardState);
  const [player, setPlayerTurn] = useRecoilState(playerState);
  const [gameOver, setGameOver] = useRecoilState(gameOverState);

  return (col: number) => {
    // Prevent adding a piece when the game is over
    if (gameOver) {
      return;
    }

    // Prevent adding a piece when the column is full
    if (board[col].length === boardRows) {
      return;
    }

    // Play piece (non mutating)
    const newBoard = board.map((column, i) =>
      i === col ? [...column, player] : column
    );
    console.log(newBoard);
    const row = newBoard[col].length - 1;
    const winCases = [
      testWin(newBoard[col]), // Did win vertically
      testWin(newBoard.map((col) => col[row] || 0)), // Did win horizontally
      testBoardWin(getDiagonalsFromLeft(JSON.parse(JSON.stringify(newBoard)))), // Did win 1/2 diagonally
      testBoardWin(
        getDiagonalsFromLeft(
          reverseDiagonal(JSON.parse(JSON.stringify(newBoard)))
        ) // Did win 2/2 diagonally
      ),
    ];

    if (winCases.includes(true)) {
      setGameOver(true);
    } else {
      setPlayerTurn(player === 1 ? 2 : 1);
    }
    setBoard(newBoard);
  };
};

export default usePlayPiece;
