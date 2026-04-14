var Jogador = 'X'
var jogoEncerrado = false

function marcarConformeClick(id) {

    const celulaElement = document.getElementById(id)
    if (celulaElement.childElementCount == 0 && !jogoEncerrado){
        if (Jogador == 'X') {
            //celulaElement.style.backgroundColor = 'red'
            carregarImagem('imagem/joivara.png', celulaElement)
            if (checaAlguemGanhou(celulaElement))
                return

            Jogador = 'O'
        } else {
            carregarImagem('imagem/bravara.png', celulaElement)
            if (checaAlguemGanhou(celulaElement))
                return

            Jogador = 'X'
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

    let loop = false
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

            if (verificarSeGanhou(celula1, celula2, celula3, celulaElement)) {
                return true
            }
        }

    }

    if (verificaVelha.every(v => v)) {
        alteraCampoResultado('Deu velha!', 'red')
        jogoEncerrado = true
        return true
    }

    return false

}

function verificarSeGanhou(celula1, celula2, celula3, celulaElement) {

    if (celula1.firstChild.src ==
        celula2.firstChild.src &&
        celula1.firstChild.src ==
        celula3.firstChild.src) {

        alteraCampoResultado('O jogador ' + Jogador + ' ganhou!', 'green')
        celula3.firstChild.style.boxShadow = '0px 0px 0px 20px green'
        celula2.firstChild.style.boxShadow = '0px 0px 0px 20px green'
        celula1.firstChild.style.boxShadow = '0px 0px 0px 20px green'
        jogoEncerrado = true
        return true
    }

}

function alteraCampoResultado(Texto, cor) {

    document.getElementById('resultado').innerText = Texto
    document.getElementById('resultado').style.color = cor
    document.getElementById('resultado').style.width = '100%'
    document.getElementById('resultado').style.textAlign = 'center'

}

function reiniciarJogo(celulaElement) {
    for (let i = 1; i <= 9; i++) {
        const celulaElement = document.getElementById(i)
        while (celulaElement.firstChild) {
            celulaElement.removeChild(celulaElement.firstChild)
        }
    }
    Jogador = 'X'
    jogoEncerrado = false
}
