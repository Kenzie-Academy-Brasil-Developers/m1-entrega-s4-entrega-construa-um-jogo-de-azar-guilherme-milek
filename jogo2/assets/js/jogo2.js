const sectionGameDisplay = document.querySelector('.game-display');
console.log(sectionGameDisplay)
function criarElementosParaPegarNomeJogador() {
    const form = document.createElement('form');
    const inputText = document.createElement('input');
    inputText.id = 'campo-nome';
    inputText.placeholder = 'Digite o seu primeiro nome aqui';
    const button = document.createElement('button');
    button.innerHTML = 'Comfirmar';
    button.id = 'confirma-nome';
    button.type = 'button';
    sectionGameDisplay.appendChild(form);
    form.appendChild(inputText);
    form.appendChild(button);
}
criarElementosParaPegarNomeJogador()

function pegarNomeJogador() {
    const campoPegaNome = document.querySelector('#campo-nome');
    const valorCampoNome = campoPegaNome.value;
    const nomeJogadoNaTabela = document.querySelector('#player-name');
    if(valorCampoNome === "") {
        nomeJogadoNaTabela.innerHTML = 'Jogador';
    } else {
        nomeJogadoNaTabela.innerHTML = valorCampoNome;
    }
    const form = document.querySelector('form');
    form.classList.add('hidden');
    criaElementosPedraPapelTesoura();
}
const botaoConfirmaNome = document.querySelector('#confirma-nome');
botaoConfirmaNome.addEventListener('click', pegarNomeJogador);

function criaElementosPedraPapelTesoura() {
    const imagemPedra = document.createElement('img');
    imagemPedra.id = 'pedra';
    imagemPedra.src = "./assets/images/pedra.png";
    imagemPedra.alt = 'Símbolo de pedra com a mão';
    imagemPedra.width = 50;
    const imagemPapel = document.createElement('img');
    imagemPapel.id = 'papel';
    imagemPapel.src = "./assets/images/papel.png";
    imagemPapel.alt = 'Símbolo de papel com a mão';
    imagemPapel.width = 50;

    const imagemTesoura = document.createElement('img');
    imagemTesoura.id = 'tesoura';
    imagemTesoura.src = "./assets/images/tesoura.png";
    imagemTesoura.alt = 'Símbolo de tesoura com a mão';
    imagemTesoura.width = 50;

    sectionGameDisplay.appendChild(imagemPedra);
    sectionGameDisplay.appendChild(imagemPapel);
    sectionGameDisplay.appendChild(imagemTesoura);

    const imgPedra = document.querySelector('#pedra');
    imgPedra.addEventListener('click', dezJogadas);
    const imgPapel = document.querySelector('#papel');
    imgPapel.addEventListener('click', dezJogadas);
    const imgTesoura = document.querySelector('#tesoura');
    imgTesoura.addEventListener('click', dezJogadas);
}

function sorteiaEscolhaComputador() {
    const imgPedra = document.querySelector('#pedra');
    const imgPapel = document.querySelector('#papel');
    const imgTesoura = document.querySelector('#tesoura');
    const arrayEscolhaComputador = [imgPedra,imgPapel,imgTesoura];
    const sorteiaEscolhaComputador = Math.floor(Math.random() * 3);
    let escolhaComputador = arrayEscolhaComputador[sorteiaEscolhaComputador];
    return escolhaComputador.id;
}

let vitoriasJogador = 0;
let vitoriasComputador = 0;
let counterRodadas = 0;
function dezJogadas(event) {
    const imagemClicada = event.target;
    
    let escolhaComputador = sorteiaEscolhaComputador();
    console.log(imagemClicada.id)
    console.log(escolhaComputador)
    if(imagemClicada.id === 'pedra') {
        if(imagemClicada.id === 'pedra' && escolhaComputador === 'tesoura') {
           return alert(`Você ganhou! Computador selecionou ${escolhaComputador.toUpperCase()}.`);
           vitoriasJogador++;
           counterRodadas++;
       } else if(imagemClicada.id === 'pedra' && escolhaComputador === 'papel') {
           return alert(`Você perdeu! Computador selecionou ${escolhaComputador.toUpperCase()}.`);
           vitoriasComputador++;
           counterRodadas++;
       } else {
           return alert(`Empate! Computador selecionou ${escolhaComputador.toUpperCase()}.`);
           counterRodadas++;
       } 
    } else if(imagemClicada.id === 'papel') {
        if(imagemClicada.id === 'papel' && escolhaComputador === 'pedra') {
            return alert(`Você ganhou! Computador selecionou ${escolhaComputador.toUpperCase()}.`);
            vitoriasJogador++;
            counterRodadas++;
        } else if(imagemClicada.id === 'papel' && escolhaComputador === 'tesoura') {
            return alert(`Você perdeu! Computador selecionou ${escolhaComputador.toUpperCase()}.`);
            vitoriasComputador++;
            counterRodadas++;
        } else {
            return alert(`Empate! Computador selecionou ${escolhaComputador.toUpperCase()}.`);
            counterRodadas++;
        } 
    } else {
        if(imagemClicada.id === 'tesoura' && escolhaComputador === 'papel') {
            return alert(`Você ganhou! Computador selecionou ${escolhaComputador.toUpperCase()}.`);
            vitoriasJogador++;
            counterRodadas++;
        } else if(imagemClicada.id === 'tesoura' && escolhaComputador === 'pedra') {
            return alert(`Você perdeu! Computador selecionou ${escolhaComputador.toUpperCase()}.`);
            vitoriasComputador++;
            counterRodadas++;
        } else {
            return alert(`Empate! Computador selecionou ${escolhaComputador.toUpperCase()}.`);
            counterRodadas++;
        } 
    }
    console.log(counterRodadas)
    if(counterRodadas === 2) {
        if(vitoriasJogador > vitoriasComputador) {
            alert("PLACAR GERAL:\nJOGADOR VENCEU!");
        } else if(vitoriasComputador > vitoriasJogador) {
            alert("PLACAR GERAL:\nCOMPUTADOR VENCEU!");
        } else {
            alert("PLACAR GERAL:\nEMPATE!");
        }
    }
}
