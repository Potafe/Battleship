import Ship from "../factories/ship"
import fleet from "./fleet"
import Gameloop from '../factories/gameloop'
import Functions from "./functions"

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
    

    const hideIfPlaced = (isPlaced, shipOnDrag) => {
        if (isPlaced) return 
        
        const battleship = document.querySelector(`[data-ship-name=${shipOnDrag.name}]`)
        console.log(battleship)
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
        const fieldContainer = document.getElementById('field-container')
        

        fieldContainer.childNodes.forEach((node, index) => {
            node.addEventListener('drop', () => {
                console.log(Gameloop.state.getPlayer().getMap().getBoard())
                node.classList.remove('hovering')
                const [x, y] = Functions.getCoordinates(index)
                const [isPlaced, shipOnDrag] = dropIfValid(x, y)
                
                fleet.loadFleet()
    
                hideIfPlaced(isPlaced, shipOnDrag)
                
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