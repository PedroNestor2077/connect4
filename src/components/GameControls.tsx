import { Button, Flex, Input } from "@chakra-ui/react";
import { FC } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import {
  boardState,
  gameOverState,
  playerInfo,
  playerState,
  isBot,
} from "state";

const GameControls: FC = () => {
  const board = useRecoilValue(boardState);
  const resetBoard = useResetRecoilState(boardState);
  const resetPlayer = useResetRecoilState(playerState);
  const resetGameOver = useResetRecoilState(gameOverState);
  const [isBotEneabled, setIsBot] = useRecoilState<any>(isBot);
  const handleReset = () => {
    resetBoard();
    resetPlayer();
    resetGameOver();
  };

  const [players, setPlayers] = useRecoilState(playerInfo);

  const onChange = ({ target: { value: name } }: any, key: any) => {
    const obj = { ...players };
    obj[key] = { name, color: players[key].color };
    setPlayers(obj);
  };

  return (
    <Flex direction={"column"}>
      <Button
        onClick={handleReset}
        isDisabled={!board.some((col) => col.length)}
      >
        Reset
      </Button>
      <Input
        placeholder="Player 1 Name"
        my={3}
        onChange={(e) => onChange(e, 1)}
      />
      <Input placeholder="Player 2 Name" onChange={(e) => onChange(e, 2)} />
      <Button onClick={() => setIsBot(!isBotEneabled)} my={3}>
        Turn Bot {isBotEneabled ? "Off" : "On"}
      </Button>
    </Flex>
  );
};

export default GameControls;
