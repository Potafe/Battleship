import battleship from '../assets/Battleship.svg'
import carrier from '../assets/Carrier.svg'
import cruiser from '../assets/Cruiser.svg'
import destroyer from '../assets/Destroyer.svg'
import submarine from '../assets/Submarine.svg'
import functions from './functions'

const setup = (() => {

    const loadShipCard = (ship) => {
        const card = document.createElement('div')
        const image = document.createElement('img')
        const name = document.createElement('p')

        card.className = 'ship-card'
        image.className = 'ship-image'
        name.className = 'ship-name'

        switch (ship) {
            case 'battleship' :
                image.src = battleship
                name.textContent = 'Battleship'
                break
            
            case 'carrier' :
                image.src = carrier
                name.textContent = 'Carrier'
                break

            case 'cruiser' :
                image.src = cruiser
                name.textContent = 'Cruiser'
                break

            case 'destroyer' :
                image.src = destroyer
                name.textContent = 'Destroyer'
                break
            
            case 'submarine' :
                image.src = submarine
                name.textContent = 'Submarine'
                break

            default:
        }

        card.appendChild(image)
        card.appendChild(name)

        return card
    }

    const loadFleetSection = (container) => {
        const fleetSection = document.createElement('section')

        const fleet = ['batttleship', 'carrier', 'cruiser', 'destroyer', 'submarine']

        fleet.forEach((ship) => {
            const shipCard = loadShipCard(ship)
            fleetSection.appendChild(shipCard)
        })

        container.appendChild(fleetSection)
    }

    const loadSetupMaterial = () => {
        const app = document.getElementById('app')
        const setupContainer = document.createElement('div')
        functions.loadBoard(setupContainer, 'setup')
        loadFleetSection()

        app.appendChild(setupContainer)
    }

    const loadSetup = () =>  {
        functions.deleteContent()
        loadSetupMaterial()
    }

    return  { loadSetup }

})

export default setup
