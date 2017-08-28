$(document).ready(function(){

  function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i < ca.length; i++) {
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

    $( "#entrar" ).click(function(){ 
        var username = $("#inputUsername").val();
        var password = $("#inputPassword").val();
        console.log( username, username.length );

        DescargarPassword(username);
    });

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
               console.log("JSON SIN FUNCIONANDO");
           }
       });
    }

    function validacion(matDato, passwordTry, username){
      if(passwordTry == matDato[0][0]){
        
       setCookie("user", username, 3);
       setCookie("isLogged", "true", 3);
       alert(getCookie('user') + " & " + getCookie('isLogged'));
        alert("password correcto");
    }
  }
});


