import Ship from "../factories/ship"
import fleet from "./fleet"
import Gameloop from '../factories/gameloop'

const drag = (() => {

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

    const dragOver = () => {
        const fieldContainer = document.getElementById('field-container')
        
        fieldContainer.childNodes.forEach((node) => {
            node.addEventListener('dragover', (e) => {
                e.preventDefault()
                node.classList.add('hovering')
            })
        })
    }  

    const dragLeave = () => {
        const fieldContainer = document.getElementById('field-container')

        fieldContainer.childNodes.forEach((node) => {
            node.addEventListener('dragleave', (e) => {
                e.preventDefault()
                node.classList.remove('hovering')
            })
        })
    }
    
    const dragDrop = () => {
        const fieldContainer = document.getElementById('field-container')
        const shipOnDrag = Gameloop.state.getPlayer().getMap().getshipOnDrag()
        const map = Gameloop.state.getPlayer().getMap()

        fieldContainer.childNodes.forEach((node, index) => {
            node.addEventListener('drop', () => {
                console.log(Gameloop.state.getPlayer().getMap().getBoard())
                node.classList.remove('hovering')
                const x = parseInt(index / 10, 10)
                const y = index % 10
                
                let isPlaced

                if (map.getAxis() === 'X') {
                    isPlaced = map.placeX(Ship(shipOnDrag.name, shipOnDrag.length), x, y)
                }

                else {
                    isPlaced = map.placeY(Ship(shipOnDrag.name, shipOnDrag.length), x, y)
                }
    
                fleet.loadFleet()
    
                if (isPlaced) {
                    const battleship = document.querySelector(`[data-ship-name=${shipOnDrag.name}]`)
                    console.log(battleship)
                    battleship.classList.add('hidden')
                }
                
            })
        })
    }

    const draggableFields = () => {
        dragStart()
        dragOver()
        dragLeave()
        dragDrop()
    }

    return { draggableFields }

})()

export default drag