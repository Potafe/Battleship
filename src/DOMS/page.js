import start from "./start";
import battle from "./battle";
import Gameloop from '../factories/gameloop';
import functions from "./functions";

const page = (() => {
    const game = Gameloop.initializeGame()

    const loadBattle = () => {
        functions.deleteContent()
        battle.loadBoardsSection()
    }

    const playButton = () => {
        const button = document.getElementById('play-button')
        button.addEventListener('click', loadBattle)
    }


    const loadContent = () => {
        start.loadCard()
        playButton()
    }

    return { loadContent }
})()

export default page