export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const swap = (arr : number[],index1 : number,index2: number) => {
  [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
}