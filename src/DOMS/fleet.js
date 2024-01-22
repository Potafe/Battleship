import battleship from '../assets/Battleship.svg'
import carrier from '../assets/Carrier.svg'
import cruiser from '../assets/Cruiser.svg'
import destroyer from '../assets/Destroyer.svg'
import submarine from '../assets/Submarine.svg'

const fleet = (() => {


    const loadBattleship = (info) => {
        info.board.style.backroundImage += info.board.style.backroundImage === '' ? `url(${battleship})` : `, url(${battleship})`
    
        info.board.style.backroundSize += info.board.style.backroundSize === '' ? '50% 10%' : ', 50% 10%'
        
        const backroudPos = `${info.j * 20}% ${info.i * 11 + info.i / 10}%`
        info.board.style.backroudPos += info.board.style.backroudPos === '' ? `${backroudPos}` : `, ${backroudPos}`
    
        info.found.battleship = true
    }

    const loadCarrier = (info) => {
        info.board.style.backroundImage += info.board.style.backroundImage === '' ? `url(${carrier})` : `, url(${carrier})`
    
        info.board.style.backroundSize += info.board.style.backroundSize === '' ? '50% 10%' : ', 50% 10%'
        
        const backroudPos = `${info.j * 20}% ${info.i * 11 + info.i / 10}%`
        info.board.style.backroudPos += info.board.style.backroudPos === '' ? `${backroudPos}` : `, ${backroudPos}`
    
        info.found.carrier = true
    }
    
    const loadCruiser = (info) => {
        info.board.style.backroundImage += info.board.style.backroundImage === '' ? `url(${cruiser})` : `, url(${cruiser})`
    
        info.board.style.backroundSize += info.board.style.backroundSize === '' ? '50% 10%' : ', 50% 10%'
        
        const backroudPos = `${info.j * 20}% ${info.i * 11 + info.i / 10}%`
        info.board.style.backroudPos += info.board.style.backroudPos === '' ? `${backroudPos}` : `, ${backroudPos}`
    
        info.found.cruiser = true
    }

    const loadDestroyer = (info) => {
        info.board.style.backroundImage += info.board.style.backroundImage === '' ? `url(${destroyer})` : `, url(${destroyer})`
    
        info.board.style.backroundSize += info.board.style.backroundSize === '' ? '50% 10%' : ', 50% 10%'
        
        const backroudPos = `${info.j * 20}% ${info.i * 11 + info.i / 10}%`
        info.board.style.backroudPos += info.board.style.backroudPos === '' ? `${backroudPos}` : `, ${backroudPos}`
    
        info.found.destroyer = true
    }

    const loadSubmarine = (info) => {
        info.board.style.backroundImage += info.board.style.backroundImage === '' ? `url(${submarine})` : `, url(${submarine})`
    
        info.board.style.backroundSize += info.board.style.backroundSize === '' ? '50% 10%' : ', 50% 10%'
        
        const backroudPos = `${info.j * 20}% ${info.i * 11 + info.i / 10}%`
        info.board.style.backroudPos += info.board.style.backroudPos === '' ? `${backroudPos}` : `, ${backroudPos}`
    
        info.found.submarine = true
    }

    const loadShipsOnBoard = (boardElement, info) => {
        
        switch (boardElement) {
            case 'battleship':
                if (info.found.battleship) return
                loadBattleship(info)
                break

            case 'carrier': 
                if (info.found.carrier) return
                loadCarrier(info)
                break
            
            case 'cruiser': 
                if (info.found.cruiser) return
                loadCruiser(info)
                break
           
            case 'destroyer': 
                if (info.found.destroyer) return
                loadDestroyer(info)
                break
            
            case 'submarine': 
                if (info.found.submarine) return
                loadSubmarine(info)
                break
                
            default: 
                break    

        }
    }

    return { loadShipsOnBoard }

})

export default fleet
