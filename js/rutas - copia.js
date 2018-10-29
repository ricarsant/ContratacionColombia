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
		
console.log("data",data);
		
		var nodes=[];
		var links=[];
		var mySet = new  Set();
		
		var length  = data.length-1 ;
		
		for(var i=0;i<length;i++){
			nodesobj = {};
			//linksobj={};
			grupo = data[i].Grupo;
			nodesobj.id = data[i].Nombre;
			nodesobj.Grupo =  grupo;
			nodesobj.Ruta=  data[i].Ruta;
			nodesobj.Posicion =  data[i].Posicion;
			nodesobj.Procesado =0;
			nodes.push(nodesobj);
			nombre0 = data[i].Nombre;
			
			
			
			//i=i+1;
			while(data[i+1].Nombre == nombre0){
				
				otroN	= data[i+1].Nombre + i.toString();
				grupoN = data[i+1].Grupo;
				
				
				i=i+1;
				if(i+1>= length) break;
				//linksobj.source =nombre0;
				nodesobj1 = {};
			nodesobj1.id = otroN;
			nodesobj1.Grupo =  data[i].Grupo;
			nodesobj1.Ruta=  data[i].Ruta;
			nodesobj1.Posicion =  data[i].Posicion;
			nodesobj1.Procesado =0;
			//linksobj.target = otroN;
			//linksobj.Procesado =0;
			nodes.push(nodesobj1);
			//links.push(linksobj);
			
				//console.log("Nombre 0:",nombre0, "***Grupo i:", data[i-1].Grupo, "***Nombre i+1 new:", otroN, "***Grupo i+1", data[i+1].Grupo);
		
			}
			
			
			
		/*
			for(i=0;i<length;i++){
				console.log("dentro ", nodes[i].id);
				
				
				
			}
			*/
			
			
		}
			
		length  = nodes.length ;
		console.log("nodes",length);
		
		for(i=0;i<length;i++){
			
			if(nodes[i].Grupo =="0") {
				nombre0 = nodes[i].id;
				
				while(nodes[i+1].Grupo =="1"){
					//console.log(nombre0, " --- ", nodes[i+1].id);
					linksobj ={};
					linksobj.source = nombre0;
					linksobj.target = nodes[i+1].id;
					linksobj.fuerza = 0;
					linksobj.ruta = 0;
					nodes[i+1].Procesado = 1;
					links.push(linksobj);
					i = i+1;
					if(i+1>= length) break;
				}
				
				
			}
			
			
			
		}
			
			var nodesSort = nodes.sort((a,b)=> d3.ascending(a.Ruta,b.Ruta));
			length  = nodesSort.length ;
			
					console.log("ordenado ruta",nodesSort);
		
		for(i=0;i<length;i++){
			ruta = nodesSort[i].Ruta;
			//if(nodesSort[i].Grupo ==ruta) {
				
				
				while(nodes[i+1].Ruta ==ruta){
					nombre0 = nodes[i].id;
					//console.log(nombre0, " --- ", nodes[i+1].id);
					linksobj ={};
					linksobj.source = nombre0;
					linksobj.target = nodes[i+1].id
					linksobj.fuerza = 1;
					linksobj.Ruta = ruta;
					nodes[i+1].Procesado = 1;
					links.push(linksobj);
					i = i+1;
					if(i+1>= length) break;
				}
				
				
			//}
			
			
			
		}
		
		
		
		console.log("nodes",nodes);
		console.log("links",links);

		
		/*
		data.forEach(function(d){
			nodesobj = {};
			nodesobj.id = d.Nombre;
			nodesobj.Grupo = d.Grupo;
			nodesobj.Ruta= d.Ruta;
			nodesobj.Posicion = d.Posicion;
			nodesobj.Procesado =0;
			nodes.push(nodesobj);
			mySet.add(nodesobj);
		}
		);
		
		*/
		
		/*
		var length  = nodes.length-1 ;
		
		for(var i=0;i<length ;i++){
		linksobj= {};
		//console.log(nodes[i].id);
		if(nodes[i].Grupo == "0" && nodes[i+1].Grupo=="1") {
			linksobj.source = nodes[i].id;
			linksobj.target = nodes[i+1].id;
			linksobj.fuerza = 1;
			nodes[i+1].Procesado =1;
		}
		links.push(linksobj);
	}
		
		*/
		
		
		//console.log("nodes",nodes);
			//console.log("links" ,links);
		
		
		
		

///codigo arriba

	}//fin d3 function {
	
	);//fin d3.csv(
	
}	//fin rutas()
rutas("data/contratos.csv")