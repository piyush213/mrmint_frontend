var options={chart:{height:260,type:"area",toolbar:{show:!1},dropShadow:{enabled:!0,opacity:.1,blur:5,left:-10,top:10}},dataLabels:{enabled:!1},stroke:{curve:"smooth",width:3},series:[{name:"Sales",data:[300,400,600,500,700,500,600]},{name:"Revenue",data:[100,200,400,300,500,400,300]}],grid:{borderColor:"#ffffff",strokeDashArray:5,xaxis:{lines:{show:!0}},yaxis:{lines:{show:!1}},padding:{top:0,right:30,bottom:0,left:30}},xaxis:{type:"day",categories:["Sun","Mon","Tue","Wedn","Thu","Fri","Sat"]},colors:["#435EEF","#59a2fb"],yaxis:{show:!1},markers:{size:0,opacity:.2,colors:["#435EEF","#59a2fb"],strokeColor:"#fff",strokeWidth:2,hover:{size:7}},tooltip:{x:{format:"dd/MM/yy"}}},chart=new ApexCharts(document.querySelector("#revenueGraph"),options);chart.render();