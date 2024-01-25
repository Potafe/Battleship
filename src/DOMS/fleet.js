import battleshipX from "../assets/BattleshipX.svg";
import carrierX from "../assets/CarrierX.svg";
import cruiserX from "../assets/CruiserX.svg";
import destroyerX from "../assets/DestroyerX.svg";
import submarineX from "../assets/SubmarineX.svg";
import battleshipY from "../assets/BattleshipY.svg";
import carrierY from "../assets/CarrierY.svg";
import cruiserY from "../assets/CruiserY.svg";
import destroyerY from "../assets/DestroyerY.svg";
import submarineY from "../assets/SubmarineY.svg";
import Gameloop from "../factories/gameloop";

const fleet = (() => { 
  const loadBattleshipX = (info) => {
    info.board.style.backroundImage +=
      info.board.style.backroundImage === ""
        ? `url(${battleshipX})`
        : `, url(${battleshipX})`;

    info.board.style.backroundSize +=
      info.board.style.backroundSize === "" ? "40% 9.50%" : ", 40% 9.50%";

    const backroudPos = `${info.j * 17.5 - (info.j / 2 + info.j / 5)}% ${info.i * 11 + info.i / 10}%`
    info.board.style.backroudPos +=
      info.board.style.backroudPos === ""
        ? `${backroudPos}`
        : `,${backroudPos}`;

    Gameloop.state.getPlayer().getMap().getShip('battleship').found()
  };

  const loadBattleshipY = (info) => {
    info.board.style.backroundImage +=
      info.board.style.backroundImage === ""
        ? `url(${battleshipY})`
        : `, url(${battleshipY})`;

    info.board.style.backroundSize +=
      info.board.style.backroundSize === "" ? "40% 9.50%" : ", 40% 9.50%";

    const backroudPos = `${info.j * 17.5 - (info.j / 2 + info.j / 5)}% ${info.i * 11 + info.i / 10}%`
    info.board.style.backroudPos +=
      info.board.style.backroudPos === ""
        ? `${backroudPos}`
        : `,${backroudPos}`;

    Gameloop.state.getPlayer().getMap().getShip('battleship').found()
  };

  const loadCarrierX = (info) => {
    info.board.style.backroundImage +=
      info.board.style.backroundImage === ""
        ? `url(${carrierX})`
        : `, url(${carrierX})`;

    info.board.style.backroundSize +=
      info.board.style.backroundSize === "" ? "50% 10%" : ", 50% 10%";

    const backroudPos = `${info.j * 20}% ${info.i * 11 + info.i / 10}%`
    info.board.style.backroudPos +=
      info.board.style.backroudPos === ""
        ? `${backroudPos}`
        : `, ${backroudPos}`;

    Gameloop.state.getPlayer().getMap().getShip('carrier').found()

  };

  const loadCarrierY = (info) => {
    info.board.style.backroundImage +=
      info.board.style.backroundImage === ""
        ? `url(${carrierY})`
        : `, url(${carrierY})`;

    info.board.style.backroundSize +=
      info.board.style.backroundSize === "" ? "50% 10%" : ", 50% 10%";

    const backroudPos = `${info.j * 20}% ${info.i * 11 + info.i / 10}%`
    info.board.style.backroudPos +=
      info.board.style.backroudPos === ""
        ? `${backroudPos}`
        : `, ${backroudPos}`;

    Gameloop.state.getPlayer().getMap().getShip('carrier').found()

  };

  const loadCruiserX = (info) => {
    info.board.style.backroundImage +=
      info.board.style.backroundImage === ""
        ? `url(${cruiserX})`
        : `, url(${cruiserX})`;

    info.board.style.backroundSize +=
      info.board.style.backroundSize === "" ? "30% 10%" : ", 30% 10%";

    const backroudPos = `${info.j * 15 - (info.j / 2 + info.j / 5)}% ${info.i * 11 + info.i / 10}%`;
    info.board.style.backroudPos +=
      info.board.style.backroudPos === ""
        ? `${backroudPos}`
        : `, ${backroudPos}`;

    Gameloop.state.getPlayer().getMap().getShip('cruiser').found()

  };

  const loadCruiserY = (info) => {
    info.board.style.backroundImage +=
      info.board.style.backroundImage === ""
        ? `url(${cruiserY})`
        : `, url(${cruiserY})`;

    info.board.style.backroundSize +=
      info.board.style.backroundSize === "" ? "30% 10%" : ", 30% 10%";

    const backroudPos = `${info.j * 15 - (info.j / 2 + info.j / 5)}% ${info.i * 11 + info.i / 10}%`;
    info.board.style.backroudPos +=
      info.board.style.backroudPos === ""
        ? `${backroudPos}`
        : `, ${backroudPos}`;

    Gameloop.state.getPlayer().getMap().getShip('cruiser').found()

  };

  const loadDestroyerX = (info) => {
    info.board.style.backroundImage +=
      info.board.style.backroundImage === ""
        ? `url(${destroyerX})`
        : `, url(${destroyerX})`;

    info.board.style.backroundSize +=
      info.board.style.backroundSize === "" ? '20% 9%' : ', 20% 9%'

    const backroudPos = `${ info.j * 13.25 - (info.j / 2 + info.j / 5) }% ${info.i * 11 + info.i / 10}%`
    info.board.style.backroudPos +=
      info.board.style.backroudPos === ""
        ? `${backroudPos}`
        : `, ${backroudPos}`;

    Gameloop.state.getPlayer().getMap().getShip('destroyer').found()

  };

  const loadDestroyerY = (info) => {
    info.board.style.backroundImage +=
      info.board.style.backroundImage === ""
        ? `url(${destroyerY})`
        : `, url(${destroyerY})`;

    info.board.style.backroundSize +=
      info.board.style.backroundSize === "" ? '20% 9%' : ', 20% 9%'

    const backroudPos = `${ info.j * 13.25 - (info.j / 2 + info.j / 5) }% ${info.i * 11 + info.i / 10}%`
    info.board.style.backroudPos +=
      info.board.style.backroudPos === ""
        ? `${backroudPos}`
        : `, ${backroudPos}`;

    Gameloop.state.getPlayer().getMap().getShip('destroyer').found()

  };


  const loadSubmarineX = (info) => {
    info.board.style.backroundImage +=
      info.board.style.backroundImage === ""
        ? `url(${submarineX})`
        : `, url(${submarineX})`;

    info.board.style.backroundSize +=
      info.board.style.backroundSize === "" ? "30% 10%" : ", 30% 10%";

    const backroudPos = `${info.j * 15 - (info.j / 2 + info.j / 5)}% ${info.i * 11 + info.i / 10 + 1}%`
    info.board.style.backroudPos +=
      info.board.style.backroudPos === ""
        ? `${backroudPos}`
        : `, ${backroudPos}`;

    Gameloop.state.getPlayer().getMap().getShip('submarine').found()

  };

  const loadSubmarineY = (info) => {
    info.board.style.backroundImage +=
      info.board.style.backroundImage === ""
        ? `url(${submarineY})`
        : `, url(${submarineY})`;

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
      case "battleshipX":
        if (map.getShip('battleship').found()) return;
        loadBattleshipX(info);
        break;
      
      case "battleshipY":
        if (map.getShip('battleship').found()) return;
        loadBattleshipY(info);
        break;  

      case "carrierX":
        if (map.getShip('carrier').found()) return;
        loadCarrierX(info);
        break;

      case "carrierY":
        if (map.getShip('carrier').found()) return;
        loadCarrierY(info);
        break;  

      case "cruiserX":
        if (map.getShip('cruiser').found()) return;
        loadCruiserX(info);
        break;

      case "cruiserY":
        if (map.getShip('cruiser').found()) return;
        loadCruiserY(info);
        break;
        

      case "destroyerX":
        if (map.getShip('destroyer').found()) return;
        loadDestroyerX(info);
        break;

      case "destroyerY":
        if (map.getShip('destroyer').found()) return;
        loadDestroyerY(info);
        break;    

      case "submarineX":
        if (map.getShip('submarine').found()) return;
        loadSubmarineX(info);
        break;

      case "submarineY":
        if (map.getShip('submarine').found()) return;
        loadSubmarineY(info);
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
