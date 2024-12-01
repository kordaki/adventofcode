const fs = require("node:fs").promises;

async function readFile() {
  try {
    const data = await fs.readFile("./01.2024.txt", "utf8");
    // const data = await fs.readFile("./mock.txt", "utf8");
    console.log("ok");
    return data;
  } catch (err) {
    console.error(err);
  }
}

const main = async () => {
  const input = await readFile();
  
  let leftSide = [];
  let rightSide = [];

  // take each line
  const list = input.split("\n"); // [ '3   4', '4   3', '2   5', '1   3', '3   9', '3   3' ]
  list.forEach(line => {
    const numbers = line.split('   ')
    leftSide.push(+numbers[0]);
    rightSide.push(+numbers[1]);
  })

  leftSide.sort((a, b) => a - b)
  rightSide.sort((a, b) => a - b)

  let totalDistance = 0;

  for (let i = 0; i < leftSide.length; i++) {
    totalDistance += Math.abs(leftSide[i] - rightSide[i]);
  }
  console.log(totalDistance);
};

main();
