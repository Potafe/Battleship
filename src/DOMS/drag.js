import Ship from "../factories/ship"
import fleet from "./fleet"
import Gameloop from '../factories/gameloop'
import Functions from "./functions"

const drag = (() => {

    let fieldQueue = []

    const dragStart = () => {
        const fleetContainer = document.getElementById('fleet-setup')

        fleetContainer.childNodes.forEach((node) => {
            node.addEventListener('dragstart', () => {
                Gameloop.state.getPlayer().getMap().setShipOnDrag({
                    name: node.dataset.shipName,
                    length: node.dataset.shipLength
                })
            })
        })
    }

    const dragEnter = () => {
        const fieldContainer = document.getElementById('field-container-setup')

        fieldContainer.childNodes.forEach((node) => {
            node.addEventListener('dragenter', (e) => {
                e.preventDefault()
            })
        })
    }

    const emptyFieldQueue = () => {
        fieldQueue = []
    }

    const styleFieldForDrop = (parent, index) => {
        const map = Gameloop.state.getPlayer().getMap()
        const board = map.getBoard()
        const axis = map.getAxis()

        const shipOnDrag = map.getshipOnDrag()
        let { length } = shipOnDrag
        emptyFieldQueue()

        let isTaken = false

        if (axis === 'X') {
            for (let i = index; i < Functions.nearestTen(index + 1); i+=1) {
                const [x, y] = Functions.getCoordinates(i)
                if (length === 0) break
                parent.children[i].classList.add('hovering')
                fieldQueue.push(i)
                length -= 1
                if (board[x][y] !== 'x') {
                    isTaken = true
                }
            }
        }

        if (axis === 'Y') {
            for (let i = index; i < 100; i+=10) {
                const [x, y] = Functions.getCoordinates(i)
                if (length === 0) break
                parent.children[i].classList.add('hovering')
                fieldQueue.push(i)
                length -= 1
                if (board[x][y] !== 'x') {
                    isTaken = true
                }
            }   
        }

        if (isTaken || length !== 0) 
            fieldQueue.forEach((field) => {
                parent.children[field].classList.add('red')
        })
    }

    
    const dragOver = () => {
        const fieldContainer = document.getElementById('field-container-setup')
        
        fieldContainer.childNodes.forEach((node, index) => {
            node.addEventListener('dragover', (e) => {
                e.preventDefault()
                styleFieldForDrop(fieldContainer, index)
            })
        })
    }  

    const resetFieldStyling = () => {
        const fieldContainer = document.getElementById('field-container-setup')

        for (let i = 0; i < fieldQueue.length; i+=1) {
            fieldContainer.children[fieldQueue[i]].className = 'field'
        }

        emptyFieldQueue()
    }

    const dragLeave = () => {
        const fieldContainer = document.getElementById('field-container-setup')

        fieldContainer.childNodes.forEach((node) => {
            node.addEventListener('dragleave', () => {
                resetFieldStyling()
            })
        })
    }
    

    const hideIfPlaced = (isPlaced, shipOnDrag) => {
        if (!isPlaced) return 
        
        const battleship = document.querySelector(`[data-ship-name=${shipOnDrag}]`)
        battleship.classList.add('hidden')
    }

    const dropIfValid = (x, y) => {
        const map = Gameloop.getState().getPlayer().getMap()
        const shipOnDrag = Gameloop.getState().getPlayer().getMap().getshipOnDrag()

        if (map.getAxis() === 'X') {
            return [
                map.placeX(Ship(shipOnDrag.name, shipOnDrag.length), x, y),
                shipOnDrag.name,
            ]
        }
        return [
            map.placeY(Ship(shipOnDrag.name, shipOnDrag.length), x, y),
            shipOnDrag.name,
        ]
    }

    const dragDrop = () => {
        const fieldContainer = document.getElementById('field-container-setup')
        

        fieldContainer.childNodes.forEach((node, index) => {
            node.addEventListener('drop', () => {
                console.log(Gameloop.state.getPlayer().getMap().getBoard())
                const [x, y] = Functions.getCoordinates(index)
                const [isPlaced, shipOnDrag] = dropIfValid(x, y)

                resetFieldStyling()
                
                fleet.loadFleet(fieldContainer)
    
                hideIfPlaced(isPlaced, shipOnDrag)
                
            })
        })
    }



    const draggableFields = () => {
        dragStart()
        dragEnter()
        dragOver()
        dragLeave()
        dragDrop()
    }

    return { draggableFields }

})()

export default drag