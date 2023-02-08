import { catsData } from "/data.js"

const emotionRadiosEl = document.getElementById("emotion-radios")
const imageBtn = document.getElementById("get-image-btn")
const gifOnly = document.getElementById("gifs-only-option")
const memeModal = document.getElementById("meme-modal")
const innerModal = document.getElementById("meme-modal-inner")
const closeBtn = document.getElementById("meme-modal-close-btn")


emotionRadiosEl.addEventListener("change", highlightCheckedOption)

closeBtn.addEventListener("click", closeModal )

imageBtn.addEventListener("click", renderCat)



function highlightCheckedOption(e) {
    const withRadioClass = document.getElementsByClassName("radio")
    for (let without of withRadioClass) {
        without.classList.remove("highlight")
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
   }


function closeModal () {
    memeModal.style.display = "none"
}


function renderCat() {
    const catObject = getSingleCatObject()

    innerModal.innerHTML = `
    <img 
        class="cat-img" 
        src="./images/${catObject.image}"
        alt="${catObject.alt}"
        >`
    memeModal.style.display = "flex"
}


function getSingleCatObject() {
    const catsArray = getMatchingCatsArray()

    if (catsArray.length === 1) {
        return catsArray[0]
    } else {
        const randomNumber = Math.floor(Math.random() * catsArray.length)
        const randomCat = catsArray[randomNumber]
        return randomCat
    }
}


function getMatchingCatsArray() {
    if (document.querySelector('input[type="radio"]:checked')) {
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const isGif = gifOnly.checked

        const matchingCatsArray = catsData.filter( function (cat) {
            if (isGif) {
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif 
            } else {
                return cat.emotionTags.includes(selectedEmotion)
            }                  
        })
        return matchingCatsArray
    }    
}


function getEmotionsArray(cats){
    const emotions = []
    for (let cat of cats) {
        for (let emotion of cat.emotionTags) {
            if (!emotions.includes(emotion)) {
                emotions.push(emotion)
            }            
        }
    }
    return emotions
}

function renderEmotionsRadios(cats) {
    const emotions = getEmotionsArray(cats)
    let emotionRadios = ""
    for (let emotion of emotions) {
        emotionRadios += `
        <div class="radio">
            <label for="${emotion}"> ${emotion} </label>
            <input 
                type="radio"
                id="${emotion}"
                value="${emotion}"
                name="choice-emotions">         
        </div>`
    }
    emotionRadiosEl.innerHTML = emotionRadios
}
renderEmotionsRadios(catsData)
