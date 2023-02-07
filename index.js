import { catsData } from "/data.js"

const emotionRadiosEl = document.getElementById("emotion-radios")
const imageBtn = document.getElementById("get-image-btn")
const gifOnly = document.getElementById("gifs-only-option")


imageBtn.addEventListener("click", getMatchingCatsArray)

function getMatchingCatsArray() {
    const isGif = gifOnly.checked
    console.log(isGif)

    if (document.querySelector('input[type="radio"]:checked')) {
        const checkedRadio = document.querySelector('input[type="radio"]:checked').value
        console.log(checkedRadio)
    }
}


emotionRadiosEl.addEventListener("change", highlightCheckedOption)

function highlightCheckedOption(e) {
    const withRadioClass = document.getElementsByClassName("radio")
    for (let without of withRadioClass) {
        without.classList.remove("highlight")
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
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


