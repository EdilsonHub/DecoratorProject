class Avaliacao {

    constructor() {
        this._questaoAnterior = undefined; //para uma simples verificação
        this._questaoAtual = undefined;

        this._arrayControlesDeQuestao = [];

        this._permitidoMostrarResposta = false;
    }

    get questaoAnterior() { return this._questaoAnterior; }
    get questaoAtual() { return this._questaoAtual; }
    get permitidoMostrarResposta() { return this._permitidoMostrarResposta; }

    avancarProximaQuestao() {
        this._permitidoMostrarResposta = false;
        if (this._arrayControlesDeQuestao.length > 0 && this._questaoAtual != undefined) {
            var proximaQuestao = this._arrayControlesDeQuestao[this._arrayControlesDeQuestao.indexOf(this._questaoAtual) + 1];
            this._questaoAnterior = this._questaoAtual;
            this._tentarRemoverQuestaoAtual();
            this._questaoAtual = proximaQuestao? proximaQuestao : this._arrayControlesDeQuestao[0];
            this._questaoAnterior.marcarAcerto();
        }
    }

    obterResposta() {
        this._permitidoMostrarResposta = true;
        (this._questaoAtual? this._questaoAtual : {marcarErro: () => console.log("Confirir oque? Não tem pergunta nenhuma...")}).marcarErro({ repeticao: 2 });
    }
    get permitidoMostrarResposta() {
        return this._permitidoMostrarResposta;
    }

    marcarErroQuestaoAnterior() {
        if (this._questaoAnterior != undefined){
            this._questaoAnterior.marcarErro();

            if (this._arrayControlesDeQuestao.indexOf(this._questaoAnterior) < 0) {
                this.adicionarQuestao(this._questaoAnterior._questao);
            }
        }
    }

    get totalDeQuestoes() {
        return this._arrayControlesDeQuestao.map(n => 1 + n.numeroDeErros).reduce((a,b) => a + b,0);
    }

    adicionarDadosEstaticos(dados) { //dados vindo de arquivos, estes dados são provisorios. Este metodo irá ser apagado em breve.
        dados.forEach(n => {
            this.adicionarQuestao(new Questao(n.pergunta, n.resposta, n.dica));
        });

        if (this._arrayControlesDeQuestao.length > 0) {
            this._questaoAtual = this._arrayControlesDeQuestao[0];
        }
    }

    _tentarRemoverQuestaoAtual() {
        if (this._questaoAtual.permitidoApagar()) {
            var indice = this._arrayControlesDeQuestao.indexOf(this._questaoAtual);
            if (indice > -1) {
                this._arrayControlesDeQuestao.splice(indice, 1);
                console.log("indice: ".concat(indice));
            }
        }
    }

    adicionarQuestao(questao) {
        this._arrayControlesDeQuestao.push(new ControleQuestao(questao));

        if (this._questaoAtual == undefined) {
            this._questaoAtual = this._arrayControlesDeQuestao[0];
        }
    }

    get questoes() {
        return [].concat(this._arrayControlesDeQuestao);
    }

    esvaziar() {
        this._arrayControlesDeQuestao = [];
    }

    salvarDados_Avanco() { }

}
