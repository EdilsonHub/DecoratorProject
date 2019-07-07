class Controller {

  constructor(){
    this.numero = -1;
    this.arry =  DadosEstaticos.lista_1();
    this.blqTR = true;
    this.ultimo = [undefined,undefined];
    
    document.querySelector("#tamanhoLista").textContent = `
      Esta lista é composta por ${this.arry.length} palavras ( perguntas ).
    `;
  }

  ok() {
    var ob = undefined;

    this._incrementaNumero();
    this.blqTR = false;
    ob = this.arry[this.numero];

    while( (ob? ob : {nErros: 1}).nErros < 0) {
      this.numero++;
      ob = this.arry[this.numero];
    }

    if(ob){
      document.querySelector("#here").textContent = ob.nome; //= `<th id="here" scope="col">${ob? ob.nome.concat(" =>" + this.arry.indexOf(ob)): "FIM"} [${this.numero}]</th>`;
      document.querySelector("#traducao").textContent = "";
      this._conferir(ob);
      ob.nErros--;
    } else {
      this.numero--;
    }
  }

  traduzir() {
    var ob = this.arry[this.numero];

    if(ob && !this.blqTR){
      document.querySelector("#traducao").textContent = ob.traducao;
      this.blqTR = true;
      ob.nErros+=2;
    }

  }

  _incrementaNumero() {
      this.numero = (this.numero >= (this.arry.length - 1))?  0 : this.numero + 1;
  }

  _conferir(ob) {
    this.ultimo[0] = this.ultimo[1];
    this.ultimo[1] = ob;

    if(this.ultimo[0]) {
      document.querySelector("#confereNome").textContent = this.ultimo[0].nome;
      document.querySelector("#confereTraducao").textContent = this.ultimo[0].traducao;
      document.querySelector("#buttonErrei").innerHTML = `<button class="btn btn-danger btn-block"  onclick="controle.marcarErro()">Errei</button>`;
    }else {
      document.querySelector("#buttonErrei").innerHTML = `&nbsp;`;
    }

  }
  marcarErro() {
    if(this.ultimo[0]) {
      this.ultimo[0].nErros += 2;
      document.querySelector("#buttonErrei").innerHTML = `<button class="btn btn-danger btn-block" disabled onclick="controle.marcarErro()">Errei</button>`;
    }
  }
}
