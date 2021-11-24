const sectionGameDisplay = document.querySelector('.game-display');
//console.log(sectionGameDisplay)
function criarElementosParaPegarNomeJogador() {
    const form = document.createElement('form');
    const inputText = document.createElement('input');
    inputText.id = 'campo-nome';
    inputText.placeholder = 'Digite o seu primeiro nome:';
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
    timerStart()
}
const botaoConfirmaNome = document.querySelector('#confirma-nome');
botaoConfirmaNome.addEventListener('click', pegarNomeJogador);

function criaElementosPedraPapelTesoura() {
    const sectionDasImagens = document.createElement('section');
    sectionDasImagens.id = 'secao-imagens';
    sectionDasImagens.classList.remove('hidden');
    const imagemPedra = document.createElement('img');
    imagemPedra.id = 'pedra';
    imagemPedra.src = "./assets/images/pedra.png";
    imagemPedra.alt = 'Símbolo de pedra com a mão';
    const imagemPapel = document.createElement('img');
    imagemPapel.id = 'papel';
    imagemPapel.src = "./assets/images/papel.png";
    imagemPapel.alt = 'Símbolo de papel com a mão';

    const imagemTesoura = document.createElement('img');
    imagemTesoura.id = 'tesoura';
    imagemTesoura.src = "./assets/images/tesoura.png";
    imagemTesoura.alt = 'Símbolo de tesoura com a mão';

    sectionGameDisplay.appendChild(sectionDasImagens);
    sectionDasImagens.appendChild(imagemPedra);
    sectionDasImagens.appendChild(imagemPapel);
    sectionDasImagens.appendChild(imagemTesoura);

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
    return escolhaComputador;
}

function criaImagensNaTabela(ganhador, rodada, imgSrcPlayer, imgSrcComputer) {
    let campoJogadorTabela = document.querySelector(`#player-rodada${rodada}`);
    let campoComputerTabela = document.querySelector(`#computer-rodada${rodada}`);
    /* console.log(ganhador);
    console.log(campoJogadorTabela);
    console.log(campoComputerTabela); */
    const imgTabelaPlayer = document.createElement('img');
    const imgTabelaComputer = document.createElement('img');
    campoJogadorTabela.appendChild(imgTabelaPlayer);
    campoComputerTabela.appendChild(imgTabelaComputer);
    imgTabelaPlayer.src = imgSrcPlayer;
    imgTabelaComputer.src = imgSrcComputer;
    if(ganhador === 'jogador') {
        campoJogadorTabela.classList.add('winner');
    } else if(ganhador === 'computador') {
        campoComputerTabela.classList.add('winner');
    } 
}

function resetGame() {
    vitoriasJogador = 0;
    vitoriasComputador = 0;
    counterRodadas = 0;
    const sectionDasImagens = document.querySelector('#secao-imagens');
    sectionDasImagens.remove();
    const form = document.querySelector('form');
    //form.innerHTML = "";
    form.classList.remove('hidden');
    const tdsTable = document.querySelectorAll('td');
    for(let i = 0; i < tdsTable.length; i++) {

        if(i === 0) {
            tdsTable[i].innerText = 'Jogador';
        } else if(i !== 6) {
            tdsTable[i].innerHTML = "";
            tdsTable[i].classList.remove('winner');
        }
    }
    timerStop()
}

function removeClassAnimacao(imagemClicadaParaAnimacao) {
    imagemClicadaParaAnimacao.classList.remove('animacao');
    //console.log("Aqui")
}

function animacaoDasEscolhas(imagemClicada, escolhaComputador) {
    //console.log(escolhaComputador.id)
    const imagemClicadaParaAnimacao = imagemClicada;
    if(imagemClicadaParaAnimacao.id === 'pedra') {
        //console.log('Fui clicado');
        imagemClicadaParaAnimacao.classList.add('animacao');
        
    } else if(imagemClicadaParaAnimacao.id === 'papel') {
        imagemClicadaParaAnimacao.classList.add('animacao');
    } else {
        imagemClicadaParaAnimacao.classList.add('animacao');
    }
    setTimeout(() => {removeClassAnimacao(imagemClicadaParaAnimacao)},1500);
    
}

let vitoriasJogador = 0;
let vitoriasComputador = 0;
let counterRodadas = 0;
function verificaVitoria() {
    if(counterRodadas === 5) {
        if(vitoriasJogador > vitoriasComputador) {
            alert(`PLACAR GERAL: JOGADOR VENCEU!\nJogador: ${vitoriasJogador}\nComputador: ${vitoriasComputador}`);
            resetGame();
        } else if(vitoriasComputador > vitoriasJogador) {
            alert(`PLACAR GERAL: COMPUTADOR VENCEU!\nJogador: ${vitoriasJogador}\nComputador: ${vitoriasComputador}`);
            resetGame();
        } else {
            alert(`PLACAR GERAL: EMPATE!\nJogador: ${vitoriasJogador}\nComputador: ${vitoriasComputador}`);
            resetGame();
        }
        counterRodadas = 0;
        vitoriasJogador = 0;
        vitoriasComputador = 0;
        /* console.log("counterRodadas"+counterRodadas )
        console.log("vitoriasJogador"+vitoriasJogador)
        console.log("vitoriasComputador"+vitoriasComputador) */
    }
}

let escolhaJogador;
function dezJogadas(event) {
    const imagemClicada = event.target;
    /* const imgPedra = document.querySelector('#pedra');
    const imgPapel = document.querySelector('#papel');
    const imgTesoura = document.querySelector('#tesoura'); */
    let ganhador = "";
    let escolhaComputador = sorteiaEscolhaComputador();
    /* console.log(imagemClicada.id)
    console.log(escolhaComputador)
    console.log(counterRodadas) */

    verificaJogada(imagemClicada.id, escolhaComputador.id);
    proximaPartida(imagemClicada, escolhaComputador);
}

function proximaPartida(Player, PC) {
    timerStart();
    counterRodadas++;
    criaImagensNaTabela(ganhador, counterRodadas, Player.src, PC.src);
    animacaoDasEscolhas(Player, PC);
    verificaVitoria();
    /* console.log("AntesVitoria")
    console.log("jogador"+vitoriasJogador);
    console.log("computador"+vitoriasComputador);
    console.log(imagemClicada.src); */
}

function verificaJogada(escolhaPlayer, escolhaPC) {
    if(escolhaPlayer === 'pedra') {
        if(escolhaPlayer === 'pedra' && escolhaPC === 'tesoura') {
            alert(`Você ganhou! Computador selecionou ${escolhaPC.toUpperCase()}.`);
            vitoriasJogador++;
            ganhador = 'jogador';
       } else if(escolhaPlayer === 'pedra' && escolhaPC === 'papel') {
            alert(`Você perdeu! Computador selecionou ${escolhaPC.toUpperCase()}.`);
            vitoriasComputador++;
            ganhador = 'computador';
       } else {
            alert(`Empate! Computador selecionou ${escolhaPC.toUpperCase()}.`);
            ganhador = 'empate';
       } 
    } else if(escolhaPlayer === 'papel') {
        if(escolhaPlayer === 'papel' && escolhaPC === 'pedra') {
            alert(`Você ganhou! Computador selecionou ${escolhaPC.toUpperCase()}.`);
            vitoriasJogador++;
            ganhador = 'jogador';
        } else if(escolhaPlayer === 'papel' && escolhaPC === 'tesoura') {
            alert(`Você perdeu! Computador selecionou ${escolhaPC.toUpperCase()}.`);
            vitoriasComputador++;
            ganhador = 'computador';
        } else {
            alert(`Empate! Computador selecionou ${escolhaPC.toUpperCase()}.`);
            ganhador = 'empate';
        } 
    } else {
        if(escolhaPlayer === 'tesoura' && escolhaPC === 'papel') {
            alert(`Você ganhou! Computador selecionou ${escolhaPC.toUpperCase()}.`);
            vitoriasJogador++;
            ganhador = 'jogador';
        } else if(escolhaPlayer === 'tesoura' && escolhaPC === 'pedra') {
            alert(`Você perdeu! Computador selecionou ${escolhaPC.toUpperCase()}.`);
            vitoriasComputador++;
            ganhador = 'computador';
        } else {
            alert(`Empate! Computador selecionou ${escolhaPC.toUpperCase()}.`);
            ganhador = 'empate';
        } 
    }
}

const timer = document.getElementById("tempo-restante");
let cronometro = "",
    startTime = 5;

function timerStart() {
    timerStop();
    timer.innerText = startTime;
    let sec = startTime;
    cronometro = setInterval(() => {
        sec--;
        timer.innerText = sec;

        if (sec === 0) {
            escolhaPlayer = sorteiaEscolhaComputador();
            escolhaPC = sorteiaEscolhaComputador();

            verificaJogada(escolhaPlayer.id, escolhaPC.id);
            proximaPartida(escolhaPlayer, escolhaPC);
        }
    }, 1000);
}

function timerStop() {
    clearInterval(cronometro);
}
