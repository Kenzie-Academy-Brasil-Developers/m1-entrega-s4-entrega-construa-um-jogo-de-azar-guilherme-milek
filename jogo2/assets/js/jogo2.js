const sectionGameDisplay = document.querySelector('.game-display');
//console.log(sectionGameDisplay)
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

function removeClasses(imagemClicadaParaAnimacao,escolhaComputador,imgEscolhaSobrante1,imgEscolhaSobrante2,imgDuplicada) {
    console.log(imagemClicadaParaAnimacao)
    console.log(escolhaComputador)
    console.log(imgEscolhaSobrante1)
    console.log(imgEscolhaSobrante2)
    console.log(imgDuplicada)
    console.log(imagemClicadaParaAnimacao.classList)
    if(imagemClicadaParaAnimacao.classList[0] === 'animacaoJogador') {
        imagemClicadaParaAnimacao.classList.remove('animacaoJogador');
        escolhaComputador.classList.remove('animacaoComputador');
    } else {
        imagemClicadaParaAnimacao.classList.remove('animacaoCorrigeBugJogador');
        escolhaComputador.classList.remove('animacaoCorrigeBugComputador');
    }

    imgEscolhaSobrante1.classList.remove('hidden');

    if(imgEscolhaSobrante2 !== undefined) {
        imgEscolhaSobrante2.classList.remove('hidden');
    }

    if(imgDuplicada !== undefined) {
        imgDuplicada.remove();
    }
}

const tempoEspera = 3000;
function animacaoDasEscolhas(imagemClicada, escolhaComputador) {
    const imgPedra = document.querySelector('#pedra');
    const imgPapel = document.querySelector('#papel');
    const imgTesoura = document.querySelector('#tesoura');
    //console.log(escolhaComputador.id)
    const imagemClicadaParaAnimacao = imagemClicada;

    if(imagemClicadaParaAnimacao.id === 'pedra') {
        if(escolhaComputador.id === 'tesoura') {
            imagemClicadaParaAnimacao.classList.add('animacaoJogador');
            escolhaComputador.classList.add('animacaoComputador');
            imgPapel.classList.add('hidden');
            setTimeout(() => {removeClasses(imagemClicadaParaAnimacao,escolhaComputador,imgPapel)},tempoEspera);
        } else if(escolhaComputador.id === 'papel') {
            imagemClicadaParaAnimacao.classList.add('animacaoJogador');
            escolhaComputador.classList.add('animacaoComputador');
            imgTesoura.classList.add('hidden');
            setTimeout(() => {removeClasses(imagemClicadaParaAnimacao,escolhaComputador,imgTesoura)},tempoEspera);
        } else {
            const sectionDasImagens = document.querySelector('.game-display');
            const imgDuplicada = document.createElement('img');
            imgDuplicada.id = "pedra";
            sectionDasImagens.appendChild(imgDuplicada);
            imgDuplicada.src = imagemClicadaParaAnimacao.src;
            imgDuplicada.classList.add('animacaoComputador');
            imagemClicadaParaAnimacao.classList.add('animacaoJogador');
            imgTesoura.classList.add('hidden');
            imgPapel.classList.add('hidden');
            setTimeout(() => {removeClasses(imagemClicadaParaAnimacao,escolhaComputador,imgTesoura,imgPapel,imgDuplicada)},tempoEspera);
        }
    } else if(imagemClicadaParaAnimacao.id === 'papel') {
        if(escolhaComputador.id === 'pedra') {
            imagemClicadaParaAnimacao.classList.add('animacaoCorrigeBugJogador');
            /* imagemClicadaParaAnimacao.style.position = 'relative';
            imagemClicadaParaAnimacao.style.left = '-20px'; */
            escolhaComputador.classList.add('animacaoCorrigeBugComputador');
            imgTesoura.classList.add('hidden');
            setTimeout(() => {removeClasses(imagemClicadaParaAnimacao,escolhaComputador,imgTesoura)},tempoEspera);
        } else if(escolhaComputador.id === 'tesoura') {
            imagemClicadaParaAnimacao.classList.add('animacaoJogador');
            escolhaComputador.classList.add('animacaoComputador');
            imgPedra.classList.add('hidden');
            setTimeout(() => {removeClasses(imagemClicadaParaAnimacao,escolhaComputador,imgPedra)},tempoEspera);
        } else {
            const sectionDasImagens = document.querySelector('.game-display');
            const imgDuplicada = document.createElement('img');
            sectionDasImagens.appendChild(imgDuplicada);
            imgDuplicada.src = imagemClicadaParaAnimacao.src;
            imgDuplicada.classList.add('animacaoComputador');
            imgDuplicada.id = 'papel';
            imagemClicadaParaAnimacao.classList.add('animacaoJogador');
            imgTesoura.classList.add('hidden');
            imgPedra.classList.add('hidden');
            setTimeout(() => {removeClasses(imagemClicadaParaAnimacao,escolhaComputador,imgTesoura,imgPedra,imgDuplicada)},tempoEspera);
        }
    } else {
        if(escolhaComputador.id === 'pedra') {
            imagemClicadaParaAnimacao.classList.add('animacaoCorrigeBugJogador');
            escolhaComputador.classList.add('animacaoCorrigeBugComputador');
            imgPapel.classList.add('hidden');
            setTimeout(() => {removeClasses(imagemClicadaParaAnimacao,escolhaComputador,imgPapel)},tempoEspera);
        } else if(escolhaComputador.id === 'papel') {
            imagemClicadaParaAnimacao.classList.add('animacaoCorrigeBugJogador');
            escolhaComputador.classList.add('animacaoCorrigeBugComputador');
            imgPedra.classList.add('hidden');
            setTimeout(() => {removeClasses(imagemClicadaParaAnimacao,escolhaComputador,imgPedra)},tempoEspera);
        } else {
            const sectionDasImagens = document.querySelector('.game-display');
            const imgDuplicada = document.createElement('img');
            sectionDasImagens.appendChild(imgDuplicada);
            imgDuplicada.src = imagemClicadaParaAnimacao.src;
            imgDuplicada.classList.add('animacaoComputador');
            imgDuplicada.id = 'tesoura';
            imagemClicadaParaAnimacao.classList.add('animacaoJogador');
            imgPapel.classList.add('hidden');
            imgPedra.classList.add('hidden');
            setTimeout(() => {removeClasses(imagemClicadaParaAnimacao,escolhaComputador,imgPapel,imgPedra,imgDuplicada)},tempoEspera);
            }
    }
    
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
    counterRodadas++;
    criaImagensNaTabela(ganhador, counterRodadas, Player.src, PC.src);
    animacaoDasEscolhas(Player, PC);
    setTimeout(() => {timerStart()}, tempoEspera);
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
    timerStop();
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

function criarTimer() {
    const timer = document.createElement("section");
    timer.classList.add = "tempo-restante";

}

const botaoInstrucoes = document.getElementById("gameRules");
botaoInstrucoes.addEventListener("click", criaInstrucoes)

const instrucoes = "Escolha entre pedra, papel ou tesoura. O computador fará uma escolha aleatória. Você receberá uma mensagem de quem foi o vencedor e poderá revisá-la no placar. Regra principal Papel vence pedra. Tesoura vence papel."
function criaInstrucoes() {
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
        blocker.remove();
    })

    blocker.appendChild(section);
    document.body.appendChild(blocker);
}
