var options1={series:[{name:"Completed",data:[1,2,3,3,5]}],chart:{type:"line",width:130,height:75,sparkline:{enabled:!0}},colors:["#435EEF"],stroke:{curve:"smooth",width:7},tooltip:{fixed:{enabled:!1},x:{show:!1},marker:{show:!1}},xaxis:{type:"day",categories:["Monday","Tuesday","Wednesday","Thursday","Friday"]},tooltip:{y:{formatter:function(e){return e}}}},chart1=new ApexCharts(document.querySelector("#taskStats1"),options1);chart1.render();var options2={series:[{name:"Pending",data:[1,2,4,3,6]}],chart:{type:"line",width:130,height:75,sparkline:{enabled:!0}},colors:["#149865"],stroke:{curve:"smooth",width:7},tooltip:{fixed:{enabled:!1},x:{show:!1},marker:{show:!1}},xaxis:{type:"day",categories:["Monday","Tuesday","Wednesday","Thursday","Friday"]},tooltip:{y:{formatter:function(e){return e}}}},chart2=new ApexCharts(document.querySelector("#taskStats2"),options2);chart2.render();var options3={series:[{name:"In Progess",data:[1,2,1,4,7]}],chart:{type:"line",width:130,height:75,sparkline:{enabled:!0}},colors:["#FFC424"],stroke:{curve:"smooth",width:7},tooltip:{fixed:{enabled:!1},x:{show:!1},marker:{show:!1}},xaxis:{type:"day",categories:["Monday","Tuesday","Wednesday","Thursday","Friday"]},tooltip:{y:{formatter:function(e){return e}}}},chart3=new ApexCharts(document.querySelector("#taskStats3"),options3);chart3.render();var options4={series:[{name:"Closed",data:[1,2,2,4,6]}],chart:{type:"line",width:130,height:75,sparkline:{enabled:!0}},colors:["#EB3333"],stroke:{curve:"smooth",width:7},tooltip:{fixed:{enabled:!1},x:{show:!1},marker:{show:!1}},xaxis:{type:"day",categories:["Monday","Tuesday","Wednesday","Thursday","Friday"]},tooltip:{y:{formatter:function(e){return e}}}},chart4=new ApexCharts(document.querySelector("#taskStats4"),options4);chart4.render();