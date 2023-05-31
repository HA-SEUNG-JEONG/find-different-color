const useRandomSquare = (stage: number) => {
  const gridSize = Math.round((stage + 0.5) / 2) + 1;

  const totalCells = Math.pow(gridSize, 2);
  console.log(gridSize, totalCells);
  return Math.floor(Math.random() * totalCells);
};

export default useRandomSquare;
