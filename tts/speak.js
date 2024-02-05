//Second Page
const texts = document.querySelector(".texts")
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new window.SpeechRecognition();
//recognition.continuous = true;
recognition.interimResults = true;


let p = document.createElement('p');
 
recognition.addEventListener('result', (e) =>{
   
  
    const text = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');

    // console.log(text);

    p.innerHTML = text;
    texts.appendChild(p);

    if(e.results[0].isFinal){
        if(text.includes('hello')){
            p = document.createElement('p');
            p.classList.add('replay');

            p.innerHTML = 'Hi';

            texts.appendChild(p);
        }

        if(text.includes('open my YouTube channel')){
            p = document.createElement('p');
            p.classList.add('replay');

            p.innerText = 'Opening Your Channel';
            window.open('https://youtube.com')

            texts.appendChild(p);
        }
        p = document.createElement('p')
    }
});

recognition.addEventListener('end', () => {
    recognition.start();
})

recognition.start();
