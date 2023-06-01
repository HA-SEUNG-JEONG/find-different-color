import styled from "styled-components";
import useGenerateColor from "../hooks/useGenerateColor";

interface SquareProps {
  squareData: {
    answerIndex: number;
    stage: number;
  };
  index: number;
  onClick: (index: number) => void;
}
const Square = ({ squareData, index, onClick }: SquareProps) => {
  const { answerIndex, stage } = squareData;
  const color = useGenerateColor(stage, index, answerIndex);

  const handleClick = () => {
    onClick(index);
  };

  return <Section color={color} onClick={handleClick}></Section>;
};

const Section = styled.button<{ color: string }>`
  width: 3rem;
  height: 3rem;
  background-color: ${(props) => props.color};
  display: inline-block;
  margin: 5px;
`;

export default Square;
