import functions from "./functions";
import fleet from "./fleet";
import Gameloop from "../factories/gameloop";
import comp from "./component";

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
    mapsSection.appendChild(comp.createMessageSection('battle'))

    return mapsSection
  }

  const renderPlayerShips = () => {
    const friendlyBoard = document.getElementById('field-container-friendly')
    Gameloop.state.getPlayer().getMap().setAllShipsNotFound()
    fleet.loadFleet(friendlyBoard)
  }

  const disableField = (field) => field.classList.add('disabled')

  const getShipNameFromBoard = (board) => board.slice(0, board.length - 1)

  const findOrigin = (board, element) => {
    for (let i = 0; i < board.length; i += 1) {
      for (let j = 0; j < board[0].length; j += 1) {
        if (board[i][j] === element) return [i, j]
      }
    }
    return [0, 0]
  }

  const getMessageNumber = (node) => node.className.split('-')[2]

  const displayHitMessage = (ship) => {
    const messageElement = document.getElementById('message-text')
    const messageCurrentNumber = getMessageNumber(messageElement)
    let messageNewNumber = messageCurrentNumber

    while (messageCurrentNumber === messageNewNumber) {
      messageNewNumber = functions.randomOneToTen().toString()
    }

    if (!ship.isSunk) {
      messageElement.className = 'message-text'
      messageElement.classList.add(`hit-${functions.randomOneToTen()}`)
      messageNewNumber = `hit-${functions.randomOneToTen()}`
    }
    if (ship.isSunk) {
      messageElement.className = 'message-text'
      messageElement.classList.add(`sunk-${functions.randomOneToTen()}`)
      messageNewNumber = `hit-${functions.randomOneToTen()}`
      fleet.loadFleet()
    }
  }

  const displayMissMessage = () => {
    const messageElement = document.getElementById('message-text')
    const messageCurrentNumber = getMessageNumber(messageElement)
    let messageNewNumber = messageCurrentNumber

    while (messageCurrentNumber === messageNewNumber) {
      messageNewNumber = functions.randomOneToTen().toString()
    }

    messageElement.className = 'message-text'
    messageElement.classList.add(`miss-${messageNewNumber}`)
  }

  const handleFieldClick = (e) => {
    const { target } = e
    disableField(target)

    const index = [...target.parentNode.children].indexOf(target)
    const x = parseInt(index / 10, 10)
    const y = index % 10

    const enemyMap = Gameloop.state.getCPU().getMap()
    const enemyBoard = Gameloop.state.getCPU().getMap().getBoard()
    console.log('ENEMY MAP', enemyMap)

    if (enemyBoard[x][y] === 'hit' || enemyBoard[x][y] === 'missed') return

    if (enemyBoard[x][y] === 'x') {
      displayMissMessage()
      target.style.backgroundColor = 'lightblue'
      target.classList.add('miss')
    } else {
      const shipName = getShipNameFromBoard(enemyMap[x][y])
      const battleship = enemyMap.getShip(shipName)

      battleship.hit()
      displayHitMessage(battleship)
      target.style.backgroundColor = 'red'
      target.classList.add('hit')
      const enemyFields = document.getElementById('field-container-enemy')
      const [i, j] = findOrigin(enemyBoard, enemyBoard[x][y])

      if (battleship.sunk()) {
        fleet.loadShipsOnBoard(Gameloop.state.getCPU(), {
          map: enemyMap,
          board: enemyFields,
          boardElement: enemyBoard[x][y]
        })
      }

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
