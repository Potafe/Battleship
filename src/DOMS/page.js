import start from "./start";
import battle from "./battle";
import Gameloop from '../factories/gameloop';

const page = (() => {
    const game = Gameloop.initializeGame()

    const deleteContent = () => {
        const app = document.getElementById('app')
        app.replaceChildren('')
    }

    const loadBattle = () => {
        deleteContent()
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