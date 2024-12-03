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
  let matches = 0;
  let match;
  while ((match = regexPattern.exec(input)) !== null) {
    matches += (+match[1]) * (+match[2]);
  }

  console.log(matches);
};

first();
