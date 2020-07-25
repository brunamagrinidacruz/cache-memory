/*!< Função responsável por inicializar uma memória cache vazia */
function inicializarMemoriaCache(funcaoDeMapeamento, quantidade_de_conjuntos, quantidade_linhas_por_conjuntos) {
    let memoriaCache = []

    let conjunto;
    let contadorConjunto = 0;
    for(let i = 0; i < QUANTIDADE_LINHAS_NA_CACHE; i++) {

        if(i % quantidade_linhas_por_conjuntos == 0) {
            conjunto = adicionarZeros(Math.round(Math.log2(quantidade_de_conjuntos)), contadorConjunto.toString(2))
            contadorConjunto++;
        }
        
        memoriaCache.push({
            validade: 0,
            contador: funcaoDeMapeamento == MAPEAMENTO_DIRETO ? "-" : 0,
            conjunto: funcaoDeMapeamento == MAPEAMENTO_TOTALMENTE_ASSOCIATIVO ? "-" : conjunto,
            tag: LIXO,
            conteudoMemoria: LIXO
        })
    }

    return memoriaCache;
}

/*!< Função responsável por criar a tabela de memória cache na tela */
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

            let borderStyle = `2px solid ${CORES[i % CORES.length]}`
            
            tr.style.border = borderStyle;
        
            let td1 = document.createElement('td');
            let td2 = document.createElement('td');
            let td3 = document.createElement('td');
            let td4 = document.createElement('td');
            let td5 = document.createElement('td');

            td1.style.border = borderStyle;
            td2.style.border = borderStyle;
            td3.style.border = borderStyle;
            td4.style.border = borderStyle;
            td5.style.border = borderStyle;

            let text1 = document.createTextNode(memoriaCache[indexMemoriaCache].validade);
            let text2 = document.createTextNode(memoriaCache[indexMemoriaCache].contador);
            let text3 = document.createTextNode(memoriaCache[indexMemoriaCache].conjunto);
            let text4 = document.createTextNode(memoriaCache[indexMemoriaCache].tag);
            let text5 = document.createTextNode(memoriaCache[indexMemoriaCache].conteudoMemoria);
        
            td1.appendChild(text1);
            td2.appendChild(text2);
            td3.appendChild(text3);
            td4.appendChild(text4);
            td5.appendChild(text5);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
        
            tbody.appendChild(tr);

            indexMemoriaCache++;
        }
        
        simulador.appendChild(tbody);
    }
}