import functions from "./functions";
import fleet from "./fleet";
import Gameloop from "../factories/gameloop";
import comp from "./component";
import messages from '../assets/messages/messages'

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

    mapsSection.appendChild(comp.createMessageSection(['battle', 'friend']))
    mapsSection.appendChild(comp.createMessageSection(['battle', 'enemy']))
    
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

  const clearTypeWriter = (node) => {
    if (node.nextElementSibling) {
      node.textContent = ''
      node.nextElementSibling.remove()
    }
  }

  const displayMessage = (node, message) => {
    clearTypeWriter(node)
    comp.addTypeWriterMessage(node, [message])
  }

  const displayPlayerMessage = (boardElement, ship = false) => {
    const friend = document.getElementById('message-friend')
    const enemy = document.getElementById('message-enemy')

    console.log(ship, ship.isSunk)

    if (boardElement !== 'x') {
      if (ship && !ship.isSunk) {
        displayMessage(friend, messages.getNewEnemyHitMessage(friend.textContent))
      } 
      else if (ship.isSunk) {
        displayMessage(friend, messages.getNewEnemySunkMessage(friend.textContent))
      }
      else {
        displayMessage(friend, messages.getNewPlayerMissMessage(friend.textContent))
      }
    }

    if (enemy.textContent !== '...') {
      displayMessage(enemy, messages.getNoCommentMessage()[0])
    }

  }

  const addHit = (node) => {
    node.classList.add('hit')
  }

  const addMiss = (node) => {
    node.classList.add('miss')
  }

  const handleFieldClick = (e) => {
    const { target } = e
    disableField(target)

    const index = [...target.parentNode.children].indexOf(target)
    const x = parseInt(index / 10, 10)
    const y = index % 10

    const board = document.getElementById('field-container-enemy')
    const cpu = Gameloop.state.getCPU()
    const map = cpu.getMap()
    const enemyBoard = map.getBoard()

    const boardElement = enemyBoard[x][y]
    const shipName = getShipNameFromBoard(enemyBoard[x][y])
    const battleship = map.getShip(shipName)
    console.log('ENEMY MAP', map)
    
    if (boardElement === 'x') addMiss(target)
    
    else {
      battleship.hit()

      const [i, j] = findOrigin(enemyBoard, enemyBoard[x][y])
      if (battleship.isSunk) {
        fleet.loadShipsOnBoard(cpu, {map, board, boardElement, i, j})
      }
      addHit(target)
    }
    displayPlayerMessage(enemyBoard[x][y], battleship)
  }

  const initBoardField = () => {
    const enemyMap = document.getElementById('board-enemy')
    const enemyBoard = enemyMap.querySelector('.field-container')
    enemyBoard.childNodes.forEach((field) => {
      field.addEventListener('click', handleFieldClick)
    })
  }

  const loadBattleSection = () => {
    functions.deleteContent()

    const app = document.getElementById("app");
    app.classList = ''
    app.classList.add('app', 'setup')

    app.appendChild(loadMapSection())
    renderPlayerShips()
    Gameloop.state.getCPU().autoPlace()

    functions.renderBattleMessage('friend')
    functions.renderBattleMessage('enemy')

    initBoardField()
  };

  return { loadBattleSection };
})();

export default battle;
