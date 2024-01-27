import Typed from "typed.js"
import friend from '../assets/images/eve.png'
import enemy from '../assets/images/auto.png'

const component = (() => {

  const images = {friend, enemy}

  const createMessage = (character) => {
    const messageContainer = document.createElement('div')
    messageContainer.id = 'message-container'
    messageContainer.className = 'message-container'

    const text = document.createElement('div')
    text.id = `message-${character}`
    text.className = `message-${character}`
    text.textContent = ''

    messageContainer.appendChild(text)
    
    return messageContainer
  }

  const addTypeWriterMessage = (el, array) => {
    const typed = new Typed(el, { strings: array, typeSpeed: 15})
  } 

  const createMessageSection = (classNameArray) => {
    const messageSection = document.createElement('section')
    messageSection.className = 'message'

    classNameArray.forEach((el) => messageSection.classList.add(el))
    const character = classNameArray[1]

    const messageImage = document.createElement('img')
    messageImage.className = 'message-image'
    messageImage.src = images[classNameArray[1]]
    // will add img later

    messageSection.appendChild(messageImage)
    messageSection.appendChild(createMessage(character))
  
    return messageSection
  }
  
    return { createMessageSection, addTypeWriterMessage }
  })()
  
  export default component