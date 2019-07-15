class AvaliacaoVerView extends View {

  constructor(elemento) {
    super(elemento);
  }
  template(model) {

    return `
    
      <p class="text-left" >
        Quantidade de palavras na lista: ${model.totalDeQuestoes}
        </p>
        <table class="table table-bordered">
        <thead>
        <tr>
        <th class="text-center" scope="col">Pergunta</th>
        <th class="text-center" scope="col">Resposta</th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <td style="width:50%" class="text-center" >${(model.questaoAtual ? model.questaoAtual : { questao: "&nbsp;" }).questao}</td>
        <td class="text-center" >${(model.permitidoMostrarResposta) ? (model.questaoAtual ? model.questaoAtual : { resposta: "&nbsp;" }).resposta : "&nbsp;"}</td>
        </tr>
        <tr>
        <td colspan="2">
        
          <div class="text-right" style="width:100%">
                <button class="btn btn-primary"  onclick="controle.avancarQuestao()">Ok</button>
                <button class="btn btn-danger"  onclick="controle.obterResposta()">Conferir Resposta</button>
              </div>
   
            </td>
          </tr>
        </tbody>
        <tfoot>
        <tr>
        <td class="text-center" >${(model.questaoAnterior ? model.questaoAnterior : { questao: "&nbsp;" }).questao}</td>
        <td class="text-center" >${(model.questaoAnterior ? model.questaoAnterior : { resposta: "&nbsp;" }).resposta}</td>
      </tr>   
         <tr>
            <td colspan="2">
            <button class="btn btn-danger btn-block" ${model.questaoAnterior ? "" : "disabled"} onclick="controle.marcarErro()">Marcar como erro</button>
            </td>
          </tr>
        </tfoot>
      </table>
        `;
  }
}
