import Player from "./player";
import Ship from "./ship";

const gameloop = (() => {
  const initializeGame = (playerName) => {
    const player = Player(playerName)
    const cpu = Player('cpu')

    const getPlayer = () => player

    const getCPU = () => cpu

    return { getCPU, getPlayer, player, cpu }
  };

  const state = () => initializeGame();

  const getState = () => state;

  const setPlayerName = (name = "Captain") =>
    getState().getPlayer().setName(name);

  return { initializeGame, state, getState, setPlayerName };
})();

export default gameloop;
