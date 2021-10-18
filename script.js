const OPERACOES = document.querySelectorAll('.operacoes'),
      NUMEROS = document.querySelectorAll('.numeros'),
      OPERADORES = document.querySelectorAll('.operadores')

let num1, num2, resultado, qualOperacao, trocouNumero
let res = document.getElementById('resultado')

NUMEROS.forEach(numero => numero.addEventListener('click', addNumero))
OPERACOES.forEach(operacao => operacao.addEventListener('click', qualOpercaoFoiClicada))
OPERADORES.forEach(operadores => operadores.addEventListener('click', qualOperadorFoiClicado))

num1 = []
num2 = []

let TerceiroNumeroEmDiante = []
trocouNumero = 0
qualOperacao = []

let n3Controle = 0
let num3 = []

let num1DaConta = 0
let num2DaConta = 0
let num3DaConta = 0
let clicou = false

function addNumero() {
    if (trocouNumero == 0) {
        num1.push(Number(this.dataset.numero))
       

        if(resetamo == 0) {
            res.innerHTML += num1
            console.log(num1 + ' num1 normal')
        }

        if(resetamo == 1) {
            res.innerHTML = num1
            console.log(num1 + ' num1 resetado')
            resetamo = 0
        }
        
         
        while (num1.length > 0 ) {
            let num1ParaConcatenar = num1.shift()
            num1DaConta += '' + num1ParaConcatenar
         }
    } else if(trocouNumero == 1) {
        console.log(num2)
        num2.push(Number(this.dataset.numero))
        
        res.innerHTML += num2
         
        while (num2.length > 0 ) {
            let num2ParaConcatenar = num2.shift()
            num2DaConta += '' + num2ParaConcatenar
         }
    } else {
        num3.push(Number(this.dataset.numero))

        res.innerHTML += num3

        while (num3.length > 0) {
            let num3ParaConcatenar = num3.shift()
            num3DaConta += '' + num3ParaConcatenar
            n3Controle++
         }
    }
}

function qualOpercaoFoiClicada() {
    if (this.dataset.operacao == 'soma') {
        qualOperacao.push('soma')
        res.innerHTML += " + "
    } else if (this.dataset.operacao == 'diminuicao') {
        qualOperacao.push('diminuicao')
        res.innerHTML += " - "
    } else if (this.dataset.operacao == 'multiplicacao') {
        qualOperacao.push('multiplicacao')
        res.innerHTML += " &times; "
    } else {
        qualOperacao.push('divisao')
        res.innerHTML += " &divide; "
    }
    trocouNumero++

    adiconaProximoNumeroNoArray() 
}

function qualOperadorFoiClicado() {
    if (this.dataset.numero == "igual") {
        mostraResultado()
    }

    if(this.dataset.numero == "c") {
        resetaCalculadora()
    }
}

function adiconaProximoNumeroNoArray() {
    console.log(num3DaConta)
    if (n3Controle != 0) {
        TerceiroNumeroEmDiante.push(num3DaConta)
        n3Controle = 0
        num3DaConta = 0
    }
}

function mostraResultado() {
    adiconaProximoNumeroNoArray()

    while (qualOperacao.length > 0) {

        if (qualOperacao.indexOf('multiplicacao') != -1) {
            if (qualOperacao.indexOf('multiplicacao') == 0) {
                let multiplicacao = parseInt(num1DaConta) * parseInt(num2DaConta)

                num1DaConta = multiplicacao
                num2DaConta = TerceiroNumeroEmDiante.shift() 

                qualOperacao.splice(qualOperacao.indexOf('multiplicacao'), 1)
               
            } else if (qualOperacao.indexOf('multiplicacao') == 1) {
              
                    let primeiroNdaMultiplicacao = num2DaConta
                    let segundoNdaMultiplicacao = TerceiroNumeroEmDiante.shift()
                    let multiplicacao = primeiroNdaMultiplicacao * segundoNdaMultiplicacao

                    num2DaConta = multiplicacao
                    qualOperacao.splice(qualOperacao.indexOf('multiplicacao'), 1)
                  
                
            } else if (qualOperacao.indexOf('multiplicacao') > 1) {
                // Armazena todos os sinais antes da nossa primeira multiplicação
                let quantidadeDeOutrosSinais = qualOperacao.slice(0, qualOperacao.indexOf('multiplicacao'))
                // Pega o n total de números antes da nossa primeira multiplicação e subtrai 2 para retornar
                // o index do primeiro número que nós vamos utilizar em nossa multiplicação
                let primeiroNdaMultiplicacao = TerceiroNumeroEmDiante.splice(quantidadeDeOutrosSinais.length - 2, 1)

    
                let segundoNdaMultiplicacao = TerceiroNumeroEmDiante.splice(quantidadeDeOutrosSinais.length - 3, 1)
                let multiplicacao = primeiroNdaMultiplicacao * segundoNdaMultiplicacao
                TerceiroNumeroEmDiante.unshift(multiplicacao)
                qualOperacao.splice(qualOperacao.indexOf('multiplicacao'), 1)
            }
        } 

        if (qualOperacao.indexOf('divisao') != -1) {
            if (qualOperacao.indexOf('divisao') == 0) {
                let divisao = Number(num1DaConta) / Number(num2DaConta)

                num1DaConta = divisao
                num2DaConta = TerceiroNumeroEmDiante.shift() 

                qualOperacao.splice(qualOperacao.indexOf('divisao'), 1)
               
            } else if (qualOperacao.indexOf('divisao') == 1) {
                while (TerceiroNumeroEmDiante.length > 0) {
                    let primeiroNdadivisao = num2DaConta
                    let segundoNdadivisao = TerceiroNumeroEmDiante.shift()
                    let divisao = primeiroNdadivisao / segundoNdadivisao

                    num2DaConta = divisao
                    qualOperacao.splice(qualOperacao.indexOf('divisao'), 1)
                  
                }
            } else if (qualOperacao.indexOf('divisao') > 1) {
                // Segue a mesma lógica que a multiplicação
                // Armazena todos os sinais antes da nossa primeira divisão
                let quantidadeDeOutrosSinais = qualOperacao.slice(0, qualOperacao.indexOf('divisao'))
                // Pega o n total de números antes da nossa primeira divisao e subtrai 2 para retornar
                // o index do primeiro número que nós vamos utilizar em nossa multiplicação
                let primeiroNdadivisao = TerceiroNumeroEmDiante.splice(quantidadeDeOutrosSinais.length - 2, 1)

    
                let segundoNdadivisao = TerceiroNumeroEmDiante.splice(quantidadeDeOutrosSinais.length - 3, 1)
                let divisao = primeiroNdadivisao / segundoNdadivisao
                TerceiroNumeroEmDiante.unshift(divisao)
                qualOperacao.splice(qualOperacao.indexOf('divisao'), 1)
            }
        }


        if (qualOperacao.indexOf('soma') != -1) {
             if (qualOperacao.indexOf('soma') == 0) {
                let soma = Number(num1DaConta) + Number(num2DaConta)
                num1DaConta = soma
                num2DaConta = TerceiroNumeroEmDiante.shift() 
                 
                qualOperacao.shift()
             }
        } 

        if (qualOperacao.indexOf('diminuicao') != -1) {
             if (qualOperacao.indexOf('diminuicao') == 0) {
                let diminuicao = Number(num1DaConta) - Number(num2DaConta)
                num1DaConta = diminuicao
                num2DaConta = TerceiroNumeroEmDiante.shift() 
            
                qualOperacao.shift()
             }
        } 
            
        res.innerHTML = num1DaConta

    } 
    trocouNumero = 0
    num1.push(num1DaConta)
    console.log(num1)
    console.log(num1DaConta)
    console.log(num2DaConta)
    console.log(num2 + ' num2')
}
let resetamo = 0

function resetaCalculadora() {
    console.log(TerceiroNumeroEmDiante + ' ese tercerifvejnvern')
    resetamo = 0
    while (num1.length > 0) {
        num1.pop()
    }
    num1DaConta = 0

    while (num2.length > 0) {
        num2.pop()
    }
    num2DaConta = 0

    while (num3.length > 0) {
        num3.pop()
    }
    num3DaConta = 0

    while(qualOperacao.length > 0) {
        qualOperacao.pop()
    }

    trocouNumero = 0
    res.textContent = ''
}

