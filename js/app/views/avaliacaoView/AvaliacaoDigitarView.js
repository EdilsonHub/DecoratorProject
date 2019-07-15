class AvaliacaoDigitarView extends View {

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
          <td class="text-center" >${(model.questaoAtual ? model.questaoAtual : { resposta: "&nbsp;" }).resposta}</td>
          <td style="width:50%">
            <input type="text"  autofocus  placeholder="Digite aqui sua resposta" class="form-control" style="border-width:0" id="campo">
          </td> 
          </tr>
          <tr>
          <td colspan="2">
          
            <div class="text-right" style="width:100%">
                  <button class="btn btn-primary"  onclick="controle.verificar()">Verificar Resposta</button>
                </div>
     
              </td>
            </tr>
          </tbody>
          <tfoot>
          <tr>
          <td class="text-center" >${(model.questaoAnterior ? model.questaoAnterior : { resposta: "&nbsp;" }).resposta}</td>
          <td class="text-center" >${(model.questaoAnterior ? model.questaoAnterior : { questao: "&nbsp;" }).questao}</td>
        </tr>   
          </tfoot>
        </table>
          `;
    }
  }
  