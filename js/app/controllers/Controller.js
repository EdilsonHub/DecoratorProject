class Controller {

  constructor() {
    let $ = document.querySelector.bind(document);

    this._arrayAvaliacoesView = [
      new AvaliacaoVerView($('#tabela')),
      new AvaliacaoDigitarView($('#tabela'))
    ]

    this._controleProxyAvaliacao = [
      new Avaliacao(),
      this._arrayAvaliacoesView[0],
      'avancarProximaQuestao',
      'obterResposta',
      'marcarErroQuestaoAnterior',
      'adicionarDadosEstaticos',
      'adicionarQuestao',
      'esvaziar'
    ];

    this._avaliacao = new Bind(...this._controleProxyAvaliacao);

    this._botoes = new Bind( // este bloco faz uma chamada a "onclick="controle.carregarDados()"
      DadosEstaticos,
      new BotoesView($('#botoes'))
    );

    this._bloquearBotaoDeErroAnterior = false;

  }

  alternarView() {
    this.avancarQuestao();
    this.marcarErro();
    if (this._arrayAvaliacoesView.length != 2) throw new Error("Tamanho do array 'this._arrayAvaliacoesView' é incompativel com a lógica atual");
    this._arrayAvaliacoesView.reverse();
    this._controleProxyAvaliacao[1] = this._arrayAvaliacoesView[0];
    this._avaliacao = new Bind(...this._controleProxyAvaliacao);
  }


  avancarQuestao() {
    this._avaliacao.avancarProximaQuestao();
    this._botaoDeErroAnterior.desbloquear();
    console.log("total de questões: ", this._avaliacao.totalDeQuestoes);
  }

  verificar() { //pura gambiarra
    var campo = document.querySelector('#campo');
    if (campo.value.length != 0) {
      if (campo.value == this._avaliacao.questaoAtual._questao._pergunta) {
        this._avaliacao.avancarProximaQuestao();
      } else {
        this._avaliacao.obterResposta();
        document.querySelector('#campo').value = this._avaliacao.questaoAtual._questao._pergunta 
        console.log(campo.value,"--",this._avaliacao.questaoAtual._questao._pergunta)
        window.setTimeout(
          () => this.avancarQuestao(),
          700
        );
      }
    }
  }

  obterResposta() {
    if (!this._avaliacao.permitidoMostrarResposta) {
      this._avaliacao.obterResposta();
    } else {
      console.log("obterResposta entrou no else");
    }

  }

  marcarErro() {

    if (!this._bloquearBotaoDeErroAnterior) {
      this._avaliacao.marcarErroQuestaoAnterior();
      this._botaoDeErroAnterior.bloquear();
    }

  }

  get _botaoDeErroAnterior() {
    return {
      status: this._bloquearBotaoDeErroAnterior,
      desbloquear: () => this._bloquearBotaoDeErroAnterior = false,
      bloquear: () => this._bloquearBotaoDeErroAnterior = true
    }
  }

  carregarDados(dados) {
    this._avaliacao.esvaziar();
    this._avaliacao.adicionarDadosEstaticos(dados);
  }

}
