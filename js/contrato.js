document.body.style.zoom = 0.80
 svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    margin = {top: 30, right: 20, bottom: 80, left: 20};

	   default_text_size = "9px";
function rutas(rutas,tipochart){
	svg
        .append("svg")
        .attr("width", width)
        .attr("height", height);

	var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");        
	var color = d3.scaleOrdinal(d3.schemeCategory10);
	var categorias=["Entidad","Sector","Beneficiario"];
	var linkScale = d3.scaleLinear().range ([1,10]);
	var opacityScale = d3.scaleLinear().range ([0.4,1]);
	var valorMax = 0;
	var valorMin =0;
	
	console.log("tipo",tipochart);
	
	if(tipochart=="radial"){
	 //Radial Force
	var simulation = d3.forceSimulation()
    //.force("link", d3.forceLink().id(function(d) { return d.id; }).strength(0.5))
	 .force("link", d3.forceLink().id(function(d) { return d.id; }).distance(30)) //distancia entre nodos mas mas ddistancia
	 .force("r", d3.forceRadial(function(d){return d.group=="Sector" ? 100:50}))
	 .force("collide", d3.forceCollide().strength(0.1))
     .force("charge", d3.forceManyBody().strength(-50)) //mas negativo mas dispersos
	 .force("center", d3.forceCenter(width / 2, (height-100)/2 ))
	
		
		
	}else{
		var simulation = d3.forceSimulation()
    //.force("link", d3.forceLink().id(function(d) { return d.id; }).strength(0.5))
	 .force("link", d3.forceLink().id(function(d) { return d.id; }).distance(40)) //distancia entre nodos mas mas ddistancia
	 //.force("collide", d3.forceCollide(5).strength(0.1))
	 .force("collide", d3.forceCollide().strength(0.5))
    .force("charge", d3.forceManyBody().strength(-10)) //mas negativo mas dispersos
    .force("center", d3.forceCenter(width / 2, (height-100)/2 ))
	.force('y',d3.forceY().y(function(d){
		return (0);
	}));
	
	}
/*
var simulation = d3.forceSimulation()
    //.force("link", d3.forceLink().id(function(d) { return d.id; }).strength(0.5))
	 .force("link", d3.forceLink().id(function(d) { return d.id; }).distance(30)) //distancia entre nodos mas mas ddistancia
	 //.force("collide", d3.forceCollide(5).strength(0.1))
	 .force("collide", d3.forceCollide().strength(0.1))
    .force("charge", d3.forceManyBody().strength(-40)) //mas negativo mas dispersos
    .force("center", d3.forceCenter(width / 2, (height-100)/2 ))

	.force('x',d3.forceX().x(function(d){
		return (width);
	}))
	
	.force('y',d3.forceY().y(function(d){
		return (0);
	}));
	*/
	
	d3.csv(rutas,function(error, data){
		if(error) throw error;
		
		var nodes=[];
	
	var links=[];
		var mySet = new  Set();
		var mySet1 = new  Set();
		
		var length  = data.length-1 ;
		
		//ordenado = data.sort((a,b)=>d3.ascending(a.Sector,b.Sector));
		
		/*links - nodes sector - entidad*/
		var ordernew = d3.nest()
			.key(function(d){return d.Sector;})
			.key(function(d){return d.Entidad;})
			.rollup(function(v){return {value: v.length,
			total: d3.sum(v,function(d){return +d.ValorContrato;})
			}})
			
			.entries(data);
					
console.log("datargg",ordernew);
i=0;
ordernew.forEach(function(d){
	fuente = d.key;
	var nodesobj ={};
	nodesobj.id = fuente;
	nodesobj.group ="Sector";
	nodes.push(nodesobj);
	
	d.values.forEach(function (d){
		var nodesobj={};
		linksobj ={};
		destino = d.key;
		//nodesobj.id = destino;
		//nodesobj.group = "Entidad";
		//console.log("ya esta", nodesobj);
		//mySet.add(nodesobj);
		mySet.add(destino);
		
		
		linksobj.source = fuente;
		linksobj.target = destino;
		linksobj.valor = d.value.value;
		linksobj.total =  d.value.total;
		links.push(linksobj);
		
		//nodes.push(nodesobj);
		//console.log(d.key, d.value);
		i = i+1;
	})
	
	/*
	for(i=0;i<d.values.length;i++){
		nodesobj.id = 
	}
	*/
	
	
});

	//console.log("links sector" ,i);
	//console.log("nodos sector nodes",nodes);
	//console.log("nodes entidad set1",mySet1)
//console.log("nodes entidad set",mySet)

/*nodos tipo Entidad*/


//i=0;
	for(let item of mySet){
		nodesobj ={};
		nodesobj.id = item;
		nodesobj.group = "Entidad";
		//i=i+1;
		//console.log("item",item)
		//mySet1.add(item);
		
		nodes.push(nodesobj);
	}
	
	
	
	//console.log(i);
	
	
		/*links - nodes  beneficiario-entidad*/
		i=0;
		var ordernew = d3.nest()
			.key(function(d){return d.Beneficiario;})
			.key(function(d){return d.Entidad;})
			
			.rollup(function(v){return {value: v.length,
			total: d3.sum(v,function(d){return +d.ValorContrato;})
			}})
			
		//	.rollup(function(v){return v.length;})
			.entries(data);

			
			ordernew.forEach(function(d){
	fuente = d.key;
	nodesobj ={};
	nodesobj.id = fuente;
	nodesobj.group ="Beneficiario";
	nodes.push(nodesobj);
	
	d.values.forEach(function (d){
		//nodesobj={};
		linksobj ={};
		destino = d.key;
		//nodesobj.id = destino;
		//nodesobj.group = "Entidad";
		//mySet.add(nodesobj);
		
		
		linksobj.source = fuente;
		linksobj.target = destino;
		linksobj.valor = d.value.value;
		linksobj.total =  d.value.total;
		links.push(linksobj);
		
		//if(valorMax < d.value.total){
			//valorMax = d.value.total; 
		//}
		//nodes.push(nodesobj);
		//console.log(d.key, d.value);
		i=i+1;
	})
	
	
	
});
			
			//console.log("links beneficiario - entiDAD " ,i);
			
			
//console.log("mySet", mySet,"nodes",nodes, "links",links);
console.log("valor max ", valorMax);
console.log("valores", d3.extent(links,function(d){return d.total}));
console.log("nodes", nodes);
console.log("links", links);

var r = 3;
linkScale.domain(d3.extent(links,function(d){return d.total}));
opacityScale.domain(d3.extent(links,function(d){return d.valor}));

 var link = svg.append("g")
      .attr("class", "links")
    .selectAll("line")
    .data(links)
    .enter().append("line")
	 .style("stroke","blue")
	 //.attr("stroke-width", function(d) { return Math.sqrt(d.valor); });
	 //.attr("stroke-width", function(d) { return d.valor/2; })
	 .attr("stroke-width", function(d) { return linkScale(d.total); })
	 .attr("stroke-linecap", "round")
	 .attr("stroke-opacity",function(d){return opacityScale(d.valor)})
     //.attr("stroke-width", function(d) { return 2; });
	 .on("mouseover",function(d){
		 d3.select(this)     //.style("stroke-width",5);
		  .append("title")
		  //.html("jjj");
		  .html(function(d){
			  if(d.total){
			  return "Contratos :" + d.valor + "<br>" + "Valor Total : " + d3.format("$,r")(d.total);
			  }else {
				  return "No Disponible";
			  }
		  });
	 });
	
	
	 var node = svg.append("g")
      .attr("class", "nodes")
    .selectAll("g")
    .data(nodes)
    .enter().append("g")
    
	 var circles = node.append("circle")
      .attr("r", function(d){
		  
		  switch(d.group){
			case "Entidad":
				return r*2;
				//break;
				//console.log("entidad",r)
			 case "Beneficiario":
				return r*1.5;
				//break;
			 default:
				return r*1.7;
		
		  }
		//  console.log("R",r)
		  	//return r;
	  })
      .attr("fill", function(d) { return color(d.group); })
      .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended))
		  .append("title")
		  .html(function (d){
			  switch(d.group){
			case "Entidad":
				return  "Entidad: "+ d.id ;
				//break;
				//console.log("entidad",r)
			 case "Beneficiario":
				return  "Beneficiario: "+ d.id ;
				//break;
			 default:
				return  "Sector Economico: "+ d.id ;
		
		  }
			  
		  });
		  
	
	
      var text = g.selectAll(".text") 
        .data(nodes)        
        .enter().append("text")
            .attr("dy", ".35em")    
            .style("font-size", default_text_size)
			.style("fill", color("Sector"))
            .text(function(d) { 
			if(tipochart == "lineal"){
				return "";
			}else{

            if (d.group == "Sector") {
                return d.id;
            } else {            
                return "";
                }
			}
            });
	

  simulation
      .nodes(nodes)
      .on("tick", ticked);

  simulation.force("link")
      .links(links);
	  
	  var labels = g.append("g")
     	.attr("transform", "translate(30,30)");
	  
	 
	 labels.selectAll("rect")
    .data(categorias)
    .enter()
    .append("rect")
    .attr("width","15px")
    .attr("height","15px")
    .attr("x",function(d,i){return i*100;})
    .attr("fill",function(d){return color(d);});
	
        
   labels.selectAll("text")
        .data(categorias)
        .enter()
       .append("text")
        .attr("x",function(d,i){return i*100+20;})
        .attr("y","1em")
        .attr("font-size", 15)
        .text(function(d){return d;});
	  
	  

  function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });
	
    node
	
        .attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
        })
	
	  text
            .attr("transform", function(d) { return "translate(" + (d.x-10 ) + "," + (d.y-20) + ")"; });
  
  }
	
	
	
	}//fin d3 function {
	
	);//fin d3.csv(
	
	function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}





d3.select("#radial").on("click", function() {tipo_chart("radial");});
d3.select("#lineal").on("click", function() {tipo_chart("lineal");});
	
}	//fin rutas()
function tipo_chart(tipochar){
	d3.select("svg").selectAll("*").remove();
	rutas("data/contratos.csv",tipochar);	
}
rutas("data/contratos.csv","radial")