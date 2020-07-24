const LIXO = "$"

const MAPEAMENTO_DIRETO = "direto"
const MAPEAMENTO_TOTALMENTE_ASSOCIATIVO = "associativo"
const MAPEAMENTO_ASSOCIATIVO_POR_CONJUNTO = "conjunto"

const QUANTIDADE_LINHAS_NA_CACHE = 8

const cores = ["DarkGrey", "DarkBlue", "ForestGreen", "LightPink", "LightSalmon"]

let quantidade_byteoffset = 1; /*!< Quantidade de bits que são necessários para representar o byteoffset da palavra */
let quantidade_wordoffset = 1; /*!< Quantidade de bits que são necessários para representar o wordoffset da palavra */

let memoriaCache = []
function inicializarMemoriaCache() {
    for(let i = 0; i < QUANTIDADE_LINHAS_NA_CACHE; i++) {
        memoriaCache.push({
            validade: 0,
            tag: LIXO,
            conteudoMemoria: LIXO
        })
    }
}
inicializarMemoriaCache();

let quantidade_de_conjuntos = 2;
let quantidade_linhas_por_conjuntos = 4;

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
            quantidade_de_conjuntos = 2;
            quantidade_linhas_por_conjuntos = 4;
            break;
    }

    inicializarMemoriaCache();
}

function criarMemoriaCache(callback) {
    if(callback) callback();

    let simulador = document.getElementById("simulador");

    while(simulador.childNodes[2])
        simulador.removeChild(simulador.lastChild)

    let indexMemoriaCache = 0;
    for(let i = 0; i < quantidade_de_conjuntos; i++) {
        let tbody = document.createElement('tbody');

        for (let j = 0; j < quantidade_linhas_por_conjuntos; j++){
            let tr = document.createElement('tr');  

            let borderStyle = `2px solid ${cores[i % cores.length]}`
            
            tr.style.border = borderStyle;
        
            let td1 = document.createElement('td');
            let td2 = document.createElement('td');
            let td3 = document.createElement('td');

            td1.style.border = borderStyle;
            td2.style.border = borderStyle;
            td3.style.border = borderStyle;

            let text1 = document.createTextNode(memoriaCache[indexMemoriaCache].validade);
            let text2 = document.createTextNode(memoriaCache[indexMemoriaCache].tag);
            let text3 = document.createTextNode(memoriaCache[indexMemoriaCache].conteudoMemoria);
        
            td1.appendChild(text1);
            td2.appendChild(text2);
            td3.appendChild(text3);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
        
            tbody.appendChild(tr);

            indexMemoriaCache++;
        }
        
        simulador.appendChild(tbody);
    }
}

criarMemoriaCache(selecionarMapeamento);

document.getElementById("funcaoDeMapeamento").onchange = function () {
    criarMemoriaCache(selecionarMapeamento);
}

let buscarEndereco = document.getElementById("buscarEndereco")
buscarEndereco.addEventListener("click", () => {
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
    
    const byteoffset = enderecoCompleto.substring(enderecoCompleto.length - quantidade_byteoffset, enderecoCompleto.length)
    const wordoffset = enderecoCompleto.substring(enderecoCompleto.length - (quantidade_byteoffset + quantidade_wordoffset), enderecoCompleto.length - quantidade_byteoffset)
    // const tag = enderecoCompleto.substring()
    
    switch(funcaoDeMapeamento) {
        case MAPEAMENTO_DIRETO:
            break;
        case MAPEAMENTO_TOTALMENTE_ASSOCIATIVO:
            for(let i = 0; i < QUANTIDADE_LINHAS_NA_CACHE; i++) {
                if(memoriaCache[i].conteudoMemoria == LIXO) {
                    memoriaCache[i].validade = 1;
                    memoriaCache[i].conteudoMemoria = conteudoMemoria;
                    break;
                }
            }
            break;
        case MAPEAMENTO_ASSOCIATIVO_POR_CONJUNTO:
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


