const fs = require("node:fs").promises;

async function readFile() {
  try {
    const data = await fs.readFile("./05.2024.txt", "utf8");
    // const data = await fs.readFile("./mock.txt", "utf8");
    console.log("ok");
    return data;
  } catch (err) {
    console.error(err);
  }
}

const getSanitizedInput = (input) => {
  const splitted = input.split("\n");
  const separator = splitted.indexOf("");
  const rules = splitted.splice(0, separator).map((order) => order.split("|"));
  const list = splitted
    .splice(1, splitted.length)
    .map((items) => items.split(","));
  return { rules, list };
};
const rulesDic = {};

// { '75': { next: [ '29', '53', '47', '61', '13' ], before: [ '97' ] }}
const getRulesForPage = (page, rules) => {
  if (rulesDic[page]) return rulesDic[page];
  const sortedRules = { next: [], before: [] };
  rules.forEach((rule) => {
    if (rule[0] === page) {
      sortedRules.next.push(rule[1]);
    } else if (rule[1] === page) {
      sortedRules.before.push(rule[0]);
    }
  });
  rulesDic[page] = sortedRules;
  return sortedRules;
};

////////////////////////////
const first = async () => {
  const input = await readFile();
  const { rules, list } = getSanitizedInput(input);
  let output = 0;


  list.forEach((row) => {
    let rowPass = true;
    for (let i = 0; i < row.length - 1; i++) {
      const rulesForPage = getRulesForPage(row[i], rules);
      for (let j = i + 1; j < row.length; j++) {
        const pagePass = rulesForPage.next.includes(row[j]) && !rulesForPage.before.includes(row[j]);
        if (!pagePass) {
          rowPass = false;
          break;
        }
      }
      if(!rowPass) break;
    }
    if(rowPass){
      const mid = row[Math.floor(row.length/2)]
      console.log('+++ rowPass:',rowPass, mid,  row)
      output += parseInt(mid);
    }
  });

  console.log("==output", output);
};

first();

////////////////////////////

const second = async () => {
  const input = await readFile();
  let result = 0;

  console.log(result);
};

// second()
