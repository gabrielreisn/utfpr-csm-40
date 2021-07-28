class ExchangeRate{

    constructor(){
        this.periodo_inicial = null;
        this.periodo_final = null;
        this.moedas = [];
    }
    
    setPeriodos(periodo_inicial, periodo_final){
        this.periodo_inicial = periodo_inicial
        this.periodo_final = periodo_final
        return this;
    }

    setTaxasDeCambio(...moedas){
        moedas.forEach(siglaMoeda => this.moedas.push(siglaMoeda))
        return this;
    }

    getDados = async _ => {
        const datasCotacao = []
        const valoresCotacao = []
        for(const moeda of this.moedas){
            const url = new Bacen(moeda, this.periodo_inicial, this.periodo_final).getUrl()
            const [datas, valores]  = await this.fetchExchangeRate(url)
            datasCotacao.push(datas)
            valoresCotacao.push(valores)
        }
        const dadosTranspostos = this.transporMatriz([datasCotacao[0], ...valoresCotacao])
        return [['data',...this.moedas], dadosTranspostos]
    }

    fetchExchangeRate = async url => {
        const response = await fetch(url)
        const dados = await response.json()
        const dadosFiltrados = this.convertToArrays(dados)
        return dadosFiltrados
    }

    transporMatriz = matriz => matriz[0].map((x,i) => matriz.map(x => x[i]))

    convertToArrays = json => {
        const dataCotacao = []
        const valorCotacao = []
        json.value.forEach(cotacao => {
          dataCotacao.push(cotacao.dataHoraCotacao)
          valorCotacao.push(cotacao.cotacaoVenda)
        })
        return [dataCotacao, valorCotacao]
      }

}