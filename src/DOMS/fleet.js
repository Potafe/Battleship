import battleshipX from "../assets/BattleshipX.svg";
import carrierX from "../assets/CarrierX.svg";
import cruiserX from "../assets/CruiserX.svg";
import destroyerX from "../assets/DestroyerX.svg";
import submarineX from "../assets/SubmarineX.svg";
import Gameloop from "../factories/gameloop";

const fleet = (() => { 
  
  const loadShipImage = (shipName) => {
    let shipImage  

    switch (shipName) {
      case "battleshipX":
        shipImage = battleshipX
        break;

      case "carrierX":
        shipImage = carrierX
        break;

      case "cruiserX":
        shipImage = cruiserX
        break;

      case "destroyerX":
        shipImage = destroyerX
        break;

      case "submarineX":
        shipImage = submarineX
        break;

      default:
        shipImage = ''
    }

    return shipImage
  }

  const loadShipsOnBoard = (boardElement, info) => {

    const shipName = info.boardElement.slice(0, info.boardElement.length - 1)
    const ship = player.getMap().getShip(shipName)

    if (ship.found()) return
    ship.found()

    const length = ship.getLength()
    const [height, width] = [`10%`, `${length * 10}%`]
    const [top, left] = [`${info.i * 10}%`, `${info.j * 10}%`]
    const axis = info.boardElement.at(-1)
    let rotation = 'rotate(0deg)'

    if (axis === 'Y') rotation = 'rotate(90deg) translate(0, -100%)'

    const shipDiv = document.createElement('div')
    shipDiv.style.position = 'absolute'
    shipDiv.style.zIndex = '-1'
    shipDiv.style.top = top
    shipDiv.style.left = left
    shipDiv.style.width = width
    shipDiv.style.height = height
    shipDiv.style.transform = rotation
    shipDiv.style.transformOrigin = 'top left'

    const image = document.createElement('img')
    image.src = loadShipImage(shipName)
    image.style.height = '95%'
    image.style.aspectRatio = `${length}/1`

    shipDiv.appendChild(image)
    info.board.appendChild(shipDiv)
  }

  const loadFleet = (board) => {
    
    const map = Gameloop.state.getPlayer().getMap()
    const mapArray = map.getBoard()
    console.log(mapArray)

    for (let i = 0; i < mapArray.length; i+=1) {
        for (let j = 0; j < mapArray[0].length; j+=1) {
            if (mapArray[i][j] !== 'x') {
                loadShipsOnBoard(mapArray[i][j], {
                    map, board, i, j,
                })
            }
        }
    }
  }

  return { loadShipsOnBoard, loadFleet };

})()

export default fleet;
