class Table{

  constructor(){

    // remove tabela anterior se existir
    const node = document.querySelector("#tabela > table")
    if(node) node.remove()

    this.tabela = null
    this.head = null
    this.body = null
    this.columnsName = null
  }

  setColumnsName(headers){
    this.columnsName = headers
    return this
  }
  
  initialize(){
    this
      .setTabela()
      .construirHead()
      .construirBody()  
  }

  draw(idWhere){
    const idTag = document.getElementById(idWhere)
    idTag.appendChild(this.tabela)
  }
  
  getTabela(){
    return this.tabela
  }

  setTabela(){
    this.tabela = document.createElement('table')
    return this
  }

  _construirHead(row){
    for(const iterator in this.columnsName){
      row.insertCell(iterator).innerHTML = this.columnsName[iterator]
    }
  }

  construirHead(){
    const tabela = this.tabela;
    const thead = tabela.createTHead()
    const rowTHead = thead.insertRow(0)
    this._construirHead(rowTHead)
    this.head = thead
    return this
  }

  construirBody(){
    const tabela = this.tabela;
    const tbody = tabela.createTBody()
    this.body = tbody;
    return this;
  }

  insertRowAtBody(dados){
    const body = this.body
    const rowBody = body.insertRow()
    for (const iterator in dados)
      rowBody.insertCell(iterator).innerHTML = dados[iterator]
    return this;
  }

  setDadosAtBody(matriz){
    this.initialize()
    for (const vetor of matriz)
      this.insertRowAtBody(vetor)
    return this;
  }
}