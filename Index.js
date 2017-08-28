
function CargarReporte(strURLReporte)
{
    document.getElementById("divReport").innerHTML = "";
    $("#divReport").load(strURLReporte);
}

$(document).ready(function(){

	$("#btnLogin").click(function(){
		ClearFields();
	});

	function ClearFields() {

     document.getElementById("inputUsername").value = "";
     document.getElementById("inputPassword").value = "";
	}

    $( "#entrar" ).click(function(){ 
        var username = $("#inputUsername").val();
        var password = $("#inputPassword").val();
        console.log( username, username.length );
        console.log(password);

        DescargarPassword(username);
        getUserId(username);
    });

    function getUserId(username){
    	var ParametrosPost = {
            "Function" : "getUserId",
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
               guardarUserId(jsonResponse);
           },
           error: function(errorMessage) {
               console.log(errorMessage);
               console.log("JSON user id SIN FUNCIONANDO");
           }
       });
    }

    function guardarUserId(matDato1)
    {
    	var id = matDato1[0][0];
    	document.cookie = "usernameId = " + id;
    }

    $("#registrar").click(function(){
    	var fullName = $("#inputFullname").val();
    	var NewUsername = $("#inputNewUsername").val();
    	var NewPassword = $("#InputNewPassword").val();
    	var Email = $("#inputEmail").val();
    	var Description = $("#descriptionTxt").val();

    	CrearUsuario(fullName, NewUsername, NewPassword, Email, Description);
    });

    startCookies();

    function startCookies() {
    		document.cookie = "username = null";
    		document.cookie = "islogged = false";
    		document.cookie = "usernameId = null";
    }

    function CrearUsuario(fullName, NewUsername, NewPassword, Email, Description){
    	var ParametrosPost = {
            "Function" : "CrearUsuario",
            "fullName" : fullName,
            "NewUsername" : NewUsername,
            "NewPassword" : NewPassword,
            "Email" : Email,
            "Description" : Description
        }

        $.ajax({
           url: "Controller/DashboardController.php",
           type: "POST",
           data: ParametrosPost,

           success: function(jsonResponse) {
               console.log("JSON FUNCIONANDO");
               alert("Usuario Creado Exitosamente");
           },
           error: function(errorMessage) {
               console.log(errorMessage);
               console.log("JSON SIN FUNCIONANDO");
           }
       });
    }

    function DescargarPassword(username){

        var ParametrosPost = {
            "Function" : "ValidarLogin",
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
               validacion(jsonResponse, $("#inputPassword").val(), username);
           },
           error: function(errorMessage) {
               console.log(errorMessage);
               console.log("JSON de id SIN FUNCIONANDO");
           }
       });
    }

    function validacion(matDato, passwordTry, username){
      if(passwordTry == matDato[0][0])
      {
        //alert("password correcto");
        getUserId(username);
    	document.cookie = "username = " + username;
    	document.cookie = "islogged = true";
    	cambiarDatosNavBar(username);
    	$("#LoginModal").modal('toggle');
    	CargarReporte('Views/Dashboard/Profile_View.html');
    }
      else
      {
        //alert("password incorrecto");
        $("#WrongPassword").html("Incorrect Password")
      }
    }

    function cambiarDatosNavBar(username) {
    	document.getElementById("navbarID").innerHTML = "";
      var li = document.createElement('li');
      $(li).addClass("nav-item");

      var button = document.createElement('button');
      button.type = "button";
      //button.data-toggle = "modal";
      button.onclick = "CargarReporte('Views/Dashboard/Profile_View.html')";

      $(button).click(function(){
      	CargarReporte('Views/Dashboard/Profile_View.html');
      });

      $(button).addClass("btn btn-light");
      $(button).attr("id", "btnProfile");

      var htmltext = document.createTextNode("Hello " + username);
      button.appendChild(htmltext);
      li.appendChild(button);
      document.getElementById("navbarID").appendChild(li);


    }
});