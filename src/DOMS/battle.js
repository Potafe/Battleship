const battle = (() => {

    const BOARD_SIZE = 10


    const loadBoardTitle = (container, title) => {
        const boardTitle = document.createElement('h2')
        boardTitle.className = 'board-title'
        boardTitle.textContent = title
    
        container.appendChild(boardTitle)
    }

    const loadCoordinates = (container, orientation) => {

      if (orientation === 'X') {
        const numberContainerX = document.createElement('div')
        numberContainerX.classList = 'numberx-container'

        const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

        numbers.forEach((element) => {
          const number = document.createElement('div')
          number.classList = 'number'
          number.textContent = element
          numberContainerX.appendChild(number)
        }) 
        
        container.appendChild(numberContainerX)
      }
      
      else if (orientation === 'Y') {
        const numberContainerY = document.createElement('div')
        numberContainerY.classList = 'numbery-container'

        const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

        numbers.forEach((element) => {
          const number = document.createElement('div')
          number.classList = 'number'
          number.textContent = element
          numberContainerY.appendChild(number)
        }) 
        
        container.appendChild(numberContainerY)

      }
    }


    const loadField = (container) => {
      const fieldContainer = document.createElement('field-container')
      fieldContainer.className = 'field-container'

      for (let i = 0; i < BOARD_SIZE; i += 1) {
        for (let j = 0; j < BOARD_SIZE; j += 1) {
          const field = document.createElement('div')
          field.className = 'field'
  
          fieldContainer.appendChild(field)
        }
      }

      container.appendChild(fieldContainer)
    }

    const loadBoard = (container, friendlyOrEnemy) => {
        const board = document.createElement('div')
        
        board.id = `board-${friendlyOrEnemy}`
        board.classList.add('board', friendlyOrEnemy)
        
        loadCoordinates(board, 'X')
        loadCoordinates(board, 'Y')
        loadField(board)

        container.appendChild(board)
    }

    const loadBoardsSection = () => {
        const app = document.getElementById('app')
    
        const boardsSection = document.createElement('section')
        boardsSection.className = 'boards-section'
    
        const friendlyBoardContainer = document.createElement('div')
        const enemyBoardContainer = document.createElement('div')
    
        loadBoardTitle(friendlyBoardContainer, 'FRIENDLY WATERS')
        loadBoardTitle(enemyBoardContainer, 'ENEMY WATERS')
    
        loadBoard(friendlyBoardContainer, 'friendly')
        loadBoard(enemyBoardContainer, 'enemy')
    
        boardsSection.appendChild(friendlyBoardContainer)
        boardsSection.appendChild(enemyBoardContainer)
    
        app.appendChild(boardsSection)
    }
    
    
    return { loadBoardsSection }
})()

export default battle