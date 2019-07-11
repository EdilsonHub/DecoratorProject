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

      this._botoes = new Bind( // este bloco faz uma chamada a "onclick="controle.carregarDados()"
        DadosEstaticos,
        new BotoesView($('#botoes'))
      );

      this._bloquearBotaoDeErroAnterior = false;

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

  carregarDados(dados){
    this._avaliacao.esvaziar();
    this._avaliacao.adicionarDadosEstaticos(dados);
  }

}
