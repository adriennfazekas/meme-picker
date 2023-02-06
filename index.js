import { catsData } from "/data.js"

const emotionRadiosEl = document.getElementById("emotion-radios")

emotionRadiosEl.addEventListener("change", function(e) {
    console.log(e.target.id)
})

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

