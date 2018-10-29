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
	nodesobj ={};
	nodesobj.id = fuente;
	nodesobj.group ="Sector";
	nodes.push(nodesobj);
	
	d.values.forEach(function (d){
		nodesobj={};
		linksobj ={};
		destino = d.key;
		nodesobj.id = destino;
		nodesobj.group = "Entidad";
		mySet.add(nodesobj);
		
		
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

	console.log("links sector - entiDAD " ,i);

/*nodos tipo Entidad*/


//i=0;
	for(let item of mySet){
		//i=i+1;
		//console.log("item",item)
		nodes.push(item);
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


/*
		var setNodes = new Set();
		var nodes=[];
		var links=[];
		var mySector = new  Set();
		var myEntidad = new Set();
		var myBeneficiario = new Set();
		
		var length  = data.length-1 ;
		*/
	
/*	
data.forEach(function(d){
		mySector.add(d.Sector);
		myEntidad.add(d.Entidad);
		myBeneficiario.add(d.Beneficiario);
		
	});
	
	

	console.log("sector",mySector,"entidad", myEntidad, "beneficia", myBeneficiario);
	
	*/
	
	}//fin d3 function {
	
	);//fin d3.csv(
	
}	//fin rutas()
rutas("data/contratos.csv")