class Charts{

    constructor(){
        this.columnsName = null
        this.dados = null;
    }

    setColumnsName(headers){
        this.columnsName = headers
        return this
    }

    setDadosAtBody(dados){
        this.dados = dados
        return this
    }
    draw(tagId){
        const columnsName = this.columnsName
        const dados = this.dados
        const tagDestino = document.getElementById(tagId);
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChart);
    
        function drawChart() {
          var data = google.visualization.arrayToDataTable([columnsName, ...dados]);
          var options = {
            title: 'Cotação',
            curveType: 'function',
            legend: { position: 'bottom' }
          };
    
          var chart = new google.visualization.LineChart(tagDestino);
    
          chart.draw(data, options);
        }
      }

}
