import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { AlgoTypes } from "../../Types/VisualizerTypes";
import { getRandomInt, swap } from "../../utils/MathUtils";
import { getAlgorithmAnimation } from "../../utils/algorithmUtils";
import { Bar, Container, VisualizerBox } from "./Visualizer.styled";

const Visualizer = () => {
  const [array, setArray] = useState<number[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [algorithm, setAlgorithm] = useState<AlgoTypes>(AlgoTypes.BubbleSort);

  const createArray = useCallback(() => {
    const arr = [];
    for (let i = 0; i < 100; i++) {
      arr.push(getRandomInt(5, 450));
    }
    setArray(arr);
    setColors(new Array(100).fill("red"));
    setIsSorting(false);
  }, []);

  const sortArray = useCallback(
    (resolve: () => void) => {
      const anims = getAlgorithmAnimation(algorithm, array);
      if (!anims) {
        // TODO: Add an UI for case when animation is not present
        return;
      }

      for (let i = 0; i < anims.length; i++) {
        const { index1, index2, didWeSwap } = anims[i];

        setTimeout(() => {
          setArray((prevArray) => {
            const newArray = [...prevArray];
            if (didWeSwap) {
              swap(newArray, index1, index2);
            }
            return newArray;
          });

          setColors((prevColors) => {
            const newColors = [...prevColors];
            newColors[index1] = "blue";
            newColors[index2] = "blue";
            return newColors;
          });

          setTimeout(() => {
            setColors((prevColors) => {
              const newColors = [...prevColors];
              newColors[index1] = "red";
              newColors[index2] = "red";
              return newColors;
            });

            if (i === anims.length - 1) {
              resolve();
            }
          }, 10);
        }, i * 4);
      }
    },
    [algorithm, array]
  );

  const sortArrayHandler = useCallback(async () => {
    if (isSorting) {
      return;
    }

    setIsSorting(true);

    await new Promise<void>((resolve) => {
      sortArray(resolve);
    });
  }, [isSorting, sortArray]);

  useEffect(() => {
    createArray();
  }, []);

  return (
    <Container>
      <VisualizerBox>
        {array.map((value, index) => {
          return <Bar key={index} value={value} bgColor={colors[index]}></Bar>;
        })}
      </VisualizerBox>
      <Box sx={{ width: "50%" }} display='flex' justifyContent='space-evenly'>
        <Button variant='outlined' color='secondary' onClick={createArray}>
          Reset Array
        </Button>
        <FormControl sx={{ m: 1, minWidth: 120 }} size='medium'>
          <InputLabel id='algo-label'>Algorithm</InputLabel>
          <Select
            labelId='algo-label'
            id='algo-select'
            value={algorithm}
            label='Algorithm'
            onChange={(e) => setAlgorithm(e.target.value as AlgoTypes)}
          >
            <MenuItem value={AlgoTypes.BubbleSort}>Bubble Sort</MenuItem>
            <MenuItem value={AlgoTypes.QuickSort}>Quick Sort</MenuItem>
            <MenuItem value={AlgoTypes.MergeSort}>Merge Sort</MenuItem>
            <MenuItem value={AlgoTypes.InsertionSort}>Insertion Sort</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant='outlined'
          color='primary'
          onClick={sortArrayHandler}
          disabled={isSorting}
        >
          Visualize
        </Button>
      </Box>
    </Container>
  );
};

export default Visualizer;
