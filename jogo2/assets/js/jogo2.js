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

function pegarNomeJogador(event) {
    const botaoClicado = event.target;
    console.log(botaoClicado)
    const campoPegaNome = document.querySelector('#campo-nome');
    const valorCampoNome = campoPegaNome.value;
    console.log(valorCampoNome)
    const nomeJogadoNaTabela = document.querySelector('#player-name');
    nomeJogadoNaTabela.innerHTML = valorCampoNome;
}
const botaoConfirmaNome = document.querySelector('#confirma-nome');
console.log(botaoConfirmaNome)

botaoConfirmaNome.addEventListener('click', pegarNomeJogador);