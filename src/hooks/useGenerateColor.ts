import { useMemo } from "react";

const useGenerateColor = (
  stage: number,
  index: number,
  answerIndex: number
) => {
  return useMemo(() => {
    const baseHue = Math.floor((stage - 1) * 60) % 360;
    const saturation = 200;
    const lightness = 30;
    const colorDifference = Math.min(0.2, (stage - 1) * 0.02);
    const opacity = index === answerIndex ? 0.9 : 0.7 + colorDifference;

    return `hsla(${baseHue}, ${saturation}%, ${lightness}%, ${opacity})`;
  }, [stage, index, answerIndex]);
};

export default useGenerateColor;
