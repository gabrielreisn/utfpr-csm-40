class Business{

  constructor({
    divIdGrafico,
    divIdTabela,
    divIdPeriodoFinal,
    divIdPeriodoInicial,
    moedas,
    chartView,
    tableView,
    exchangeRate
  }) {
    this.divIdGrafico = divIdGrafico
    this.divIdTabela = divIdTabela
    this.divIdPeriodoFinal = divIdPeriodoFinal
    this.divIdPeriodoInicial = divIdPeriodoInicial

    this.periodoFinal = null
    this.periodoInicial = null

    this.moedas = moedas

    this.chartView = chartView;
    this.tableView = tableView;
    this.exchangeRate = exchangeRate;
  }

  static initialize(deps){
    const instance = new Business(deps)
    return instance._init()
  }

  async _init(){
    this.periodoFinal = this.getValueByTagId(this.divIdPeriodoFinal)
    this.periodoInicial = this.getValueByTagId(this.divIdPeriodoInicial)

    const periodoFinal = this.converterData(this.periodoFinal)
    const periodoInicial = this.converterData(this.periodoInicial)
    
    this.dados = await this.exchangeRate
      .setPeriodos(periodoInicial, periodoFinal)
      .setTaxasDeCambio(...this.moedas)
      .getDados();

    this.drawTable()
    this.drawCharts()
  }

  drawCharts = _ => {
    const [nomes, valores] = this.dados
    const charts = this.chartView;
    charts.setColumnsName(nomes)
    charts.setDadosAtBody(valores)
    charts.draw(this.divIdGrafico);
  }

  drawTable = _ => {
    const [nomes, valores] = this.dados
    const tabela = this.tableView;
    tabela.setColumnsName(nomes)
    tabela.setDadosAtBody(valores)
    tabela.draw(this.divIdTabela);
  }

  converterData = date => {
    // converte um string de yyyy-mm-dd para mm-dd-yyyy
    const [ano, mes, dia] = date.split("-")
    return [mes, dia, ano].join("-")
  }

  getValueByTagId = id => document.getElementById(id).value;

}