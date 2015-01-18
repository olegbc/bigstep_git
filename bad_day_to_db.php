<?php	
	require "db.php";
	
//	var_dump($_POST);
	header('Content-Type: text/html; charset=utf-8');

	if(isset($_POST["teacher"]) and $_POST["teacher"]!="" 
		and isset($_POST["timetable"]) and $_POST["timetable"]!=""
		and isset($_POST["level_start"])and $_POST["level_start"]!=""
		and isset($_POST["badDayClicked"]) and $_POST["badDayClicked"]!=""){
			$teacher = $_POST["teacher"];
			$timetable = $_POST["timetable"];
			$level_start = $_POST["level_start"];
			$badDayClicked = $_POST["badDayClicked"];
		
			$sql = "SELECT `bad_day` FROM `bad_days` WHERE `teacher`='".$teacher."' AND `timetable`='".$timetable."' AND `level_start`='".$level_start."' AND `bad_day`='".$badDayClicked."'";
				// echo $sql.PHP_EOL;
			$result = mysql_query($sql) or die(mysql_error());
			if(mysql_num_rows($result)){
				$sql = "DELETE FROM `bad_days` WHERE `teacher`='".$teacher."' AND `timetable`='".$timetable."' AND `level_start`='".$level_start."' AND `bad_day`='".$badDayClicked."'";
				// echo $sql.PHP_EOL;
				$result = mysql_query($sql) or die(mysql_error());
			}else{
				$sql = "INSERT INTO `bad_days` (`bad_day`,`teacher`,`timetable`,`level_start`) VALUES ('".$badDayClicked."','".$teacher."','".$timetable."','".$level_start."')";
				// echo $sql.PHP_EOL;
				$result = mysql_query($sql) or die(mysql_error());
			}

	}