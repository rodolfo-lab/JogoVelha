var Jogador = 'Capivara Joia'
var jogoEncerrado = false

function marcarConformeClick(id) {

    const celulaElement = document.getElementById(id)

    console.log(celulaElement.childElementCount, jogoEncerrado);


    if (celulaElement.childElementCount == 0 && !jogoEncerrado){
        if (Jogador == 'Capivara Joia') {
            carregarImagem('imagem/joivara.png', celulaElement)
            if (checaAlguemGanhou(celulaElement))
                return

            Jogador = 'Capivara Sulista'
        } else {
            carregarImagem('imagem/bravara.png', celulaElement)
            if (checaAlguemGanhou(celulaElement))
                return

            Jogador = 'Capivara Joia'
        }
    }
}

function carregarImagem(imagemCaminho, celulaElement) {

    var imagem = document.createElement('img')
    imagem.src = imagemCaminho
    imagem.width = 120
    celulaElement.appendChild(imagem)

}

function checaAlguemGanhou(celulaElement) {

    let verificaVelha = new Array(9).fill(false)
    const combinacoesVitoria = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]

    for (const combinacao of combinacoesVitoria) {

        let celula1 = document.getElementById(String(combinacao[0] + 1))
        let celula2 = document.getElementById(String(combinacao[1] + 1))
        let celula3 = document.getElementById(String(combinacao[2] + 1))

        if (celula1.childElementCount > 0 && celula2.childElementCount > 0 && celula3.childElementCount > 0) {
            verificaVelha[combinacao[0]] = true
            verificaVelha[combinacao[1]] = true
            verificaVelha[combinacao[2]] = true

            verificarSeGanhou(celula1, celula2, celula3, celulaElement)
        }

    }

    if (verificaVelha.every(v => v)) {
        alteraMensagem('Deu velha!', 'red')
        jogoEncerrado = true
    }

    if(!jogoEncerrado){
        document.getElementById('mensagem-msg').classList.remove('mostrar')
    }else{
        document.getElementById('mensagem-msg').classList.add('mostrar')
    }

    return jogoEncerrado

}

function verificarSeGanhou(celula1, celula2, celula3, celulaElement) {

    if (celula1.firstChild.src ==
        celula2.firstChild.src &&
        celula1.firstChild.src ==
        celula3.firstChild.src) {

        alteraMensagem('O jogador ' + Jogador + ' ganhou!', 'green')
        celula3.firstChild.style.boxShadow = '0px 0px 0px 20px green'
        celula2.firstChild.style.boxShadow = '0px 0px 0px 20px green'
        celula1.firstChild.style.boxShadow = '0px 0px 0px 20px green'
        jogoEncerrado = true
    }

}

function alteraMensagem(Texto, cor) {

    let mensagem = document.getElementById('texto-mensagem')
    mensagem.innerText = Texto
    mensagem.style.color = cor

}

function reiniciarJogo(celulaElement) {
    for (let i = 1; i <= 9; i++) {
        const celulaElement = document.getElementById(i)
        while (celulaElement.firstChild) {
            celulaElement.removeChild(celulaElement.firstChild)
        }
    }
    Jogador = 'Capivara Joia'
    jogoEncerrado = false
    document.getElementById('mensagem-msg').classList.remove('mostrar')
}
