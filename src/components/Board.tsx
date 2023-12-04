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
  const [typePost, setTypePost] = useState('');
  const [optionClicked, setOptionClicked] = useState(null);

  const [selectedCell, setSelectedCell] = useState<{
    term: string;
    definition: string;
  } | null>(null);

  // State for displaying QuestionModal
  const [questionModalVisible, setQuestionModalVisible] = useState<boolean>(false);
  const [questionModalContent, setQuestionModalContent] = useState<{
    question: string;
    options: string[];
    answer: string;
  } | null>(null);

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
    if (!isMoveDisabled) {
      const ladderStartPoints = [3, 8, 13, 19, 33, 36, 37, 50, 54];
      const ladderEndPoints = [12, 16, 22, 30, 52, 44, 47, 69, 63];
      const snakeStartPoints = [10, 27, 24, 31, 43, 40, 58, 70, 65];
      const snakeEndPoints = [1, 9, 15, 23, 26, 30, 39, 51, 55];
  
      let snakeCount = 0;
      let ladderCount = 0;
  
      const nextPosition = dieNumber + playerPosition;
      let eventEncountered = '';
  
      // Check if the player is at the starting point of a ladder or a snake
      const isLadderStart = ladderStartPoints.includes(nextPosition);
      const isSnakeStart = snakeStartPoints.includes(nextPosition);
  
      if (isLadderStart) {
        setTypePost('ladder');
        ladderCount += 1;
        console.log(typePost);
      } else if (isSnakeStart) {
        setTypePost('snake');
        snakeCount += 1;
        console.log(typePost);
      }
  
      // Get questionModalContent from GameData
      const eventIndex = isLadderStart
        ? ladderStartPoints.indexOf(nextPosition)
        : isSnakeStart
        ? snakeStartPoints.indexOf(nextPosition)
        : -1;
  
      if (eventIndex !== -1) {
        const eventContent = gameContent.find(cell => cell.id === (isLadderStart ? ladderStartPoints[eventIndex] : snakeStartPoints[eventIndex]));
  
        if (eventContent) {
          setQuestionModalContent({
            question: eventContent.question || '',
            options: eventContent.options || [],
            answer: eventContent.answer || '',
          });
        }
  
        // Cap playerPosition at 72
        const newPosition = Math.min(isLadderStart ? ladderEndPoints[eventIndex] : snakeEndPoints[eventIndex], 72);
        setPlayerPosition(newPosition);
  
        // Enable rolling dice after encountering a ladder or snake
        setIsMoveDisable(true);
        setIsRollDisable(false);
  
        // Show QuestionModal for ladder or snake
        setQuestionModalVisible(true);
      } else {
        // Check if the player landed on a cell with quiz information
        const currentCell = gameContent.find(cell => cell.id === nextPosition);
        if (currentCell && currentCell.question && currentCell.options && currentCell.answer) {
          eventEncountered = 'quiz';
  
          // Display the question modal
          setQuestionModalContent({
            question: currentCell.question,
            options: currentCell.options,
            answer: currentCell.answer,
          });
          setQuestionModalVisible(true);
  
          // Disable move and roll dice after encountering a quiz
          setIsMoveDisable(true);
          setIsRollDisable(true);
        } else {
          // Cap playerPosition at 72
          const newPosition = Math.min(nextPosition, 72);
          // Move the player to the next position
          setPlayerPosition(newPosition);
  
          // Enable rolling dice after a move
          setIsMoveDisable(true);
          setIsRollDisable(false);
  
          // Check for winning condition
          if (newPosition >= 72) {
            setGameWon(true);
            alert('You have won');
          }
        }
      }
  
      // Display snake and ladder counts in the console
      console.log(`Snakes encountered: ${snakeCount}`);
      console.log(`Ladders encountered: ${ladderCount}`);
    } else {
      // Disable the move and enable rolling dice
      setIsMoveDisable(true);
      setIsRollDisable(false);
    }
  };

  const handleOptionClick = (selectedOption: any) => {
    if (selectedOption === questionModalContent?.answer) {
      // Handle correct answer, change button color, and set timeout
      setOptionClicked(selectedOption);
      setTimeout(() => {
        setQuestionModalVisible(false);
      }, 1000);
    } else {
      // Handle incorrect answer if needed
      // You can add some visual feedback or other actions
      setOptionClicked(selectedOption);
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

      {questionModalVisible && (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="p-4 bg-white bg-gradient bg-cover min-h-[20rem] gap-y-4 lg:gap-y-3 flex flex-col justify-between w-[54rem] px-8 rounded-lg">
            {typePost === 'snake' ? (
              <div className="w-full flex"><div className="p-2 px-3 bg-[#ce42428e] rounded-full">Opps! You hit a snake.</div></div>
            ) : (
              <div className="w-full flex"><div className="py-2 px-3 bg-[#72e23e8e] rounded-full">Yeah! Get ready to climb up a ladder.</div></div>
            )}
            <h1 className="font-semibold text-[20px]">{questionModalContent?.question}</h1>
            {questionModalContent?.options.map((option, index) => (
              <div className="w-full flex flex-start" key={index}>
                <button
                  onClick={() => handleOptionClick(option)}
                  className={`cursor-pointer text-left py-2 px-4 border rounded-full mb-2 ${
                    optionClicked === option ? (option === questionModalContent?.answer ? 'bg-[#72e23e8e]' : 'bg-[#ce42428e]') : ''
                  }`}
                >
                  {option}
                </button>
              </div>
            ))}
            <div className="w-full flex justify-end">
              <button
                className="flex justify-center items-center py-2 px-4 bg-grad rounded-full"
                onClick={() => setQuestionModalVisible(false)}
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default GameBoard;
