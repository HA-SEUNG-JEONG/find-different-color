import styled from "styled-components";
import useGenerateColor from "../hooks/useGenerateColor";

interface SquareProps {
  squareData: { answerIndex: number; stage: number };
  index: number;
  onClick: (index: number) => void;
}
const Square = ({ squareData, index, onClick }: SquareProps) => {
  const { answerIndex, stage } = squareData;
  const color = useGenerateColor(stage, index, answerIndex);

  const handleClick = () => {
    onClick(index);
  };

  return <SquareButton color={color} onClick={handleClick}></SquareButton>;
};

const SquareButton = styled.button<{ color: string }>`
  display: flex;
  width: 3rem;
  height: 3rem;
  background-color: ${(props) => props.color};
  cursor: pointer;
`;

export default Square;
