"use client";

import { useState } from "react";
import { gameContent } from "@/lib/GameData";
import { enqueueSnackbar } from "notistack";
import Button from "./Button";
import { IoIosEye } from "react-icons/io";
import Profile from "../../public/profile.png";

const GameBoard = () => {
  const [dieNumber, setDieNumber] = useState<number>(0);
  const [playerPosition, setPlayerPosition] = useState<number>(0);
  const [isMoveDisabled, setIsMoveDisable] = useState<boolean>(true);
  const [isRollDisabled, setIsRollDisable] = useState<boolean>(false);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [selectedCell, setSelectedCell] = useState<{ term: string; definition: string } | null>(null);

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

  const getDieSVGUrl = (number: number) => `/${dieNumberToSVG[number]}`;

  
  const handleMove = () => {
    if (dieNumber + playerPosition < 72) {
      // Calculate the next position
      const nextPosition = dieNumber + playerPosition;

      // Check if the next position is the start of a ladder
      const ladderStartPoints = [3, 8, 13, 19, 33, 36, 37, 50];
      const ladderEndPoints = [12, 16, 22, 30, 52, 44, 47, 69];

      const ladderIndex = ladderStartPoints.indexOf(nextPosition);
      if (ladderIndex !== -1) {
        // Confirm with the player before climbing the ladder
        if (window.confirm("You found a ladder! Climb up?")) {
          setPlayerPosition(ladderEndPoints[ladderIndex]);
        }
      } else {
        // Check if the next position is the start of a snake
        const snakeStartPoints = [10, 27, 24, 31, 43, 40, 58, 70, 65];
        const snakeEndPoints = [1, 9, 15, 23, 26, 30, 39, 51, 55];

        const snakeIndex = snakeStartPoints.indexOf(nextPosition);
        if (snakeIndex !== -1) {
          // Confirm with the player before sliding down the snake
          if (window.confirm("Uh-oh! You found a snake. Slide down?")) {
            setPlayerPosition(snakeEndPoints[snakeIndex]);
          }
        } else {
          // If the next position is neither a ladder nor a snake, set it normally
          setPlayerPosition(nextPosition);
        }
      }

      // Add your remaining logic for disabling moves and enabling rolls
      setTimeout(() => {
        setIsMoveDisable(true);
        setIsRollDisable(false);
      }, 500);
    } else {
      setPlayerPosition(72);
      setGameWon(true);
      enqueueSnackbar("Congratulations!!! You won", {
        variant: "success",
      });
    }
  };


  return (
    <>
      <div className="flex justify-center items-stretch">
        <div className="rounded-xl border-2 bg-board bg-cover lg:bg-boardlg border-[#65E4E0] overflow-hidden">
          <div className="grid grid-cols-9 grid-rows-8">
            {gameContent
              .slice()
              .reverse()
              .map(({ id, term, definition }) => (
                <div
                  key={id}
                  className="h-[3.5rem] w-[7.5rem] lg:w-[5.625rem] border p-[4px] lg:p-[3px] flex justify-between flex-col text-sm cursor-pointer hover:border-[#37F6AE]"
                >
                  <div className="text-xs whitespace-nowrap overflow-ellipsis overflow-hidden">
                    {term}
                  </div>
                  <div className="rounded-lg text-2xl mx-auto shadow-2xl">
                    {id === playerPosition ? (
                      <img
                        src={Profile.src}
                        alt="profile"
                        className="w-[3rem] flex h-[3rem] rounded-[3rem] lg:h-[2rem] lg:w-[2rem] lg:rounded-[2rem] justify-end items-end border"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="text-[13px] p-0 m-0 font-medium flex items-center justify-between">
                    {id}
                    <IoIosEye
                      className='hover:text-primary active:text-primary text-[#9f9f9f]'
                      onClick={() => {
                        setSelectedCell(selectedCell === null || selectedCell.term !== term ? { term, definition } : null);
                      }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="flex justify-end flex-col w-10 text-3xl">
          {playerPosition === 0 ? (
            <img
              src={Profile.src}
              alt="profile"
              className="w-[3rem] flex h-[3rem] rounded-[3rem] lg:h-[2rem] lg:w-[2rem] lg:rounded-[2rem] justify-end items-end border"
            />
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="w-fulll flex justify-center">
        <div className="flex px-[40] lg:px-[30px] bg-grad h-[7.5rem] lg:h-[5.625rem] mb-4 w-[37.5rem] lg:w-[28.125rem] justify-center mt-8 lg:mt-6 gap-6 rounded-[60px] lg:rounded-[45px]">
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
                {isRollDisabled ? (
                  <img
                    src={getDieSVGUrl(dieNumber)}
                    className="w-[64px] h-[64px]"
                    alt="die-icon"
                  />
                ) : (
                  "Roll Die"
                )}
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
                onClick={handleMove}
                disabled={isMoveDisabled || gameWon}
              >
                Move
              </Button>
            </div>
          </div>
        </div>
      </div>

      {selectedCell && (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="p-4 bg-white bg-gradient bg-cover min-h-[20rem] gap-y-4 lg:gap-y-3 flex flex-col justify-between w-[54rem] px-8 rounded-lg">
            <h1 className="font-bold text-[32px]">{selectedCell.term}</h1>
            <p className="text-[#4e4e4e] font-medium">{selectedCell.definition}</p>
            <div className="w-full flex justify-end">
              <button className="flex justify-center items-center py-2 bg-[#46cc46] w-[5rem] rounded-full" onClick={() => setSelectedCell(null)}>Got it!</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GameBoard;
