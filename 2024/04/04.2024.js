const fs = require("node:fs").promises;

async function readFile() {
  try {
    const data = await fs.readFile("./04.2024.txt", "utf8");
    // const data = await fs.readFile("./mock.txt", "utf8");
    console.log("ok");
    return data;
  } catch (err) {
    console.error(err);
  }
}

const X = "X";
const M = "M";
const A = "A";
const S = "S";

////////////////////////////
const first = async () => {
  const input = await readFile();
  let result = 0;

  const data = input.split("\n").map(line => line.split(''));

  const rows = data.length;
  const columns = data[0].length;

  const checkRight = (i,j) => {
    if(columns - j < 4 ) return false;
    return (data[i][j+1] === M) && (data[i][j+2] === A) && (data[i][j+3]===S) ? 1 : 0;
  };
  const checkLeft = (i,j) => {
    if(j < 3 ) return false;
    return (data[i][j-1] === M) && (data[i][j-2] === A) && (data[i][j-3]===S) ? 1 : 0;
  };
  const checkUp = (i,j) => {
    if(i < 3 ) return false;
    return (data[i-1][j] === M) && (data[i-2][j] === A) && (data[i-3][j]===S) ? 1 : 0;
  };
  const checkDown = (i,j) => {
    if(i > rows - 4 ) return false;
    return (data[i+1][j] === M) && (data[i+2][j] === A) && (data[i+3][j]===S) ? 1 : 0;
  };
  const checkTopRight = (i,j) => {
    if(i < 3 || j > columns - 4 ) return false;
    return (data[i-1][j+1] === M) && (data[i-2][j+2] === A) && (data[i-3][j+3]===S) ? 1 : 0;
  };
  const checkTopLeft = (i,j) => {
    if(i < 3 || j < 3 ) return false;
    return (data[i-1][j-1] === M) && (data[i-2][j-2] === A) && (data[i-3][j-3]===S) ? 1 : 0;
  };
  const checkBottomRight = (i,j) => {
    if(i > rows - 4 || j > columns - 4 ) return false;
    return (data[i+1][j+1] === M) && (data[i+2][j+2] === A) && (data[i+3][j+3]===S) ? 1 : 0;
  };
  const checkBottomLeft = (i,j) => {
    if(i > rows - 4 || j < 3 ) return false;
    return (data[i+1][j-1] === M) && (data[i+2][j-2] === A) && (data[i+3][j-3]===S)? 1 : 0;
  };

  const checkAllDirections = (i,j) => {
    return checkRight(i,j) + checkLeft(i,j) + checkUp(i,j) + checkDown(i,j) +
      checkTopRight(i,j) + checkTopLeft(i,j) + checkBottomRight(i,j) + checkBottomLeft(i,j);
  }

  for(let i = 0; i < rows; i++) {
    for(let j = 0; j < columns; j++) {
      // check for X => XMAS
      if(data[i][j] === X) {
        result += (checkAllDirections(i,j)) 
      }
    }
  }
  console.log(result);
};

// first()

////////////////////////////

const second = async () => {
  const input = await readFile();
  let result = 0;
  const data = input.split("\n").map(line => line.split(''));

  const rows = data.length;
  const columns = data[0].length;

  const checkTopLeft = (i,j) => {
    if(data[i-1][j-1] === data[i+1][j+1]) return ;
    if(([M,S].includes(data[i-1][j-1])) && ([M,S].includes(data[i+1][j+1]))) return true
    return false;
  };
  const checkTopRight = (i,j) => {
    if(data[i-1][j+1] === data[i+1][j-1]) return false;
    if(([M,S].includes(data[i-1][j+1])) && ([M,S].includes(data[i+1][j-1]))) return true
    return false
  };
  const checkAllDirections = (i,j) => {
    return checkTopLeft(i,j) && checkTopRight(i,j) ? 1 : 0
  }

  for(let i = 1; i < rows - 1; i++) {
    for(let j = 1; j < columns - 1 ; j++) {
      if(data[i][j] === A) {
        result += checkAllDirections(i,j)
      }
    }
  }

  console.log(result)
};

second()
