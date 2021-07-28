class Bacen{

    static URL = "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@moeda='simbolo_moeda'&@dataInicial='cotacao_inicial'&@dataFinalCotacao='cotacao_final'&$top=10000&$skip=0&$format=json&$select=cotacaoVenda,dataHoraCotacao";
    
    constructor(moeda = null, periodo_inicial = null, periodo_final = null){
  
      this.setParams(moeda, periodo_inicial, periodo_final) 
    }
    
    setParams(moeda, periodo_inicial, periodo_final){
      this.moeda = moeda;
      this.periodo_inicial = periodo_inicial
      this.periodo_final = periodo_final
      return this;
    }
  
    getUrl(){
      const url = Bacen.URL
        .replace("simbolo_moeda", this.moeda)
        .replace("cotacao_final", this.periodo_final)
        .replace("cotacao_inicial", this.periodo_inicial)
  
      return url;
    }
  
  }
  