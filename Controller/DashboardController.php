<?php 
include "../Model/ConnectDB.php";
isset($_POST['Function']) ? $function = $_POST['Function'] : $function = '404';

session_start();
$_SESSION["isLogged"] = "false";

switch($function){
	case 'GetProjects': ConnectController::GetProjects();
	break;
	case 'ValidarLogin': ConnectController::ValidarLogin();
	break;
	case 'InicioSesion': ConnectController::InicioSesion();
	break;
	case 'CrearUsuario': ConnectController::CrearUsuario();
	break;
	case 'GetUserProjects' : ConnectController::GetUserProjects();
	break;
	case 'getUserId' : ConnectController::GetUserId();
	break;
	case 'crearNuevoProyecto' : ConnectController::crearNuevoProyecto();
}

class ConnectController{

	public function GetProjects()
	{
		if($_SESSION["isLogged"] == "false")
			echo json_encode(ConnectDB::GetProjects());
	}

	public function ValidarLogin()
	{
		$Username = $_POST['Username'];
		echo json_encode(ConnectDB::ValidarLogin($Username));
	}

	public function InicioSesion()
	{
		$_SESSION["isLogged"] = "true";
	}

	public function CrearUsuario(){
		$FullName = $_POST['fullName'];
		$Username = $_POST['NewUsername'];
		$Password = $_POST['NewPassword'];
		$Email = $_POST['Email'];
		$Description = $_POST['Description'];
		ConnectDB::CrearUsuario($FullName, $Username, $Password, $Email, $Description);
	}

	public function GetUserProjects(){
		$username = $_POST['Username'];
		echo json_encode(ConnectDB::GetUserProjects($username));
	}

	public function GetUserId(){
		$username = $_POST['Username'];
		echo json_encode(ConnectDB::GetUserId($username));
	}

	public function crearNuevoProyecto()
	{
		$ProjectName = $_POST['ProjectName'];
		$LeaderId = $_POST['UsernameId'];
		$ProjectDesc = $_POST['projectDesc'];
		$ImgLink = $_POST['imgLink'];
		ConnectDB::crearNuevoProyecto($ProjectName, $LeaderId, $ProjectDesc, $ImgLink);
	}
}

?>







