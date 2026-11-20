// import React from 'react';
// import {InitialStateType} from './candySlice'
import type { WritableDraft } from '@reduxjs/toolkit';
import { checkForRowOfFour, checkForRowOfThree, isColumnOfFour, isColumnOfThree } from '../../utils//moveCheckLogic.ts';
import { formulaForColumnOfFour, formulaForColumnOfThree, generateInvalidMoves } from '../../utils/formulas.ts';

export const dragEndReducer = (state: WritableDraft<{
  board: string[];
  boardSize: number;
  squareBeingReplaced: Element | undefined,
  squareBeingDragged: Element | undefined,
}>) => {
  const newBoard = [...state.board]
  let { boardSize, squareBeingReplaced, squareBeingDragged } = state;
  //get the index of dragged img
  const squareBeingDraggedId: number = parseInt(squareBeingDragged?.getAttribute('candy-id') as string)
  //get the index of replace img
  const squareBeingReplacedId: number = parseInt(squareBeingReplaced?.getAttribute('candy-id') as string)
  //swapping between img
  newBoard[squareBeingReplacedId] = squareBeingDragged?.getAttribute('src') as string
  newBoard[squareBeingDraggedId] = squareBeingReplaced?.getAttribute('src') as string
  //move between left-right-top-bottom
  const validMoves: number[] = [
    (squareBeingDraggedId) - 1,
    (squareBeingDraggedId) - boardSize,
    (squareBeingDraggedId) + 1,
    (squareBeingDraggedId) + boardSize,
  ]
  console.log(validMoves)
  //determine your moves in range of validMove or not
  const isValidMove = validMoves.includes(squareBeingReplacedId)
  console.log(isValidMove)

  const columnOfFour: boolean | undefined = isColumnOfFour(newBoard, boardSize, formulaForColumnOfFour(boardSize))
  const rowOfFour: boolean | undefined = checkForRowOfFour(newBoard, boardSize, generateInvalidMoves(boardSize, true))
  const columnOfThree: boolean | undefined = isColumnOfThree(newBoard, boardSize, formulaForColumnOfThree(boardSize))
  const rowOfThree: boolean | undefined = checkForRowOfThree(newBoard, boardSize, generateInvalidMoves(boardSize, true))
  if (
    squareBeingReplacedId &&
    validMoves &&
    (rowOfThree || rowOfFour || columnOfFour || columnOfThree)
  ) {
    squareBeingDragged = undefined;
    squareBeingReplaced = undefined;
  } else {
    newBoard[squareBeingReplacedId] = squareBeingReplaced?.getAttribute(
      "src"
    ) as string;
    newBoard[squareBeingDraggedId] = squareBeingDragged?.getAttribute(
      "src"
    ) as string;
  }
  

  state.board = newBoard
}

