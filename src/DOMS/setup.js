import battleship from "../assets/BattleshipX.svg";
import carrier from "../assets/CarrierX.svg";
import cruiser from "../assets/CruiserX.svg";
import destroyer from "../assets/DestroyerX.svg";
import submarine from "../assets/SubmarineX.svg";
import functions from "./functions";
import Gameloop from "../factories/gameloop";

const setup = (() => {
  const loadShipCard = (ship) => {
    const card = document.createElement("button");
    const content = document.createElement('div')
    const image = document.createElement("img");
    const name = document.createElement("p");

    card.className = "ship-card";
    content.className = 'ship-content'
    image.className = "ship-image";
    name.className = "ship-name";

    switch (ship) {
      case "carrier":
        card.dataset.shipName = 'carrier'
        card.dataset.shipLength = 5
        image.src = carrier;
        name.textContent = "Carrier";
        break;

      case "cruiser":
        card.dataset.shipName = 'cruiser'
        card.dataset.shipLength = 3
        image.src = cruiser;
        name.textContent = "Cruiser";
        break;

      case "destroyer":
        card.dataset.shipName = 'destroyer'
        card.dataset.shipLength = 2
        image.src = destroyer;
        name.textContent = "Destroyer";
        break;

      case "submarine":
        card.dataset.shipName = 'submarine'
        card.dataset.shipLength = 3
        image.src = submarine;
        name.textContent = "Submarine";
        break;

      default:
        card.dataset.shipName = 'battleship'
        card.dataset.shipLength = 4
        image.src = battleship;
        name.textContent = "Battleship";
        break;
    }

    content.appendChild(image);
    content.appendChild(name);

    card.appendChild(content)

    return card;
  };

  const loadFleetSection = () => {
    const fleetSection = document.createElement("section");
    fleetSection.id = "fleet-setup";
    fleetSection.className = "fleet-setup";

    const fleet = [
      "batttleship",
      "carrier",
      "cruiser",
      "destroyer",
      "submarine",
    ];

    fleet.forEach((ship) => {
      const shipCard = loadShipCard(ship);
      shipCard.draggable = 'true'
      fleetSection.appendChild(shipCard);
    });

   return fleetSection
  };

  const handleButton = (button, alternateButton) => {
    const map = Gameloop.state.getPlayer().getMap()

    button.is === 'x-button' ? map.setAxisX() : map.setAxisY()

    button.classList.add('selected')
    alternateButton.classList.remove('selected')
    
  }

  const initAxisButton = () => {
    const buttonX = document.getElementById('x-button')
    const buttonY = document.getElementById('y-button')

    buttonX.addEventListener('click', () => handleButton(buttonX, buttonY))

    buttonY.addEventListener('click', () => handleButton(buttonY, buttonX))

  }

  const loadAxisButtons = () => {
    const buttonContainer = document.createElement('div')
    buttonContainer.className = 'axis-button-container'

    const buttonX = document.createElement('button')
    buttonX.id = 'x-button'
    buttonX.classList.add('axis-button', 'selected')
    buttonX.className = 'axis-button'
    buttonX.textContent = 'X Axis'

    const buttonY = document.createElement('button')
    buttonY.id = 'y-button'
    buttonY.className = 'axis-button'
    buttonY.textContent = 'Y Axis'

    buttonContainer.appendChild(buttonX)
    buttonContainer.appendChild(buttonY)

    return buttonContainer
  }

  function resetFleetSelect() {
    const map = Gameloop.state.getPlayer().getMap()
    const fleet = document.getElementById('fleet-setup')

    fleet.childNodes.forEach((node) => (node.classList.remove('hidden')))
    
    map.getFleet().forEach((ship) => ship.resetFound())
    map.setFleetEmpty()

  }

  function resetArray(array) {
    for (let i = 0; i < array.length; i += 1) {
      for (let j = 0; j < array[0].length; j += 1) {
        array[i][j] = 'x'
      }
    }
  }

  function resetBackground(node) {
    node.style.backgroundImage = ''
    node.style.backgroundSize = ''
    node.style.backgroundPosition = ''
  }


  function doContinue() {}
  
  const doReset = (map) => {
    const fieldContainer = document.getElementById('field-container')

    resetFleetSelect()
    resetArray(map)
    resetBackground(fieldContainer)
  }

  const initResetAndContinueButtons = () => {
    const resetButton = document.getElementById('reset-button')
    const continueButton = document.getElementById('continue-button') 
    const map = Gameloop.state.getPlayer().getMap().getBoard()

    resetButton.addEventListener('click', () => doReset(map))
    continueButton.addEventListener('click', doContinue)

  }

  const loadResetAndContinueButtons = () => {
    const buttonContainer = document.createElement('section')
    buttonContainer.id = 'reset-continue-section'
    buttonContainer.className = 'reset-continue-section'

    const resetButton = document.createElement('button')
    resetButton.className = 'reset-button'
    resetButton.id = 'reset-button'
    resetButton.textContent = 'Reset'

    const continueButton = document.createElement('button')
    continueButton.className = 'continue-button'
    continueButton.id = 'continue-button'
    continueButton.textContent = 'Continue'

    buttonContainer.appendChild(resetButton)
    buttonContainer.appendChild(continueButton)

    return buttonContainer
    
  }

  const initButtons = () => {
    initAxisButton()
    initResetAndContinueButtons()
  }

  const loadBoardAndFleet = () => {
    const boardAndFleet = document.createElement('div')
    boardAndFleet.className = 'board-fleet-container'
  
    boardAndFleet.appendChild(functions.getBoard('setup'))
    boardAndFleet.appendChild(loadFleetSection())

    const boardContainer = boardAndFleet.querySelector('#board-setup')
    boardContainer.appendChild(loadAxisButtons())

    return boardAndFleet
  }

  const loadSetupContainer = () => {
    const setupContainer = document.createElement("div");
    setupContainer.id = "setup-container";
    setupContainer.className = "setup-container";

    setupContainer.appendChild(loadBoardAndFleet())

    return setupContainer
  }

  const loadSetupMaterial = () => {
    const app = document.getElementById("app");
    app.classList.add("setup");

    app.appendChild(loadSetupContainer())
    app.appendChild(loadResetAndContinueButtons())

    initButtons()

  };

//   const loadSetup = () => {
//     functions.deleteContent();
//     loadSetupMaterial();
//   };

  return { loadSetupMaterial };
})();

export default setup;
