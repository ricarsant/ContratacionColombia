document.body.style.zoom = 0.80
 svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    margin = {top: 50, right: 20, bottom: 80, left: 20};

	
function rutas(rutas){
	svg
        .append("svg")
        .attr("width", width)
        .attr("height", height);

	var color = d3.scaleOrdinal(d3.schemeCategory10);
	

var simulation = d3.forceSimulation()
    //.force("link", d3.forceLink().id(function(d) { return d.id; }).strength(0.5))
	 .force("link", d3.forceLink().id(function(d) { return d.id; }).distance(30)) //distancia entre nodos mas mas ddistancia
	 .force("collide", d3.forceCollide(5).strength(0.9))
    .force("charge", d3.forceManyBody().strength(-5)) //mas negativo mas dispersos
    .force("center", d3.forceCenter(width / 2, (height-100)/2 ));
	
	
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
			.rollup(function(v){return v.length;})
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
		linksobj.valor = d.value;
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

	console.log("links sector" ,i);
	console.log("nodos sector nodes",nodes);
	console.log("nodes entidad set1",mySet1)
console.log("nodes entidad set",mySet)

/*nodos tipo Entidad*/


//i=0;
	for(let item of mySet){
		nodesobj ={};
		nodesobj.id = item;
		nodesobj.group = "Entidad";
		//i=i+1;
		console.log("item",item)
		//mySet1.add(item);
		
		nodes.push(nodesobj);
	}
	
	
	
	//console.log(i);
	
	
		/*links - nodes  beneficiario-entidad*/
		i=0;
		var ordernew = d3.nest()
			.key(function(d){return d.Beneficiario;})
			.key(function(d){return d.Entidad;})
			.rollup(function(v){return v.length;})
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
		linksobj.valor = d.value;
		links.push(linksobj);
		//nodes.push(nodesobj);
		//console.log(d.key, d.value);
		i=i+1;
	})
	
	
	
});
			
			console.log("links beneficiario - entiDAD " ,i);
			
			
//console.log("mySet", mySet,"nodes",nodes, "links",links);
console.log("nodes", nodes);
console.log("links", links);


 var link = svg.append("g")
      .attr("class", "links")
    .selectAll("line")
    .data(links)
    .enter().append("line")
	 .style("stroke","blue")
	 //.attr("stroke-width", function(d) { return Math.sqrt(d.valor); });
	  .attr("stroke-width", function(d) { return d.valor; });
     //.attr("stroke-width", function(d) { return 2; });
	
	
	 var node = svg.append("g")
      .attr("class", "nodes")
    .selectAll("g")
    .data(nodes)
    .enter().append("g")
    
	 var circles = node.append("circle")
      .attr("r", 5)
      .attr("fill", function(d) { return color(d.group); })
      .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));
	
	node.append("title")
      .text(function(d) { return d.id; });

  simulation
      .nodes(nodes)
      .on("tick", ticked);

  simulation.force("link")
      .links(links);

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
	
}	//fin rutas()
rutas("data/contratos.csv")