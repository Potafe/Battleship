import battleship from "../assets/Battleship.svg";
import carrier from "../assets/Carrier.svg";
import cruiser from "../assets/Cruiser.svg";
import destroyer from "../assets/Destroyer.svg";
import submarine from "../assets/Submarine.svg";
import functions from "./functions";
import Gameloop from "../factories/gameloop";

const setup = (() => {
  const loadShipCard = (ship) => {
    const card = document.createElement("button");
    const image = document.createElement("img");
    const name = document.createElement("p");

    card.classList.add("ship-card");
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

    card.appendChild(image);
    card.appendChild(name);

    return card;
  };

  const loadFleetSection = (container) => {
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

    container.appendChild(fleetSection);
  };


  const initAxisButton = () => {
    const buttonX = document.getElementById('x-button')
    const buttonY = document.getElementById('y-button')

    const handleButton = (button, alternateButton) => {
      button.classList.add('selected')
      alternateButton.classList.remove('selected')
    }

    buttonX.addEventListener('click', () => handleButton(buttonX, buttonY))

    buttonY.addEventListener('click', () => handleButton(buttonY, buttonX))

  }

  const axisButton = (container) => {
    const buttonContainer = document.createElement('div')
    buttonContainer.className = 'axis-button-container'

    const buttonX = document.createElement('button')
    buttonX.id = 'x-button'
    buttonX.classList.add('axis-button', 'selected')
    buttonX.className = 'axis-button'
    buttonX.textContent = 'X'

    const buttonY = document.createElement('button')
    buttonY.id = 'y-button'
    buttonY.className = 'axis-button'
    buttonY.textContent = 'Y'

    buttonContainer.appendChild(buttonX)
    buttonContainer.appendChild(buttonY)

    container.appendChild(buttonContainer)
  }

  function resetFleetSelect() {
    const map = Gameloop.state.getPlayer().getMap()
    const fleet = document.getElementById('fleet-setup')

    fleet.childNodes.forEach((node) => (node.style.visibility = 'visible'))

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

  const resetAndContinueButton = (container) => {
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

    container.appendChild(buttonContainer)
    
  }

  const loadSetupMaterial = () => {
    const app = document.getElementById("app");
    app.classList.add("setup");

    const setupContainer = document.createElement("div");
    setupContainer.id = "setup-container";
    setupContainer.className = "setup-container";

    const boardFleet = document.createElement('div')
    boardFleet.className = 'board-fleet-container'
    functions.loadBoard(boardFleet, 'setup')
    loadFleetSection(boardFleet)

    setupContainer.appendChild(boardFleet)

    app.appendChild(setupContainer);


    resetAndContinueButton(app)

    const boardContainer = document.getElementById('board-setup')
    axisButton(boardContainer)
    initAxisButton()
    initResetAndContinueButtons()


  };

//   const loadSetup = () => {
//     functions.deleteContent();
//     loadSetupMaterial();
//   };

  return { loadSetupMaterial };
})();

export default setup;
