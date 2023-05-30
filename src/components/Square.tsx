import styled from "styled-components";

interface SquareProps {
  index: number;
  answerIndex: number;
  onClick: (index: number) => void;
  stage: number;
}

const Square = ({ index, answerIndex, onClick, stage }: SquareProps) => {
  const generateColor = (stage: number, index: number, answerIndex: number) => {
    const baseHue = Math.floor((stage - 1) * 60) % 360;
    const saturation = 200;
    const lightness = 30;
    const opacity = index === answerIndex ? 1 : 0.7;
    return `hsla(${baseHue}, ${saturation}%, ${lightness}%, ${opacity})`;
  };

  const isAnswer = index === answerIndex;
  const baseOpacity = 0.7;
  const opacity = baseOpacity + (stage - 1) * 0.1;

  const randomColor = `rgba(0, 0, 255, ${opacity})`;
  const color = generateColor(stage, index, answerIndex);
  //event type with button
  const handleClick = (event: any) => {
    event.stopPropagation();
    onClick(index);
  };

  return (
    <Board
      style={{
        width: "50px",
        height: "50px",
        backgroundColor: color,
        display: "inline-block",
        margin: "5px",
      }}
      onClick={handleClick}></Board>
  );
};

const Board = styled.section`
  width: 50px;
  height: 50px;
  background-color: color;
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Square;
