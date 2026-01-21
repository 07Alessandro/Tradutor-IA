
// ENDEREÇO => https://api.mymemory.translated.net/get?q=
// TRADUZIR => Hello World!
// IDIOMA => &langpair=en|it

const inputTexto = document.querySelector('.inputTexto');
const selectIdioma = document.querySelector('.idiomas');
const botaoTraduzir = document.querySelector('#botaoTraduzir');
const botaoMicrofone = document.querySelector('#botaoMicrofone');
const textoTraduzido = document.querySelector('.traducao');
const caixaResultado = document.querySelector('#caixa-result');
const botaoOuvir = document.querySelector('#botaoSom');

async function traduzir() {
    const texto = inputTexto.value;
    const idioma = selectIdioma.value;


    if (!texto) {
        alert("Por favor, insira um texto para traduzir.");
        textoTraduzido.innerHTML = "A Tradução aparecerá aqui...";
        return;
    }

    caixaResultado.classList.add('carregando');
    textoTraduzido.innerHTML = "Traduzindo...";



    const resposta = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=pt-BR|${idioma}`);
    const dados = await resposta.json();
    console.log(dados.responseData.translatedText);
    console.log(idioma)

    setTimeout(() => {
        // caixaResultado.classList.remove('carregando');
        caixaResultado.classList.remove('carregando');
        textoTraduzido.style.opacity = "1";

        // caixaResultado.style.border = "2px solid #4caf50";
    }, 1000);


    textoTraduzido.innerHTML = dados.responseData.translatedText;



}


// --- NOVA FUNÇÃO DE ÁUDIO ---
function falarTexto() {
    const textoParaFalar = textoTraduzido.innerText;
    const idiomaDestino = selectIdioma.value;

    if (textoParaFalar && textoParaFalar !== "Traduzindo..." && textoParaFalar !== "A Tradução aparecerá aqui...") {
        const mensagem = new SpeechSynthesisUtterance(textoParaFalar);

        // Definindo o idioma da fala com base no idioma selecionado
        mensagem.lang = idiomaDestino;
        window.speechSynthesis.speak(mensagem);
    }
}

botaoOuvir.addEventListener('click', falarTexto);
// --- FIM DA NOVA FUNÇÃO DE ÁUDIO ---

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

