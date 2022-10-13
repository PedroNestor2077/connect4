import { Circle, Flex } from "@chakra-ui/react";
import { boardRows, playerColor } from "const";
import { usePlayPiece } from "hooks";
import { FC, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { boardState, gameOverState, isBot, playerState } from "state";
import { Player } from "types";

const padCol = (col: number[]): number[] =>
  col.join("").padEnd(boardRows, "0").split("").map(Number);

const Board: FC = () => {
  const play = usePlayPiece();
  const board = useRecoilValue(boardState);
  const player = useRecoilValue(playerState);
  const gameOver = useRecoilValue(gameOverState);
  const isBotEneabled = useRecoilValue(isBot);
  useEffect(() => {
    if (player === 2 && isBotEneabled) {
      play(Math.floor(Math.random() * 6));
    }
  }, [player]);
  return (
    <Flex
      justify="center"
      w="100vw"
      h="70vh"
      alignItems="center"
      overflowX="auto"
    >
      {board.map((col, i) => (
        <Flex
          key={i}
          role="group"
          onClick={() => play(i)}
          flexDirection="column-reverse"
          cursor={gameOver ? "auto" : "pointer"}
        >
          {padCol(col).map((p, j) => (
            <Circle
              m={1}
              size={{ base: "20px", sm: "40px" }}
              key={`${i}-${j}`}
              boxShadow="inner"
              bg={playerColor[p as Player] || "gray.300"}
              _hover={{ backgroundColor: "grey" }}
            />
          ))}
          <Circle
            m={1}
            size={{ base: "20px", sm: "40px" }}
            boxShadow="base"
            visibility="hidden"
            bg={playerColor[player]}
            _groupHover={{
              visibility: gameOver ? "hidden" : "visible",
            }}
          />
        </Flex>
      ))}
    </Flex>
  );
};

export default Board;
