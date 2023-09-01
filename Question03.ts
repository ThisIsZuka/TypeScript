function findLadder(ladders: number[][], demoPosition: number) {
  let ladder = ladders.find((ladder) => ladder[0] === demoPosition);
  return ladder ? ladder[1] : 0;
}

function findSnakes(snakes: number[][], demoPosition: number) {
  let snake = snakes.find((snake) => snake[0] === demoPosition);
  return snake ? snake[1] : 0;
}

function forWard() {}

function quickestPath(board: {
  ladders: [number, number][];
  snakes: [number, number][];
}): number[] {
  let listWalk: number[] = [];

  let markPosition: number = 1;

  while (markPosition != 100) {
    let demoPosition: number = markPosition;
    if (markPosition < 100) {
      for (let i: number = 1; i <= 6; i++) {
        demoPosition = demoPosition + 1;
        let snakes: number = findSnakes(board.snakes, demoPosition);
        let ladder: number = findLadder(board.ladders, demoPosition);

        if (snakes != 0) {
          continue;
        } else if (ladder != 0) {
          markPosition = ladder;
          listWalk.push(i);
          break;
        } else if (markPosition + i == 100) {
          listWalk.push(i);
          markPosition = markPosition + i;
          break;
        } else if (i == 6) {
          listWalk.push(i);
          markPosition = markPosition + 6;
        }

        if (markPosition == 100) {
          break;
        }
      }
    } else if (markPosition > 100) {
      for (let i: number = 1; i <= 6; i++) {
        if (markPosition - i == 100) {
          listWalk.push(i);
          markPosition = markPosition - i;
        } else if (i == 6) {
          listWalk.push(i);
          markPosition = markPosition - i;
        }
      }
    }
  }

  // return array of roll results that reach 100 in the shortest possible way.

  return listWalk;
}

let ans: number[] = quickestPath({
  ladders: [
    [3, 39],
    [14, 35],
    [31, 70],
    [44, 65],
    [47, 86],
    [63, 83],
    [71, 93],
  ],
  snakes: [
    [21, 4],
    [30, 8],
    [55, 38],
    [79, 42],
    [87, 54],
    [91, 48],
    [96, 66],
  ],
});

console.log(ans);
