const textarea = document.querySelector("textarea");
const voiceList = document.querySelector("select")
const speechBtn = document.querySelector("button");



//For First Page

let synth = speechSynthesis;
const isSpeaking = true;


function voices() {
    for(let voice of synth.getVoices()){
        console.log(voice)
        //if the available device voice name is equal to the user selected voice name
        //then set the speech voice to the user selected voice

        let selected = voice.name === "Google US English" ? "selected" : "";
        let option= `<option value="${voice.name}"  ${selected} > ${voice.name} (${voice.lang}) </option>`;
        voiceList.insertAdjacentHTML("beforeend", option)
    }
}

synth.addEventListener("voiceschanged", voices);

const textToSpeech = (text) =>{
    let utterance = new SpeechSynthesisUtterance(text);
    for(let voice of synth.getVoices()){
        if(voice.name === voiceList.value){
            utterance.voice = voice;
        }
    }
    speechSynthesis.speak(utterance) //speak the speech or utterance
}

speechBtn.addEventListener("click", e => {
    e.preventDefault();

    if(textarea.value !== ""){
        if(!synth.speaking){
        //if an utterance/speech is not currently in the process 
        textToSpeech(textarea.value);
        };

        if(textarea.value.length > 80){
            if(isSpeaking){
                synth.resume();
                isSpeaking = false;
                speechBtn.innerText = "Pause Speech"
            }
            else{
                synth.pause();
                isSpeaking = true;
                speechBtn.innerText = "Resume Speech"
            }

            setInterval(() => {
                if(!synth.speaking && !isSpeaking){
                    isSpeaking = true;
                    speechBtn.innerText = "Convert To Speech"
                }
                else{
                    speechBtn.innerText = "Convert To Speech"
                }
            })
        }
;    }
})
