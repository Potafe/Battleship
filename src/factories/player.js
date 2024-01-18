import Gameboard from "./gameboard"


const Player = (name) => {

    const board = Gameboard()

    let turns = 0

    const getName = () => name

    const getTurn = () => turns

    const isEmpty = (x, y) => board.board[x][y] === 'x'

    const random = () => Math.floor(Math.random() * (9 + 1))

    const cpuPlay = () => {
        let invalidCoordinate = true

        while (invalidCoordinate) {
            const x = random()
            const y = random()

            if (isEmpty(x, y)) {
                invalidCoordinate = false
                board.receiveAttack(x, y)
                turns += 1
            }
        }
    }

    const play = (x, y) => {
        if (getName().toLowerCase() === 'cpu') {
            cpuPlay()
            return 
        }
        
        if (!isEmpty(x, y)) return
        board.receiveAttack(x, y)
        turns += 1
    }


    return {
        play, getTurn, getName
    }
}

export default Player