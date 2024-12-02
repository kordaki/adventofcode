const fs = require("node:fs").promises;

async function readFile() {
  try {
    const data = await fs.readFile("./02.2024.txt", "utf8");
    // const data = await fs.readFile("./mock.txt", "utf8");
    console.log("ok");
    return data;
  } catch (err) {
    console.error(err);
  }
}

const checkSequence = (row) => {
  const isIncreasing = +row[0] < +row[1];
  for(let i = 1; i < row.length; i++) {
    const x = +row[i-1];
    const y = +row[i];
    let diff = isIncreasing ? (y - x) : (x - y);
    if( diff < 1 || diff > 3 ) {
      lineSafe = 0;
      return false;
    };
  }
  return true
} 

////////////////////////////
const first = async () => {
  const input = await readFile();
  const list = input.split("\n"); 
  let safe = 0;

  list.forEach(line => {
    const numbers = line.split(' ')
    const isSafe = checkSequence(numbers)    
    safe = isSafe ? safe+1 : safe;    
  })

  console.log(safe);
};


////////////////////////////
const second = async () => {
  const input = await readFile();
  const list = input.split("\n"); 
  let safe = 0;

  list.forEach(line => {
    let row = line.split(" ");

    if(checkSequence(row)){
      safe++
      return
    } else {
      for(let i = 0; i < row.length; i++) {
        const modifiedArr = [...row]
        modifiedArr.splice(i, 1)
        if(checkSequence(modifiedArr)){
          safe++
          return
        }
      }
    }
  })
  console.log(safe)
}

second()
