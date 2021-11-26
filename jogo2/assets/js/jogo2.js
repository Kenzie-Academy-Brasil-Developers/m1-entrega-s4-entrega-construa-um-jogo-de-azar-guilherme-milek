const sectionGameDisplay = document.querySelector('.game-display');
let sectionDasImagens;

function escureceTela() {
    const telaPreta = document.createElement("div");
    document.body.appendChild(telaPreta);
    telaPreta.classList.add("tela-preta");
    setTimeout(() => {
        telaPreta.remove();
    }, 4000);
}
escureceTela()

function criarElementosParaPegarNomeJogador() {
    const form = document.createElement('form');
    const inputText = document.createElement('input');
    inputText.id = 'campo-nome';
    inputText.autocomplete = 'off';
    inputText.placeholder = 'Digite o seu primeiro nome:';
    inputText.maxLength = '12';
    inputText.autocomplete = 'off';
    const button = document.createElement('button');
    button.innerHTML = 'Confirmar';
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
    if (valorCampoNome === "") {
        nomeJogadoNaTabela.innerHTML = 'Jogador';
    } else {
        nomeJogadoNaTabela.innerHTML = valorCampoNome;
    }
    const form = document.querySelector('form');
    form.classList.add('hidden');
    tocaSom("./assets/sfx/ak--close.wav");
    criarTimer();
    timerStart();
    criaElementosPedraPapelTesoura();
}

const botaoConfirmaNome = document.querySelector('#confirma-nome');
botaoConfirmaNome.addEventListener('click', pegarNomeJogador);

const imagemPedraZ = document.createElement('img');
imagemPedraZ.id = 'pedraZ';
imagemPedraZ.src = "./assets/images/pedraZ.png";

const imagemPapelZ = document.createElement('img');
imagemPapelZ.id = 'papelZ';
imagemPapelZ.src = "./assets/images/papelZ.png";

const imagemTesouraZ = document.createElement('img');
imagemTesouraZ.id = 'tesouraZ';
imagemTesouraZ.src = "./assets/images/tesouraZ.png";

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
    const arrayEscolhaComputador = [imagemPedraZ, imagemPapelZ, imagemTesouraZ];
    const sorteiaEscolhaComputador = Math.floor(Math.random() * 3);
    let escolhaComputador = arrayEscolhaComputador[sorteiaEscolhaComputador];
    return escolhaComputador;
}

function sorteiaEscolhaJogador() {
    const imgPedra = document.querySelector("#pedra"),
          imgPapel = document.querySelector("#papel"),
          imgTesoura = document.querySelector("#tesoura"),
          arrayEscolhaJogador = [imgPedra, imgPapel, imgTesoura],
          sorteiaEscolhaJogador = Math.floor(Math.random() * 3);

    return arrayEscolhaJogador[sorteiaEscolhaJogador];
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

    if (ganhador === 'jogador') {
        campoJogadorTabela.classList.add('winner');
        tocaSom("./assets/sfx/human-yeah.wav");
    } else if (ganhador === 'computador') {
        campoComputerTabela.classList.add('winner');
        tocaSom("./assets/sfx/zombie.wav");
    } else {
        tocaSom("./assets/sfx/ricochet.wav");
    }
}

function resetGame() {
    timerStop();

    sectionDasImagens.remove();

    vitoriasJogador = 0;
    vitoriasComputador = 0;
    counterRodadas = 0;

    document.getElementById("container__timer").remove();

    const form = document.querySelector('form');
    form.classList.remove('hidden');

    const tdsTable = document.querySelectorAll('td');

    for (let i = 0; i < tdsTable.length; i++) {
        if (i === 0) {
            tdsTable[i].innerText = 'Jogador';
        } else if (i !== 6) {
            tdsTable[i].innerHTML = "";
            tdsTable[i].classList.remove('winner');
        }
    }
}

const tempoEspera = 3000;

let imgPedra = document.querySelector('#pedra'),
    imgPapel = document.querySelector('#papel'),
    imgTesoura = document.querySelector('#tesoura');

let allPossibilities = [];

function animacaoDasEscolhas(imagemClicada, escolhaComputador) {
    imgPedra = document.querySelector('#pedra');
    imgPapel = document.querySelector('#papel');
    imgTesoura = document.querySelector('#tesoura');
    allPossibilities = [imgPedra, imgPapel, imgTesoura];

    const allPossibilitiesZombies = [imagemPedraZ, imagemPapelZ, imagemTesouraZ];

    for (let item in allPossibilities) {
        if (allPossibilities[item].id === imagemClicada.id) {
            allPossibilities[item].classList.add("escolhida");
        } else {
            allPossibilities[item].classList.add("hidden");
        }

        for (let item in allPossibilitiesZombies) {
            if (allPossibilitiesZombies[item].id === escolhaComputador.id) {
                sectionDasImagens.appendChild(allPossibilitiesZombies[item]);
                escolhaComputador = allPossibilitiesZombies[item];
                allPossibilitiesZombies[item].classList.add("escolhida");
            }
        }
    }

    imgPedra.removeEventListener("click", jogadas);
    imgPapel.removeEventListener("click", jogadas);
    imgTesoura.removeEventListener("click", jogadas);

    escolhaComputador.classList.add('animacaoComputador');
    imagemClicada.classList.add('animacaoJogador');
    setTimeout(() => {
        tocaSom("./assets/sfx/punch.wav");
    }, 1325);
    setTimeout(() => {
        sectionDasImagens.remove();
    }, tempoEspera);
}

let vitoriasJogador = 0,
    vitoriasComputador = 0,
    counterRodadas = 0;

function verificaVitoria() {
    if (counterRodadas === 5) {
        if (vitoriasJogador > vitoriasComputador) {
            setTimeout(() => {
                criarPopUpVitoriaDerrota(`PLACAR GERAL: JOGADOR VENCEU!\nJogador: ${vitoriasJogador}\nComputador: ${vitoriasComputador}`);
                tocaSom("./assets/sfx/player-win.wav");
                resetGame();
            }, tempoEspera + 3000);
        } else if (vitoriasComputador > vitoriasJogador) {
            setTimeout(() => {
                criarPopUpVitoriaDerrota(`PLACAR GERAL: COMPUTADOR VENCEU!\nJogador: ${vitoriasJogador}\nComputador: ${vitoriasComputador}`);
                tocaSom("./assets/sfx/player-lost.wav");
                resetGame();
            }, tempoEspera + 3000);
        } else {
            setTimeout(() => {
                criarPopUpVitoriaDerrota(`PLACAR GERAL: EMPATE!\nJogador: ${vitoriasJogador}\nComputador: ${vitoriasComputador}`);
                tocaSom("./assets/sfx/player-tie.wav");
                resetGame();
            }, tempoEspera + 3000);
        }
        setTimeout(() => {
            counterRodadas = 0;
            vitoriasJogador = 0;
            vitoriasComputador = 0;
        }, tempoEspera + 3000);
    } else {
        setTimeout(() => {
            timerStart();
            criaElementosPedraPapelTesoura();
        }, tempoEspera + 3000);
    }
}

let escolhaJogador;

function jogadas(event) {
    const imagemClicada = event.target;
    tocaSom("./assets/sfx/gunshot.wav")
    let ganhador = "";
    let escolhaComputador = sorteiaEscolhaComputador();
    verificaJogada(imagemClicada.id, escolhaComputador.id);
    proximaPartida(imagemClicada, escolhaComputador);
}

function proximaPartida(Player, PC) {
    timerStop();
    counterRodadas++;
    criaImagensNaTabela(ganhador, counterRodadas, Player.src, PC.src);
    animacaoDasEscolhas(Player, PC);

    verificaVitoria();
}

function verificaJogada(escolhaPlayer, escolhaPC) {
    const escolhaDoComputador = `${escolhaPC.split("").slice(0, -1).join("").toUpperCase()}`;
    
    if (escolhaPlayer === 'pedra') {
        if (escolhaPlayer === 'pedra' && escolhaPC === 'tesouraZ') {
            vitoriasJogador++;
            ganhador = 'jogador';
            setTimeout(() => {
                criarPopUpVitoriaDerrota(`Você ganhou! Computador selecionou ${escolhaDoComputador}.`);
            }, tempoEspera);
        } else if (escolhaPlayer === 'pedra' && escolhaPC === 'papelZ') {
            vitoriasComputador++;
            ganhador = 'computador';
            setTimeout(() => {
                criarPopUpVitoriaDerrota(`Você perdeu! Computador selecionou ${escolhaDoComputador}.`);
            }, tempoEspera);
        } else {
            ganhador = 'empate';
            setTimeout(() => {
                criarPopUpVitoriaDerrota(`Empate! Computador selecionou ${escolhaDoComputador}.`);
            }, tempoEspera);
        }
    } else if (escolhaPlayer === 'papel') {
        timerStop();
        if (escolhaPlayer === 'papel' && escolhaPC === 'pedraZ') {
            vitoriasJogador++;
            ganhador = 'jogador';
            setTimeout(() => {
                criarPopUpVitoriaDerrota(`Você ganhou! Computador selecionou ${escolhaDoComputador}.`);
            }, tempoEspera);
        } else if (escolhaPlayer === 'papel' && escolhaPC === 'tesouraZ') {
            vitoriasComputador++;
            ganhador = 'computador';
            setTimeout(() => {
                criarPopUpVitoriaDerrota(`Você perdeu! Computador selecionou ${escolhaDoComputador}.`);
            }, tempoEspera);
        } else {
            ganhador = 'empate';
            setTimeout(() => {
                criarPopUpVitoriaDerrota(`Empate! Computador selecionou ${escolhaDoComputador}.`);
            }, tempoEspera);
        }
    } else {
        if (escolhaPlayer === 'tesoura' && escolhaPC === 'papelZ') {
            vitoriasJogador++;
            ganhador = 'jogador';
            setTimeout(() => {
                criarPopUpVitoriaDerrota(`Você ganhou! Computador selecionou ${escolhaDoComputador}.`);
            }, tempoEspera);
        } else if (escolhaPlayer === 'tesoura' && escolhaPC === 'pedraZ') {
            vitoriasComputador++;
            ganhador = 'computador';
            setTimeout(() => {
                criarPopUpVitoriaDerrota(`Você perdeu! Computador selecionou ${escolhaDoComputador}.`);
            }, tempoEspera);
        } else {
            ganhador = 'empate';
            setTimeout(() => {
                criarPopUpVitoriaDerrota(`Empate! Computador selecionou ${escolhaDoComputador}.`);
            }, tempoEspera);
        }
    }
}

function criarTimer() {
    const timerSection = document.createElement("section"),
        message = document.createElement("h2"),
        container = document.getElementById("container");

    timerSection.id = "container__timer";

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
            escolhaPlayer = sorteiaEscolhaJogador();
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

const instrucoes = "Escolha entre pedra, papel ou tesoura. \nO computador fará uma escolha aleatória.\nVocê receberá uma mensagem de quem foi o vencedor e poderá revisá-la no placar.\nRegra principal:\nPapel vence pedra.\nTesoura vence papel.\nPedra vence tesoura."

function criaInstrucoes() {
    tocaSom("./assets/sfx/ak.wav");

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
    button.addEventListener("click", () => {
        tocaSom("./assets/sfx/ak--close.wav");
        blocker.remove();
    })

    blocker.appendChild(section);
    document.body.appendChild(blocker);
}

function fecharPopUp() {
    const section = document.querySelector('.blocker');
    section.remove();
}

function criarPopUpVitoriaDerrota(textToShow) {
    timerStop();
    setTimeout(() => {
        fecharPopUp()
    }, 3000);
    const body = document.querySelector('body');
    const section = document.createElement('section');
    section.classList.add('blocker');
    const divAlert = document.createElement('div');
    divAlert.classList.add('popUp');
    const span = document.createElement('span');
    span.innerHTML = textToShow;
    span.id = 'alert-text';
    body.prepend(section);
    divAlert.appendChild(span);
    section.appendChild(divAlert);
}

function tocaSom(relativePath) {
    const audio = new Audio(relativePath);
    audio.play();
}

document.getElementById("homeButton").addEventListener("click", voltaHome)

function voltaHome() {
    tocaSom("./assets/sfx/ak.wav");
    document.location.href = "..";
}