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
        displayMessage(friend, messages.getEnemyHitMessage(friend.textContent))
      } 
      else if (ship.isSunk) {
        displayMessage(friend, messages.getEnemySunkMessage(friend.textContent))
      }
      else {
        displayMessage(friend, messages.getPlayerMissMessage(friend.textContent))
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

  const playerHits = (info) => {
    const enemyBoard = document.getElementById('field-container-enemy')

    const map = info.cpu.getMap()
    const board = map.getBoard()

    map.receiveAttack(info.row, info.col)

    if (info.battleship.isSunk) {
      const [i, j] = findOrigin(board, board[info.row][info.col])
      fleet.loadShipsOnBoard(info.cpu, { map, board: enemyBoard, boardElement: board[info.row][info.col], i , j})
    }
  }

  const displayEnemyMessage = (boardElement, ship = false) => {
    const friend = document.getElementById('message-friend')
    const enemy = document.getElementById('message-enemy')

    if (boardElement !== 'x' && boardElement !== 'miss') {
      if (ship && !ship.isSunk) {
        displayMessage(enemy, messages.getPlayerHitMessage(enemy.textContent))
      }

      else if (ship.isSunk) {
        displayMessage(enemy, messages.getPlayerSunkMessage(enemy.textContent))
      }

      else {
        displayMessage(enemy, messages.getEnemyMissMessage(enemy.textContent))
      }
    }

    if (friend.textContent !== '...') {
      displayMessage(friend, messages.getNoCommentMessage()[0])
    }
  }


  function timeout() {
    return new Promise((resolve) => setTimeout(resolve, 200))
  }

  function timeOutShorty() {
    return new Promise((resolve) => setTimeout(resolve, 100))
  }

  async function cpuPlays() {
    const enemyMessage = document.querySelector('.message.battle.enemy')
    const friendMessage = document.querySelector('.message.battle.friend')

    friendMessage.classList.remove('on-turn')
    enemyMessage.classList.add('on-turn')

    await timeOutShorty()

    const friendBoard = document.getElementById('field-container-friendly')
    const player = Gameloop.state.getPlayer()
    const [row, col] = player.cpuPlay()

    const boardElement = player.getMap().getBoard()[row][col]
    const index = functions.getIndex(row, col) 
    const shipName = getShipNameFromBoard(boardElement)
    const battleship = player.getMap().getShip(shipName)
     
    switch (boardElement) {
      case 'miss': 
        addMiss(friendBoard.children[index])
        player.getMap().getBoard()[row][col] = 'miss'
        break
      
      default: 
        player.getMap().getBoard()[row][col] = 'hit'
        addHit(friendBoard.children[index])
    }

    displayEnemyMessage(boardElement, battleship)
    console.log(player.getMap())

    await timeout()
    enemyMessage.classList.remove('on-turn')
    friendMessage.classList.add('on-turn')
  }

  async function playerPlays(field) {
    const enemyMessage = document.querySelector('.message.battle.enemy')
    const friendMessage = document.querySelector('.message.battle.friend')

    enemyMessage.classList.remove('on-turn')
    friendMessage.classList.add('on-turn')

    await timeOutShorty()

     const cpu = Gameloop.state.getCPU()

    const index = [...field.parentNode.children].indexOf(field)
    const [row, col] = functions.getCoordinates(index)

    const boardElement = cpu.getMap().getBoard()[row][col]
    const shipName = getShipNameFromBoard(boardElement)
    const battleship = cpu.getMap().getShip(shipName)

    switch (boardElement) {
      case 'x': 
        addMiss(field)
        break

      default: 
        addHit(field)
        playerHits({cpu, battleship, row, col})
    }

    displayPlayerMessage(boardElement, battleship)
    await timeout()

  }

  async function handleFieldClick(e) {
    const { target } = e
    disableField(target)
    await playerPlays(target)
    await cpuPlays()
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
    app.classList.add('app', 'battle')

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
