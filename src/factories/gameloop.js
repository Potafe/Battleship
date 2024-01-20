import Player from "./player"

const gameloop = () => {

    const initializeGame = () => {
        const player = Player('Captain')
        const cpu = Player('cpu')

        const getPlayer = () => player

        const getCPU = () => cpu
        
        return { getCPU, getPlayer }
    }
    
    const state = () => initializeGame() 

    const getState = () => state

    const setPlayerName = (name = 'Captain') => getState().getPlayer().setName(name)


    return { state, getState, setPlayerName }
}

export default gameloop