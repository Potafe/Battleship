import component from "./component";
import messages from "../assets/messages/messages";

const functions = (() => {
  const BOARD_SIZE = 10;

  const deleteContent = () => {
    const app = document.getElementById("app");
    app.replaceChildren("");
  };

  const loadCoordinatesX = () => {
    const numberContainerX = document.createElement("div");
    numberContainerX.classList = "numberx-container";
    numberContainerX.id = "numberx-container";

    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    numbers.forEach((element) => {
      const number = document.createElement("div");
      number.classList = "number";
      number.textContent = element;
      numberContainerX.appendChild(number);
    });

    return numberContainerX;
  };

  const loadCoordinatesY = () => {
    const numberContainerY = document.createElement("div");
    numberContainerY.classList = "numbery-container";
    numberContainerY.id = "numbery-container";

    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    numbers.forEach((element) => {
      const number = document.createElement("div");
      number.classList = "number";
      number.textContent = element;
      numberContainerY.appendChild(number);
    });

    return numberContainerY;
  };

  const createBoard = (descr) => {
    const board = document.createElement("div");
    board.id = `field-container-${descr}`;
    board.className = `field-container`;

    for (let i = 0; i < BOARD_SIZE; i += 1) {
      for (let j = 0; j < BOARD_SIZE; j += 1) {
        const field = document.createElement("div");
        field.className = "field";

        board.appendChild(field);
      }
    }

    return board;
  };

  const createMap = (descr) => {
    const map = document.createElement("div");
    map.id = `board-${descr}`;
    map.classList.add("board", descr);

    map.appendChild(loadCoordinatesX());
    map.appendChild(loadCoordinatesY());
    map.appendChild(createBoard(descr));

    return map;
  };

  const getCoordinates = (index) => {
    const x = parseInt(index / BOARD_SIZE, 10);
    const y = index % BOARD_SIZE;

    return [x, y];
  };

  const getIndex = (x, y) => x * BOARD_SIZE + y;

  const nearestTen = (num) => {
    while (num % 10 !== 0) {
      num += 1;
    }
    return num;
  };

  const randomTen = () => Math.floor(Math.random() * 5) + 1;

  const create = (type, data) => {
    if (!type) return new Error("wrong arguments");

    const element = document.createElement(type);

    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(data)) {
      element.setAttribute(key, value);
    }

    return element;
  };

  const renderBattleMessage = (who) => {
    const message = document.getElementById(`message-${who}`);

    if (who === "friend") {
      component.addTypeWriterMessage(message, messages.getBattleMessage());
    } else {
      component.addTypeWriterMessage(message, messages.getEnemyBattleMessage());
    }
  };

  return {
    deleteContent,
    createMap,
    createBoard,
    getCoordinates,
    getIndex,
    nearestTen,
    randomTen,
    renderBattleMessage,
  };
})();

export default functions;
