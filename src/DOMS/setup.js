import battleship from "../assets/Battleship.svg";
import carrier from "../assets/Carrier.svg";
import cruiser from "../assets/Cruiser.svg";
import destroyer from "../assets/Destroyer.svg";
import submarine from "../assets/Submarine.svg";
import functions from "./functions";

const setup = (() => {
  const loadShipCard = (ship) => {
    const card = document.createElement("button");
    const image = document.createElement("img");
    const name = document.createElement("p");

    card.classList.add("ship-card", ship);
    image.className = "ship-image";
    name.className = "ship-name";

    switch (ship) {
      case "carrier":
        image.src = carrier;
        name.textContent = "Carrier";
        break;

      case "cruiser":
        image.src = cruiser;
        name.textContent = "Cruiser";
        break;

      case "destroyer":
        image.src = destroyer;
        name.textContent = "Destroyer";
        break;

      case "submarine":
        image.src = submarine;
        name.textContent = "Submarine";
        break;

      default:
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
      fleetSection.appendChild(shipCard);
    });

    container.appendChild(fleetSection);
  };

  const loadSetupMaterial = () => {
    const app = document.getElementById("app");
    app.classList.add("setup");

    const setupContainer = document.createElement("div");
    setupContainer.id = "setup-container";
    setupContainer.className = "setup-container";

    functions.loadBoard(setupContainer, "setup");
    loadFleetSection(setupContainer);

    app.appendChild(setupContainer);
  };

  const loadSetup = () => {
    functions.deleteContent();
    loadSetupMaterial();
  };

  return { loadSetup };
})();

export default setup;
