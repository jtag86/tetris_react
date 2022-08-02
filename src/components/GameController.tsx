import React from 'react'
import styled from 'styled-components'
import { attemptMovement } from '../business/Controller';
import { Action, typeOfAction } from '../business/Input';
import { useInterval } from '../hooks/useInterval'
import { IBoard, IField, ITetromino } from '../types'

const defaultDelay = 250;
let action: Action | null = null;

interface Props {
  board: IBoard,
  player: ITetromino[],
  setPlayer: React.Dispatch<React.SetStateAction<ITetromino[]>>,
  addPlayer: () => void,
  field: IField,
  setField: React.Dispatch<React.SetStateAction<IField>>,
  stopGameOver: () => void,
}

const Wrapper = styled.div`
  margin-top: 0rem;
  display: flex;
  justify-content: center;
  align-content: center;
`

const Controller = styled.button`
  position: absolute;
  left: -100rem;
  background-color: #fff;
`

const GameController: React.FC<Props> = ({
  board, 
  player,
  setPlayer,
  addPlayer,
  field,
  setField,
  stopGameOver,
}) => {

  useInterval(() => {
    handleInput(action = Action.ArrowDown)
  }, defaultDelay)

  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    handleInput(e.code as Action);
  }

  const handleInput = (action: Action | null) => {
    attemptMovement(
      action,
      board,
      player,
      setPlayer,
      addPlayer,
      field,
      setField,
      stopGameOver,
    )
  }

  return (
    <Wrapper>
      <Controller onKeyDown={onKeyDown} autoFocus />
    </Wrapper>
  )
}

export default GameController;
