//Language Recognition page
const recordBtn = document.querySelector('.record')
const result = document.querySelector(".result")
const downloadBtn = document.querySelector(".download")
const languagesSelect = document.querySelector('#language')
const clearBtn = document.querySelector(".clear")

//add language in select
function populateLanguages() {
    languages.forEach((lang )=> {
        const option = document.createElement("option")
        option.value= lang.code
        option.innerHTML = lang.name
        languagesSelect.appendChild(option)
    }); 
}

populateLanguages()

let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;
let recording = false;

function speechToText(){
    try {
        recognition = new SpeechRecognition();
        recognition.lang = languagesSelect.value;
        recognition.interimResults = true

        recordBtn.classList.add('recording');
        recordBtn.querySelector('p').innerHTML = 'listening...'
        recognition.start();

        recognition.onresult = (event) => {
            const speechResult = event.results[0][0].transcript;

            if(event.results[0].isFinal){
                result.innerHTML += " " + speechResult;
               // result.querySelector('p').remove();
            }
            else{
                if(!document.querySelector('.interim')){
                    const interim = document.createElement('p')
                    interim.classList.add('interim')
                }

                document.querySelector('.interim').innerHTML = ' ' + speechResult
            }

            downloadBtn.disabled = false;
           
            recognition.onspeechend = () => {
                speechToText()
            }
           
            recognition.onerror = event => {
                alert('Error Occured: ' + event.error)
            }
        }
        } catch (error) {
            recording = false
        console.log(error)
    }   
}

recordBtn.addEventListener('click', () => {
    if(!recording){
        speechToText()
        recording = true
    }
    else{
        stopRecording()
    }
})

function stopRecording(){
    recognition.stop()
    recordBtn.querySelector('p').innerHTML = 'Start Listening'
    recordBtn.classList.remove('recording')
    recording = false
}

function download(){
    const text = result.innerHTML
    const fileName = 'speech.txt'

    const element = document.createElement('a')
    element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(text)
        )
        element.setAttribute('download', fileName)
        element.style.display = 'none'
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)

}

downloadBtn.addEventListener('click', download)


clearBtn.addEventListener('click', () =>{
    result.innerHTML = ''
    downloadBtn.disabled = true
})
