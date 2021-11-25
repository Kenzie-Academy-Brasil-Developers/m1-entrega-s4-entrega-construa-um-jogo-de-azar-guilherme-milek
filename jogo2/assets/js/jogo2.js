const sectionGameDisplay = document.querySelector('.game-display');
let sectionDasImagens;
      
function criarElementosParaPegarNomeJogador() {
    const form = document.createElement('form');
    const inputText = document.createElement('input');
    inputText.id = 'campo-nome';
    inputText.autocomplete = 'off';
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
    criarTimer();
    timerStart();
    criaElementosPedraPapelTesoura();
}
const botaoConfirmaNome = document.querySelector('#confirma-nome');
botaoConfirmaNome.addEventListener('click', pegarNomeJogador);

function criaElementosPedraPapelTesoura() {
    sectionDasImagens = document.createElement('section');
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
    imgPedra.addEventListener('click', jogadas);
    const imgPapel = document.querySelector('#papel');
    imgPapel.addEventListener('click', jogadas);
    const imgTesoura = document.querySelector('#tesoura');
    imgTesoura.addEventListener('click', jogadas);
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
    const form = document.querySelector('form');
    form.classList.remove('hidden');

    const tdsTable = document.querySelectorAll('td');

    for (let i = 0; i < tdsTable.length; i++) {
        if(i === 0) {
            tdsTable[i].innerText = 'Jogador';
        } else if(i !== 6) {
            tdsTable[i].innerHTML = "";
            tdsTable[i].classList.remove('winner');
        }
    }
}

const tempoEspera = 3000;

const imgDuplicada = document.createElement('img');

let imgPedra = document.querySelector('#pedra'),
    imgPapel = document.querySelector('#papel'),
    imgTesoura = document.querySelector('#tesoura');

let allPossibilities = [];

function animacaoDasEscolhas(imagemClicada, escolhaComputador) {

    imgPedra = document.querySelector('#pedra'), 
    imgPapel = document.querySelector('#papel'),
    imgTesoura = document.querySelector('#tesoura'),
    allPossibilities = [imgPedra, imgPapel, imgTesoura];

    const imgPedraCopy = imgPedra,
          imgPapelCopy = imgPapel,
          imgTesouraCopy = imgTesoura,
          allPossibilitiesCopies = [imgPedraCopy, imgPapelCopy, imgTesouraCopy];

    for (let item in allPossibilities) {
        if (allPossibilities[item].id === imagemClicada.id) {
            allPossibilities[item].classList.add("escolhida");
        }
        
        else if (allPossibilities[item].id === escolhaComputador.id) {
            allPossibilities[item].remove();

            for (let item in allPossibilitiesCopies) {
                if (allPossibilitiesCopies[item].id === escolhaComputador.id) {
                    sectionDasImagens.appendChild(allPossibilitiesCopies[item]);
                }
            }

            allPossibilities[item].classList.add("escolhida");
        }
        
        else {
            allPossibilities[item].classList.add("hidden");
        }
    }

    const match = `${imagemClicada.id}-${escolhaComputador.id}`;

    if (match === `${imgPedra.id}-${imgPedra.id}` ||
        match === `${imgPapel.id}-${imgPapel.id}` ||
        match === `${imgTesoura.id}-${imgTesoura.id}`) {
            imgDuplicada.id = "tempImg";
            imgDuplicada.id = imagemClicada.id;
            imgDuplicada.src = imagemClicada.src;
            imgDuplicada.classList.add('animacaoComputador');

            imagemClicada.classList.add('animacaoJogador');

            sectionDasImagens.appendChild(imgDuplicada);
            
            setTimeout(() => {
                imgDuplicada.remove();
                sectionDasImagens.remove();
                criaElementosPedraPapelTesoura();
            }, tempoEspera);
    } else {
        escolhaComputador.classList.add('animacaoComputador');
        imagemClicada.classList.add('animacaoJogador');
        setTimeout(() => {
            imgDuplicada.remove();
            sectionDasImagens.remove();
            criaElementosPedraPapelTesoura();
        }, tempoEspera);
    }
}

let vitoriasJogador = 0,
    vitoriasComputador = 0,
    counterRodadas = 0;

function verificaVitoria() {
    if(counterRodadas === 5) {
        return true;
    }
    return false;
}

function encerraJogo() {
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
}

let escolhaJogador;
function jogadas(event) {
    const imagemClicada = event.target;
    let escolhaComputador = sorteiaEscolhaComputador();

    if (!verificaVitoria()) {
        verificaJogada(imagemClicada.id, escolhaComputador.id);
        proximaPartida(imagemClicada, escolhaComputador);
    } else {
        encerraJogo();
    }
}

function proximaPartida(Player, PC) {
    counterRodadas++;
    criaImagensNaTabela(ganhador, counterRodadas, Player.src, PC.src);
    animacaoDasEscolhas(Player, PC);
    setTimeout(() => {
        timerStart()
    }, tempoEspera);
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
    timerStop();
}

function criarTimer() {
    const timerSection = document.createElement("section"),
          message = document.createElement("h2"),
          container = document.getElementById("container");
        
    timerSection.classList.add = "container__timer";

    timer = document.createElement("span");
    timer.innerText = "5";
    timer.id = "tempo-restante";

    message.innerText = "Escolha aleatória em:";

    timerSection.appendChild(message);
    timerSection.appendChild(timer);

    container.prepend(timerSection);
}

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
            timerStop()
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

const botaoInstrucoes = document.getElementById("gameRules");
botaoInstrucoes.addEventListener("click", criaInstrucoes)

const instrucoes = "Escolha entre pedra, papel ou tesoura. O computador fará uma escolha aleatória. Você receberá uma mensagem de quem foi o vencedor e poderá revisá-la no placar. Regra principal Papel vence pedra. Tesoura vence papel."
function criaInstrucoes() {
    const blocker = document.createElement("div");
    blocker.classList.add("blocker");

    const section = document.createElement("section");
    section.classList.add("con");
    section.id = "painelInstrucoes";

    const p = document.createElement("p");
    section.appendChild(p)

    p.innerText = instrucoes;

    const button = document.createElement("button");
    button.id = "closeRules";

    section.appendChild(button);

    
    button.innerText = "Fechar";
    button.addEventListener("click", () => {
        blocker.remove();
    })

    blocker.appendChild(section);
    document.body.appendChild(blocker);
}

function criaPopUpVitoriaDerrota() {
    const blocker = document.createElement("div");
    blocker.classList.add("blocker");

    const section = document.createElement("section");
    section.classList.add("instrucoes");
    section.id = "painelInstrucoes";

    const p = document.createElement("p");
    section.appendChild(p)

    p.innerText = instrucoes;

    const button = document.createElement("button");
    button.id = "closeRules";

    section.appendChild(button);

    
    button.innerText = "Fechar";
}