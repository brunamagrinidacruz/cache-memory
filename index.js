const LIXO = "$"

const MAPEAMENTO_DIRETO = "direto"
const MAPEAMENTO_TOTALMENTE_ASSOCIATIVO = "associativo"
const MAPEAMENTO_ASSOCIATIVO_POR_CONJUNTO = "conjunto"

const QUANTIDADE_LINHAS_NA_CACHE = 8

const cores = ["DarkGrey", "DarkBlue", "ForestGreen", "LightPink", "LightSalmon"]

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
    let endereco = document.getElementById("endereco").value
    let conteudoMemoria = document.getElementById(endereco).innerHTML;

    let estaNaCache = false;
    switch(funcaoDeMapeamento) {
        case MAPEAMENTO_DIRETO:
            console.log("Mapeamento direto")
            break;
        case MAPEAMENTO_TOTALMENTE_ASSOCIATIVO:
            for(let i = 0; i < QUANTIDADE_LINHAS_NA_CACHE; i++) {
                if(memoriaCache[i].conteudoMemoria == LIXO) {
                    memoriaCache[i].validade = 1;
                    memoriaCache[i].conteudoMemoria = conteudoMemoria;
                    estaNaCache = true;
                    break;
                }
            }
            break;
        case MAPEAMENTO_ASSOCIATIVO_POR_CONJUNTO:
            console.log("Mapeamento associativo por conjunto")
            break;
    }

    criarMemoriaCache();

    let processador = document.getElementById("processador");
    processador.innerHTML = conteudoMemoria;
})


