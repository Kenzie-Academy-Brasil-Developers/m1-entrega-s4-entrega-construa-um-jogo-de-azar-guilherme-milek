//Palavras para achar
let palavras = ['Bulbasaur', 'Caterpie', 'Squirtle', 'Nidoran', 'Nidorino', 'Zubat', 'Oddish', 'Mankey', 'Alakazam', 'Machop', 'Slowpoke', 'Gengar', 'Exeggutor', 'Ditto', 'Snorlax', 'Dragonite', 'Mewtwo', 'Pikachu', 'Rattata', 'Psyduck']
//Letras para preencher o resto
let letras = 'abcdefghijklmnopqrstuvwxyz'
//Arr bidimensional das letras e palavras
let matriz = criarMatriz()
let localPalavrasMatriz = []
let palavrasAchadas = [];
let caixaLetraSelecionada = [];

function colocarNome(event) {
    const divNome = document.querySelector('.inserir-nome')
    const nome = document.getElementById('nome').value
    const cronometro = document.querySelector('.tempo-limite')
    const palavrasParaAchar = document.querySelector('.palavras-para-achar')

    divNome.classList.add('hidden')
    cronometro.classList.remove('hidden')
    palavrasParaAchar.classList.remove('hidden')

    iniciarJogo()
}

const btn = document.getElementById('btn-nome')
btn.addEventListener('click', colocarNome)

//Sortear uma letra
function sortearLetra() {
    return letras.substr(Math.floor(Math.random() * letras.length), 1)
}

//Sorteia tres palavras
function sortearPalavra() {
    return palavras[Math.floor(Math.random() * palavras.length)]
}

//Cria uma matriz de 10x10 vazia
function criarMatriz() {
    let res = []
    for (let i = 0; i < 10; i++) {
        res.push([])

        for (let j = 0; j < 10; j++) {
            res[i].push(0)
        }

    }
    return res
}

const listaPalavras = document.getElementById("lista-palavras");
//Sorteia 3 palavras e coloca elas na matriz
function ColocarPalavrasNaMatriz() {
    matriz = criarMatriz()

    let palavrasSorteadas = []

    while (palavrasSorteadas.length < 3) {

        let palavraSorteada = sortearPalavra()

        //Verifica se a palavra ja foi sorteada
        if (palavrasSorteadas.includes(palavraSorteada)) {

        }
        else {
            const listItem = document.createElement("li");
            listItem.innerText = palavraSorteada;
            listItem.setAttribute("id", palavraSorteada);
            listaPalavras.appendChild(listItem);

            palavrasSorteadas.push(palavraSorteada)
        }
    }

    //Coloca as 3 palavras na matriz
    for (let i = 0; i < 3; i++) {
        let possible = false

        while (possible === false) {
            //sorteia uma linha de 0 a 9
            let linha = Math.floor(Math.random() * 10)
            //sorteia uma coluna de 0 a 9
            let coluna = Math.floor(Math.random() * 10)

            //Verifica quantos espacos vazios tem
            let espacosVazios = 0
            for (let j = 0; j < 10; j++) {
                if (matriz[linha][j] === 0) espacosVazios++
            }

            //Verifica quantos espacos tem para colocar letra a partir da coluna sorteada
            let espacosParaColocarPalavra = 0
            for (let j = coluna; j < 10; j++) {
                espacosParaColocarPalavra++
            }

            //Verifica se tem todos os espacos vazios e se cabe a palavra dentro do espaco da coluna selecionada até o fim
            if (espacosVazios === 10 && espacosParaColocarPalavra >= palavrasSorteadas[i].length) {
                possible = true

                //Registra todas as informações de onde a palavra esta
                localPalavrasMatriz[i] = {
                    palavra: palavrasSorteadas[i],
                    linha: linha,
                    colunas: [],
                    achada: false
                }


                let palavra = palavrasSorteadas[i].split('')
                let count = 0

                for (let j = 0; j < palavra.length; j++) {
                    matriz[linha][coluna + j] = palavra[count].toUpperCase()
                    localPalavrasMatriz[i].colunas.push(coluna + j)
                    count++
                }
            }
        }
    }
}

//Pega a matriz e coloca as informações na tabela
function preencherTabela() {
    let table = document.querySelector('.tabela')

    for (let i = 0; i < 10; i++) {
        let tr = document.createElement('tr')
        tr.setAttribute('linha', i)

        for (let j = 0; j < 10; j++) {
            let td = document.createElement('td')

            if (matriz[i][j] === 0) {
                td.innerText = sortearLetra().toUpperCase()
            }
            else {
                td.innerText = matriz[i][j]
                td.classList.add("local-palavra")
            }

            td.setAttribute('coluna', j)
            td.setAttribute('id', `${i}-${j}`)

            tr.appendChild(td)
            table.appendChild(tr)
        }

    }
}


//Verifica se a seleção é uma das palavras
function verificarPalavra(linha, coluna1, coluna2) {
    linha = parseInt(document.getElementsByTagName('tr')[parseInt(linha)].getAttribute('linha'))
    let min = Math.min(parseInt(coluna1), parseInt(coluna2))
    let max = Math.max(parseInt(coluna1), parseInt(coluna2))

    //Preenche o array com todas as colunas do ponto 1 ao 2
    let colunas = []
    for (let i = min; i <= max; i++) {
        colunas.push(i)
    }

    //Percorrer array do local das palavras e verificar se achou alguma delas  
    for (let i = 0; i < localPalavrasMatriz.length; i++) {

        //Verifica se o numero de colunas escolhidas tem o mesmo tamanho da palavra(se elas não tem o mesmo tamanho, não é a palavra)
        if (colunas.length === localPalavrasMatriz[i].colunas.length) {

            //Verifica se a seleção e a palavra estão na mesma linha
            if (localPalavrasMatriz[i].linha === linha) {

                //Verificar se as posições das colunas são as mesmas da palavra i
                let iguais = false
                for (let j = 0; j < colunas.length; j++) {
                    //Verificar se são as mesmas colunas
                    if (localPalavrasMatriz[i].colunas.includes(colunas[j])) {
                        iguais = true
                    }
                    else {
                        iguais = false
                        break
                    }
                }

                //Se todas as posições forem iguais
                if (iguais === true) {

                    localPalavrasMatriz[i].achada = true

                    // Valida se a palavra foi achada, marcando-a na lista como riscada
                    // Além de incrementar no "contador" de vitória
                    if (!palavrasAchadas.includes(localPalavrasMatriz[i].palavra)) {
                        palavrasAchadas.push(localPalavrasMatriz[i].palavra);
                        let currentWord = localPalavrasMatriz[i].palavra;
                        const wordInList = document.getElementById(currentWord);
                        wordInList.style.textDecoration = "line-through";
                    }

                    if (selecaoCorreta()) {
                        setTimeout(() => {
                            verificaVitoria()
                        }, 250);

                    }


                    // Chama a função de verificar se ganhou o jogo

                    return true
                }
            }
        }
    }
    return false
}

//Armazena os campos selecionados
let escolha1 = {}
let escolha2 = {}
function camposEscolhidos(event) {
    if (event.target.tagName === 'TD') {

        let linha = event.target.parentNode.getAttribute('linha')
        let coluna = event.target.getAttribute('coluna')

        if (escolha1.linha === undefined) {
            escolha1 = {
                linha: linha,
                coluna: coluna
            }
        } else if (escolha2.linha === undefined) {
            escolha2 = {
                linha: linha,
                coluna: coluna
            }
        }

        // Verifica se o jogador selecionou campos válidos, validando a palavra e vitória em seguida
        if (escolha1.linha !== undefined && escolha2.linha !== undefined) {
            selecionaCampos(escolha1.linha, escolha1.coluna, escolha2.linha, escolha2.coluna);

            if (escolha1.linha === escolha2.linha) {
                if (!verificarPalavra(linha, escolha1.coluna, escolha2.coluna)) {
                    clickDown.removeEventListener('click', camposEscolhidos)
                    setTimeout(() => {
                        limpaSelecao()
                        clickDown.addEventListener('click', camposEscolhidos)
                    }, 250);
                }
            }

            escolha1 = {}
            escolha2 = {}
        }


    }
    caixaLetraSelecionada = document.querySelectorAll(".letras--selecionadas");
}

// Salva a última seleção feita pelo jogador
let selection = [];

// FUnção que aplica uma classe para as caixas selecionadas pelo jogador
function selecionaCampos(linhaInicio, colunaInicio, linhaFim, colunaFim) {
    if (linhaInicio === linhaFim) {
        let max = Math.max(colunaInicio, colunaFim)
        let min = Math.min(colunaInicio, colunaFim)
        for (let inicio = min; inicio <= max; inicio++) {
            let currentBoxID = `${linhaInicio}-${inicio}`

            selection.push(currentBoxID)
            document.getElementById(currentBoxID).classList.add("letras--selecionadas")
        }
    }
}

// Função que marca e mantém marcada as palavras corretas já encontradas
function selecaoCorreta() {
    for (let index in selection) {
        let currentBoxID = document.getElementById(selection[index])
        currentBoxID.classList.add("palavra--encontrada")
        currentBoxID.classList.remove("letras--selecionadas")
        currentBoxID.classList.remove("local-palavra")
    }
    return true

}

// Função que limpa a seleção de palavras (NÃO CORRETAS!)
function limpaSelecao() {
    for (let box in selection) {
        document.getElementById(selection[box]).classList.remove("letras--selecionadas")
    }
    selection = []
}

// Função que verifica se o jogador achou todas as 3 palavras
function verificaVitoria() {
    if (palavrasAchadas.length === 3) {
        alert("PARABÉNS! Você achou todas as palavras!");
        clickDown.removeEventListener('click', camposEscolhidos)
        timerStop()
    }
}

// Função que faz o jogador perder o jogo (POR FALTA DE TEMPO)
function perdeJogo() {
    let palavrasNaoAchadas = document.querySelectorAll(".local-palavra")
    clickDown.removeEventListener('click', camposEscolhidos)

    for (let index = 0; index < palavrasNaoAchadas.length; index++) {
        palavrasNaoAchadas[index].classList.remove("local-palavra");
        palavrasNaoAchadas[index].classList.add("palavra--nao-encontrada");
    }

    setTimeout(() => {
        alert("AH NÃO! Você não achou todas as palavras a tempo :(")
    }, 250)

}


// Função que inicializa todas as funções que criam todo o jogo
function iniciarJogo() {
    matriz = criarMatriz()
    ColocarPalavrasNaMatriz()
    preencherTabela()
    clickDown.addEventListener('click', camposEscolhidos)
    timerStart()
}

// Botão que, ao ser pressionado, inicia a função que reseta o jogo
const resetButton = document.getElementById("reset-button");
resetButton.addEventListener('click', resetaJogo)

// Função que reseta variáveis, tabuleiro, palavras, ...
function resetaJogo() {
    let lines = document.querySelectorAll("tr");
    let parent = lines[0].parentNode;
    parent.innerHTML = ""

    listaPalavras.innerHTML = "";

    localPalavrasMatriz = []
    palavrasAchadas = []
    selection = []



    iniciarJogo()

    timerStart()
}

let clickDown = document.querySelector('.tabela')

// = EXTRAS ========= //


const espacoTimer = document.getElementById("tempo-limite__timer")
espacoTimer.innerText = "01:00"
let cronometro = ''

function timerStart() {
    timerStop(cronometro)
    espacoTimer.innerText = "01:00"

    let min = 1,
        sec = 0;
    cronometro = setInterval(() => {
        if (sec === 0) {
            min--
            sec = 59
        } else {
            sec--
        }

        let verificador =  `${min}`

        if (sec === 00 && min === 00) {
            timerStop()
            perdeJogo()
        }

        espacoTimer.innerText = `${(min < 10) ? "0" + min.toString() : min}:${(sec < 10) ? "0" + sec.toString() : sec}`
    }, 1000);

}

function timerStop() {
    clearInterval(cronometro)
}
