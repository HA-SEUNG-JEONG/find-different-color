const useGenerateColor = (
  stage: number,
  index: number,
  answerIndex: number
) => {
  const baseHue = Math.floor((stage - 1) * 60) % 360;
  const saturation = 100;
  const lightness = 30 + Math.min(0.2, (stage - 1) * 0.02);
  const colorDifference = Math.min(0.2, (stage - 1) * 0.002);
  const opacity = index === answerIndex ? 0.9 : 0.7 + colorDifference;
  return `rgba(${baseHue}, ${saturation}, ${lightness}, ${opacity})`;
};

export default useGenerateColor;
