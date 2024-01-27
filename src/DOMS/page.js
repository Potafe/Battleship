import start from "./start";
import functions from "./functions";
import setup from "./setup";
import drag from "./drag";

const page = (() => {
  
  const loadSetup = () => {
    functions.deleteContent()
    setup.loadSetupMaterial()
    drag.draggableFields()
  }

  const playButton = () => {
    const button = document.getElementById("play-button");
    button.addEventListener("click", loadSetup);
  };

  const loadContent = () => {
    start.loadCard();
    playButton();
  };


  return { loadContent };
})();

export default page;
