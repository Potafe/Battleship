import functions from "./functions";

const battle = (() => {
  const loadBoardTitle = (container, title) => {
    const boardTitle = document.createElement("h2");
    boardTitle.className = "board-title";
    boardTitle.textContent = title;

    container.appendChild(boardTitle);
  };

  const loadBoardsSection = () => {
    const app = document.getElementById("app");

    const boardsSection = document.createElement("section");
    boardsSection.className = "boards-section";

    const friendlyBoardContainer = document.createElement("div");
    const enemyBoardContainer = document.createElement("div");

    loadBoardTitle(friendlyBoardContainer, "FRIENDLY WATERS");
    loadBoardTitle(enemyBoardContainer, "ENEMY WATERS");

    functions.loadBoard(friendlyBoardContainer, "friendly");
    functions.loadBoard(enemyBoardContainer, "enemy");

    boardsSection.appendChild(friendlyBoardContainer);
    boardsSection.appendChild(enemyBoardContainer);

    app.appendChild(boardsSection);
  };

  return { loadBoardsSection };
})();

export default battle;
