import battleship from "../assets/Battleship.svg";
import carrier from "../assets/Carrier.svg";
import cruiser from "../assets/Cruiser.svg";
import destroyer from "../assets/Destroyer.svg";
import submarine from "../assets/Submarine.svg";
import Gameloop from "../factories/gameloop";

const fleet = (() => { 
  const loadBattleship = (info) => {
    info.board.style.backroundImage +=
      info.board.style.backroundImage === ""
        ? `url(${battleship})`
        : `, url(${battleship})`;

    info.board.style.backroundSize +=
      info.board.style.backroundSize === "" ? "40% 9.50%" : ", 40% 9.50%";

    const backroudPos = `${info.j * 17.5 - (info.j / 2 + info.j / 5)}% ${info.i * 11 + info.i / 10}%`
    info.board.style.backroudPos +=
      info.board.style.backroudPos === ""
        ? `${backroudPos}`
        : `,${backroudPos}`;

    Gameloop.state.getPlayer().getMap().getShip('battleship').found()
  };

  const loadCarrier = (info) => {
    info.board.style.backroundImage +=
      info.board.style.backroundImage === ""
        ? `url(${carrier})`
        : `, url(${carrier})`;

    info.board.style.backroundSize +=
      info.board.style.backroundSize === "" ? "50% 10%" : ", 50% 10%";

    const backroudPos = `${info.j * 20}% ${info.i * 11 + info.i / 10}%`
    info.board.style.backroudPos +=
      info.board.style.backroudPos === ""
        ? `${backroudPos}`
        : `, ${backroudPos}`;

    Gameloop.state.getPlayer().getMap().getShip('carrier').found()

  };

  const loadCruiser = (info) => {
    info.board.style.backroundImage +=
      info.board.style.backroundImage === ""
        ? `url(${cruiser})`
        : `, url(${cruiser})`;

    info.board.style.backroundSize +=
      info.board.style.backroundSize === "" ? "30% 10%" : ", 30% 10%";

    const backroudPos = `${info.j * 15 - (info.j / 2 + info.j / 5)}% ${info.i * 11 + info.i / 10}%`;
    info.board.style.backroudPos +=
      info.board.style.backroudPos === ""
        ? `${backroudPos}`
        : `, ${backroudPos}`;

    Gameloop.state.getPlayer().getMap().getShip('cruiser').found()

  };

  const loadDestroyer = (info) => {
    info.board.style.backroundImage +=
      info.board.style.backroundImage === ""
        ? `url(${destroyer})`
        : `, url(${destroyer})`;

    info.board.style.backroundSize +=
      info.board.style.backroundSize === "" ? '20% 9%' : ', 20% 9%'

    const backroudPos = `${ info.j * 13.25 - (info.j / 2 + info.j / 5) }% ${info.i * 11 + info.i / 10}%`
    info.board.style.backroudPos +=
      info.board.style.backroudPos === ""
        ? `${backroudPos}`
        : `, ${backroudPos}`;

    Gameloop.state.getPlayer().getMap().getShip('destroyer').found()

  };

  const loadSubmarine = (info) => {
    info.board.style.backroundImage +=
      info.board.style.backroundImage === ""
        ? `url(${submarine})`
        : `, url(${submarine})`;

    info.board.style.backroundSize +=
      info.board.style.backroundSize === "" ? "30% 10%" : ", 30% 10%";

    const backroudPos = `${info.j * 15 - (info.j / 2 + info.j / 5)}% ${info.i * 11 + info.i / 10 + 1}%`
    info.board.style.backroudPos +=
      info.board.style.backroudPos === ""
        ? `${backroudPos}`
        : `, ${backroudPos}`;

  Gameloop.state.getPlayer().getMap().getShip('submarine').found()

  };

  const loadShipsOnBoard = (boardElement, info) => {

    const map = Gameloop.state.getPlayer().getMap()

    switch (boardElement) {
      case "battleship":
        if (map.getShip('battleship').found()) return;
        loadBattleship(info);
        break;

      case "carrier":
        if (map.getShip('carrier').found()) return;
        loadCarrier(info);
        break;

      case "cruiser":
        if (map.getShip('cruiser').found()) return;
        loadCruiser(info);
        break;

      case "destroyer":
        if (map.getShip('destroyer').found()) return;
        loadDestroyer(info);
        break;

      case "submarine":
        if (map.getShip('submarine').found()) return;
        loadSubmarine(info);
        break;

      default:
        break;
    }
  };

  const loadFleet = () => {
    const board = document.getElementById('field-container')
    const map = Gameloop.state.getPlayer().getMap()
    const mapArray = map.getBoard()

    for (let i = 0; i < mapArray.length; i+=1) {
        for (let j = 0; j < mapArray[0].length; j+=1) {
            if (mapArray[i][j] !== 'x') {
                loadShipsOnBoard(mapArray[i][j], {
                    board, i, j,
                })
            }
        }
    }
  }

  return { loadShipsOnBoard, loadFleet };

})()

export default fleet;
