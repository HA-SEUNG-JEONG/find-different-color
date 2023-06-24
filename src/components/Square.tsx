import styled from "styled-components";

interface SquareProps {
  answerIndex: number;
  stage: number;
  index: number;
  onClick: (index: number) => void;
}
const Square = ({ answerIndex, stage, index, onClick }: SquareProps) => {
  const getColor = (stage: number, index: number, answerIndex: number) => {
    const baseHue = Math.floor((stage - 1) * 60) % 360;
    const lightness = 30 + Math.min(0.2, (stage - 1) * 0.02);
    const colorDifference = Math.min(0.2, (stage - 1) * 0.002);
    const opacity = index === answerIndex ? 0.9 : 0.7 + colorDifference;

    return `rgba(${baseHue}, 100, ${lightness}, ${opacity})`;
  };

  const color = getColor(stage, index, answerIndex);

  const handleClick = () => onClick(index);

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
