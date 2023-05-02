import { swap } from "./MathUtils";

export const BubbleSort = (arr: number[]) => {
  const sortedArray = [...arr];
  const anims = [];

  for (let i = 0; i < sortedArray.length; i++) {
    for (let j = 0; j < sortedArray.length - i - 1; j++) {
      if (sortedArray[j] > sortedArray[j + 1]) {
        anims.push({ index1: j, index2: j + 1, didWeSwap: true });
        swap(sortedArray, j, j + 1);
      } else {
        anims.push({ index1: j, index2: j + 1, didWeSwap: false });
      }
    }
  }

  return anims;
};
