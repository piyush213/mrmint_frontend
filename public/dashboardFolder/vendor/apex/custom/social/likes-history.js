var options={chart:{height:300,type:"area",toolbar:{show:!1}},dataLabels:{enabled:!1},stroke:{width:5,curve:"smooth"},series:[{name:"Likes",data:[40,60,50,60,80,70,90]}],grid:{borderColor:"#e0e6ed",strokeDashArray:5,xaxis:{lines:{show:!0}},yaxis:{lines:{show:!1}},padding:{top:0,right:20,bottom:10,left:20}},xaxis:{categories:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]},yaxis:{labels:{show:!1}},colors:["#435EEF"],markers:{size:0,opacity:.3,colors:["#435EEF"],strokeColor:"#ffffff",strokeWidth:2,hover:{size:7}},tooltip:{y:{formatter:function(e){return+e+"k"}}}},chart=new ApexCharts(document.querySelector("#likesHistory"),options);chart.render();