class Controller {

  constructor(){
    let $ = document.querySelector.bind(document);

    this._avaliacao = new Bind(
      new Avaliacao(), 
      new AvaliacaoView($('#tabela')), 
      'avancarProximaQuestao', 
      'obterResposta',
      'marcarErroQuestaoAnterior',
      'adicionarDadosEstaticos',
      'adicionarQuestao',
      'esvaziar'
      );

      this._bloquearBotaoDeErroAnterior = false;

      this.puxarDadosLista_1();
  }



  avancarQuestao() {
    this._avaliacao.avancarProximaQuestao();
    this._botaoDeErroAnterior.desbloquear();
    console.log("total de questões: ",this._avaliacao.totalDeQuestoes);
  }

  obterResposta() {
    if(!this._avaliacao.permitidoMostrarResposta){
      this._avaliacao.obterResposta();
    } else {
      console.log("obterResposta entrou no else");
    }

  }

  marcarErro() {

    if(!this._bloquearBotaoDeErroAnterior) {
      this._avaliacao.marcarErroQuestaoAnterior();
      this._botaoDeErroAnterior.bloquear();
    }

  }

  get _botaoDeErroAnterior() {
    return {
      status : this._bloquearBotaoDeErroAnterior,
      desbloquear: () => this._bloquearBotaoDeErroAnterior = false,
      bloquear: () => this._bloquearBotaoDeErroAnterior = true
    }
  }

  puxarDadosLista_1(){
    this._avaliacao.adicionarDadosEstaticos(DadosEstaticos.lista_1());
  }

}
