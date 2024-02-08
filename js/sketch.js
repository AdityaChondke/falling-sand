function make2DArray(rows, cols) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows).fill(0);

  }
  return arr;
}

let grid;
let w = 5;
let cols, rows;

let hueValue = 1;


function setup() {
  createCanvas(400, 700);
  colorMode(HSB, 360, 255, 255);
  cols = width / w;
  rows = height / w;
  grid = make2DArray(rows, cols);

}

function draw() {
  background(0);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      noStroke();
      if (grid[i][j] > 0) {
        fill(grid[i][j], 255, 255);
        let x = i * w;
        let y = j * w;
        square(x, y, w);
      }
    }
  }


  let nextGrid = make2DArray(rows, cols);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      if (state > 0) {
        let below = grid[i][j + 1];

        let dir = random([1, -1]);

        let belowA, belowB;
        if (i + dir >= 0 && i + dir < cols) {
          belowA = grid[i + dir][j + 1];
        }
        if (i - dir >= 0 && i - dir < cols) {
          belowB = grid[i - dir][j + 1];
        }

        if (below === 0) {
          nextGrid[i][j + 1] = state;
        } else if (belowA === 0) {
          nextGrid[i + dir][j + 1] =  state;
        } else if (belowB === 0) {
          nextGrid[i - dir][j + 1] =  state;
        } else {
          nextGrid[i][j] =state;
        }
      }
    }
  }
  grid = nextGrid;
}

function mouseDragged() {
  let mouseCol = floor(mouseX / w);
  let mouseRow = floor(mouseY / w);

  let matrix = 5;
  let extend = floor(matrix / 2);
  for (let i = -extend; i < extend; i++) {
    for (let j = -extend; j < extend; j++) {
      if(random(1) < 0.75) {
      let col = mouseCol + i;
      let row = mouseRow + j;
      if (col >= 0 && col < cols && row >= 0 && row < rows) {
        grid[col][row] = hueValue;
      }
    }
    }
  }

  hueValue += 1;
  if( hueValue > 360) {
    hueValue =1;
  }
}
