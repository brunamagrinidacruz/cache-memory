/*!< Função que adiciona zeros na frente de um valor binario que falta bits */
function adicionarZeros(tamanhoPalavra, palavra) {
    if(palavra.length == tamanhoPalavra) /*!< Possui a quantidade correta de bits */
        return palavra;
    
    for(let i = 0; i < tamanhoPalavra - palavra.length; i++) 
        palavra = "0" + palavra;
    return palavra;
}