const start = (() => {
  const loadTitle = () => {
    const title = document.createElement("h1");

    title.textContent = "BATTLESHIP";

    return title
  };

  const loadForm = () => {
    const form = document.createElement("form");
    form.className = "name-form";

    const formInput = document.createElement("input");
    formInput.type = "text";
    formInput.id = "name-input";
    formInput.className = "name-input";
    formInput.placeholder = "Captains's Name";

    const inputBorder = document.createElement("span");
    inputBorder.className = "input-border";

    form.appendChild(formInput);
    form.appendChild(inputBorder);

    return form
  };

  const loadPlayButton = () => {
    const button = document.createElement("button");
    button.id = "play-button";
    button.className = "play-button";

    const buttonText = document.createElement("span");
    buttonText.className = "text-play-button";
    buttonText.textContent = "ENTER ARENA";

    button.appendChild(buttonText);

    return button
  };

  const loadStartCard = () => {
    const card = document.createElement("section");
    const container = document.createElement("div");
    
    card.className = "start-card";
    container.className = "content-container";
    
    card.appendChild(loadTitle(container));
    card.appendChild(loadForm(container));
    card.appendChild(loadPlayButton(container));

    return card
  }

  const loadCard = () => {
    const app = document.getElementById("app");

    app.appendChild(loadStartCard())
  };

  return { loadCard };
})();

export default start;
