const fs = require("node:fs").promises;

async function readFile() {
  try {
    // const data = await fs.readFile("./05.2024.txt", "utf8");
    const data = await fs.readFile("./mock.txt", "utf8");
    console.log("ok");
    return data;
  } catch (err) {
    console.error(err);
  }
}

const rulesDic = {};
const getSanitizedInput = (input) => {
  const splitted = input.split("\n\n");
  splitted[0].split("\n").forEach((items) => {
    const [x, y] = items.split("|");
    if (rulesDic[x]) {
      rulesDic[x].push(y);
    } else {
      rulesDic[x] = [y];
    }
  });
  const list = splitted[1].split("\n").map((items) => items.split(","));
  return { rulesDic, list };
};

// // { '75': { next: [ '29', '53', '47', '61', '13' ], before: [ '97' ] }}
// const getRulesForPage = (page, rules) => {
//   if (rulesDic[page]) return rulesDic[page];
//   const sortedRules = { next: [], before: [] };
//   rules.forEach((rule) => {
//     if (rule[0] === page) {
//       sortedRules.next.push(rule[1]);
//     } else if (rule[1] === page) {
//       sortedRules.before.push(rule[0]);
//     }
//   });
//   rulesDic[page] = sortedRules;
//   return sortedRules;
// };

////////////////////////////
const first = async () => {
  const input = await readFile();
  const { rulesDic, list } = getSanitizedInput(input);
  let output = 0;

  list.forEach((row) => {
    // const row = list[3]
    let rowPass = true;
    for (let i = 0; i < row.length - 1; i++) {
      const page = row[i];
      const rulesForPage = rulesDic[page] || [];
      for (let j = i + 1; j < row.length; j++) {
        const pagePass = rulesForPage.includes(row[j]);
        if (!pagePass) {
          // console.log('--- rowPass:',rowPass, row[i], row[j], rulesForPage.next, rulesForPage.before)
          rowPass = false;
          // const temp = row[i];
          // row[i] = row[j];
          // row[j] = temp;
          // i = 0;
          // j = 1;
          break;
        }
      }
      // if(!rowPass) break;
    }
    if (rowPass) {
      const mid = row[Math.floor(row.length / 2)];
      console.log("+++ rowPass:", rowPass, mid, row);
      output += parseInt(mid);
    }
  });

  console.log("==output", output);
};

first();

