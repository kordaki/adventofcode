const fs = require("node:fs").promises;

async function readFile() {
  try {
    const data = await fs.readFile("./01.2024.txt", "utf8");
    console.log("ok");
    return data;
  } catch (err) {
    console.error(err);
  }
}

const main = async () => {
  const input = await readFile();
  const list = input.split("\n");

  let sum = 0;

  list.forEach( (line) =>  {
    let number = '';
    for(let i = 0; i < list.length; i++) {
        if( !!(+line[i]) ) { number += line[i]; break; }
    }
    for(let j = list.length - 1; j >= 0; --j) {
        if( !!(+line[j]) ) { number += line[j]; break; }
    }
    sum += (+number);
  })

  console.log(sum);
};

main();
