//https://youtu.be/CIF-r7F2clc
//--------------
//
// "sai"
// "pukémon"
// "pukémon p**a"
// "eu vou mata"
// "eu vou mata pq essa p**a não é de deus não"
// "pukémon é um negocio do d**bo"
// "PIKOMON"
// "eu vou lhe pegar pikomon..."
// "vou lhe acha"
// "eu vou lhe acha"
// "eu vou lhe acha pikomon"
// "pq eu não sou qualquer um não"
// "eu sou nal"
// "eu sou nal do canal"
// "EU SOU NAL DO CANAL"
// "EU VOU LHE PEGA PIKOMON"
//
//--------------

//Palavras para achar
let palavras = ['Bulbasaur', 'Caterpie', 'Squirtle', 'Nidoran', 'Nidorino', 'Zubat', 'Oddish', 'Mankey', 'Alakazam', 'Machop', 'Slowpoke', 'Gengar', 'Exeggutor', 'Ditto', 'Snorlax', 'Dragonite', 'Mewtwo', 'Pikachu', 'Rattata', 'Psyduck']
//Letras para preencher o resto
let letras = 'abcdefghijklmnopqrstuvwxyz'
//Arr bidimensional das letras e palavras
let matriz = criarMatriz()
let localPalavrasMatriz = []
let localPalavrasMatrizHorizontal = []
let localPalavrasMatrizVertical = []
let localPalavrasMatrizDiagonal = []
let palavrasAchadas = [];
let caixaLetraSelecionada = [];

function colocarNome(event) {
    const divNome = document.querySelector('.inserir-nome')
    const nome = document.getElementById('nome').value
    const cronometro = document.querySelector('.tempo-limite')
    const placar = document.querySelector('#placar')
    const palavrasParaAchar = document.querySelector('.palavras-para-achar')


    divNome.classList.add('hidden')
    cronometro.classList.remove('hidden')
    placar.classList.remove('hidden')
    palavrasParaAchar.classList.remove('hidden')

    iniciarJogo()
    playerName()
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

//Coloca as palavras na matriz
function ColocarPalavrasNaMatriz() {
    matriz = criarMatriz()
    palavrasSorteadas = []
    for (let i = 0; i < 3; i++) {

        let sorteio = Math.floor(Math.random() * 3)
        if (sorteio === 0) {
            if (ColocarPalavraNaMatrizHorizontal() === false) {
                i--
            }

        } else if (sorteio === 1) {
            if (ColocarPalavraNaMatrizVertical() === false) {
                i--
            }
        }
        else {
            if (ColocarPalavraNaMatrizDiagonal() === false) {
                i--
            }
        }
    }

}

let palavrasSorteadas = []

//Sorteia uma palavra na horizontal e coloca na matriz
function ColocarPalavraNaMatrizHorizontal() {
    let possible = false
    let tentativasPalavras = 0
    while (possible === false && tentativasPalavras < 10) {
        let palavraSorteada = ''
        let jaFoiSorteada = false

        //Fica no while se a palavra foi sorteada
        do {
            palavraSorteada = sortearPalavra()
            //Fala se ja foi sorteada
            for (let i = 0; i < palavrasSorteadas.length; i++) {

                if (palavrasSorteadas[i].includes(palavraSorteada)) {
                    jaFoiSorteada = true
                    break
                } else {
                    jaFoiSorteada = false
                }
            }
        }
        while (jaFoiSorteada)

        let tentativasEncaixar = 0

        while (possible === false && tentativasEncaixar < 10) {
            tentativasEncaixar++
            //sorteia uma linha de 0 a 9
            let linha = Math.floor(Math.random() * 10)
            //sorteia uma coluna de 0 a 9
            let coluna = Math.floor(Math.random() * 10)

            //Verifica quantos espaços vazios tem para colocar a palavra da coluna sorteada até o fim
            let espacosParaColocarPalavra = 0
            let j = 0
            for (let i = coluna; i < 10; i++) {

                //Se o espaço for vazio ou for a mesma letra na palavra
                if (matriz[linha][i] === 0 || matriz[linha][i].toUpperCase() === palavraSorteada.substr(j, 1).toUpperCase()) {
                    espacosParaColocarPalavra++
                    possible = true
                } else {
                    possible = false
                    break
                }

                j++
            }

            //Verifica se tem espaço suficiente e se é possivel colocar ali
            if (espacosParaColocarPalavra >= palavraSorteada.length && possible === true) {
                let palavra = palavraSorteada.split('')
                let count = 0
                let registroColunas = []

                //Coloca a palavra na matriz
                for (let j = 0; j < palavra.length; j++) {

                    matriz[linha][coluna + j] = palavra[j].toUpperCase()

                    //Armazena o local da palavra na variael
                    registroColunas.push(coluna + j)
                    count++
                }

                //Registra todas as informações de onde a palavra esta
                localPalavrasMatrizHorizontal.push({
                    palavra: palavraSorteada,
                    linha: linha,
                    colunas: registroColunas,
                    posicao: 'horizontal',
                    achada: false
                })

                //Atualiza a lista das palavras para achar
                const listItem = document.createElement("li");
                listItem.innerText = palavraSorteada;
                listItem.setAttribute("id", palavraSorteada);
                listaPalavras.appendChild(listItem);

                palavrasSorteadas.push(palavraSorteada)

                return true

            } else {
                possible = false
            }
        }
    }
    return false
}

//Sorteia uma palavra na vertical e coloca na matriz
function ColocarPalavraNaMatrizVertical() {
    let possible = false
    let tentativasPalavras = 0
    while (possible === false && tentativasPalavras < 10) {
        let palavraSorteada = ''
        let jaFoiSorteada = false

        //Fica no while até sortear uma palavra que ainda não foi sorteada
        do {
            palavraSorteada = sortearPalavra()
            //Fala se ja foi sorteada
            for (let i = 0; i < palavrasSorteadas.length; i++) {

                if (palavrasSorteadas[i].includes(palavraSorteada)) {
                    jaFoiSorteada = true
                    break
                } else {
                    jaFoiSorteada = false
                }
            }

        }
        //Sai quando sorteia uma palavra que não foi sorteada
        while (jaFoiSorteada)

        let tentativasEncaixar = 0

        while (possible === false && tentativasEncaixar < 10) {
            tentativasEncaixar++
            //sorteia uma linha de 0 a 9
            let linha = Math.floor(Math.random() * 10)
            //sorteia uma coluna de 0 a 9
            let coluna = Math.floor(Math.random() * 10)

            //Verifica quantos espaços vazios tem para colocar a palavra da coluna sorteada até o fim na
            let espacosParaColocarPalavra = 0
            let j = 0
            for (let i = linha; i < 10; i++) {

                //Se o espaço for vazio ou for a mesma letra na palavra
                if (matriz[i][coluna] === 0 || matriz[i][coluna].toUpperCase() === palavraSorteada.substr(j, 1).toUpperCase()) {
                    espacosParaColocarPalavra++
                    possible = true
                } else {
                    possible = false
                    break
                }

                j++
            }

            //Verifica se tem espaço suficiente e se é possivel colocar ali
            if (espacosParaColocarPalavra >= palavraSorteada.length && possible === true) {
                let palavra = palavraSorteada.split('')
                let count = 0
                let registroLinha = []
                //Coloca a palavra na matriz
                for (let j = 0; j < palavra.length; j++) {

                    matriz[linha + j][coluna] = palavra[j].toUpperCase()

                    //Armazena o local da palavra na variael
                    registroLinha.push(linha + j)
                    count++
                }

                //Registra todas as informações de onde a palavra esta
                localPalavrasMatrizVertical.push({
                    palavra: palavraSorteada,
                    linhas: registroLinha,
                    coluna: coluna,
                    posicao: 'vertical',
                    achada: false
                })

                //Atualiza a lista das palavras para achar
                const listItem = document.createElement("li");
                listItem.innerText = palavraSorteada;
                listItem.setAttribute("id", palavraSorteada);
                listaPalavras.appendChild(listItem);

                palavrasSorteadas.push(palavraSorteada)

                return true

            } else {
                possible = false
            }
        }
    }
    return false
}

//Sorteia uma palavra na diagonal e coloca na matriz
function ColocarPalavraNaMatrizDiagonal() {
    let possible = false
    let tentativasPalavras = 0
    while (possible === false && tentativasPalavras < 10) {
        let palavraSorteada = ''
        let jaFoiSorteada = false

        //Fica no while até sortear uma palavra que ainda não foi sorteada
        do {
            palavraSorteada = sortearPalavra()
            //Fala se ja foi sorteada
            for (let i = 0; i < palavrasSorteadas.length; i++) {

                if (palavrasSorteadas[i].includes(palavraSorteada)) {
                    jaFoiSorteada = true
                    break
                } else {
                    jaFoiSorteada = false
                }
            }

        }
        //Sai quando sorteia uma palavra que não foi sorteada
        while (jaFoiSorteada)

        let tentativasEncaixar = 0

        //Tenta colocar na matriz 10x, se não consegui em nenhuma, volta e sorteia outra palavra
        while (possible === false && tentativasEncaixar < 10) {

            tentativasEncaixar++
            //sorteia uma linha de 0 a 9
            let linha = Math.floor(Math.random() * 10)
            //sorteia uma coluna de 0 a 9
            let coluna = Math.floor(Math.random() * 10)

            //Verifica quantos espaços vazios tem para colocar a palavra da coluna sorteada até o fim na diagonal
            let espacosParaColocarPalavra = 0
            let j = 0
            for (let i = linha; i < 10; i++) {

                if (linha + j < 10) {
                    if (coluna + j < 10) {
                        //Se o espaço for vazio ou for a mesma letra na palavra
                        if (matriz[linha + j][coluna + j] === 0 || matriz[linha + j][coluna + j].toUpperCase() === palavraSorteada.substr(j, 1).toUpperCase()) {
                            espacosParaColocarPalavra++
                            possible = true
                        } else {
                            possible = false
                            break
                        }

                        j++
                    }
                    else {
                        break
                    }
                }
                else {
                    break
                }

            }

            //Verifica se tem espaço suficiente e se é possivel colocar ali
            if (espacosParaColocarPalavra >= palavraSorteada.length && possible === true) {
                let palavra = palavraSorteada.split('')
                let count = 0
                let registroLinha = []
                let registroColuna = []
                //Coloca a palavra na matriz
                for (let j = 0; j < palavra.length; j++) {

                    matriz[linha + j][coluna + j] = palavra[j].toUpperCase()

                    //Armazena o local da palavra na variael
                    registroLinha.push(linha + j)
                    registroColuna.push(coluna + j)
                    count++
                }

                //Registra todas as informações de onde a palavra esta
                localPalavrasMatrizDiagonal.push({
                    palavra: palavraSorteada,
                    linhas: registroLinha,
                    colunas: registroColuna,
                    posicao: 'diagonal',
                    achada: false
                })

                //Atualiza a lista das palavras para achar
                const listItem = document.createElement("li");
                listItem.innerText = palavraSorteada;
                listItem.setAttribute("id", palavraSorteada);
                listaPalavras.appendChild(listItem);

                palavrasSorteadas.push(palavraSorteada)

                return true

            } else {
                possible = false
            }
        }
    }

    return false
}

//Pega a matriz e coloca as informações na tabela
function preencherTabela() {
    let table = document.querySelector('.tabela')

    for (let i = 0; i < 10; i++) {

        let tr = document.createElement('tr')
        tr.setAttribute('linha', i)
        tr.setAttribute('id', i)

        for (let j = 0; j < 10; j++) {

            let td = document.createElement('td')

            if (matriz[i][j] === 0) {
                td.innerText = sortearLetra().toUpperCase()
            } else {
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


//Verifica se a seleção é uma das palavra na horizontal
function verificarPalavraHorizontal(linha, coluna1, coluna2) {
    linha = parseInt(document.getElementsByTagName('tr')[parseInt(linha)].getAttribute('linha'))
    let min = Math.min(parseInt(coluna1), parseInt(coluna2))
    let max = Math.max(parseInt(coluna1), parseInt(coluna2))

    //Preenche o array com todas as colunas do ponto 1 ao 2
    let colunas = []
    for (let i = min; i <= max; i++) {

        colunas.push(i)
    }

    //Percorrer array do local das palavras e verificar se achou alguma delas
    for (let i = 0; i < localPalavrasMatrizHorizontal.length; i++) {


        //Verifica se o numero de colunas escolhidas tem o mesmo tamanho da palavra(se elas não tem o mesmo tamanho, não é a palavra)
        if (colunas.length === localPalavrasMatrizHorizontal[i].colunas.length) {

            //Verifica se a seleção e a palavra estão na mesma linha
            if (localPalavrasMatrizHorizontal[i].linha === linha) {

                //Verificar se as posições das colunas são as mesmas da palavra i
                let iguais = false
                for (let j = 0; j < colunas.length; j++) {

                    //Verificar se são as mesmas colunas
                    if (localPalavrasMatrizHorizontal[i].colunas.includes(colunas[j])) {
                        iguais = true
                    } else {
                        iguais = false
                        break
                    }
                }

                //Se todas as posições forem iguais
                if (iguais === true) {

                    localPalavrasMatrizHorizontal[i].achada = true

                    // Valida se a palavra foi achada, marcando-a na lista como riscada
                    // Além de incrementar no "contador" de vitória
                    if (!palavrasAchadas.includes(localPalavrasMatrizHorizontal[i].palavra)) {
                        palavrasAchadas.push(localPalavrasMatrizHorizontal[i].palavra);
                        let currentWord = localPalavrasMatrizHorizontal[i].palavra;
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

//Verifica se a seleção é uma das palavra na vertical
function verificarPalavraVertical(coluna, linha1, linha2) {
    coluna = parseInt(document.getElementsByTagName('td')[parseInt(coluna)].getAttribute('coluna'))
    let min = Math.min(parseInt(linha1), parseInt(linha2))
    let max = Math.max(parseInt(linha1), parseInt(linha2))

    //Preenche o array com todas as colunas do ponto 1 ao 2
    let linhas = []
    for (let i = min; i <= max; i++) {

        linhas.push(i)
    }

    //Percorrer array do local das letras e verificar se achou alguma delas  
    for (let i = 0; i < localPalavrasMatrizVertical.length; i++) {

        //Verifica se o numero de colunas escolhidas tem o mesmo tamanho da palavra(se elas não tem o mesmo tamanho, não é a palavra)
        if (linhas.length === localPalavrasMatrizVertical[i].linhas.length) {

            //Verifica se a seleção e a palavra estão na mesma coluna
            if (localPalavrasMatrizVertical[i].coluna === coluna) {

                //Verificar se as posições das linhas são as mesmas da palavra i
                let iguais = false
                for (let j = 0; j < linhas.length; j++) {

                    //Verificar se são as mesmas colunas
                    if (localPalavrasMatrizVertical[i].linhas.includes(linhas[j])) {
                        iguais = true
                    } else {
                        iguais = false
                        break
                    }
                }

                //Se todas as posições forem iguais
                if (iguais === true) {

                    localPalavrasMatrizVertical[i].achada = true

                    // Valida se a palavra foi achada, marcando-a na lista como riscada
                    // Além de incrementar no "contador" de vitória
                    if (!palavrasAchadas.includes(localPalavrasMatrizVertical[i].palavra)) {
                        palavrasAchadas.push(localPalavrasMatrizVertical[i].palavra);
                        let currentWord = localPalavrasMatrizVertical[i].palavra;
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

//Verifica se a seleção é uma das palavra na diagonal
function verificarPalavraDiagonal(escolha1, escolha2) {

    //Valores vem como string, e converte para
    escolha1.linha = parseInt(escolha1.linha)
    escolha2.linha = parseInt(escolha2.linha)
    escolha1.coluna = parseInt(escolha1.coluna)
    escolha2.coluna = parseInt(escolha2.coluna)

    //Pega o começo independente da ordem da escolha
    let maxLinha = Math.max(escolha1.linha, escolha2.linha)
    let minLinha = Math.min(escolha1.linha, escolha2.linha)
    let maxColuna = Math.max(escolha1.coluna, escolha2.coluna)
    let minColuna = Math.min(escolha1.coluna, escolha2.coluna)

    //Preenche o array com todas as colunas e linhas do ponto 1 ao 2
    let j = 0
    let colunas = []
    let linhas = []

    for (let i = minLinha; i < 10; i++) {

        linhas.push(i)
        colunas.push(minColuna + j)

        //Da um break quando chega no segundo ponto
        if (minLinha + j === maxLinha && minColuna + j === maxColuna) {
            break
        }
        j++
    }

    //Percorrer array do local das letras e verificar se achou alguma delas  
    for (let i = 0; i < localPalavrasMatrizDiagonal.length; i++) {

        //Verifica se o numero de colunas escolhidas tem o mesmo tamanho da palavra(se elas não tem o mesmo tamanho, não é a palavra)
        if (linhas.length === localPalavrasMatrizDiagonal[i].linhas.length) {

            //Verificar se as posições das linhas e colunas são as mesmas da palavra i
            let iguais = false

            //Verificar se são as mesmas colunas
            for (let p = 0; p < localPalavrasMatrizDiagonal[i].colunas.length; p++) {
                if (localPalavrasMatrizDiagonal[i].colunas.includes(colunas[p])) {
                    iguais = true
                } else {
                    iguais = false
                    break
                }

            }

            //Verificar se são as mesmas linhas
            if (iguais === false) {
                for (let p = 0; p < localPalavrasMatrizDiagonal[i].linhas.length; p++) {
                    if (localPalavrasMatrizDiagonal[i].linhas.includes(linhas[p])) {
                        iguais = true
                    } else {
                        iguais = false
                        break
                    }

                }
            }

            //Se todas as posições forem iguais
            if (iguais === true) {

                localPalavrasMatrizDiagonal[i].achada = true
                console.log(`linhas: ${linhas}`)
                console.log(`colunas: ${colunas}`)
                console.log(localPalavrasMatrizDiagonal[i])

                // Valida se a palavra foi achada, marcando-a na lista como riscada
                // Além de incrementar no "contador" de vitória
                if (!palavrasAchadas.includes(localPalavrasMatrizDiagonal[i].palavra)) {
                    //Atualiza a lista de palavras achadas
                    palavrasAchadas.push(localPalavrasMatrizDiagonal[i].palavra);
                    let currentWord = localPalavrasMatrizDiagonal[i].palavra;
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
            selecionaCampos(escolha1.linha, escolha1.coluna, escolha2.linha, escolha2.coluna, validarDiagonal(escolha1, escolha2));

            //Verifica se ta na horizontal
            if (escolha1.linha === escolha2.linha) {
                if (!verificarPalavraHorizontal(linha, escolha1.coluna, escolha2.coluna)) {
                    clickDown.removeEventListener('click', camposEscolhidos)
                    setTimeout(() => {
                        limpaSelecao()
                        clickDown.addEventListener('click', camposEscolhidos)
                    }, 250);
                }
                //Verifica se ta na vertical
            } else if (escolha1.coluna === escolha2.coluna) {
                if (!verificarPalavraVertical(coluna, escolha1.linha, escolha2.linha)) {
                    clickDown.removeEventListener('click', camposEscolhidos)
                    setTimeout(() => {
                        limpaSelecao()
                        clickDown.addEventListener('click', camposEscolhidos)
                    }, 250);
                }
            }
            else if (validarDiagonal(escolha1, escolha2)) {
                if (!verificarPalavraDiagonal(escolha1, escolha2)) {
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

//Verificar se as duas escolhas estão na diagonal
function validarDiagonal(escolha1, escolha2) {

    //Valores vem como string, e converte para
    escolha1.linha = parseInt(escolha1.linha)
    escolha2.linha = parseInt(escolha2.linha)
    escolha1.coluna = parseInt(escolha1.coluna)
    escolha2.coluna = parseInt(escolha2.coluna)

    //Pega o começo independente da ordem da escolha
    let maxLinha = Math.max(escolha1.linha, escolha2.linha)
    let minLinha = Math.min(escolha1.linha, escolha2.linha)
    let maxColuna = Math.max(escolha1.coluna, escolha2.coluna)
    let minColuna = Math.min(escolha1.coluna, escolha2.coluna)

    let j = 0
    for (let i = minLinha; i < 10; i++) {
        if (minLinha + j < 10) {
            if (minColuna + j < 10) {

                //Verifica se a seleção é uma diagonal
                if (minLinha + j === maxLinha && minColuna + j === maxColuna) {
                    return true
                }

                j++
            }
            else {
                return false
            }
        }
        else {
            return false
        }
    }
}

// Salva a última seleção feita pelo jogador
let selection = [];

// FUnção que aplica uma classe para as caixas selecionadas pelo jogador
function selecionaCampos(linhaInicio, colunaInicio, linhaFim, colunaFim, diagonal) {
    if (linhaInicio === linhaFim) {
        let max = Math.max(colunaInicio, colunaFim)
        let min = Math.min(colunaInicio, colunaFim)
        for (let inicio = min; inicio <= max; inicio++) {

            let currentBoxID = `${linhaInicio}-${inicio}`

            selection.push(currentBoxID)
            document.getElementById(currentBoxID).classList.add("letras--selecionadas")
        }
    } else if (colunaInicio === colunaFim) {
        let max = Math.max(linhaInicio, linhaFim)
        let min = Math.min(linhaInicio, linhaFim)
        for (let inicio = min; inicio <= max; inicio++) {

            let currentBoxID = `${inicio}-${colunaInicio}`

            selection.push(currentBoxID)
            document.getElementById(currentBoxID).classList.add("letras--selecionadas")
        }
    }
    else if (diagonal) {

        //Pega os valores na ordem certa
        let maxLinha = Math.max(linhaInicio, linhaFim)
        let minLinha = Math.min(linhaInicio, linhaFim)
        let maxColuna = Math.max(colunaInicio, colunaFim)
        let minColuna = Math.min(colunaInicio, colunaFim)

        let j = 0

        for (let i = minLinha; i <= maxLinha; i++) {

            let currentBoxID = `${parseInt(minLinha) + j}-${parseInt(minColuna) + j}`

            selection.push(currentBoxID)

            document.getElementById(currentBoxID).classList.add("letras--selecionadas")
            j++
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
    selection = []
    return true
}

// Função que limpa a seleção de palavras (NÃO CORRETAS!)
function limpaSelecao() {
    let blocosSelecionados = document.querySelectorAll('.letras--selecionadas')
    for (let i = 0; i < blocosSelecionados.length; i++) {

        blocosSelecionados[i].classList.remove("letras--selecionadas")
    }
    selection = []
}

// Função que verifica se o jogador achou todas as 3 palavras
function verificaVitoria() {
    if (palavrasAchadas.length === 3) {
        popUp("PARABÉNS! Você achou todas as palavras!");
        clickDown.removeEventListener('click', camposEscolhidos)
        timerStop()
        addVitoria()
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
        popUp("OPA! Você não achou todas as palavras a tempo!")
    }, 250)
    addDerrota()
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
    localPalavrasMatrizHorizontal = []
    localPalavrasMatrizVertical = []
    localPalavrasMatrizDiagonal = []
    palavrasAchadas = []
    selection = []

    escolha1 = {}
    escolha2 = {}

    iniciarJogo()

    timerStart()
}

let clickDown = document.querySelector('.tabela')

// = EXTRAS ========= //


const espacoTimer = document.getElementById("tempo-limite__timer")
espacoTimer.innerText = "01:00"
let cronometro = ''

function timerStart() {
    timerStop()
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

        let verificador = `${min}`

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


function deletarPopUp(event) {
    const clickedButton = event.target;
    const sectionOfAlert = document.querySelector('.blocker');
    if (clickedButton.tagName === 'BUTTON') {
        sectionOfAlert.remove();
    }
}

function popUp(textToShow) {
    const closeButton = document.createElement('button');
    const sectionOfAlert = document.createElement('section');
    closeButton.innerHTML = 'x';
    closeButton.id = 'deleta-popup'
    const divButton = document.createElement('div');
    divButton.classList.add('divButton');
    const span = document.createElement('span');
    span.className = "span--alert";
    sectionOfAlert.classList.add('blocker');
    const divAlert = document.createElement('div');
    divAlert.classList.add('alerta--vitoria-derrota');


    span.innerHTML = textToShow;

    divButton.appendChild(closeButton);
    sectionOfAlert.appendChild(divAlert);
    divAlert.appendChild(span);
    divAlert.appendChild(divButton);
    document.body.appendChild(sectionOfAlert);
    closeButton.addEventListener('click', deletarPopUp)
}
let placarV = 0

function addVitoria() {
    const vitoriasPlacar = document.getElementById('vitoriaPlacar');
    placarV++
    vitoriasPlacar.innerText = placarV
}

let placarD = 0

function addDerrota() {
    const derrotasPlacar = document.getElementById('derrotasPlacar');
    placarD++
    derrotasPlacar.innerText = placarD
}

function playerName() {
    const nome = document.getElementById('nome').value
    const playerName = document.getElementById('jogadorNome')
    if (nome === "") {
        playerName.innerText = 'Jogador'
    }
    else {
        playerName.innerText = nome
    }
}