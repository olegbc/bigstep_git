<?php
	require "db.php";
	header('Content-Type: text/html; charset=utf-8');	
	
	$arr_dates = array();
	$arr_bad_days = array();
	$t=0;
	$num=0;
	$all_queries_num = 21;
	$repeats = 1120;
	if(isset($_POST["level_start"]) and $_POST["level_start"]!="" and
		isset($_POST["timetable"]) and $_POST["timetable"]!="" and
		isset($_POST["teacher"]) and $_POST["teacher"]!=""){
		
		$level_start = $_POST["level_start"];
		$timetable = $_POST["timetable"];
		$teacher = $_POST["teacher"];
		
		$start = strtotime($level_start);
			
		if($timetable == "ПУ" or $timetable == "ПД" or $timetable == "ПВ"){
			$first_week_lesson=1;
			$second_week_lesson=3;
			$third_week_lesson=5;
		}	
		if($timetable == "ВУ" or $timetable == "ВД" or $timetable == "ВВ"){
			$first_week_lesson=2;
			$second_week_lesson=4;
			$third_week_lesson=6;
		}
		$sql = "SELECT `bad_day` FROM `bad_days` WHERE `teacher`='".$teacher."' AND `timetable`='".$timetable."' AND `level_start`='".$level_start."'";
		$result = mysql_query($sql) or die(mysql_error());
		$p = 0;
		while($row=mysql_fetch_row($result)){
			$arr_bad_days[$p] = $row[0];
			$p++;
		}

		while($repeats-- and $all_queries_num >0){
			$denied = 0;
			$day_of_week = date("N",$start + (86400*$t));
			for($i=0;$i<count($arr_bad_days);$i++){
				if(date("Y-m-d",($start + (86400*$t))) == $arr_bad_days[$i]){$denied = 1;}
			}
			if($day_of_week == $first_week_lesson or $day_of_week == $second_week_lesson or $day_of_week == $third_week_lesson){
				if($denied==0){
					$arr_dates[$num] = $start + (86400*$t);
					$arr_dates_day[$num] = date("Y-m-d",$start + (86400*$t));
					$all_queries_num--;
					$num++;
				}
			}
			$t++;	
		}

		for($e=0;$e<count($arr_dates);$e++){
			$sql="UPDATE `levels` SET `sd_".($e+1)."`='".date("Y-m-d",$arr_dates[$e])."' WHERE `teacher`='".$teacher."' AND `timetable`='".$timetable."' AND `sd_1`='".$level_start."'";
			$result = mysql_query($sql) or die(mysql_error());
		}
	}
