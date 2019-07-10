class ControleQuestao {
    constructor(questao) {
        this._questao = questao;
        this._controleDeErros = 0;
    }

    marcarAcerto() {
        if(this._controleDeErros > 0) this._controleDeErros--; 
    }

    marcarErro(obj = {repeticao: 1}) {
        this._controleDeErros += obj.repeticao; 
    }

    permitidoApagar() {
        return this._controleDeErros == 0;
    }

    get numeroDeErros() {
        return this._controleDeErros;
    }

    get questao() {
        return this._questao.pergunta;//usar concat depois
    }

    get resposta() {
        return this._questao.resposta;
    }

    get dica() {
        return this._questao.dica
    }
}