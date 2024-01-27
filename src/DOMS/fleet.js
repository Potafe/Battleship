import battleshipX from "../assets/images/BattleshipX.svg";
import carrierX from "../assets/images/CarrierX.svg";
import cruiserX from "../assets/images/CruiserX.svg";
import destroyerX from "../assets/images/DestroyerX.svg";
import submarineX from "../assets/images/SubmarineX.svg";
import Gameloop from "../factories/gameloop";

const fleet = (() => { 

  let startTime = null

  const getCurrentTime = () => {
    if (startTime === null) {
      startTime = new Date().getTime()
    }
    return (new Date().getTime() - startTime) / 1000
  }
  
  const loadShipImage = (shipName) => {
    let shipImage  

    switch (shipName) {
      case "battleship":
        shipImage = battleshipX
        break;

      case "carrier":
        shipImage = carrierX
        break;

      case "cruiser":
        shipImage = cruiserX
        break;

      case "destroyer":
        shipImage = destroyerX
        break;

      case "submarine":
        shipImage = submarineX
        break;

      default:
        shipImage = ''
    }

    return shipImage
  }

  const loadShipsOnBoard = (player, info) => {

    const shipName = info.boardElement.slice(0, info.boardElement.length - 1)
    const ship = player.getMap().getShip(shipName)

    if (ship.found()) return
    ship.gotFound()

    const length = ship.getLength()
    const [height, width] = [`10%`, `${length * 10}%`]
    const [top, left] = [`${info.i * 10}%`, `${info.j * 10}%`]
    const axis = info.boardElement.at(-1)
    let rotation = 'rotate(0deg)'

    if (axis === 'Y') rotation = 'rotate(90deg) translate(0, -100%)'

    const currentTime = getCurrentTime()
    console.log(currentTime)

    const shipDiv = document.createElement('div')
    shipDiv.classList.add('ship-image-container')
    shipDiv.style.position = 'absolute'
    shipDiv.style.zIndex = '-1'
    shipDiv.style.top = top
    shipDiv.style.left = left
    shipDiv.style.width = width
    shipDiv.style.height = height
    shipDiv.style.transform = rotation
    shipDiv.style.transformOrigin = 'top left'
    shipDiv.style.maskImage = carrierX
    shipDiv.style.animationDelay = `${-currentTime}s`

    const image = document.createElement('img')
    image.className =
      player.isCpu === true ? `${shipName}-cpu` : `${shipName}-player`
    image.classList.add('placed-ship')
    image.src = loadShipImage(shipName)
    image.style.height = '95%'
    image.style.aspectRatio = `${length}/1`

    shipDiv.appendChild(image)
    info.board.appendChild(shipDiv)
  }

  const loadFleet = (board) => {
    
    const player = Gameloop.state.getPlayer()
    const map = player.getMap()
    const mapArray = map.getBoard()
    console.log(mapArray)

    for (let i = 0; i < mapArray.length; i+=1) {
        for (let j = 0; j < mapArray[0].length; j+=1) {
            if (mapArray[i][j] !== 'x') {
                loadShipsOnBoard(player, {
                    map, board, boardElement: mapArray[i][j], i, j,
                })
            }
        }
    }
  }

  return { loadShipsOnBoard, loadFleet };

})()

export default fleet;
