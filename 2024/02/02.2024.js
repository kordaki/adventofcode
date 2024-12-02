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

const first = async () => {
  const input = await readFile();
  
  const list = input.split("\n"); 
  let safe = 0;

  list.forEach(line => {
    const numbers = line.split(' ')
    let lineSafe = 1;
    let isIncreasing = +numbers[0] < +numbers[1];
    for(let i = 0; i < numbers.length - 1; i++) {
      const x = +numbers[i];
      const y = +numbers[i + 1];
      let diff = isIncreasing ? (y - x) : (x - y);

      if( diff < 1 || diff > 3 ) {
        lineSafe = 0;
        break;
      };
      
    }
    safe += lineSafe;    
  })

  console.log(safe);
};


first();
