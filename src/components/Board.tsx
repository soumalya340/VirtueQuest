"use client";
import { useState } from "react";
import { gameContent } from "@/lib/GameData";
import { enqueueSnackbar } from "notistack";
import Button from "./Button";

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

  const dieNumberToSVG: Record<number, string> = {
    1: 'Dice-1.svg',
    2: 'Dice-2.svg',
    3: 'Dice-3.svg',
    4: 'Dice-4.svg',
    5: 'Dice-5.svg',
    6: 'Dice-6.svg',
  };

  // Dynamically generate the SVG URL based on the rolled die number
  const getDieSVGUrl = (number: number) => `/${dieNumberToSVG[number]}`;

  return (
    <>
      <div className="flex justify-center items-stretch">
        <div className="rounded-xl border-2 border-[#65E4E0] overflow-hidden">
          <div className="grid grid-cols-9 grid-rows-8">
            {gameContent
              .slice()
              .reverse()
              .map(({ id, term, definition }) => (
                <div
                  key={id}
                  className="h-[3.5rem] w-[7.5rem] lg:w-[5.6rem] lg: border px-2 py-2 flex justify-between flex-col text-sm cursor-pointer active:border-orange-500 hover:border-[#37F6AE]"
                  onClick={() => {
                    enqueueSnackbar(definition, {
                      variant: "info",
                    });
                  }}
                >
                  <div className="text-xs whitespace-nowrap overflow-ellipsis overflow-hidden">
                    {term}
                  </div>
                  <div className="rounded-lg text-2xl mx-auto shadow-2xl">
                    {id === playerPosition ? "🦉" : ""}
                  </div>
                  <div className="text-base font-medium">{id}</div>
                </div>
              ))}
          </div>
        </div>

        <div className="flex justify-end flex-col w-10 text-3xl">
          {playerPosition === 0 ? "🦉" : ""}
        </div>
      </div>
      <div className="w-fulll flex justify-center">
        <div className="flex px-[40] lg:px-[30px] bg-grad h-[7.5rem] lg:h-[5.625rem] w-[37.5rem] lg:w-[28.125rem] justify-center mt-8 gap-6 rounded-[60px] lg:rounded-[45px]">
          <div className="flex w-full items-center justify-between">
            <div>
              <Button
                variant={isRollDisabled || gameWon ? "inactive" : "primary"}
                onClick={() => {
                  const rollResult = getRandomNumber();
                  setDieNumber(rollResult);
                  setIsMoveDisable(false);
                  setIsRollDisable(true);
                }}
                disabled={isRollDisabled || gameWon}
              >
                {isRollDisabled ? <img src={getDieSVGUrl(dieNumber)} className="w-[64px] h-[64px]" alt="die-icon"/> : "Roll Die"}
              </Button>
            </div>
            <div className="flex flex-col justify-center relative font-medium -top-4 lg:-top-3 gap-y-1 items-center">
              Position
              <div className="w-[48px] h-[28px] lg:h-[21px] text-[#A8A8A8] text-[1rem] flex items-center justify-center lg:text-[14px] lg:w-[36px] rounded-[5px] bg-[#353535CC]">
                {playerPosition}
              </div>
            </div>
            <div>
              <Button
                variant={isMoveDisabled ? "inactive" : "primary"}
                onClick={() => {
                  if (dieNumber + playerPosition < 72) {
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
        </div>
      </div>
{/*       
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
              position: {playerPosition}
            </div>
          </>
        )}
      </div> */}
    </>
  );
};

export default GameBoard;
