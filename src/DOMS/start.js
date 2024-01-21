const start = (() => {

    const loadTitle = (container) => {
        const title = document.createElement('h1')

        title.textContent = 'BATTLESHIP'

        container.appendChild(title)
    }

    const loadForm = (container) => {
        const form = document.createElement('form')
        form.className = 'name-form'

        const formInput = document.createElement('input')
        formInput.type = 'text'
        formInput.id = 'name-input'
        formInput.className = 'name-input'
        formInput.placeholder = "Captains's Name"

        const inputBorder = document.createElement('span')
        inputBorder.className = 'input-border'

        form.appendChild(formInput)
        form.appendChild(inputBorder)

        container.appendChild(form)
    }

    const loadPlayButton = (container) => {
        const button = document.createElement('button')
        button.id = 'play-button'
        button.className = 'play-button'

        const buttonText = document.createElement('span')
        buttonText.className = 'text-play-button'
        buttonText.textContent = 'ENTER ARENA'

        button.appendChild(buttonText)
        
        container.appendChild(button)
    }


    const loadCard = () => {
        const app = document.getElementById('app')

        const card = document.createElement('section')
        const container = document.createElement('div')
        card.className = 'start-card'
        container.className = 'content-container'

        loadTitle(container)
        loadForm(container)
        loadPlayButton(container)

        card.appendChild(container)
        app.appendChild(card)
    }

    return { loadCard }
})()

export default start