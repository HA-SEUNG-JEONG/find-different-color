import { useMemo } from "react";

const useGenerateColor = (
  stage: number,
  index: number,
  answerIndex: number
) => {
  return useMemo(() => {
    const baseHue = Math.floor((stage - 1) * 60) % 360;
    const saturation = 100;
    const lightness = 30 + Math.min(0.2, (stage - 1) * 0.02);
    const colorDifference = Math.min(0.2, (stage - 1) * 0.02);
    const opacity = index === answerIndex ? 0.9 : 0.7 + colorDifference;
    return `rgba(${baseHue}, ${saturation}, ${lightness}, ${opacity})`;
  }, [stage]);
};

export default useGenerateColor;
