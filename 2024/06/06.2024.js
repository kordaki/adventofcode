const fs = require("node:fs").promises;

async function readFile() {
  try {
    const data = await fs.readFile("./06.2024.txt", "utf8");
    // const data = await fs.readFile("./mock.txt", "utf8");
    console.log("ok");
    return data;
  } catch (err) {
    console.error(err);
  }
}

const getMapAndGuard = (input) => {
  let guard = { i: 0, j: 0 };
  const map = input.split("\n").map((line, idx) => {
    const splittedLine = line.split("");
    const guardIndex = splittedLine.indexOf("^");
    if (guardIndex !== -1) {
      guard = { i: idx, j: guardIndex };
    }
    return splittedLine;
  });
  return { map, guard };
};

const getNextStep = (position, direction) => {
  switch (direction) {
    case "^": return { nextI: position.i - 1, nextJ: position.j, nextTurn: ">" };
    case ">": return { nextI: position.i, nextJ: position.j + 1, nextTurn: "v" };
    case "v": return { nextI: position.i + 1, nextJ: position.j, nextTurn: "<" };
    case "<": return { nextI: position.i, nextJ: position.j - 1, nextTurn: "^" };
  }
};

////////////////////////////
const first = async () => {
  const input = await readFile();
  const { map, guard } = getMapAndGuard(input);

  const result = new Set([`${guard.i},${guard.j}`]); // result.add('x,y')
  map[guard.i][guard.j] = ".";

  const move = (guardPosition, direction) => {
    console.log(`-- move request to ${direction}:`, guardPosition);
    const { nextI, nextJ, nextTurn} = getNextStep(guardPosition, direction);
    // console.log(`-- -- newStep: ${nextI},${nextJ}=>  and nextTurn: '${nextTurn}'` );
    if ( nextI < 0 || nextJ < 0 || nextI >= map.length || nextJ >= map[0].length ) {
      console.log("-- -- out of map:", nextI, nextJ);
      return;
    }
    if(result.has(`${nextI},${nextJ}`)){
      console.log("-- -- already visited:", nextI, nextJ);
      return move({ i: nextI, j: nextJ }, direction);
    }
    // console.log(`-- -- newStep is: `, map[nextI][nextJ]);
    if (map[nextI][nextJ] === "#") {
      // console.log(`-- -- nextStep is '#', so turn to ${nextTurn}`);
      return move(guardPosition, nextTurn);
    } else {
      result.add(`${nextI},${nextJ}`);
      // console.log(`-- ++ succeeded. new request for ${direction}: ${nextI},${nextJ}`);
      return move({ i: nextI, j: nextJ }, direction);
    }
  };

  move(guard, "^");

  console.log(result.length);
};

first();

////////////////////////////
