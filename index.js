let memoriaCache = [];

let quantidade_de_conjuntos;
let quantidade_linhas_por_conjuntos;

/**
 * Função responsável por verificar o mapeamento escolhido pelo usuário e inicializar variaveis com base nesse mapeamento 
 * Essa função é chamada na primeira inicialização e toda vez que o usuário muda o tipo de mapeamento 
 **/
function selecionarMapeamento() {
    funcaoDeMapeamento = document.getElementById("funcaoDeMapeamento").value;
    switch(funcaoDeMapeamento) {
        case MAPEAMENTO_DIRETO:
            quantidade_de_conjuntos = QUANTIDADE_LINHAS_NA_CACHE;
            quantidade_linhas_por_conjuntos = 1;
            break;
        case MAPEAMENTO_TOTALMENTE_ASSOCIATIVO:
            quantidade_de_conjuntos = 1;
            quantidade_linhas_por_conjuntos = QUANTIDADE_LINHAS_NA_CACHE;
            break;
        case MAPEAMENTO_ASSOCIATIVO_POR_CONJUNTO:
            quantidade_de_conjuntos = QUANTIDADE_CONJUNTOS;
            quantidade_linhas_por_conjuntos = QUANTIDADE_LINHAS_POR_CONJUNTO;
            break;
    }
    memoriaCache = inicializarMemoriaCache(funcaoDeMapeamento, quantidade_de_conjuntos, quantidade_linhas_por_conjuntos);
}

criarMemoriaCache(selecionarMapeamento);
document.getElementById("funcaoDeMapeamento").onchange = function () {
    criarMemoriaCache(selecionarMapeamento);
}

let buscarEndereco = document.getElementById("buscarEndereco")
buscarEndereco.addEventListener("click", (e) => {
    e.preventDefault();
    
    const enderecoCompleto = document.getElementById("endereco").value; /*!< Endereço digitado pelo usuário */

    const mensagem = document.getElementById("mensagem"); /*!< Campo para resposta visual de erros e falhas */

    let conteudoMemoria;
    try { /*!< Verifica se o endereço digitado é válido */
        conteudoMemoria = document.getElementById(enderecoCompleto).innerHTML;
    } catch {
        mensagem.innerHTML = "Endereço inválido."
        return;
    }

    /**
     * Para tamanho da palavra 2 bytes -> 1 bit para representar byteoffset
     * Para tamanho de bloco na linha da cache de 2 palavras -> 1 bit para representar wordoffset
     * Para tamanho 
     * 110110101
     *      tag      |     |     0      |     1
     *               | set | wordoffset | byteoffset
     *         
     */
    
    const byteoffset = enderecoCompleto.substring(enderecoCompleto.length - QUANTIDADE_BYTEOFFSET, enderecoCompleto.length);
    const wordoffset = enderecoCompleto.substring(enderecoCompleto.length - (QUANTIDADE_BYTEOFFSET + QUANTIDADE_WORDOFFSET), enderecoCompleto.length - QUANTIDADE_BYTEOFFSET);

    switch(funcaoDeMapeamento) {
        case MAPEAMENTO_DIRETO:
            let inicio = enderecoCompleto.length - (QUANTIDADE_BYTEOFFSET + QUANTIDADE_WORDOFFSET + QUANTIDADE_SET);
            let fim = enderecoCompleto.length - (QUANTIDADE_BYTEOFFSET + QUANTIDADE_WORDOFFSET);
            const conjunto = enderecoCompleto.substring(inicio, fim);
            memoriaCache = mapeamento_direto(memoriaCache, enderecoCompleto, wordoffset);
            break;
        case MAPEAMENTO_TOTALMENTE_ASSOCIATIVO:
            memoriaCache = totalmente_associativo(memoriaCache, enderecoCompleto, byteoffset, wordoffset);
            break;
        case MAPEAMENTO_ASSOCIATIVO_POR_CONJUNTO:    
            memoriaCache = associativo_conjunto(memoriaCache, enderecoCompleto, byteoffset, wordoffset)        
            break;
    }

    /*!< Criando memória cache com base no vetor memoriaCache atualizado */
    criarMemoriaCache();

    /*!< Colocando conteúdo do endereço no processador */
    const processador = document.getElementById("processador");
    processador.innerHTML = conteudoMemoria;

    /*!< Limpando mensagem de erros e falhas */
    mensagem.innerHTML = "";
})