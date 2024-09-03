import { AlgoTypes, AnimationItem } from "../Types/VisualizerTypes";
import { BubbleSort } from "./BubbleSort";
import { InsertionSort } from "./InsertionSort";

export const getAlgorithmAnimation = (
  algorithm: AlgoTypes,
  sortingArray: number[]
): AnimationItem[] | null => {
  switch (algorithm) {
    case AlgoTypes.BubbleSort:
      return BubbleSort(sortingArray);
    case AlgoTypes.InsertionSort:
      return InsertionSort(sortingArray);
    case AlgoTypes.MergeSort:
    case AlgoTypes.QuickSort:
    default:
      return null;
  }
};
