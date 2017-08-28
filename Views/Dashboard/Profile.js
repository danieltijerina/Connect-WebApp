$(document).ready(function(){

	var z = getCookie('username');
	//alert(z);
	$("#profileTitle").html("Welcome " + z);
	console.log(z);

	getUserProjects(z);

	function getCookie(cname) {
	    var name = cname + "=";
	    var decodedCookie = decodeURIComponent(document.cookie);
	    var ca = decodedCookie.split(';');
	    for(var i = 0; i <ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0) == ' ') {
	            c = c.substring(1);
	        }
	        if (c.indexOf(name) == 0) {
	            return c.substring(name.length, c.length);
	        }
	    }
	    return "";
	}

	$("#crearNuevoProyecto").click(function(){
		var x = getCookie("usernameId");
		console.log(x);
		var projectName = $("#inputProjectName").val();
		var projectDesc = $("#inputProjectDescription").val();
		var imgLink = $("#inputImageLink").val();
		crearNuevoProyecto(projectName, x, projectDesc, imgLink);

		$("#NewProjectModal").modal('toggle');
    	CargarReporte('Views/Dashboard/Profile_View.html');
	});

	function crearNuevoProyecto(projectName, usernameId, projectDesc, imgLink)
	{
		var ParametrosPost = {
            "Function" : "crearNuevoProyecto",
            "ProjectName" : projectName,
            "UsernameId" : usernameId,
            "projectDesc" : projectDesc,
            "imgLink" : imgLink
        }

        console.log(projectName);
        console.log(usernameId);
        console.log(projectDesc);
        console.log(imgLink);

        $.ajax({
           url: "Controller/DashboardController.php",
           type: "POST",
           data: ParametrosPost,

           success: function(jsonResponse) {
               console.log("JSON FUNCIONANDO");
               alert("Proyecto Creado Exitosamente");
           },
           error: function(errorMessage) {
               console.log(errorMessage);
               console.log("JSON SIN FUNCIONANDO");
           }
       });
	}

	function getUserProjects(username){

		var ParametrosPost = {
            "Function" : "GetUserProjects",
            "Username" : username
        }

        $.ajax({
           url: "Controller/DashboardController.php",
           type: "POST",
           data: ParametrosPost,
           dataType: 'json',

           success: function(jsonResponse) {
               console.log(jsonResponse);
               console.log("JSON FUNCIONANDO");
               LlenarTabla(jsonResponse, "tbMuestraProyectos");

           },
           error: function(errorMessage) {
               console.log(errorMessage);
               console.log("JSON SIN FUNCIONANDO");
           }
       });

	}

	$("#crearProyecto").click(function(){

	});

	function LlenarTabla(matDatos, strIDTabla) 
    {
    	document.getElementById(strIDTabla).innerHTML = "";
      
        for(var reg = 0; reg < matDatos.length; reg++)
        {
          var row = document.createElement('div');
          $(row).addClass("row paddingEnBotton");
          var counter = 0;
          for(reg; reg < matDatos.length && counter < 3; reg++){
            var Registro = matDatos[reg];
            var div = document.createElement('div');
            $(div).addClass("card col-lg-4 col-md-4");

            var invisible = document.createElement('p');
            var invisibleText = document.createTextNode(Registro[5]);
            invisible.appendChild(invisibleText);
            $(invisible).addClass("invisible teamNumber");
            div.appendChild(invisible);

            var img = document.createElement('img');
            img.src = Registro[0];
            $(img).addClass("paddingEnTop img-tumbnail");
            div.appendChild(img);

            var divInner = document.createElement('div');
            $(divInner).addClass("card-body");
            div.appendChild(divInner);

            var h4 = document.createElement('h4');
            $(h4).addClass("card-title");
            div.appendChild(h4);

            var htmlText = document.createTextNode(Registro[1]);
            h4.appendChild(htmlText);
            div.appendChild(h4);

            var p1 = document.createElement('p');
            $(p1).addClass("card-text");

            var htmlText1 = document.createTextNode(Registro[2]);
            p1.appendChild(htmlText1);
            div.appendChild(p1);

            var p2 = document.createElement('h4');
            $(p2).addClass("card-text");

            var htmlText2 = document.createTextNode(Registro[3]);
            p2.appendChild(htmlText2);
            div.appendChild(p2);

            var h6 = document.createElement('h6');
            $(h6).addClass("card-title");

            var htmlText3 = document.createTextNode("Role: ");
            h6.appendChild(htmlText3);
            div.appendChild(h6);

            var p3 = document.createElement('p');
            $(p3).addClass("card-text");

            var htmlText4 = document.createTextNode(Registro[4]);
            p3.appendChild(htmlText4);
            div.appendChild(p3);

            var button = document.createElement('a');
            button.href = "#";
            $(button).addClass("btn btn-primary paddingEnBotton");

            var htmlText5 = document.createTextNode("Apply");
            button.appendChild(htmlText5);
            div.appendChild(button);
            row.appendChild(div);
            counter++;
          }
          reg--;
        document.getElementById(strIDTabla).appendChild(row);   
        }
    }

});