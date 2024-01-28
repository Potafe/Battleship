import battleship from "../assets/images/BattleshipX.svg";
import carrier from "../assets/images/CarrierX.svg";
import cruiser from "../assets/images/CruiserX.svg";
import destroyer from "../assets/images/DestroyerX.svg";
import submarine from "../assets/images/SubmarineX.svg";
import functions from "./functions";
import Gameloop from "../factories/gameloop";
import Battle from './battle';
import component from "./component";
import messages from '../assets/messages/messages';

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

    button.id === 'x-button' ? map.setAxisX() : map.setAxisY()

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
    buttonContainer.id = 'axis-button-container'
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

  function resetFleetSelectMenu() {
    const fleet = document.getElementById('fleet-setup')
    const message = document.getElementById('message-friend')

    fleet.childNodes.forEach((node) => {
      if (node.classList.contains('hidden')) {
        node.classList.remove('hidden')
        message.classList.add('reset')
      }
    })
  }

  function resetFleetSelect() {
    const map = Gameloop.state.getPlayer().getMap()
   
    resetFleetSelectMenu()
    
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

  function resetBackground(parent) {
    const ships = parent.querySelectorAll('.ship-image-container')
    ships.forEach((ship) => ship.remove())
  }


  function doContinue() {
    Battle.loadBattleSection()
  }
  
  const doReset = (map) => {
    const fieldContainer = document.getElementById('field-container-setup')

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

  const loadResetAndContinueSection = () => {
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

  const loadMapFleet = () => {
    const boardAndFleet = document.createElement('div')
    boardAndFleet.className = 'board-fleet-container'
  
    boardAndFleet.appendChild(functions.createMap('setup'))
    boardAndFleet.appendChild(loadFleetSection())

    const boardContainer = boardAndFleet.querySelector('#board-setup')
    boardContainer.appendChild(loadAxisButtons())

    return boardAndFleet
  }

  const loadMapFleetSection = () => {
    const setupContainer = document.createElement("section");
    setupContainer.id = "setup-container";
    setupContainer.className = "setup-container";

    setupContainer.appendChild(loadMapFleet())

    return setupContainer
  }

  const loadSetupMaterial = () => {
    const app = document.getElementById("app");
    app.classList = ''
    app.classList.add("app", "setup");

    
    app.appendChild(component.createMessageSection(['setup', 'friend']))
    app.appendChild(loadMapFleetSection())
    app.appendChild(loadResetAndContinueSection())

    const message = document.getElementById('message-friend')
    component.addTypeWriterMessage(message, messages.getWelcomeMessage())

    initButtons()

  };

//   const loadSetup = () => {
//     functions.deleteContent();
//     loadSetupMaterial();
//   };

  return { loadSetupMaterial };
})();

export default setup;
