/*!< Constantes de configuração das memórias  */
const QUANTIDADE_LINHAS_NA_CACHE = 4;

const TAMANHO_PALAVRA = parseInt(document.getElementById("tamanhoPalavra").value); /*!< Em bytes, o tamanho da palavra */
const QUANTIDADE_PALAVRAS_LINHA_CACHE = 1; /*!< Representa a quantidade de palavras que uma linha da cache consegue armazenar */

/**
 * Em bits, quantidade de bits que são necessários para representar o byteoffset do endereço.
 * Esse valor está relacionado a quantidade de bytes que uma palavra armazena.
 * Exemplo:
 * - Se tamanhoPalavra = 1 -> Não é necessário byoteffset pois só há um byte;
 * - Se tamanhoPalavra = 2 -> É necessário 1 bit para representar os dois bytes (0, 1);
 * - Se a tamanhoPalavra = 4 -> São necessários 4 bits para representar os 4 bytes (00, 01, 10, 11);
 * - Etc...
 */
const QUANTIDADE_BYTEOFFSET = Math.round(Math.log2(TAMANHO_PALAVRA)); 

/**
 * Em bits, quantidade de bits que são necessários para representar o wordoffset do endereço.
 * Esse valor está relacionado a quantidade de palavras que uma linha da cache armazena.
 * Exemplo:
 * - Se quantidadeDePalavrasPorLinha = 1 -> Não há wordoffset pois só há uma palavra;
 * - Se a quantidadeDePalavrasPorLinha = 2 -> São necessários 1 bit para representar as duas palavras (0, 1);
 * - Se a quantidadeDePalavrasPorLinha = 4 -> São necessários 4 bits para representar as 4 palavras (00, 01, 10, 11);
 * - Etc...
 */
const QUANTIDADE_WORDOFFSET = Math.round(Math.log2(QUANTIDADE_PALAVRAS_LINHA_CACHE)); 


const QUANTIDADE_CONJUNTOS = 2; /*!< Representa o valor de v. Em quantos conjuntos a cache será dividida no mapeamento associativo por conjunto */
const QUANTIDADE_LINHAS_POR_CONJUNTO = QUANTIDADE_LINHAS_NA_CACHE/2; /*!< Representa o valor de k. Quantas linhas terá cada conjunto na cache no mapeamento associativo por conjunto */
/**
 * Em bits, quantidade de bits que são necessários para representar o conjunto do endereço.
 * Esse valor é utilizado no mapeamento associativo por conjunto e está associado com a quantidade de conjuntos em que a cache é separada.
 * Exemplo:
 * - Se quantidadeBlocosCache = 1 -> Não há set pois só há um bloco;
 * - Se a quantidadeBlocosCache = 2 -> São necessários 1 bit para representar os dois blocos (0, 1);
 * - Se a quantidadeBlocosCache = 4 -> São necessários 4 bits para representar os dois blocos (00, 01, 10, 11);
 */
const QUANTIDADE_SET = Math.round(Math.log2(QUANTIDADE_CONJUNTOS)); 

/*!< Constantes auxiliares */
const MAPEAMENTO_DIRETO = "direto";
const MAPEAMENTO_TOTALMENTE_ASSOCIATIVO = "associativo";
const MAPEAMENTO_ASSOCIATIVO_POR_CONJUNTO = "conjunto";

const CORES = ["DarkGrey", "DarkBlue", "ForestGreen", "LightPink", "LightSalmon"];

const LIXO = "-";



