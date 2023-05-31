import React, { useMemo } from "react";
import styled from "styled-components";
import useGenerateColor from "../hooks/useGenerateColor";

interface SquareProps {
  index: number;
  answerIndex: number;
  onClick: (index: number) => void;
  stage: number;
}

const Square = ({ index, answerIndex, onClick, stage }: SquareProps) => {
  const color = useGenerateColor(stage, index, answerIndex);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
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
