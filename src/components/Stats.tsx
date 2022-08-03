import styled from 'styled-components';
import { ITetromino } from '../types';
import Cell from './Cell';

const Wrapper = styled.div`
  margin: 10px auto;
  background-color: (0, 0, 64);
  max-width: 200px;
  height: 50px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1px;
`
const Next = styled.div<{rows: number, columns: number}>`
  margin: 5px 20px;
  width: ${({columns}) => 2 * 25}px;
  height: ${({rows}) => 2 * 25}px;
  display: grid;
  grid-gap: 2px;
  grid-template-rows: repeat(${({ rows }) => rows}, 1fr);
  grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
`
const Col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`
type Props = {
  scores: number,
  player: ITetromino,
}
const Stats: React.FC<Props> = ({scores, player}) => {

  return (
    <Wrapper>

      lines:{scores} 
      <Col>
      next
      <Next rows={player.matrix.length} columns={player.matrix[0].length}>
        {
          player.matrix.map(row => row.map((cell, x) => <Cell key={x} cell={cell} />))
        }

      </Next>
      </Col>
    </Wrapper>
  )
}

export default Stats;
