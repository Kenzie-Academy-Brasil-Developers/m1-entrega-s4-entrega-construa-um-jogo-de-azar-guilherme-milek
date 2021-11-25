//Palavras para achar
let palavras = ['alface', 'feijão', 'arroz', 'carne', 'queijo', 'leite', 'suco', 'ovo']
//Letras para preencher o resto
let letras = 'abcdefghijklmnopqrstuvwxyz'
//Arr bidimensional das letras e palavras
let matriz = criarMatriz()
let localPalavrasMatriz = []

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

//Sorteia 3 palavras e coloca elas na matriz
function ColocarPalavrasNaMatriz() {
    matriz = criarMatriz()

    let palavrasSorteadas = []

    while(palavrasSorteadas.length < 3){

        let palavraSorteada = sortearPalavra()

        //Verifica se a palavra ja foi sorteada
        if(palavrasSorteadas.includes(palavraSorteada)){
            
        }
        else{
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

                for(let j = 0; j < palavra.length; j++){
                    matriz[linha][coluna + j] = palavra[count].toUpperCase()
                    localPalavrasMatriz[i].colunas.push(coluna + j)
                    count++
                }
            }
        }
    }
}

ColocarPalavrasNaMatriz()

//Pega a matriz e coloca as informações na tabela
function preencherTabela(){
    let table = document.querySelector('.tabela')

    for (let i = 0; i < 10; i++) {
        let tr = document.createElement('tr')

        for (let j = 0; j < 10; j++) {
            let td = document.createElement('td')
            if(matriz[i][j] === 0){
                td.innerText = sortearLetra().toLowerCase()
            }
            else{
                td.innerText = matriz[i][j]
            }
            
            tr.appendChild(td)
            table.appendChild(tr)
        }

    }
}
preencherTabela()

function teste(e) {
    console.log(e.target)
}

let clickDown = document.querySelector('.tabela')
clickDown.addEventListener('mousedown', teste)