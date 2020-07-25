/*!< Função que adiciona zeros na frente de um valor binario que falta bits */
function adicionarZeros(tamanhoNovaPalavra, palavra) {
    if(palavra.length == tamanhoNovaPalavra) /*!< Possui a quantidade correta de bits */
        return palavra;
    
    let tamanhoPalavraAntiga = palavra.length;
    for(let i = 0; i < tamanhoNovaPalavra - tamanhoPalavraAntiga; i++) 
        palavra = "0" + palavra;
    
    return palavra;
}