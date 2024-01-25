import start from "./start";
import battle from "./battle";
import Gameloop from "../factories/gameloop";
import functions from "./functions";
import setup from "./setup";
import fleet from "./fleet";
import Ship from "../factories/ship";
import drag from "./drag";

const page = (() => {
  const game = Gameloop.initializeGame();

  const found = {
    carrier: false,
    battleship: false,
  }

  const shipOnDrag = {
    name: '',
    length: '',
  }


  const loadSetup = () => {
    functions.deleteContent()
    setup.loadSetupMaterial()
    console.log(game.player.getMap())
    drag.draggableFields(shipOnDrag, found, game.player.getMap())
  }

  const playButton = () => {
    const button = document.getElementById("play-button");
    button.addEventListener("click", loadSetup);
  };

  const loadContent = () => {
    start.loadCard();
    playButton();
  };

  const handleFieldClick = (event) => {
    const { target } = event

    const index = [...target.parentNode.children].indexOf(target)
    const x = parseInt(index / 10, 10)
    const y = index % 10

    const friendlyMap = game.player.board.getBoard()
    const enemyMap = game.cpu.board.getBoard()

    if (friendlyMap[x][y] === 'hit' || friendlyMap[x][y] === 'missed') return

    if (friendlyMap[x][y] === 'x') {
      console.log('b')
      target.style.backgroundColor = 'lightblue'
    } else {
      console.log('r')
      target.classList.add('hit')
    }
  }

  const initBoardFields = (boardNode) => {
    boardNode.childNodes.forEach((field) => {
      field.addEventListener('click', handleFieldClick)
    })
  }

  return { loadContent };
})();

export default page;
