var options={chart:{height:300,type:"bar",toolbar:{show:!1}},plotOptions:{bar:{horizontal:!0,barHeight:"40%"}},dataLabels:{enabled:!1},series:[{data:[400,430,448,470,540,1200,1380]}],xaxis:{categories:["Canada","Netherlands","Italy","France","Japan","USA","India"]},grid:{borderColor:"#7885d8",strokeDashArray:5,xaxis:{lines:{show:!0}},yaxis:{lines:{show:!1}},padding:{top:0,right:0,bottom:0,left:0}},theme:{monochrome:{enabled:!0,colors:["#435EEF","#59a2fb","#8ec0fd","#c7e0ff"],shadeIntensity:.1}}},chart=new ApexCharts(document.querySelector("#basic-bar-graph"),options);chart.render();