import styled from "@emotion/styled";

type BarProps = {
  value: number;
  bgColor: string;
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

export const VisualizerBox = styled.div`
  display: flex;
  height: 500px;
`;

export const Bar = styled.div<BarProps>`
  width: 4px;
  margin: 0 2px;
  height: ${(props: BarProps) => props.value}px;
  background-color: ${(props: BarProps) => props.bgColor};
`;
