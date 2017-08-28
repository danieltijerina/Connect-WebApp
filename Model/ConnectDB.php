<?php 


class ConnectDB
{
	private function conDBConnection()
	 {
	   $con = mysqli_connect("connect.cbuubvyr64vn.us-east-1.rds.amazonaws.com:3306","hackmty","hackmty123","Connect");

	   if (mysqli_connect_errno())
	   {
		   return "No connection";
	   }

	   return $con;
	 }

	 public function GetProjects()
	 {
	 	$con = ConnectDB::conDBConnection();

	 	$query = "Call SP_GetIndividualSearches()";
	 	$result = mysqli_query($con, $query);

	 	$rows = array();
	 	while($row = mysqli_fetch_array($result, MYSQLI_NUM))
	 	{
	 		$rows[] = $row;
	 	}

	 	@mysqli_close($link);

	 	return $rows;
	 }

	 public function ValidarLogin($Username)
	 {
	 	$con = ConnectDB::conDBConnection();

	 	$query = "Call SP_Login('$Username')";
	 	$resulti = mysqli_query($con, $query);
		
	 	$rows = array();
	 	while($row = mysqli_fetch_array($resulti, MYSQLI_NUM))
	 	{
	 		$rows[] = $row;
	 	}
	 	

	 	@mysqli_close($link);

	 	return $rows;
	 }

	 public function CrearUsuario($FullName, $Username, $Password, $Email, $Description)
	 {
	 	$con = ConnectDB::conDBConnection();

	 	$query = "Call SP_CreateUser('$FullName', '$Username', '$Password', '$Description', NULL, '$Email')";
	 	$resulti = mysqli_query($con, $query);
		
	 	/*if($resulti)
	 		echo 'Data inserted successfully';*/
	 	

	 	@mysqli_close($link);

	 }

	 public function GetUserProjects($username)
	 {
	 	$con = ConnectDB::conDBConnection();

	 	$query = "Call SP_GetProjects('$username')";
	 	$resulti = mysqli_query($con, $query);
		
	 	$rows = array();
	 	while($row = mysqli_fetch_array($resulti, MYSQLI_NUM))
	 	{
	 		$rows[] = $row;
	 	}
	 	

	 	@mysqli_close($link);

	 	return $rows;
	 }

	 public function getUserId($username)
	 {
	 	$con = ConnectDB::conDBConnection();

	 	$query = "Call SP_GetIDWithUserName('$username')";
	 	$resulti = mysqli_query($con, $query);
		
	 	$rows = array();
	 	while($row = mysqli_fetch_array($resulti, MYSQLI_NUM))
	 	{
	 		$rows[] = $row;
	 	}
	 	

	 	@mysqli_close($link);

	 	return $rows;
	 }

	 public function crearNuevoProyecto($ProjectName, $LeaderId, $ProjectDesc, $ImgLink)
	 {
	 	$con = ConnectDB::conDBConnection();

	 	$query = "Call SP_CreateTeam('$ProjectName', '$LeaderId', '$ProjectDesc', '$ImgLink')";
	 	$resulti = mysqli_query($con, $query);
		
	 	/*if($resulti)
	 		echo 'Data inserted successfully';*/
	 	

	 	@mysqli_close($link);
	 }
}

?>

