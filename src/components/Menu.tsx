import React from 'react'
import styled from 'styled-components'

const Button = styled.div`
  padding: 40px 0px;
  font-size: 3rem;
  border-radius: 20px;
  border: none;
  background-color: #347B98;
  cursor: pointer;
  max-width: 300px;
  text-align: center;
  margin: 10rem auto;
  box-shadow: 0px 0px 10px 10px rgba( 0, 0, 0, 0.5);
  color: white;
  line-height: 1.5;
`

type Props = {
  handleClick: () => void
}

const Menu: React.FC<Props> = ({handleClick}) => {
  return (
    <Button onClick={handleClick}>Play Tetris</Button>
  )
}
export default Menu
