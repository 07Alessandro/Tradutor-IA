
// ENDEREÇO => https://api.mymemory.translated.net/get?q=
// TRADUZIR => Hello World!
// IDIOMA => &langpair=en|it

const inputTexto = document.querySelector('.inputTexto');
const selectIdioma = document.querySelector('.idiomas');
const botaoTraduzir = document.querySelector('#botaoTraduzir');
const botaoMicrofone = document.querySelector('#botaoMicrofone');
const textoTraduzido = document.querySelector('.traducao');
const caixaResultado = document.querySelector('#caixa-result');


async function traduzir() {
    const texto = inputTexto.value;
    const idioma = selectIdioma.value;

    caixaResultado.classList.add('carregando');
    textoTraduzido.innerHTML = "Traduzindo...";
   
  


    const resposta = await fetch(`https://api.mymemory.translated.net/get?q=${texto}&langpair=pt-BRs|${idioma}`);

    // const resposta = await endereco.json();
    const dados = await resposta.json();
    console.log(dados.responseData.translatedText);
    console.log(idioma)

    setTimeout(() => {
        // caixaResultado.classList.remove('carregando');
        caixaResultado.classList.remove('carregando');
       textoTraduzido.style.opacity = "1";
      



        // caixaResultado.style.border = "2px solid #4caf50";
    }, 3000);

    textoTraduzido.innerHTML = dados.responseData.translatedText;



    if (!texto) {
        alert("Por favor, insira um texto para traduzir.");

        textoTraduzido.innerHTML = "A Tradução aparecerá aqui...";
    }


}

botaoTraduzir.addEventListener('click', traduzir);

function ouvirVoz() {
    // ferramenta de reconhecimento de voz
    const voz = window.webkitSpeechRecognition // = window.webkitSpeechRecognition || window.SpeechRecognition;
    //   deixando ela pronta para uso
    const reconhecimentoVoz = new voz();
    // configurando a ferramenta
    reconhecimentoVoz.lang = 'pt-BR';

    // me avise quando começar a ouvir
    reconhecimentoVoz.onresult = (evento) => {
        const fala = evento.results[0][0].transcript;
        inputTexto.textContent = fala;
        traduzir();

        console.log(fala);
    }

    reconhecimentoVoz.start();
}

botaoMicrofone.addEventListener('click', ouvirVoz);

