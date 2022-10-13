import { boardRows } from "const";

export const fillColumn = (arr: any[], size: number) => {
  return arr.map((col: number[]) => {
    while (col.length < size) {
      col.push(0);
    }
    return col;
  });
};

export const reverseDiagonal = (unsafeArr: any[][]) => {
  const arr = fillColumn(unsafeArr, boardRows);
  return arr.map((row: any[]) => row.reverse());
};

export const getDiagonalsFromLeft = (unsafeArr: any) => {
  const arr = fillColumn(unsafeArr, boardRows);
  const columnSize = arr[0].length;
  const rowSize = arr.length;
  const result = [];
  // Get from column.
  for (let k = 0; k < rowSize; k++) {
    let i = k;
    let j = 0;
    let parcialResult = [];
    while (i >= 0) {
      parcialResult.push(arr[i][j]);
      i -= 1;
      j += 1;
    }
    result.push(parcialResult);
  }

  // Get from last row *Starting at index 1.
  for (let k = 1; k < columnSize; k++) {
    let i = arr.length - 1;
    let j = k;
    let parcialResult = [];

    while (j < columnSize) {
      parcialResult.push(arr[i][j]);

      i -= 1;
      j += 1;
    }
    result.push(parcialResult);
  }
  return result;
};

export const testWin = (arr: number[]): boolean =>
  /1{4}|2{4}/.test(arr.join(""));

export const testBoardWin = (arr: number[][]) =>
  arr.map((row) => testWin(row)).includes(true);
