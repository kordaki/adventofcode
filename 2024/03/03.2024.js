const fs = require("node:fs").promises;

async function readFile() {
  try {
    const data = await fs.readFile("./03.2024.txt", "utf8");
    // const data = await fs.readFile("./mock.txt", "utf8");
    console.log("ok");
    return data;
  } catch (err) {
    console.error(err);
  }
}

////////////////////////////
const first = async () => {
  const input = await readFile();
  const regexPattern = /mul\((\d+),(\d+)\)/g;
  let sum = 0;
  let match;
  while ((match = regexPattern.exec(input)) !== null) {
    sum += (+match[1]) * (+match[2]);
  }

  console.log(sum);
};

////////////////////////////

const isMull = (text) => text.startsWith('mul')
const isDo = (text) => text === "do()"
const isDont = (text) => text === "don't()"

const regexMul = /mul\((\d+),(\d+)\)/;

const second = async () => {
  const input = await readFile();
  const regexSanitizing = /mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g;
  const matches = input.match(regexSanitizing);

  let enabled = true
  let result = 0;
  matches.forEach(item => {
    if(isDont(item)) {
      enabled = false
    } else if(isDo(item)){
      enabled = true
    } else if(enabled && isMull(item)){
      const match = item.match(regexMul);
      result += (+match[1]) * (+match[2]);
    }
  })
  console.log(result)
};

second()
