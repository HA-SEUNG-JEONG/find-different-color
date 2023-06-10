import { useMemo } from "react";

const useCreateRandomSquare = (stage: number) => {
  const gridSize = Math.round((stage + 0.5) / 2) + 1;
  const totalCells = Math.pow(gridSize, 2);
  return useMemo(() => {
    const randomIndex = Math.floor(Math.random() * totalCells);
    return randomIndex;
  }, [totalCells]);
};

export default useCreateRandomSquare;
