class Questao {
    
    constructor(pergunta, resposta, dica="") {
        this._pergunta = pergunta;
        this._resposta = resposta;
        this._dica = dica;
        Object.freeze(this);
    }
    
    get pergunta() {
        return this._pergunta;
    }
    get resposta() {
        return this._resposta;
    }
    get dica() {
        return this._dica;
    }
}