export enum AlgoTypes {
  BubbleSort = "bubble-sort",
  QuickSort = "quick-sort",
  InsertionSort = "insertion-sort",
  MergeSort = "merge-sort",
}

export interface AnimationItem {
  index1: number;
  index2: number;
  didWeSwap: boolean;
}
