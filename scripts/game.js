import * as el from './elements.js'
import characters from './cards.js'
import { fartSounds } from './sounds.js'

function createElement(tag, className){
    const element = document.createElement(tag)
    element.className = className
    return element
}

let firstCard = ''
let secondCard = ''
let timeInterval

function checkEndGame(){

    const disableCards = document.querySelectorAll('.disable-card')

    if (disableCards.length >7){
        el.endModal.showModal()
        clearInterval(timeInterval)
    }
}


function checkCards(){
    const firstCharacter = firstCard.getAttribute('data-character')
    const secondCharacter = secondCard.getAttribute('data-character')

    if (firstCharacter === secondCharacter){
        firstCard.firstChild.classList.add('disable-card')
        secondCard.firstChild.classList.add('disable-card')
        
        firstCard = ''
        secondCard = ''
        
        checkEndGame()
    } else{

        setTimeout(()=>{
            firstCard.classList.remove('reveal-card')
            secondCard.classList.remove('reveal-card')

            firstCard = ''
            secondCard = ''
        },500)
        
    }
}

function revealCard({target}){
    if(target.parentNode.className.includes('reveal-card')){
        return
    }

    if (firstCard === ''){
        target.parentNode.classList.add('reveal-card')
        firstCard = target.parentNode
    } else if (secondCard === ''){ 
        target.parentNode.classList.add('reveal-card')
        secondCard = target.parentNode
        checkCards()
    }

    
}

function createCard(character){
    const card = createElement('div', 'card')
    const front = createElement('div', 'face front')
    const back = createElement('div', 'face back')

    front.style.backgroundImage = `url('../assets/${character}.png')`

    card.appendChild(front)
    card.appendChild(back)

    card.addEventListener('click', revealCard)

    card.setAttribute('data-character', character)

    return card
}

function loadGame (){

    const duplicatedCharacters = [...characters,...characters] 

    const shuffledArray = duplicatedCharacters.sort( () => Math.random() - 0.5)

    shuffledArray.forEach((character)=>{
        const card = createCard(character)
        el.grid.appendChild(card)
    })
}

function startTimer (){
    timeInterval = setInterval(()=>{
        const currentTime = Number(el.timer.innerHTML)
        el.timer.innerHTML = String(currentTime + 1).padStart(2,0)
    },1000)
}

function startFart(){

    setInterval(()=>{
        let soundChoices = Math.floor(Math.random()*3)
        fartSounds[soundChoices].play()
    },10000)
}

window.onload = () =>{
    startTimer()
    startFart()
    loadGame()
}

el.playAgain.onclick = () =>{
    window.location = "../pages/game.html"
}
