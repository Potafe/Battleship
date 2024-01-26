import functions from "./functions";
import fleet from "./fleet";
import Gameloop from "../factories/gameloop";

const battle = (() => {
  const loadMapTitle = (titleText) => {
    const titleContainer = document.createElement('div')
    titleContainer.className = 'map-title-container'

    const title = document.createElement('h3')
    title.className = 'map-title'
    title.textContent = titleText

    titleContainer.appendChild(title)

    return titleContainer
  }

  const loadPlayerMap = () => {
    const map = functions.createMap('friendly')
    map.appendChild(loadMapTitle('FRIENDLY WATERS'))

    return map
  }

  const loadCompMap = () => {
    const map = functions.createMap('enemy')
    map.appendChild(loadMapTitle('ENEMY WATERS'))

    return map
  }

  const loadMapSection = () => {
    const  mapsSection = document.createElement("section");
    mapsSection.className = "maps-section";

    mapsSection.appendChild(loadPlayerMap())
    mapsSection.appendChild(loadCompMap())

    return mapsSection
  }

  const renderPlayerShips = () => {
    Gameloop.state.getPlayer().getMap().setAllShipsNotFound()
    fleet.loadFleet()
  }

  const disableField = (field) => field.classList.add('disabled')

  const getShipNameFromBoard = (board) => board.slice(0, board.length - 1)

  const handleFieldClick = (e) => {
    const { target } = e
    disableField(target)

    const index = [...target.parentNode.children].indexOf(target)
    const x = parseInt(index / 10, 10)
    const y = index % 10

    const enemyMap = Gameloop.state.getCPU().getMap().getBoard()

    if (enemyMap[x][y] === 'hit' || enemyMap[x][y] === 'missed') return

    if (enemyMap[x][y] === 'x') {
      console.log('b')
      target.style.backgroundColor = 'lightblue'
    } else {
      const shipName = getShipNameFromBoard(enemyMap[x][y])
      const battleship = enemyMap.getShip(shipName)

      battleship.hit()
      target.style.backgroundColor = 'red'
      target.classList.add('hit')
    }
  }

  const initBoardField = () => {
    const enemyMap = document.getElementById('board-enemy')
    const enemyBoard = enemyMap.querySelector('.field-container')
    enemyBoard.childNodes.forEach((field) => {
      field.addEventListener('click', handleFieldClick)
    })
  }

  const loadBoardsSection = () => {
    functions.deleteContent()

    const app = document.getElementById("app");
    app.classList = ''
    app.classList.add('app', 'setup')

    app.appendChild(loadMapSection())
    renderPlayerShips()
    Gameloop.state.getCPU().autoPlace()
    initBoardField()
  };

  return { loadBoardsSection };
})();

export default battle;
