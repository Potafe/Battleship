import Ship from "../factories/ship"
import fleet from "./fleet"

const drag = (() => {

    const dragStart = (dragObj) => {
        const fleetContainer = document.getElementById('fleet-setup')

        fleetContainer.childNodes.forEach((node) => {
            node.addEventListener('dragstart', () => {
                dragObj.name = node.dataset.shipName
                dragObj.length = node.dataset.shipLength
            })
        })
    }

    const dragOver = () => {
        const fieldContainer = document.getElementById('field-container')
        
        fieldContainer.childNodes.forEach((node) => {
            node.addEventListener('dragover', (e) => {
                e.preventDefault()
            })
        })
    }  
    
    const dragDrop = (dragObj, foundObj, playerBoard) => {
        const fieldContainer = document.getElementById('field-container')
        fieldContainer.childNodes.forEach((node, index) => {
            node.addEventListener('drop', () => {
                const x = parseInt(index / 10, 10)
                const y = index % 10
                
                const isPlaced = playerBoard.placeX(Ship(dragObj.name, dragObj.length), x, y)
    
                fleet.loadFleet(foundObj, playerBoard)
    
                if (isPlaced) {
                    const battleship = document.querySelector(`[data-ship-name=${dragObj.name}]`)
                    console.log(battleship)
                    battleship.style.visibility = 'hidden'
                }
                console.log(playerBoard.getBoard())
            })
        })
    }

    const draggableFields = (dragObj, foundObj, playerBoard) => {
        dragStart(dragObj)
        dragOver()
        dragDrop(dragObj, foundObj, playerBoard)
    }

    return { draggableFields }

})()

export default drag