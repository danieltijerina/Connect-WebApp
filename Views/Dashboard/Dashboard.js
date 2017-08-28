$(document).ready(function(){

	DescargarProyectos();

    function DescargarProyectos(){
        var ParametrosPost = {
            "Function" : "GetProjects"
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

    function LlenarTabla(matDatos, strIDTabla) 
    {
    	document.getElementById(strIDTabla).innerHTML = "";
      
        for(var reg = 0; reg < matDatos.length; reg++)
        {
          var row = document.createElement('div');
          $(row).addClass("row paddingEnBottom");
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

            var htmlText3 = document.createTextNode("Looking for: ");
            h6.appendChild(htmlText3);
            div.appendChild(h6);

            var rowInterior = document.createElement('div');
            $(rowInterior).addClass("row");
            var divInterior1 = document.createElement('div');
            $(divInterior1).addClass("col-md-4");


            var img2 = document.createElement('img');
            img2.src = GetFilterImage(Registro[6]);
            $(img2).addClass("paddingEnTop");
            divInterior1.appendChild(img2);

            var divInterior2 = document.createElement('div');
            $(divInterior2).addClass("col-md-8");

            var p3 = document.createElement('p');
            $(p3).addClass("card-text");

            var htmlText4 = document.createTextNode(Registro[4]);
            p3.appendChild(htmlText4);
            divInterior2.appendChild(p3);
            rowInterior.appendChild(divInterior1);
            rowInterior.appendChild(divInterior2);
            div.appendChild(rowInterior);

            var button = document.createElement('a');
            button.href = "#";
            $(button).addClass("btn btn-primary paddingEnBottom");

            var htmlText5 = document.createTextNode("Apply");
            button.appendChild(htmlText5);
            div.appendChild(button);
            var br = document.createElement('br');
            div.appendChild(br);
            row.appendChild(div);
            counter++;
          }
          reg--;
        document.getElementById(strIDTabla).appendChild(row);   
        }
    }

    function GetFilterImage(image){
      console.log(image);
        switch(image){
            case '1':
              return "Fotos/i_FE.png";
            break;

            case '2': 
              return "Fotos/i_BE.png";
            break;

            case '3':
              return "Fotos/i_Tester.png";

            break;

            case '4': 
              return "Fotos/i_UI.png";
            break;

            case '5': 
              return "Fotos/i_UX.png";
            break;

            default:
            case '6': 
              return "Fotos/i_Graphic_Design.png";
            break;

            case '7': 
              return "Fotos/i_Computer_Engineer.png";
            break;

        }

    } 
});