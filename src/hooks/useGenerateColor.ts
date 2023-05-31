const useGenerateColor = (
  stage: number,
  index: number,
  answerIndex: number
) => {
  const baseHue = Math.floor((stage - 1) * 60) % 360;
  const saturation = 200;
  const lightness = 30;
  const opacity = index === answerIndex ? 1 : 0.7;

  return `rgba(${baseHue}, ${saturation}, ${lightness}, ${opacity})`;
};

export default useGenerateColor;
