import { input, button, modal, buttonCloseModal,form } from "./elements.js"

function enableName ({target}){
    if (target.value.length > 3){
        button.removeAttribute('disabled')
        return
    } else {
        button.setAttribute('disabled','')
    }
}

let doucheBagCount = 0

function doucheBagSubmit(event){
    event.preventDefault()
    modal.showModal()
    doucheBagCount++
    
    if (doucheBagCount > 5){
        modal.querySelector('h2').innerHTML = "Tá bom, tá bom, seu nome vai ser Otário!"
    }
    if (doucheBagCount > 6){
        modal.querySelector('h2').innerHTML = "Tá bom, tá bom, não precisa repetir. Seu nome pode ser Otário!"
        modal.querySelector('.close-modal').style.display = 'none'
        modal.querySelector('h2').style.height = "100%"
        setTimeout(()=>{
            form.submit()
            window.location = "../pages/game.html"
        },5000)
    }
}


input.addEventListener('input', enableName)
button.addEventListener('click', doucheBagSubmit)
buttonCloseModal.addEventListener('click', () => modal.close())
