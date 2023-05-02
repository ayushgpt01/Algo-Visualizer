import { useState, useEffect } from "react";

import { getRandomInt, swap } from "../../utils/MathUtils";
import { BubbleSort } from "../../utils/SortArray";

// Style Imports
import {
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { Bar, Container, VisualizerBox } from "./Visualizer.styled";

const Visualizer = () => {
  const [array, setArray] = useState<number[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [algorithm, setAlgorithm] = useState<string>("");

  const createArray = () => {
    const arr = [];
    for (let i = 0; i < 100; i++) {
      arr.push(getRandomInt(5, 450));
    }
    setArray(arr);
    setColors(new Array(100).fill("red"));
    setIsSorting(false);
  };

  const sortArray = (resolve: () => void) => {
    const anims = BubbleSort(array);
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
        }, 20);
      }, i * 2);
    }
  };

  const sortArrayHandler = async () => {
    if (isSorting) {
      return;
    }
    setIsSorting(true);
    await new Promise<void>((resolve) => {
      sortArray(resolve);
    });
    // setIsSorting(false);
  };

  const handleAlgorithm = (e: SelectChangeEvent<string>) => {
    setAlgorithm(e.target.value);
  };

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
      <Box sx={{ width: "50%" }} display="flex" justifyContent="space-evenly">
        <Button variant="outlined" color="secondary" onClick={createArray}>
          Reset Array
        </Button>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="medium">
          <InputLabel id="algo-label">Algorithm</InputLabel>
          <Select
            labelId="algo-label"
            id="algo-select"
            value={algorithm}
            label="Algorithm"
            onChange={handleAlgorithm}
          >
            <MenuItem value="bubble-sort">Bubble Sort</MenuItem>
            <MenuItem value="quick-sort">Quick Sort</MenuItem>
            <MenuItem value="merge-sort">Merge Sort</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          color="primary"
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
