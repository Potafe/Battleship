import Gameboard from "../factories/gameboard";
import Ship from "../factories/ship";

test("Expect a 10x10 board", () => {
  const pirateSea = Gameboard();

  expect(pirateSea.board).toEqual([
    ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
    ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
    ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
    ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
    ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
    ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
    ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
    ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
    ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
    ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
  ]);
});

test("X battleship", () => {
  const board = Gameboard();
  const battleship = Ship("battleship", 4);
  board.placeX(battleship, 3, 3);

  expect(board.board).toEqual([
    ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
    ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
    ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
    [
      "x",
      "x",
      "x",
      `${battleship.getName()}X`,
      `${battleship.getName()}X`,
      `${battleship.getName()}X`,
      `${battleship.getName()}X`,
      "x",
      "x",
      "x",
    ],
    ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
    ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
    ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
    ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
    ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
    ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
  ]);
});

test("Y Battleship", () => {
  const board = Gameboard();

  const battleship = Ship("battleship", 4);
  board.placeY(battleship, 2, 2);

  expect(board.board).toEqual([
    ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
    ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
    ["x", "x", `${battleship.getName()}Y`, "x", "x", "x", "x", "x", "x", "x"],
    ["x", "x", `${battleship.getName()}Y`, "x", "x", "x", "x", "x", "x", "x"],
    ["x", "x", `${battleship.getName()}Y`, "x", "x", "x", "x", "x", "x", "x"],
    ["x", "x", `${battleship.getName()}Y`, "x", "x", "x", "x", "x", "x", "x"],
    ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
    ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
    ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
    ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
  ]);
});

test("Expect missed coordinates", () => {
  const g = Gameboard();

  g.placeY(Ship("battleship", 4), 3, 4);
  g.receiveAttack(0, 4);

  expect(g.board[0][4]).toEqual("miss");
  expect(g.missedTarget).toEqual([[0, 4]]);
});

test("Expect ship at given co-ordinates to be sunk", () => {
  const g = Gameboard();

  g.placeY(Ship("battleship", 4), 3, 4);
  g.receiveAttack(3, 4);
  g.receiveAttack(4, 4);

  expect(g.getShip("battleship").getHits()).toEqual(2);
});

test("Expect ship at given co-ordinates to be sunk", () => {
  const g = Gameboard();

  g.placeY(Ship("battleship", 4), 3, 4);
  g.receiveAttack(3, 4);
  g.receiveAttack(4, 4);
  g.receiveAttack(5, 4);
  g.receiveAttack(6, 4);

  expect(g.getShip("battleship").sunkStatus()).toEqual(true);
});

test("Expect ship at given co-ordinates to be sunk", () => {
  const g = Gameboard();

  g.placeX(Ship("battleship", 4), 2, 0);
  g.placeX(Ship("carrier", 5), 0, 0);
  g.placeX(Ship("destroyer", 2), 4, 2);
  g.placeY(Ship("submarine", 3), 7, 9);
  g.placeX(Ship("cruiser", 3), 3, 3);

  // carrier
  g.receiveAttack(0, 0);
  g.receiveAttack(0, 1);
  g.receiveAttack(0, 2);
  g.receiveAttack(0, 3);
  g.receiveAttack(0, 4);

  // battleship
  g.receiveAttack(2, 0);
  g.receiveAttack(2, 1);
  g.receiveAttack(2, 2);
  g.receiveAttack(2, 3);

  // cruiser
  g.receiveAttack(3, 3);
  g.receiveAttack(3, 4);
  g.receiveAttack(3, 5);

  // submarine
  g.receiveAttack(7, 9);
  g.receiveAttack(8, 9);
  g.receiveAttack(9, 9);

  //  destroyer
  g.receiveAttack(4, 2);
  g.receiveAttack(4, 3);

  expect(g.allSunk()).toEqual(true);
});
