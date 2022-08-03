import React, { Dispatch, SetStateAction, useState } from 'react'
import styled from 'styled-components'
import { attemptMovement } from '../logic/Controller';
import { Action, typeOfAction } from '../logic/Input';
import { useInterval } from '../hooks/useInterval'
import { IBoard, IField, IRemovedRows, ITetromino } from '../types'
import { FaChevronDown } from 'react-icons/fa';
import { FaChevronLeft } from 'react-icons/fa';
import { FaChevronRight } from 'react-icons/fa';
import { FiRotateCw } from 'react-icons/fi';

import pressButtonSound from '../assets/sound/pressButton.wav'

let action: Action | null = null;

const defaultDelay = 800;



interface Props {
  board: IBoard,
  player: ITetromino[],
  setPlayer: Dispatch<SetStateAction<ITetromino[]>>,
  addPlayer: () => void,
  field: IField,
  setField: Dispatch<SetStateAction<IField>>,
  stopGameOver: () => void,
  setCleanedRows: Dispatch<SetStateAction<number>>,
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

const ButtonsWrapper = styled.div`
  position: relative;
`

const Button = styled.div`
  position: absolute;
  transform: translate(-50%, 50%);
  box-shadow: 0px 0px 10px 4px rgba(52,123,152, 0.8);
  border-radius: 50%;
  background-color: #347B98;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  :active {
    box-shadow: 0px 0px 10px 5px rgba( 0, 0, 0, 0.5);
  }
`
const UpButton = styled(Button)`
  top: 0px;
  left: 0px;
`

const DownButton = styled(Button)`
  top: 50px;
  left: 0px;
`

const LeftButton = styled(Button)`
  top: 25px;
  left: -50px;
`

const RightButton = styled(Button)`
  top: 25px;
  left: 50px;
`
const GameController: React.FC<Props> = ({
  board, 
  player,
  setPlayer,
  addPlayer,
  field,
  setField,
  stopGameOver,
  setCleanedRows,
}) => {

  const pressButton = new Audio(pressButtonSound);

  useInterval(() => {
      handleInput(action = Action.ArrowDown)
  }, defaultDelay)

  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {

    pressButton.play();
    handleInput(e.code as Action);
  }

  const handleClick = (action: Action | null) => {
    pressButton.play();

    handleInput(action)
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
      setCleanedRows,
    )
  }

  return (
    <Wrapper>
      <Controller onKeyDown={onKeyDown} autoFocus />
      <ButtonsWrapper>
        <UpButton onClick={() => handleClick(Action.ArrowUp)}> <FiRotateCw color='white'/> </UpButton>
        <DownButton onClick={() => handleClick(Action.ArrowDown)}> <FaChevronDown color="white"/> </DownButton>
        <LeftButton onClick={() => handleClick(Action.ArrowLeft)}> <FaChevronLeft color="white"/> </LeftButton>
        <RightButton onClick={() => handleClick(Action.ArrowRight)}> <FaChevronRight color="white"/> </RightButton>
      </ButtonsWrapper>
    </Wrapper>
  )
}

export default GameController;
