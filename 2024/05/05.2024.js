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

const rulesDic = {};
const getSanitizedInput = (input) => {
  const splittedInput = input.split("\n\n");
  const rules = splittedInput[0].split("\n").map((items) => items.split("|"));
  const list = splittedInput[1].split("\n").map((items) => items.split(","));
  return { rules, list };
};


// { '75': { after: [ '29', '53', '47', '61', '13' ], before: [ '97' ] }}
const getRulesForPage = (page, rules) => {
  if (rulesDic[page]) return rulesDic[page];
  const sortedRules = { after: [], before: [] };
  rules.forEach((rule) => {
    if (rule[0] === page) {
      sortedRules.after.push(rule[1]);
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
      const page = row[i];
      const rulesForPage = getRulesForPage(page, rules);
      for (let j = i + 1; j < row.length; j++) {
        const pagePass = rulesForPage.after.includes(row[j]) && !rulesForPage.before.includes(row[j]);
        if (!pagePass) {
          rowPass = false;
          const temp = row[i];
          row[i] = row[j];
          row[j] = temp;
          i = 0;
          j = 1;
          break;
        }
      }
      // if(!rowPass) break;
    }
    if (!rowPass) {
      const mid = row[Math.floor(row.length / 2)];
      console.log("+++ rowPass:", rowPass, mid, row);
      output += parseInt(mid);
    }
  });

  console.log("==output", output);
};

first();



// second answer = 4971