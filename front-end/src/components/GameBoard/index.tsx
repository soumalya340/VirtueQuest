"use client";
import { useState } from "react";
import { gameContent } from "./GameContent";
import { enqueueSnackbar } from "notistack";
import Button from "../common/Button";

const GameBoard = () => {
  const [dieNumber, setDieNumber] = useState<number>(0);
  const [playerPosition, setPlayerPosition] = useState<number>(0);
  const [isMoveDisabled, setIsMoveDisable] = useState<boolean>(true);
  const [isRollDisabled, setIsRollDisable] = useState<boolean>(false);
  const [gameWon, setGameWon] = useState<boolean>(false);

  console.log(dieNumber, playerPosition);

  const getRandomNumber = () => {
    const randomDecimal = Math.random();
    const randomNumber = Math.floor(randomDecimal * 6) + 1;
    return randomNumber;
  };

  return (
    <>
      <div className="flex justify-center items-stretch">
        {/* -----------------------------------  */}
        {/* <div className="border h-[600px] w-[800px] px-2 py-2 ">  */}
        <div>
          <div className="grid grid-cols-8 grid-rows-6 ">
            {gameContent
              .slice()
              .reverse()
              .map(({ id, term, definition }) => (
                <>
                  <div
                    key={id}
                    className="h-24 w-24 border px-2 py-2 flex justify-between flex-col text-sm cursor-pointer active:border-orange-500 hover:border-blue-500"
                    onClick={() => {
                      enqueueSnackbar(definition, {
                        variant: "info",
                      });
                    }}
                  >
                    <div className="text-xs whitespace-nowrap overflow-ellipsis overflow-hidden">
                      {term}
                    </div>
                    <div className="rounded-lg  text-3xl  mx-auto shadow-2xl">
                      {id === playerPosition ? "🦉" : ""}
                    </div>
                    <div className="text-base font-medium">{id}</div>
                  </div>
                </>
              ))}
          </div>
        </div>

        {/* </div> */}
        <div className="flex justify-end flex-col w-10 text-3xl">
          {playerPosition === 0 ? "🦉" : ""}
        </div>
        {/* -------------------  */}

        {/* -----------------------  */}
      </div>
      <div className="flex justify-center mt-8 gap-6">
        <div>
          <Button
            variant={isRollDisabled || gameWon ? "inactive" : "primary"}
            onClick={() => {
              setDieNumber(getRandomNumber());
              setIsMoveDisable(false);
              setIsRollDisable(true);
            }}
            disabled={isRollDisabled || gameWon}
          >
            Roll Die
          </Button>
        </div>
        <div>
          <Button
            variant={isMoveDisabled ? "inactive" : "primary"}
            onClick={() => {
              if (dieNumber + playerPosition < 48) {
                setPlayerPosition(dieNumber + playerPosition);
              } else {
                setPlayerPosition(48);
                setGameWon(true);
                enqueueSnackbar("Congratulations!!! You won", {
                  variant: "success",
                });
              }
              setIsMoveDisable(true);
              setIsRollDisable(false);
            }}
            disabled={isMoveDisabled || gameWon}
          >
            Move
          </Button>
        </div>
      </div>
      <div>
        {gameWon ? (
          <div className="text-center mt-8">
            You have won this round. Kindly refresh to restart your game
          </div>
        ) : (
          <>
            <div className="flex justify-center mt-8">
              You rolled: {dieNumber}
            </div>
            <div className="flex justify-center mt-8">
              postion: {playerPosition}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default GameBoard;
