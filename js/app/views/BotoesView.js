class BotoesView extends View {

  constructor(elemento) {
    super(elemento);
  }
  template(model) {
    console.log("fui chamado ", model.listaDeMetodos().map(n => n).join(''));

    // return `
    //         <div class="btn-group" role="group" aria-label="Exemplo básico">
    //           ${model.listaDeMetodos().map(n => `
    //               <button type="button" onclick="controle.carregarDados(${model.name}['${n}']())" class="btn btn-secondary">${n.replace("_"," ")}</button>
    //             `).join('')}
    //         </div>
    //       `;

    return `
              <ul class="nav justify-content-center">
              ${model.listaDeMetodos().map(n => `
                  <li class="nav-item">
                    <button type="button" style="margin:5px" onclick="controle.carregarDados(${model.name}['${n}']())" class="btn btn-secondary">${n.replace("_"," ")}</button>
                  </li>
                `).join('')}
              </ul>
          `;
  }
}
