$(document).ready(function(){
	$('.fio_links').each(function(){
		var before = $(this).attr('href');
		var after = location.origin + before;
	});

	$('#search_fio').keyup(function(){
		var text = $(this).val();
		// var match = 0;
		$('tr').prop('hidden',true);
		$('.fio_links').each(function(){
			var text2 = $(this).text();
			var re=new RegExp (text,"i");
			var matchstr = text2.match(re);
			console.log(matchstr);
			if(matchstr){
				var parents = $(this).parents('tr').attr('class');
				parents = "."+parents;
				console.log(parents);
				$('tr:first').prop('hidden',false);
				$(parents).prop('hidden',false);
				// match = 1;
			}
		});
	});

	if(location.pathname == "/bigstep/level_culculation.php"){
		$("#level_start_date" ).datepicker({
			showOn: "button",
			buttonImage: "images/calendar.gif",
			buttonImageOnly: true,
			buttonText: "Select date",
			dateFormat: "yy-mm-dd",
			firstDay: 1,
		});
	}

	$('.btn_main').click(function(){
		var path = "/bigstep";
		var direct = location.origin + path;
		location.href = direct;
	});
	$('.btn_attendance_table').click(function(){
		var path = "/bigstep/attendance_table_blocks.php";
		var direct = location.origin + path;
		location.href = direct;
	});
	$('.btn_level_culculation').click(function(){
		var path = "/bigstep/level_culculation.php";
		var direct = location.origin + path;
		location.href = direct;
	});
	$('.btn_number_of_students').click(function(){
		var path = "/bigstep/Number_of_students.php";
		var direct = location.origin + path;
		location.href = direct;
	});
	$('.btn_amount_of_money').click(function(){
		var path = "/bigstep/amount_of_money.php";
		var direct = location.origin + path;
		location.href = direct;
	});
	$('.btn_edit_levels').click(function(){
		var path = "/bigstep/level_culculation.php";
		var direct = location.origin + path;
		location.href = direct;
	});
	$('.btn_bad_days').click(function(){
		var path = "/bigstep/bad_days.php";
		var direct = location.origin + path;
		location.href = direct;
	});
	$('.btn_freeze_table').click(function(){
		// function getParameterByName(name) {
		// 	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		// 	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		// 	results = regex.exec(location.search);
		// 	return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
		// }
		var person = getParameterByName('person');
		var path = "/bigstep/freeze_table.php?person="+person;
		var direct = location.origin + path;
		location.href = direct;

	});

	// teacher_calculate();
	// timetable_calculate();
	$('#guess_check').click(function(){
		guess_check();
	});
	

	$('.back_gray').click(function(){$(this).hide();$('.add_form').hide();});
	$('.cancel_btn').click(function(){$('.back_gray').hide();$('.add_form').hide();});
	$('.close_cross').click(function(){
		$('.back_gray').hide();
		$('.add_form').hide();
		$('.take_form').hide();
		$('.visit_form').hide();
		$('.level_person_form').hide();
		});
	$('.back_gray').click(function(){
		$('.back_gray').hide();
		$('.add_form').hide();
		$('.take_form').hide();
		$('.visit_form').hide();
		$('.level_person_form').hide();
		});

	$('.btn_add').click(
		function (){
			$('.add_form').show();
			$('.back_gray').show();
			$("#add_form")[0].reset();
		}
	);



	

});
/*------------------- /ready -----------------*/

function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	results = regex.exec(location.search);
	return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function add_fn() {
	var msg   = $('#add_form').serialize();
	$.ajax({
		type: 'POST',
		url: 'saveorder.php',
		data: msg,
		success: function(data) {
		//	console.log(data);
			if(data=="bad"){
				alert("Студент с таким именем и фамилией уже зарегестрирован");
			}else{
				$('.add_form').hide();
				$(".main_table").children('tbody').children('tr:last-child ').after(data);
				alert("Студент зарегестрирован");
				$('.back_gray').hide();
			}
		},
		error:  function(xhr, str){
			alert('Возникла ошибка: ' + xhr.responseCode);
		}
	});
}	

function payment_add() {
	var msg   = $('#payment_form').serialize();
		$.ajax({
			type: 'POST',
			url: 'saveorder.php',
			data: msg,
			success: function(data) {
				console.log(data);
			/*
				$(".main_table").children('tbody').children('tr:last-child ').after(data);
				alert("Запись добавлена");
			*/
				$('.add_form').hide();
				$('.back_gray').hide();
				
		},
		error:  function(xhr, str){
			alert('Возникла ошибка: ' + xhr.responseCode);
		}
	});
}

function call2(info,id,info_type){
	var info = info;
	var id = id;
	var info_type = info_type;
		$.ajax({
			type: 'POST',
			url: 'edit.php',
			data: 'info='+info+'&id='+id+'&info_type='+info_type,
			success: function(data) {
			//	alert( data );
				$('.id_'+id+':input[name="'+info_type+'"]').val(data);
			},
			error:  function(xhr, str){
				alert('Возникла ошибка: ' + xhr.responseCode);
			}
		});		
}

function lpupdate(info,id,info_type){
	var info = info;
	var id = id;
	var info_type = info_type;
		$.ajax({
			type: 'POST',
			url: 'lgttedit.php',
			data: 'info='+info+'&id='+id+'&info_type='+info_type,
			success: function(data) {
			//	alert( data );
				$('.id_'+id+':input[name="'+info_type+'"]').val(data);
			},
			error:  function(xhr, str){
				alert('Возникла ошибка: ' + xhr.responseCode);
			}
		});		
}

function del(id,fio){
	if(confirm('Вы действительно хотите удалить '+fio+' из базы учеников?')){
		var id = id;
		$.ajax({
			type: 'POST',
			url: 'del.php',
			data: 'id='+id,
			success: function(data) {
			//	alert( data );
				$( ".tr_"+data ).remove();
				alert( "Запись удалена" );
			},
			error:  function(xhr, str){
				alert('Возникла ошибка: ' + xhr.responseCode);
			}
		});
	}
}

function remove_pers_soch(id,fio,tr){
	// console.log(id,fio,tr);
	var r = $(".brick[style*='blue']").children('[name="teacher_choose"]').val();
	var t = $(".brick[style*='blue']").children('[name="timetable_choose"]').val();
	var u = $(".brick[style*='blue']").children('[name="level_start_choose"]').val();
	// return false;
	if(confirm('Вы действительно хотите удалить '+fio+' из данного сочетания?')){
		var id = id;
		$.ajax({
			type: 'POST',
			url: 'remove_pers_soch.php',
			data: {id:id,teacher:r,timetable:t,level_start:u},
			success: function(data) {
				$("#tr"+tr).remove();
			},
			error:  function(xhr, str){
				alert('Возникла ошибка: ' + xhr.responseCode);
			}
		});
	}
}

function take(id){		
	var id = id;
	$.ajax({
		type: 'POST',
		url: 'take.php',
		data: 'id='+id,
		dataType: 'json',
		success: function(data) {
		//	alert( data );
			// var sp = data.split('|');
			$('#fio_take').val(data[0]);
			for(i=1;i<data.length;i++){
				// $('#teacher_take').append("<option value="+data[i][0]+"|"+data[i][1]+"|"+data[i][2]+"|">data[i][0]+"|"+data[i][1]+"|"+data[i][2]+"|</option>");
				$('#combination_take').append("<option value="+data[i][0]+"|"+data[i][1]+"|"+data[i][2]+">"+data[i][0]+", "+data[i][1]+", "+data[i][2]+"</option>");
				// $('#timetable_take').append("<option value="+data[i][1]+">"+data[i][1]+"</option>");
				// $('#level_start_take').append("<option value="+data[i][2]+">"+data[i][2]+"</option>");
			}
			// $('#timetable_take').val(sp[2]);
			// $('#level_start_take').val(sp[3]);
			$('#id_take').val(id);
		//	alert( "Запись удалена" );
		},
		error:  function(xhr, str){
			alert('Возникла ошибка: ' + xhr.responseCode);
		}
	});			
}	
function lgtt(id){		
	var id = id;
	if($('.timetable_soch')){$('.timetable_soch').remove();}
	if($('.level_start_soch')){$('.level_start_soch').remove();}
	if($('.level_soch')){$('.level_soch').remove();}
	if($('.person_start_soch')){$('.person_start_soch').remove();}
	if($('.person_stop_soch')){$('.person_stop_soch').remove();}
	$.ajax({
		type: 'POST',
		url: 'lgtt.php',
		data: 'id='+id,
		success: function(data) {
			$('#fio_person').val(data);
			$('#id_person').val(id);
		},
		error:  function(xhr, str){
			alert('Возникла ошибка: ' + xhr.responseCode);
		}
	});			
}

function takedown(){
	$('.take_form').show();
	$('.back_gray').show();
	$("#take_to_bd_form")[0].reset();
}	

function takedown2(){
	$('.visit_form').show();
	$('.back_gray').show();
	$("#visit_form")[0].reset();
}

function takedown3(){
	$('.level_person_form').show();
	$('.back_gray').show();
	$("#level_person_form")[0].reset();
}

function taketobd(){	
	var msg   = $('#take_to_bd_form').serialize();
	// console.log( msg );
		$.ajax({
			type: 'POST',
			url: 'take_to_bd.php',
			data: msg,
			success: function(data) {
				console.log(data);
				$('.take_form').hide();
				$('.back_gray').hide();
				$("#take_to_bd_form")[0].reset();
				
				var sp = data.split('|');
				$(".payment_table").children('tbody').children('tr:first-child ').after("<td><input type='text' name='id' value='"+sp[3]+"'></td><td><input type='text' name='fio_id' size='45' onblur='call2(this.value,<?php echo $row[0]; ?>,'fio_id')' class='id_<?php echo $row[0]; ?>'  value='"+sp[2]+"'></td><td><input type='text' name='given' size='5' onchange='call2(this.value,<?php echo $row[0]; ?>,'given')' class='id_<?php echo $row[0]; ?>'  value='"+sp[0]+"'></td><td>"+sp[4]+"</td>");
				// if(data!=""){$('.back_gray').show();alert( "принято:"+sp[0]+" грн \nот: "+sp[1]+" \nобучающегося на сочетании: "+sp[4]+","+sp[5]+","+sp[6]);$('.back_gray').hide();}					
				if(data!=""){$('.back_gray').show();alert( "принято:"+sp[0]+" грн \nот: "+sp[1]+" \n");$('.back_gray').hide();}					
				// balance_maker();
		},
		error:  function(xhr, str){
			alert('Возникла ошибка: ' + xhr.responseCode);
		}
	});
	
}

function dateofvisit(id){		
	var id = id;
	$.ajax({
		type: 'POST',
		url: 'dateofvisit.php',
		data: 'id='+id,
		dataType: 'json',
		success: function(data) {
			//	console.log( data );
			$('#fio_visit').val(data[0]);
			$('#person_start').val(data[1]);
			$('#id_visit').val(id);
		},
		error:  function(xhr, str){
			alert('Возникла ошибка: ' + xhr.responseCode);
		}
	});			
}

function dateofvisittobd(){	
	var msg   = $('#visit_form').serialize();
		$.ajax({
			type: 'POST',
			url: 'date_of_visit_to_bd.php',
			data: msg,
			success: function(data) {
					console.log( data );
			
				$('.visit_form').hide();
				$('.back_gray').hide();
				$("#visit_form")[0].reset();
				
							
				var sp = data.split('|');
				if(sp[5]==3){alert("Вы ввели дату ранее чем дата начала курса для студента "+sp[1]);}else{
					if(data!="" && sp[5]!=0){
						$(".visit_table").children('tbody').children('tr:last-child ').after("<td><input type='text' name='id' value='"+sp[3]+"'></td><td><input type='text' name='fio_id' size='45' onblur='call2(this.value,<?php echo $row[0]; ?>,'fio_id')' class='id_<?php echo $row[0]; ?>'  value='"+sp[2]+"'></td><td><input type='text' name='given' size='7' onchange='call2(this.value,<?php echo $row[0]; ?>,'given')' class='id_<?php echo $row[0]; ?>' value='"+sp[0]+"'></td>");
						$('.back_gray').show();alert( sp[1]+" посетил занятие: "+sp[0]);$('.back_gray').hide();}
					if(sp[5]==0){alert("данное посещение уже отмечено");}				
				}				
				
		},
		error:  function(xhr, str){
			alert('Возникла ошибка: ' + xhr.responseCode);
		}
	});
	
}

function lgtttodb(){	
	var msg   = $('#level_person_form').serialize();
	// console.log(msg);
		$.ajax({
			type: 'POST',
			url: 'lgtttodb.php',
			data: msg,
			success: function(data) {
				//	console.log( data );
			
				$('.level_person_form').hide();
				$('.back_gray').hide();
				$("#level_person_form")[0].reset();
				
							
				var sp = data.split('|');
				$(".lp_table").children('tbody').children('tr:last-child ').after("<td><input type='text' name='id' value='"+sp[3]+"'></td><td><input type='text' name='id_person' size='45' onblur='lpupdate(this.value,<?php echo $row[0]; ?>,'id_person')' class='id_<?php echo $row[0]; ?>'  value='"+sp[2]+"'></td><td><input type='text' name='level' size='5' onchange='lpupdate(this.value,<?php echo $row[0]; ?>,'level')' class='id_<?php echo $row[0]; ?>'  value='"+sp[0]+"'></td><td><input type='text' name='group' size='5' onchange='lpupdate(this.value,<?php echo $row[0]; ?>,'group')' class='id_<?php echo $row[0]; ?>'  value='"+sp[6]+"'></td><td><input type='text' name='timetable' size='5' onchange='lpupdate(this.value,<?php echo $row[0]; ?>,'timetable')' class='id_<?php echo $row[0]; ?>'  value='"+sp[7]+"'></td><td><input type='text' name='start' size='7' onchange='lpupdate(this.value,<?php echo $row[0]; ?>,'start')' class='id_<?php echo $row[0]; ?>'  value='"+sp[8]+"'></td>");
				if(data!=""){$('.back_gray').show();alert( "Для "+sp[1]+" создан уровень: "+sp[0]);$('.back_gray').hide();} 
								
				
		},
		error:  function(xhr, str){
			alert('Возникла ошибка: ' + xhr.responseCode);
		}
	});
	
}

function lgtt_match_fn2(){	
	//	alert("fghj");
	var obj = {
		a: 12,
		b: 'olololo',
		name: 'Victor'
	};
	var k = obj.a;
	//	alert(obj.name);
	var obj = {
		a: 12,
		b: 'olololo',
		name: 'Victor',
		z: {
			satan: 666
		}
	};
	alert(obj.z.satan);
}

function dump(obj) {
	var out = "";
	if(obj && typeof(obj) == "object"){
		for (var i in obj) {
			out += obj[i] + "\n";
		}
	} else {
		out = obj;
	}
	alert(out);
}	

function dump_vloj(obj) {
	var out = "";
	if(obj && typeof(obj) == "object"){
		for (var i in obj) {
			for (var j in obj[i]) {
		
				out += i + ":" + obj[i][j] + "\n";
			//	out += obj[i][j] + "\n";
			
			}
		}
	} else {
		out = obj;
	}
	alert(out);
}
function submit_enable(){
//	$('#lgtt_form input:submit').attr("disabled", false);
}

var first_time = 0;

//ПОСТРОЕНИЕ ТАБЛИЦЫ
	function building_blocks(teacher_now,timetable_now,level_start_now){
		if(teacher_now && timetable_now && level_start_now){
			// console.log(teacher_now,timetable_now,level_start_now);
		}
		$.ajax({
			type: 'POST',
			async: false,
			url: 'building_blocks.php',
			dataType: 'json',
			success: function(data) {
				for(var i in data){
					// console.log(data[i][4]);
					
					if(data[i][4]== null){
						
						var teacher_remove = "'"+data[i][0]+"'";
						var timetable_remove = "'"+data[i][1]+"'";
						var level_start_remove = "'"+data[i][2]+"'";
						$('.peresent_combinations').append('<div class="brick"><div class="remove_combination remove_combination_'+i+'"><button class="btn_remove_combination" onclick="remove_combination('+teacher_remove+','+timetable_remove+','+level_start_remove+')" disabled>x</button></div><input class="brick_input" type="text" name="teacher_choose" id="teacher_choose_'+i+'" disabled /><input class="brick_input" type="text" name="timetable_choose" id="timetable_choose_'+i+'" disabled /><input class="brick_input" type="text" name="level_start_choose" id="level_start_choose_'+i+'" disabled /><input class="brick_input" type="text" name="level_choose" id="level_choose_'+i+'" disabled /></div>')
						$('#teacher_choose_'+i).val(data[i][0]);
						$('#timetable_choose_'+i).val(data[i][1]);
						$('#level_start_choose_'+i).val(data[i][2]);
						$('#level_choose_'+i).val(data[i][3]);
						// console.log(is);
					}
					if(data[i][4]== null){
						var is = [];
						$.ajax({
							type:'POST',
							async: false,
							url: 'is_today_within_combination.php',
							dataType: 'json',
							data: {teacher:data[i][0],timetable:data[i][1],level_start:data[i][2]},
							success: function(data){
								is[i] = data;
							},
							error:  function(xhr, str){
								alert('Возникла ошибка: ' + xhr.responseCode);
							}
						});
						// console.log(i);
					}
					if(data[i][4]== 0 ){
						var teacher_remove = "'"+data[i][0]+"'";
						var timetable_remove = "'"+data[i][1]+"'";
						var level_start_remove = "'"+data[i][2]+"'";
						$('.peresent_combinations').append('<div class="brick"><div class="remove_combination remove_combination_'+i+'"><button class="btn_remove_combination" onclick="remove_combination('+teacher_remove+','+timetable_remove+','+level_start_remove+')" disabled>x</button></div><input class="brick_input" type="text" name="teacher_choose" id="teacher_choose_'+i+'" disabled /><input class="brick_input" type="text" name="timetable_choose" id="timetable_choose_'+i+'" disabled /><input class="brick_input" type="text" name="level_start_choose" id="level_start_choose_'+i+'" disabled /><input class="brick_input" type="text" name="level_choose" id="level_choose_'+i+'" disabled /></div>')
						$('#teacher_choose_'+i).val(data[i][0]);
						$('#timetable_choose_'+i).val(data[i][1]);
						$('#level_start_choose_'+i).val(data[i][2]);
						$('#level_choose_'+i).val(data[i][3]);
					}
					// console.log(data[i][4]=-1));
					if(data[i][4]==-1 ){ 
						var teacher_remove = "'"+data[i][0]+"'";
						var timetable_remove = "'"+data[i][1]+"'";
						var level_start_remove = "'"+data[i][2]+"'";
						$('.past_combinations').append('<div class="brick"><input class="brick_input" type="text" name="teacher_choose" id="teacher_choose_'+i+'" disabled /><input class="brick_input" type="text" name="timetable_choose" id="timetable_choose_'+i+'" disabled /><input class="brick_input" type="text" name="level_start_choose" id="level_start_choose_'+i+'" disabled /><input class="brick_input" type="text" name="level_choose" id="level_choose_'+i+'" disabled /></div>')
						$('#teacher_choose_'+i).val(data[i][0]);
						$('#timetable_choose_'+i).val(data[i][1]);
						$('#level_start_choose_'+i).val(data[i][2]);
						$('#level_choose_'+i).val(data[i][3]);
					}
					if(data[i][4]==1 ){ 
						var teacher_remove = "'"+data[i][0]+"'";
						var timetable_remove = "'"+data[i][1]+"'";
						var level_start_remove = "'"+data[i][2]+"'";
						$('.future_combinations').append('<div class="brick"><input class="brick_input" type="text" name="teacher_choose" id="teacher_choose_'+i+'" disabled /><input class="brick_input" type="text" name="timetable_choose" id="timetable_choose_'+i+'" disabled /><input class="brick_input" type="text" name="level_start_choose" id="level_start_choose_'+i+'" disabled /><input class="brick_input" type="text" name="level_choose" id="level_choose_'+i+'" disabled /></div>')
						$('#teacher_choose_'+i).val(data[i][0]);
						$('#timetable_choose_'+i).val(data[i][1]);
						$('#level_start_choose_'+i).val(data[i][2]);
						$('#level_choose_'+i).val(data[i][3]);
					}
				}
			},
			error: function(xhr, str){
				alert('Возникла ошибка: ' + xhr.responseCode);
			}
		});
		$('.combination_all .past_combinations .brick').click(function(){
			$('.brick').css('borderColor','#000');
			var teacher_choose = $(this).children("input[name='teacher_choose']").val();
			var timetable_choose = $(this).children("input[name='timetable_choose']").val();
			var level_start_choose = $(this).children("input[name='level_start_choose']").val();
			$('#lgtt_form').children("input[name='teacher_choose']").val(teacher_choose);
			$('#lgtt_form').children("input[name='timetable_choose']").val(timetable_choose);
			$('#lgtt_form').children("input[name='level_start_choose']").val(level_start_choose);
			lgtt_match_fn(teacher_choose,timetable_choose,level_start_choose);
			$(this).css('borderColor','blue');
			$('.change_start_date').prop('disabled',true);
			$('.btn_send_to_archive').prop('disabled',true);
		});
		$('.combination_all .peresent_combinations .brick').click(function(){
			$('.brick').css('borderColor','#000');
			var teacher_choose = $(this).children("input[name='teacher_choose']").val();
			var timetable_choose = $(this).children("input[name='timetable_choose']").val();
			var level_start_choose = $(this).children("input[name='level_start_choose']").val();
			$('#lgtt_form').children("input[name='teacher_choose']").val(teacher_choose);
			$('#lgtt_form').children("input[name='timetable_choose']").val(timetable_choose);
			$('#lgtt_form').children("input[name='level_start_choose']").val(level_start_choose);
			lgtt_match_fn(teacher_choose,timetable_choose,level_start_choose);
			$(this).css('borderColor','blue');
		});
		$('.combination_all .future_combinations .brick').click(function(){
			$('.brick').css('borderColor','#000');
			var teacher_choose = $(this).children("input[name='teacher_choose']").val();
			var timetable_choose = $(this).children("input[name='timetable_choose']").val();
			var level_start_choose = $(this).children("input[name='level_start_choose']").val();
			$('#lgtt_form').children("input[name='teacher_choose']").val(teacher_choose);
			$('#lgtt_form').children("input[name='timetable_choose']").val(timetable_choose);
			$('#lgtt_form').children("input[name='level_start_choose']").val(level_start_choose);
			lgtt_match_fn(teacher_choose,timetable_choose,level_start_choose);
			$(this).css('borderColor','blue');
			$('.btn_send_to_archive').prop('disabled',true);
		});
		$('.brick').each(function(){
			if($(this).children("input[name='teacher_choose']").val()==teacher_now && $(this).children("input[name='timetable_choose']").val()==timetable_now && $(this).children("input[name='level_start_choose']").val()==level_start_now){
				$(this).css('borderColor','rgb(0, 0, 255)');
			}
		});
}

	function lgtt_match_fn(r,t,u){
		// построение блоков сочетаний
		var msg;
		var teacher_choose = r;
		var timetable_choose = t;
		var level_start_choose = u;
		// console.log(teacher_choose,timetable_choose,level_start_choose);
		if(r!=undefined && t!=undefined && u!=undefined){
			msg = {teacher_choose:teacher_choose,timetable_choose:timetable_choose,level_start_choose:level_start_choose};
		}else{
			msg = $('#lgtt_form').serialize();
		}
		// console.log(msg);
		var level_date = [] ;
		var person_date = [] ;
		var personus_fio = [] ;			
			
			//----- Построение шапки таблицы ;
		$('#attendance_table').empty();
		$('#attendance_table').html('<tbody><tr id="th_line"><th class="attendance_name_th" id="name_th"><div id="attendance_table_name">Имя</div></th></tr></tbody>');
		
			$.ajax({
				type: 'POST',
				async: false,
				url: 'lgtt_match_level_dates.php',
				dataType: 'json',
				data: msg,
				// data: {teacher:teacher,timetable:timetable,start:start},
				success: function(data) {
					// console.log(data);						
					for(var i=24;i>=4;i--){
						$('#name_th').after("<th class='attendance_th'><div class='rotateText'>"+data[i]+"</div></th>");
						level_date[(i-4)]=data[i];							
					}							
				},
				error: function(xhr, str){
					alert('Возникла ошибка: ' + xhr.responseCode);
				}
			});
			
			//----- /Построение шапки таблицы 
			
			//----- Фамилии даты 
			
			$.ajax({
				type: 'POST',
				async: false,
				url: 'lgtt_match.php',
				dataType: 'json',
				data: msg,
				success: function(data) {
					// console.log(data);
					$('.btn_remove_combination').prop('disabled',true);
					if(data == ""){$('.brick').children("input[value='"+r+"']").siblings("input[value='"+t+"']").siblings("input[value='"+u+"']").parent('.brick').children('.remove_combination').children('.btn_remove_combination').prop('disabled',false);}
					// return false;
					// /*
					var y =0;
					var w =0;
					var p =0;
					var e =0;
					var color = 0;
					var match = 0;
					var arr_id = [];
					$('#th_line').after("<tr id='tr"+y+"'></tr>");
					var flag = 0;
					var freeze_dates_arr = Array();
					var number_of_id = 0;
					var payed_all = 1;
					for (var i in data) {
						// freeze_dates_arr[number_of_id] = data[i];
						// number_of_id++;
						// console.log(data[i]);
						// console.log(data[i]['num_payed']);
						$('#tr'+y).after("<tr id='tr"+(y+1)+"'></tr>");
						var split_id = i.split('|');
							// console.log(split_id);
						var ref_id = "'"+split_id[1]+"'";
						var ref_fio = "'"+split_id[0]+"'";
						var ref_tr = "'"+y+"'";
						var ref_num_payed = "'"+data[i]['num_payed']+"'";
						var ref_num_reserved = "'"+data[i]['num_reserved']+"'";
						// var num_payed = "'"+split_id[0]+"'";
						if(parseInt(data[i]['num_payed'])==parseInt(data[i]['num_reserved'])){
							$('#tr'+y).html('<td id="td'+y+'_'+(w+1)+'"><div class="remove_pers_soch"><button  onclick="remove_pers_soch('+ref_id+','+ref_fio+','+ref_tr+')">x</button></div><div class="pay_check pay_check_green">'+data[i]['num_payed']+'/'+data[i]['num_reserved']+'</div><div class="fio_pers_soch">'+split_id[0]+'</div></td>');
						}else{
							$('#tr'+y).html('<td id="td'+y+'_'+(w+1)+'"><div class="remove_pers_soch"><button  onclick="remove_pers_soch('+ref_id+','+ref_fio+','+ref_tr+')">x</button></div><div class="pay_check">'+data[i]['num_payed']+'/'+data[i]['num_reserved']+'</div><div class="fio_pers_soch">'+split_id[0]+'</div></td>');
								payed_all=0;
						}
						if(data[i]['status']==-1){$('.remove_pers_soch button').remove();}
						arr_id[y] = split_id[1];
					
						for(var q=0;q<21;q++){
							color = 0;
							color_freeze = 0;
							start_date = 0;
							stop_date = 0;
							before_person_start = 1;
							after_person_stop = 0;
							w++;
								
							for(var c in data[i]['dates']){
								if(level_date[q]  == data[i]['dates'][c]){
									match = data[i]['dates'][c];
									color = 1;
								}					
								else{
									match = level_date[q];
								}
								if(level_date[q] < split_id[2]){
									before_person_start = 1;
								}else if(level_date[q] >= split_id[2]){
									before_person_start = 0;
								}
								if(level_date[q] > split_id[3]){
									after_person_stop = 1;
								}else if(level_date[q] <= split_id[3]){
									after_person_stop = 0;
								}
								
							}	
							if(data[i]['freeze'] != null){
								for(var c in data[i]['freeze']){
									if(level_date[q]  == data[i]['freeze'][c]){
										color_freeze = 1;
										// console.log(color_freeze);
									}
								}
							}
							if(level_date[q]  == split_id[2]){
								start_date = 1;
							}
							if(level_date[q] === split_id[3]){
								stop_date = 1;
							}
							var trata = color+" | "+color_freeze+" | "+start_date+" | "+stop_date+" | "+before_person_start+" | "+after_person_stop;
							// var trata = color;
							// console.log(trata);
							
							if(color == 1 && start_date == 0 && stop_date === 0  && before_person_start == 1){
								$('#td'+y+'_'+w).after("<td  id='td"+y+"_"+(w+1)+"' class='attendence_mark before_person_start_mark color'>"+match+"</td>");
								//	before_person_start_mark
							}else if(color == 1 && start_date == 0 && stop_date === 0 && before_person_start == 0){
								$('#td'+y+'_'+w).after("<td  id='td"+y+"_"+(w+1)+"' class='attendence_mark color'>"+match+"</td>");
							}else if(color == 1 && start_date == 0  && stop_date === 0 && before_person_start == 0 && after_person_stop == 1){
								$('#td'+y+'_'+w).after("<td  id='td"+y+"_"+(w+1)+"' class='attendence_mark before_person_start_mark color'>"+match+"</td>");
								//	before_person_start_mark
							}else if(color == 1 && start_date == 0 && stop_date === 0 && after_person_stop == 0){
								$('#td'+y+'_'+w).after("<td  id='td"+y+"_"+(w+1)+"' class='attendence_mark color'>"+match+"</td>");
							}else if(color == 1 && start_date == 1){
								// console.log(color, start_date);
								$('#td'+y+'_'+w).after("<td  bordercolor='#0000FF' id='td"+y+"_"+(w+1)+"' class='attendence_mark person_start_mark color'>"+match+"</td>");
							}else if(color == 0 && start_date == 1 && color_freeze == 0){
								// console.log(color, start_date);
								$('#td'+y+'_'+w).after("<td id='td"+y+"_"+(w+1)+"' class='attendence_mark person_start_mark'>"+match+"</td>");
							} 
							// color_freeze
							else if(color_freeze == 1 && start_date == 0 && stop_date === 0  && before_person_start == 1){
								$('#td'+y+'_'+w).after("<td  id='td"+y+"_"+(w+1)+"' class='attendence_mark before_person_start_mark color_freeze'>"+match+"</td>");
								//	before_person_start_mark
							}else if(color_freeze == 1 && start_date == 0 && stop_date === 0 && before_person_start == 0){
								$('#td'+y+'_'+w).after("<td  id='td"+y+"_"+(w+1)+"' class='attendence_mark color_freeze'>"+match+"</td>");
							}else if(color_freeze == 1 && start_date == 0  && stop_date === 0 && before_person_start == 0 && after_person_stop == 1){
								$('#td'+y+'_'+w).after("<td  id='td"+y+"_"+(w+1)+"' class='attendence_mark before_person_start_mark color_freeze'>"+match+"</td>");
								//	before_person_start_mark
							}else if(color_freeze == 1 && start_date == 0 && stop_date === 0 && after_person_stop == 0){
								$('#td'+y+'_'+w).after("<td  id='td"+y+"_"+(w+1)+"' class='attendence_mark color_freeze'>"+match+"</td>");
							}else if(color_freeze == 1 && start_date == 1){
								// console.log(color_freeze, start_date);
								$('#td'+y+'_'+w).after("<td  bordercolor='#0000FF' id='td"+y+"_"+(w+1)+"' class='attendence_mark person_start_mark color_freeze'>"+match+"</td>");
							}else if(color_freeze == 1 && stop_date == 1){
								$('#td'+y+'_'+w).after("<td  bordercolor='#0000FF' id='td"+y+"_"+(w+1)+"' class='attendence_mark person_stop_mark color_freeze'>"+match+"</td>");
							}
							// /color_freeze
							else if(color == 1 && stop_date == 1){
								// console.log(color, stop_date);
								$('#td'+y+'_'+w).after("<td  bordercolor='#0000FF' id='td"+y+"_"+(w+1)+"' class='attendence_mark person_stop_mark color'>"+match+"</td>");
							}
							else if(color == 0 && stop_date == 1){
								$('#td'+y+'_'+w).after("<td id='td"+y+"_"+(w+1)+"' class='attendence_mark person_stop_mark'>"+match+"</td>");
							}
							else if(color == 0 && before_person_start == 1){
								$('#td'+y+'_'+w).after("<td id='td"+y+"_"+(w+1)+"' class='attendence_mark before_person_start_mark'>"+match+"</td>");
								//	before_person_start_mark
							}
							else if(color == 0 && after_person_stop == 0 && before_person_start == 0){
								$('#td'+y+'_'+w).after("<td id='td"+y+"_"+(w+1)+"' class='attendence_mark'>"+match+"</td>");
							}
							else if(color == 0 && after_person_stop == 1){
								$('#td'+y+'_'+w).after("<td id='td"+y+"_"+(w+1)+"' class='attendence_mark before_person_start_mark'>"+match+"</td>");
								//	before_person_start_mark
							}
							else if(color == 0 && after_person_stop == 0){
								$('#td'+y+'_'+w).after("<td id='td"+y+"_"+(w+1)+"' class='attendence_mark'>"+match+"</td>");
							}
							// console.log(y);

							// var tyu = oiu.replace('td'+y+'_', '');
							// var start_point = $('td[id^=td'+y+'_].person_start_mark').attr('id').replace('td'+y+'_', ''));
								// console.log($('td[id^=td'+y+'_].person_start_mark').attr('id').replace('td'+y+'_', ''));
							// console.log($('td[id^=td'+y+'_].person_start_mark').attr('id').replace('td'+y+'_', ''));
							// for (var i = data[y]['lessons_num'][3] - 1; i >= 0; i--) {
							// 	// $('#td'+y+'_'+w).css('color','rgb(255, 20, 255)');
							// };
						}
						y++;
					}
					//		Проверка оплачен ли урок (полностью или частично)
					function pay(){
						var t = 0;
						for (var i in data) {
							var start_point = $('td[id^=td'+t+'_].person_start_mark').attr('id');
							// console.log("start_point 1 : "+start_point);
							start_point = parseInt(start_point.replace('td'+t+'_', ''));
							// console.log("start_point 2 : "+start_point);
							// alert(i);
							var flag = 0;
							for(var y = 0; y <= data[i]['lessons_num'][3]; y++){
								// alert(y);
									if(y === 0 && y === data[i]['lessons_num'][3] && data[i]['lessons_num'][4] > 0){
										console.log('недоплата : '+data[i]['lessons_num'][4])
										$('td[id=td'+t+'_'+start_point+']').addClass('partly_payed_lesson');

									}else if(y !== 0 && y === data[i]['lessons_num'][3] && data[i]['lessons_num'][4] > 0){
										// console.log('недоплата : '+data[i]['lessons_num'][4])
										start_point = start_point + 1;
										$('td[id=td'+t+'_'+start_point+']').addClass('partly_payed_lesson');

									}else if(data[i]['lessons_num'][4] === 0){}
									else{
									if(start_point !== undefined && flag !== 1){
										// console.log(data[i]['lessons_num'][3]);
										flag = 1;
										var num_num = data[i]['lessons_num'][3];
										// console.log(num_num);+
												// $('td[id=td'+y+'_'+start_point+'].person_start_mark').css('color','rgb(255, 20, 255)');
												$('td[id=td'+t+'_'+start_point+'].person_start_mark').addClass('payed_lesson');
									}else{
										start_point = start_point + 1;
									// console.log("start_point 3 : "+start_point);
										// $('td[id=td'+y+'_'+start_point+']').css('color','rgb(255, 20, 255)');
										// $('td[id=td0_6]').delay(8000).css('color','rgb(255, 20, 255)');
										$('td[id=td'+t+'_'+start_point+']').addClass('payed_lesson');
										// alert($('td[id=td0_6]'));
									}
								}	
							}
							t++;
						}
					}

					//---- действия при клике на ячейку даты, находиться здесь так как таблицеа формируется после формирования страницы 
					$('.attendence_mark').not('.before_person_start_mark').not('.color_freeze').click(function(){
						// console.log("lllll");
						if($(this).hasClass('color')){
							if(confirm('Вы действительно хотите удалить '+$(this).text()+' дату посещения')){
								var this_thing = $(this).attr('id');
								var fio_num1 = this_thing.split("_");
								var fio_num = fio_num1[0].replace("td", "");
								var date = $(this).text();
								
								// console.log(fio_num,arr_id);
								$.ajax({
									type:'POST',
									url: 'date_of_visit_to_bd.php',
									data: {person_id:arr_id[fio_num],person_date:date,teacher:r,timetable:t,level_start:u},
									success: function(data){
										// console.log(data);
										// return false;
										// var r = $('[style="border-color: blue;"]').children('[name=teacher_choose]').val();
										// var t = $('[style="border-color: blue;"]').children('[name=timetable_choose]').val();
										// var u = $('[style="border-color: blue;"]').children('[name=level_start_choose]').val();
										lgtt_match_fn(r,t,u); 
									},
									error:  function(xhr, str){
										alert('Возникла ошибка: ' + xhr.responseCode);
									}
								});
							}
						}else{
							var this_thing = $(this).attr('id');
							var fio_num1 = this_thing.split("_");
							var fio_num = fio_num1[0].replace("td", "");
							var date = $(this).text();
							
							// console.log(fio_num,arr_id);
							$.ajax({
								type:'POST',
								url: 'date_of_visit_to_bd.php',
								data: {person_id:arr_id[fio_num],person_date:date,teacher:r,timetable:t,level_start:u},
								success: function(data){
									// console.log(data);
									// return false;
									// var r = $('[style="border-color: blue;"]').children('[name=teacher_choose]').val();
									// var t = $('[style="border-color: blue;"]').children('[name=timetable_choose]').val();
									// var u = $('[style="border-color: blue;"]').children('[name=level_start_choose]').val();
									lgtt_match_fn(r,t,u); 
								},
								error:  function(xhr, str){
									alert('Возникла ошибка: ' + xhr.responseCode);
								}
							});									
						}
					});
					
					//---- /действия при клике на ячейку даты, находиться здесь так как таблицеа формируется после формирования страницы
					//	*/
					// var is_today_within_combination = 0;
					var is = 0;
					$.ajax({
						type:'POST',
						async: false,
						url: 'is_today_within_combination.php',
						dataType: 'json',
						data: {teacher:r,timetable:t,level_start:u},
						success: function(data){
							is = data;
						},
						error:  function(xhr, str){
							alert('Возникла ошибка: ' + xhr.responseCode);
						}
					});

					var rn = "'"+r+"'";
					var tn = "'"+t+"'";
					var un = "'"+u+"'";
					$('.btn_arrangment').remove();
					$('.btn_send_to_archive').remove();

					$('.att_table').before('<div class="btn_arrangment"><input type="text" name="new_level_start" id="new_level_start"/><button class="change_start_date" onclick="change_start_date('+rn+','+tn+','+un+')">change_start_date</button></div><div class="send_to_archive_div"><button class="btn_send_to_archive" onclick="send_to_archive('+rn+','+tn+','+un+')" disabled>Отправить в архив</button></div>');

					if(location.pathname == "/bigstep/attendance_table_blocks.php"){
						// console.log($("#new_level_start" ));
						$("#new_level_start" ).datepicker({
							showOn: "button",
							buttonImage: "images/calendar.gif",
							buttonImageOnly: true,
							buttonText: "Select date",
							dateFormat: "yy-mm-dd",
							firstDay: 1,
						});
					}
					
					if($('*').hasClass('color')){$('.change_start_date').prop('disabled',true);}
					if(payed_all==1 && $('*').hasClass('fio_pers_soch') && is ==-1){$('.btn_send_to_archive').prop('disabled',false);}
					// $('.past_combinations .btn_send_to_archive').prop('disabled',true);}

				},
				error:  function(xhr, str){
					alert('Возникла ошибка ajax: ' + xhr.responseCode);
				}
				
			});
			
			/*----- /Фамилии даты -------*/
			
	//	}
}

function level_culc_fn(){
	var msg = $('#level_culc').serialize();
	if($('#level_culc input#teacher_choose')[0]['value'] != "" && 
		$('#level_culc input#timetable_choose')[0]['value'] != "" && 
		$('#level_culc input#level_start_date')[0]['value'] != "" && 
		$('#level_culc input#level_choose')[0]['value'] != ""){
		var teacher = $('#level_culc input#teacher_choose')[0]['value'];
		var timetable = $('#level_culc input#level_start_date')[0]['value'];
		var level_start = $('#level_culc input#level_choose')[0]['value'];
		$.ajax({
			type:'POST',
			url: 'calculate_level_dates.php',
			data: msg,
			success: function(data){
				console.log(data);
				if(data=="bad"){
					alert("Дата старта уровня не соответствует расписанию");
				}else{
					var path = "/bigstep/bad_days.php?teacher="+teacher+"&timetable="+timetable+"&level_start="+level_start;
					var direct = location.origin + path;
					location.href = direct;
				}
			},
			error:  function(xhr, str){
				alert('Возникла ошибка: ' + xhr.responseCode);
			}
		});
	}else{alert('Заполните все обязательные поля')}
}


function Num_of_students_fn(){
	var msg = $('#Num_of_students').serialize();
	$.ajax({
		type:'POST',
		url: 'Number_of_students_calculation.php',
		dataType: 'json',
		data: msg,
		success: function(data){
			//	console.log(data);
				for(i in data)
				{
						w = parseInt(i) + 1;
						$('.inscription_'+w).html(data[i][0]+' <br /> '+data[i][1]);
						$('.week_'+w).html(data[i][2]);
				}
			//	$('.inscription_1')
		},
		error:  function(xhr, str){
			alert('Возникла ошибка: ' + xhr.responseCode);
		}
	});
}
/*
function calendar(){
	$.ajax({
		type:
	});
}
*/
function datepicker_fn(){
	var msg = $('#widgetField span').get(0).innerHTML;
	var new_msg = msg.split(" ÷ ");
	var teacher = $('#teacher').val();
	var all_teachers= [];
	var color_arr = [];

	$.ajax({
		type:'POST',
		url: 'get_all_teachers.php',
		dataType: 'json',
		success: function(data){
			// console.log(data);
			all_teachers = data;
			for(var i in data){
				color_arr[i]="#" + Math.random().toString(16).slice(2, 8)
				// (Math.random().toString(16) + '000000').slice(2, 8) // This only uses random() once, requires no difficult maths, converts directly into hex, and accounts for the issue of lost trailing zeros.
				// The issues with Paul's method are:
				// - it does not account for leading zeros (yielding invalid results)
				// - the Math.floor() and the multiplication add unnecessary complexity

			}
		},
		error:  function(xhr, str){
			alert('Возникла ошибка: ' + xhr.responseCode);
		}
	});
	
	$.ajax({
		type:'POST',
		url: 'datepicker.php',
		dataType: 'json',
		data: {from:new_msg[0],to:new_msg[1],teacher:teacher},
		success: function(data){
			// console.log(data);
			diag(data,all_teachers,color_arr);
		},
		error:  function(xhr, str){
			alert('Возникла ошибка: ' + xhr.responseCode);
		}
	});
}
//---   DIAG
var f = true;
function diag(e,all_teachers,color_arr){
	arrayOfDataMulti = e;
	
	var first = f; // whether it first time legend_all clicked
	
	build(false,first,all_teachers,color_arr); // first time, we do need inscriptions and legend
	build2(all_teachers,color_arr);
	init(); // initialization .clickable and legend_all
	
	function init(){	
		$('.clickable').click(function(){
			var r = $(this).attr('id'); 
			var t;
			t = $(this).attr('id').substr(-1);
			
			var legend_arr  = new Array();
			
			for(i in arrayOfDataMulti){
				legend_arr[i]  = new Array();
				legend_arr[i][0]  = new Array();
				legend_arr[i][0][0]  = new Array();
				
				legend_arr[i][0][0] = arrayOfDataMulti[i][0][t];
				legend_arr[i][1] = arrayOfDataMulti[i][1];
			} 
			$("#stackedGraph_multi").empty();
			$("#stackedGraph_multi").attr('style','');
			$("#stackedGraph_multi").prev('h3').remove();
			
			build_single(t,legend_arr,all_teachers,color_arr);
			init();
		});
	
		$('#legend_all').click(function(){
			$("#graphHolder").remove();
			$('<div id="stackedGraph_multi"></div>').prependTo($("#stackedGraph_wrapper"));
			
			build(true,first,all_teachers,color_arr); // build(all,times)	
			first = false;
			init();	
			
		});
	}
	f = false;
}		
function build(e,p,all_teachers,color_arr){
	$("#graphHolder").remove();
	$("#stackedGraph_multi").remove();
	$('<div id="stackedGraph_multi"></div>').prependTo($("#stackedGraph_wrapper"));
	var t = e;
	var y = p;
	$("#stackedGraph_multi").jqBarGraph({
		all: true,
		first: false,
		single: false,
		data: arrayOfDataMulti,
		colors: color_arr,
		legends: all_teachers,
		legend: true,
		width: 1500,
		type: 'multi',
		animate: true,
	//	postfix: ' учеников',
		title: '<h3>Количество учеников  <br /><small>по неделям у каждого преподавателя</small></h3>'
	});
}
function build_single(e,r,all_teachers,color_arr){
	var m = e;
	var legend_arr = r;
	//	console.log(m);
	$("#stackedGraph_multi").jqBarGraph({
		all: false,
		single: true,
		single_data: [color_arr[m]],
		data: legend_arr,
		colors: color_arr,
		legends: all_teachers,
		legend: true,
		width: 1500,
		type: 'multi',
		animate: true,
	//	postfix: ' учеников',
		title: '<h3>Количество учеников  <br /><small>по неделям у каждого преподавателя</small></h3>'
	});
} 
function build2(all_teachers,color_arr){
	$("#graphHolder_sum").remove();
	$("#stackedGraph").remove();
	$('<div id="stackedGraph"></div>').appendTo($("#stackedGraph_wrapper"));
	$("#stackedGraph").jqBarGraph({
		sum: true,
		data: arrayOfDataMulti,
		colors: color_arr,
		legends: all_teachers,
		legend: true,
		width: 1500,
		animate: true,
	//	type: 'multi',
	//	postfix: ' учеников',
		title: '<h3><small>Сумма по неделям</small></h3>'
	});
}
function teacher_calculate(){
	var t = $('#teacher_select option:selected').val();
	$.ajax({
		type:'POST',
		async: false,
		url:'attendance_filter.php',
		dataType:'json',
		data: {teacher:t},
		success: function(data){
			// console.log(data);
			if($('#timetable_select')){$('#timetable_select').remove();}
			$('#teacher_select').after("<select id='timetable_select' onchange='timetable_calculate()' name='timetable_choose'>");
			for(i in data){
				$('#timetable_select').append("<option value='"+data[i]+"'>"+data[i]+"</option>");
			}
		},
		error: function(xhr, str){
			alert('Возникла ошибка: ' + xhr.responseCode);
		}   
	});
}

 // function timetable_calculate(){
 // 	var t = $('#teacher_select option:selected').val();
	// var y = $('#timetable_select option:selected').val();
	// $.ajax({
	// 	type:'POST',
	// 	async: false,
	// 	url:'attendance_filter2.php',
	// 	dataType:'json',
	// 	data: {teacher:t,timetable:y},
	// 	success: function(data){
	// 		// console.log(data);
	// 		if($('#start_select')){$('#start_select').remove();}
	// 		$('#timetable_select').after("<select id='start_select' onchange='timetable_calculate()' name='level_start_choose'>");
	// 		for(i in data){
	// 			$('#start_select').append("<option value='"+data[i]+"'>"+data[i]+"</option>");
	// 		}
	// 	},
	// 	error: function(xhr, str){
	// 		alert('Возникла ошибка: ' + xhr.responseCode);
	// 	}
	// });
 // }
 // BLOCKS
// function teacher_calculate_blocks(){
// 	var t = $('#teacher_select option:selected').val();
// 	$.ajax({
// 		type:'POST',
// 		async: false,
// 		url:'attendance_filter.php',
// 		dataType:'json',
// 		data: {teacher:t},
// 		success: function(data){
// 			console.log(data);
// 			if($('#timetable_select')){$('#timetable_select').remove();}
// 			$('#teacher_select').after("<select id='timetable_select' onchange='timetable_calculate()' name='timetable_choose'>");
// 			for(i in data){
// 				$('#timetable_select').append("<option value='"+data[i]+"'>"+data[i]+"</option>");
// 			}
// 		},
// 		error: function(xhr, str){
// 			alert('Возникла ошибка: ' + xhr.responseCode);
// 		}   
// 	});
// }

// function timetable_calculate_blocks(){
//  	var t = $('#teacher_select option:selected').val();
// 	var y = $('#timetable_select option:selected').val();
// 	$.ajax({
// 		type:'POST',
// 		async: false,
// 		url:'attendance_filter2.php',
// 		dataType:'json',
// 		data: {teacher:t,timetable:y},
// 		success: function(data){
// 			console.log(data);
// 			if($('#start_select')){$('#start_select').remove();}
// 			$('#timetable_select').after("<select id='start_select' onchange='timetable_calculate()' name='level_start_choose'>");
// 			for(i in data){
// 				$('#start_select').append("<option value='"+data[i]+"'>"+data[i]+"</option>");
// 			}
// 		},
// 		error: function(xhr, str){
// 			alert('Возникла ошибка: ' + xhr.responseCode);
// 		}
// 	});
//  }

function amount_of_money_fn(){
	var msg = $('#widgetField span').get(0).innerHTML;
	var new_msg = msg.split(" ÷ ");

	$.ajax({
		type:'POST',
		url: 'amount_of_money_server.php',
		dataType: 'json',
		data: {from:new_msg[0],to:new_msg[1]},
		success: function(data){
			// console.log(data);
			// diag_money(data);	
			$("#graphHolder").remove();
			$("#Graph_money").remove();
			$('<div id="Graph_money"></div>').prependTo($("#stackedGraph_wrapper"));
			$("#Graph_money").jqBarGraph({data: data,width: 1500,animate: false});
		},
		error:  function(xhr, str){
			alert('Возникла ошибка !!!: ' + xhr.responseCode);
		}
	});
}

	function add_discount(r,t,u,i,p){
		var r = r;
		var t = t;
		var u = u;
		var i = i;
		var person = p;
		var discount_value = $("#discount_add_"+i).val();
		// alert("r= "+r+" t= "+t+" u= "+u+" i= "+i+" discount_value= "+discount_value);
		// return false;
		$.ajax({
			type: 'POST',
			async: false,
			url: 'add_discount.php',
			dataType: 'json',
			data: {teacher:r,timetable:t,level_start:u,i:i,discount_value:discount_value,person:p},
			success: function(data){
				// console.log(data);
				get_person_discount(p,r,t,u,i);
			},
			error: function(xhr, str){
				alert('Возникла ошибка: ' + xhr.responseCode);
			}
		});  
	}

	function get_person_discount(p,r,t,u,i){
		var person = p;
		var r = "'"+r+"'";
		var t = "'"+t+"'";
		var u = "'"+u+"'";
		var i = i;
		$.ajax({
			type:'POST',
			async:false,
			url: "get_person_discount.php",
			dataType:'json',
			data: {person:person,teacher:r,timetable:t,level_start:u},
			success: function(data) {
				// console.log(data);
				if(data[0]){$('#discount_set_'+i).val(data[0]);}else if(data[0] == null){$('#discount_set_'+i).val('Нет скидки');}
				if(data[1]){$('#reason_set_'+i).val(data[1]);}else if(data[1] == null){$('#reason_set_'+i).val('Нет причины');}
			},
			error: function(xhr, str){
				alert('Возникла ошибка: ' + xhr.responseCode);
			}
		});
	}
	function add_person_reason(r,t,u,i,p){
		var person = "'"+p+"'";
		var reason = "'"+reason+"'";
		var r = "'"+r+"'";
		var t = "'"+t+"'";
		var u = "'"+u+"'";
		var i = i;
		var reason = $("#reason_add_"+i).val();
		$.ajax({
			type:'POST',
			async:false,
			url: "add_person_reason.php",
			dataType:'json',
			data: {person:person,teacher:r,timetable:t,level_start:u,i:i,reason:reason},
			success: function(data) {
				console.log(data);
				if(data){$('#reason_set_'+i).val(data);}else if(data == false){$('#reason_set_'+i).val('Нет причины');}
			},
			error: function(xhr, str){
				alert('Возникла ошибка: ' + xhr.responseCode);
			}
		});
	}

function person_match(person){
	var pay_flag = 0;
	var person = person;
	var fio;
	$.ajax({
		type: 'POST',
		async: false,
		url: 'person_cabinet_calculation.php',
		dataType: 'json',
		data: {person:person},
		success: function(data) {
			// console.log(data[2]);
			fio = "'"+data[0]+"'";
			$('#attendance_table').html("<div class='table_title'><h3>"+data[0]+"</h3></div>");
			$('#attendance_table').append("<p>Всего внес: "+data[1]+"</p>");
			if(data[6]){$('#attendance_table').append("<p>Баланс: "+data[6]+"</p>");}else{
				$('#attendance_table').append("<p>Баланс: 0</p>");
			}
			if(data[2]){
				var freeze_dates_arr = Array();
				for(var i =0;i<data[2].length;i++){
					freeze_dates_arr[i] = data[5][i];
					// var level="'"+data[2][i][3]+"'";
					// console.log(level);
					var tyt = data[2][i][2];
					$('#attendance_table').append("<div class='xxx'><p id='stack_"+i+"'>"+data[2][i][0]+"/"+data[2][i][1]+"/"+data[2][i][2]+"/"+data[2][i][3]+"</p></div>");
					// $('#attendance_table').append("<p>Осталось внести: "+data[5][i]+" ( "+data[6][i]+" уроков)</p>");
					$('#attendance_table').append("<div class='main_form  main_form_"+i+"'><table width='50%'' class='attendance_table default_table' id='attendance_table_"+i+"'></table></div>")
					
					var level_date = [] ;
					var r = data[2][i][0];
					var t = data[2][i][1];
					var u = data[2][i][2];

					//----- Построение шапки таблицы ;
					$("#attendance_table_"+i).empty();
					$("#attendance_table_"+i).html("<tbody><tr id='th_line_"+i+"'><th class='attendance_name_th' id='name_th_"+i+"'><div id='attendance_table_name_"+i+"'>Имя</div></th></tr></tbody>");
					$("#attendance_table_"+i).append("<div><lebel for='discount_set_"+i+"'>текущая скидка на сочетание</lebel><input type='text' name='discount_set_"+i+"' id='discount_set_"+i+"' style='border:0px' readonly/><br /><lebel for='discount_add_"+i+"'>изменить текущую скидку на</lebel><input type='text' name='discount_add_"+i+"' id='discount_add_"+i+"'/><button onclick=add_discount('"+data[2][i][0]+"','"+data[2][i][1]+"','"+data[2][i][2]+"','"+i+"','"+person+"')>изменить</button></div>");
					$("#attendance_table_"+i).append("<div><lebel for='reason_set_"+i+"'>текущая причина скидки</lebel><input type='text' name='reason_set_"+i+"' id='reason_set_"+i+"' style='border:0px' readonly/><br /><lebel for='reason_add_"+i+"'>изменить текущую причину на</lebel><input type='text' name='reason_add_"+i+"' id='reason_add_"+i+"'/><button onclick=add_person_reason('"+data[2][i][0]+"','"+data[2][i][1]+"','"+data[2][i][2]+"','"+i+"','"+person+"')>изменить</button></div>");
					get_person_discount(person,r,t,u,i);
					// get_person_reason(p,r,t,u,i);

					$.ajax({
						type: 'POST',
						async: false,
						url: 'lgtt_match_level_dates.php',
						dataType: 'json',
						// data: msg,
						data: {teacher_choose:data[2][i][0],timetable_choose:data[2][i][1],level_start_choose:data[2][i][2]},
						success: function(data) {
							// console.log(data);
							// return false;						
							for(var g=24;g>=4;g--){
								$('#name_th_'+i).after("<th class='attendance_th'><div class='rotateText'>"+data[g]+"</div></th>");
								level_date[(g-4)]=data[g];							
							}							
							// console.log(level_date[0]);
						},
						error: function(xhr, str){
							alert('Возникла ошибка: ' + xhr.responseCode);
						}
					});
					//----- /Построение шапки таблицы 

					//----- Фамилии даты 
					// return false;
					$.ajax({
						type: 'POST',
						async: false,
						url: 'lgtt_match_sochitanie.php',
						dataType: 'json',
						// data: msg,
						data: {person:person,teacher_choose:data[2][i][0],timetable_choose:data[2][i][1],level_start_choose:data[2][i][2]},
						success: function(data){
							var y =0;
							var w =0;
							var p =0;
							var e =0;
							var arr_id = [];
							var color = 0;
							var match = 0;
							var arr_id = [];
							$('#th_line_'+i).after("<tr id='tr"+y+"'></tr>");
							var flag = 0;
							for (var v in data) {
								// console.log(v);
								var split_id = v.split('|');
								if(person == split_id[1]){
								// return false;
									$('#attendance_table_'+i+' #tr'+y).after("<tr id='tr"+(y+1)+"'></tr>");
									$('#attendance_table_'+i+' #tr'+y).html("<td id='td"+y+"_"+w+"'>"+split_id[0]+"</td>");
									// console.log(y);
									arr_id[y] = split_id[1];
									for(var q=0;q<21;q++){
										color = 0;
										color_freeze = 0;
										start_date = 0;
										stop_date = 0;
										before_person_start = 1;
										after_person_stop = 0;
										// w++;
										for(var c in data[v]['dates']){
											if(level_date[q]  == data[v]['dates'][c]){
												match = data[v]['dates'][c];
												color = 1;
											}else{
												match = level_date[q];
											}	// ДАТЫ ПОСЕЩЕНИЙ (совпадение с датами сочетания)
											if(level_date[q] < split_id[2]){
													before_person_start = 1;
											}else if(level_date[q] >= split_id[2]){
													before_person_start = 0;
											}	// ОПРЕДИЛЕНИЕ ДО/ПОСЛЕ ДАТЫ СТАРТА ПЕРСОНЫ НА ДАННОМ СОЧЕТАНИИ
											if(level_date[q] > split_id[3]){
												after_person_stop = 1;
											}else if(level_date[q] <= split_id[3]){
												after_person_stop = 0;
											}	// ОПРЕДИЛЕНИЕ ДО/ПОСЛЕ ДАТЫ СТОП ПЕРСОНЫ НА ДАННОМ СОЧЕТАНИИ
										}
										for(var g in freeze_dates_arr[i]){
											if(level_date[q]  == freeze_dates_arr[i][g]){
												color_freeze = 1;
											}
										}
										if(level_date[q]  == split_id[2]){
											start_date = 1;
										}
										if(level_date[q] === split_id[3]){
											stop_date = 1;
										}	// ОПРЕДИЛЕНИЕ ДАТЫ СТАРТ/СТОП ПЕРСОНЫ НА ДАННОМ СОЧЕТАНИИ
										var trata = color+" | "+start_date+" | "+stop_date+" | "+before_person_start+" | "+after_person_stop;
										// console.log(match);
										if(color == 1 && start_date == 0 && stop_date === 0  && before_person_start == 1){
											$('#attendance_table_'+i+' #td'+y+'_'+w).after("<td id='td"+y+"_"+(w+1)+"' class='payment_mark attendence_mark before_person_start_mark color'>"+match+"</td>");
											//	before_person_start_mark
										}else if(color == 1 && start_date == 0 && stop_date === 0 && before_person_start == 0){
											$('#attendance_table_'+i+' #td'+y+'_'+w).after("<td  id='td"+y+"_"+(w+1)+"' class='payment_mark attendence_mark color'>"+match+"</td>");
										}else if(color == 1 && start_date == 0  && stop_date === 0 && before_person_start == 0 && after_person_stop == 1){
											$('#attendance_table_'+i+' #td'+y+'_'+w).after("<td  id='td"+y+"_"+(w+1)+"' class='payment_mark attendence_mark before_person_start_mark color'>"+match+"</td>");
											//	before_person_start_mark
										}else if(color == 1 && start_date == 0 && stop_date === 0 && after_person_stop == 0){
											$('#attendance_table_'+i+' #td'+y+'_'+w).after("<td  id='td"+y+"_"+(w+1)+"' class='payment_mark attendence_mark color'>"+match+"</td>");
										}else if(color == 1 && start_date == 1){
											$('#attendance_table_'+i+' #td'+y+'_'+w).after("<td  bordercolor='#0000FF' id='td"+y+"_"+(w+1)+"' class='payment_mark attendence_mark person_start_mark color'>"+match+"</td>");
										}
										// color_freeze
										else if(color_freeze == 1 && start_date == 0 && stop_date === 0  && before_person_start == 1){
											$('#attendance_table_'+i+' #td'+y+'_'+w).after("<td id='td"+y+"_"+(w+1)+"' class='payment_mark attendence_mark before_person_start_mark color_freeze'>"+match+"</td>");
											//	before_person_start_mark
										}else if(color_freeze == 1 && start_date == 0 && stop_date === 0 && before_person_start == 0){
											$('#attendance_table_'+i+' #td'+y+'_'+w).after("<td  id='td"+y+"_"+(w+1)+"' class='payment_mark attendence_mark color_freeze'>"+match+"</td>");
										}else if(color_freeze == 1 && start_date == 0  && stop_date === 0 && before_person_start == 0 && after_person_stop == 1){
											$('#attendance_table_'+i+' #td'+y+'_'+w).after("<td  id='td"+y+"_"+(w+1)+"' class='payment_mark attendence_mark before_person_start_mark color_freeze'>"+match+"</td>");
											//	before_person_start_mark
										}else if(color_freeze == 1 && start_date == 0 && stop_date === 0 && after_person_stop == 0){
											$('#attendance_table_'+i+' #td'+y+'_'+w).after("<td  id='td"+y+"_"+(w+1)+"' class='payment_mark attendence_mark color_freeze'>"+match+"</td>");
										}else if(color_freeze == 1 && start_date == 1){
											$('#attendance_table_'+i+' #td'+y+'_'+w).after("<td  bordercolor='#0000FF' id='td"+y+"_"+(w+1)+"' class='payment_mark attendence_mark person_start_mark color_freeze'>"+match+"</td>");
										}
										// /color_freeze

										else if(color == 0 && start_date == 1){
											$('#attendance_table_'+i+' #td'+y+'_'+w).after("<td id='td"+y+"_"+(w+1)+"' class='payment_mark attendence_mark person_start_mark'>"+match+"</td>");
										}else if(color == 1 && stop_date == 1){
											// console.log(color, stop_date);
											$('#attendance_table_'+i+' #td'+y+'_'+w).after("<td  bordercolor='#0000FF' id='td"+y+"_"+(w+1)+"' class='payment_mark attendence_mark person_stop_mark color'>"+match+"</td>");
										}
										// color_freeze
										else if(color_freeze == 1 && stop_date == 1){
											// console.log(color, stop_date);
											$('#attendance_table_'+i+' #td'+y+'_'+w).after("<td  bordercolor='#0000FF' id='td"+y+"_"+(w+1)+"' class='payment_mark attendence_mark person_stop_mark color_freeze'>"+match+"</td>");
										}
										// /color_freeze
										else if(color == 0 && stop_date == 1){
											$('#attendance_table_'+i+' #td'+y+'_'+w).after("<td id='td"+y+"_"+(w+1)+"' class='payment_mark attendence_mark person_stop_mark'>"+match+"</td>");
										}else if(color == 0 && before_person_start == 1){
											$('#attendance_table_'+i+' #td'+y+'_'+w).after("<td id='td"+y+"_"+(w+1)+"' class='payment_mark attendence_mark before_person_start_mark'>"+match+"</td>");
											//	before_person_start_mark
										}else if(color == 0 && after_person_stop == 0 && before_person_start == 0){
											$('#attendance_table_'+i+' #td'+y+'_'+w).after("<td id='td"+y+"_"+(w+1)+"' class='payment_mark attendence_mark'>"+match+"</td>");
										}else if(color == 0 && after_person_stop == 1){
											$('#attendance_table_'+i+' #td'+y+'_'+w).after("<td id='td"+y+"_"+(w+1)+"' class='payment_mark attendence_mark before_person_start_mark'>"+match+"</td>");
											//	before_person_start_mark
										}else if(color == 0 && after_person_stop == 0){
											$('#attendance_table_'+i+' #td'+y+'_'+w).after("<td id='td"+y+"_"+(w+1)+"' class='payment_mark attendence_mark'>"+match+"</td>");
										}
										w++;
									}
									y++;
								}
							}
						},
						error: function(xhr, str){
							alert('Возникла ошибка: ' + xhr.responseCode);
						}
					});
				}
				function pay2(){
					var person_start_arr =[];
					// console.log(data[2]);
					for(var i =0;i<data[2].length;i++){
						person_start_arr[i] = parseInt($('#attendance_table_'+i+' .person_start_mark').attr('id').replace('td0_', ''));
						// id_person:person,
						var personQuoted="'"+person+"'";
						var teacher="'"+data[2][i][0]+"'";
						var timetable="'"+data[2][i][1]+"'";
						var level_start="'"+data[2][i][2]+"'";
						var level="'"+data[2][i][3]+"'";
						$.ajax({
							type: 'POST',
							async: false,
							url: 'payed_lessons.php',
							dataType: 'json',
							data: {id_person:person,teacher:data[2][i][0],timetable:data[2][i][1],level_start:data[2][i][2]},
							success: function(data) {
								var cell_now = person_start_arr[i];
								// console.log(data);
								$('#stack_'+i).after("<p>Оплачено "+data[0][0]+" ("+(data[0][0]*data[1]).toFixed(2)+") из "+data[0][1]+" ("+(data[0][1]*data[1]).toFixed(2)+")</p><p>Осталось оплатить: "+((data[0][1]*data[1]).toFixed(2)-(data[0][0]*data[1]).toFixed(2)).toFixed(2)+"</p>");
								$('.main_form_'+i).prepend('<div class="removePersonFromCombo"><button onClick="removePersonFromCombo('+fio+','+personQuoted+','+teacher+','+timetable+','+level_start+','+level+')">Удалить студента с данного сочентания X </button></div>');
								var cell_now2 = person_start_arr[i];
								for(var b=0; b<data[0][0];b++){
									check();
									function check(){
										if($('#attendance_table_'+i+' #td0_'+cell_now).hasClass('color_freeze')){
											// alert($('#attendance_table_'+i+' #td0_'+cell_now).attr('class'));
											cell_now++;
											check();
										}
									}
									$('#attendance_table_'+i+' #td0_'+cell_now).addClass('payed_lesson');
									cell_now++;
								}
							},
							error: function(xhr, str){
								alert('Возникла ошибка: ' + xhr.responseCode);
							}
						});
					}
				}

				function pay3(){
					var person_start_arr =[];
					for(var i =0;i<data[2].length;i++){
						person_start_arr[i] = parseInt($('#attendance_table_'+i+' .person_start_mark').attr('id').replace('td0_', ''));
						// console.log(person_start_arr);
						$.ajax({
							type: 'POST',
							async: false,
							url: 'payed_lessons.php',
							dataType: 'json',
							data: {id_person:person,teacher:data[2][i][0],timetable:data[2][i][1],level_start:data[2][i][2]},
							success: function(data) {
								var cell_now2 = person_start_arr[i];
								for(var w=0; w<data[0][1];w++){
									$('#attendance_table_'+i+' #td0_'+cell_now2).removeClass('payed_lesson');
									cell_now2++;
								}
							},
							error: function(xhr, str){
								alert('Возникла ошибка: ' + xhr.responseCode);
							}
						});
					}
				}

				pay3();
				pay2();
			}else{$('#attendance_table').append("<p> Студент не учиться ни на одном сочетании</p>");}
		},
		error: function(xhr, str){
			alert('Возникла ошибка: ' + xhr.responseCode);
		}
	});

	if(location.pathname == "/bigstep/person.php"){
		$('.payment_mark').not('.before_person_start_mark').click(function(){
			function getParameterByName(name) {
				name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
				var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
				results = regex.exec(location.search);
				return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
			}
			var person = getParameterByName('person');
			var pay_flag = 0;
			var der = $(event.target).attr('class');
			d = der.split(" ");
			for(var i in d){
				if(d[i] == "payed_lesson"){pay_flag=1;}
			}
			var this_thing = $(event.target).parents('.attendance_table').attr('id');
			var what_i = this_thing.split("_");
			var i = what_i[2];
			var stack = $('#stack_'+i).text().split('/');
			// console.log(stack);
			// return false;
			var r = stack[0];
			var t = stack[1];
			var u = stack[2];
			if(pay_flag == 0){
				var payment_data = 1; // добавляем занятие, отнимаем из баланса
				$.ajax({
					type:'POST',
					url: 'payment_data_to_bd.php',
					data: {person_id:person,payment_data:payment_data,teacher:r,timetable:t,level_start:u},
					success: function(data){
						person_match(person);
					},
					error:  function(xhr, str){
						alert('Возникла ошибка: ' + xhr.responseCode);
					}
				});
			}else if(pay_flag == 1){
				var payment_data = -1; // минус один значит отнимаем проплату урока и добавляем его стоимость в баланс
				$.ajax({
					type:'POST',
					url: 'payment_data_to_bd.php',
					data: {person_id:person,payment_data:payment_data,teacher:r,timetable:t,level_start:u},
					success: function(data){
						person_match(person);
					},
					error:  function(xhr, str){
						alert('Возникла ошибка: ' + xhr.responseCode);
					}
				});
			}
		});
	}
}

function freeze_match(person){
	// var pay_flag = 0;
	var person = person;
	$.ajax({
		type: 'POST',
		async: false,
		url: 'freeze_cabinet_calculation.php',
		dataType: 'json',
		data: {person:person},
		success: function(data) {
			$('#attendance_table').html("<div class='table_title'><h3>"+data[0]+"</h3></div>");
			// $('#attendance_table').append("<p>Всего внес: "+data[1]+"</p>");
			if(data[2]){
				// console.log(data[2].length);
				var freeze_dates_arr = Array();
				for(var i =0;i<data[2].length;i++){
					freeze_dates_arr[i] = data[5][i];
					var tyt = data[2][i][2];
					$('#attendance_table').append("<p id='stack_"+i+"'>"+data[2][i][0]+"/"+data[2][i][1]+"/"+data[2][i][2]+"</p>");
					$('#attendance_table').append("<div class='main_form'><table width='50%'' class='attendance_table default_table' id='attendance_table_"+i+"'></table></div>")
					
					var level_date = [] ;
					var r = data[2][i][0];
					var t = data[2][i][1];
					var u = data[2][i][2];

					//----- Построение шапки таблицы ;
					$("#attendance_table_"+i).empty();
					$("#attendance_table_"+i).html("<tbody><tr id='th_line_"+i+"'><th class='attendance_name_th' id='name_th_"+i+"'><div id='attendance_table_name_"+i+"'>Имя</div></th></tr></tbody>");

					$.ajax({
						type: 'POST',
						async: false,
						url: 'lgtt_match_level_dates.php',
						dataType: 'json',
						// data: msg,
						data: {teacher_choose:data[2][i][0],timetable_choose:data[2][i][1],level_start_choose:data[2][i][2]},
						success: function(data) {
							// return false;						
							for(var g=24;g>=4;g--){
								$('#name_th_'+i).after("<th class='attendance_th'><div class='rotateText'>"+data[g]+"</div></th>");
								// console.log('#name_th_'+i);
								level_date[(g-4)]=data[g];							
							}							
							// console.log(level_date[0]);
						},
						error: function(xhr, str){
							alert('Возникла ошибка: ' + xhr.responseCode);
						}
					});
					//----- /Построение шапки таблицы 

					//----- Фамилии даты 
					// return false;
					$.ajax({
						type: 'POST',
						async: false,
						url: 'lgtt_match.php',
						dataType: 'json',
						// data: msg,
						data: {teacher_choose:data[2][i][0],timetable_choose:data[2][i][1],level_start_choose:data[2][i][2]},
						success: function(data) {
							var y =0;
							var w =0;
							var p =0;
							var e =0;
							var arr_id = [];
							var color = 0;
							var match = 0;
							var arr_id = [];
							$('#th_line_'+i).after("<tr id='tr"+y+"'></tr>");
							var flag = 0;
							for (var v in data) {
								var split_id = v.split('|');
								if(person == split_id[1]){
								// console.log(split_id);
									$('#attendance_table_'+i+' #tr'+y).after("<tr id='tr"+(y+1)+"'></tr>");
									$('#attendance_table_'+i+' #tr'+y).html("<td id='td"+y+"_"+w+"'>"+split_id[0]+"</td>");
									// console.log(y);
									arr_id[y] = split_id[1];
									for(var q=0;q<21;q++){
										color = 0;
										color_freeze = 0;
										start_date = 0;
										stop_date = 0;
										before_person_start = 1;
										after_person_stop = 0;
										// w++;
										for(var c in data[v]['dates']){
											if(level_date[q]  == data[v]['dates'][c]){
												color = 1;
											}	
											match = level_date[q];
											// ДАТЫ ПОСЕЩЕНИЙ (совпадение с датами сочетания)
											if(level_date[q] < split_id[2]){
													before_person_start = 1;
											}else if(level_date[q] >= split_id[2]){
													before_person_start = 0;
											}	// ОПРЕДИЛЕНИЕ ДО/ПОСЛЕ ДАТЫ СТАРТА ПЕРСОНЫ НА ДАННОМ СОЧЕТАНИИ
											if(level_date[q] > split_id[3]){
												after_person_stop = 1;
											}else if(level_date[q] <= split_id[3]){
												after_person_stop = 0;
											}	// ОПРЕДИЛЕНИЕ ДО/ПОСЛЕ ДАТЫ СТОП ПЕРСОНЫ НА ДАННОМ СОЧЕТАНИИ
										}
										for(var g in freeze_dates_arr[i]){
											if(level_date[q]  == freeze_dates_arr[i][g]){
												color_freeze = 1;
											}
										}

										if(level_date[q]  == split_id[2]){
											start_date = 1;
										}
										if(level_date[q] === split_id[3]){
											stop_date = 1;
										}	// ОПРЕДИЛЕНИЕ ДАТЫ СТАРТ/СТОП ПЕРСОНЫ НА ДАННОМ СОЧЕТАНИИ
										var trata = color+" | "+start_date+" | "+stop_date+" | "+before_person_start+" | "+after_person_stop;
										// console.log(match);
										if(color == 1 && start_date == 0 && stop_date === 0  && before_person_start == 1){
											$('#attendance_table_'+i+' #td'+y+'_'+w).after("<td  id='td"+y+"_"+(w+1)+"' class='freeze_mark attendence_mark before_person_start_mark color'>"+match+"</td>");
											//	before_person_start_mark
										}else if(color == 1 && start_date == 0 && stop_date === 0 && before_person_start == 0){
											$('#attendance_table_'+i+' #td'+y+'_'+w).after("<td  id='td"+y+"_"+(w+1)+"' class='freeze_mark attendence_mark color'>"+match+"</td>");
										}else if(color == 1 && start_date == 0  && stop_date === 0 && before_person_start == 0 && after_person_stop == 1){
											$('#attendance_table_'+i+' #td'+y+'_'+w).after("<td  id='td"+y+"_"+(w+1)+"' class='freeze_mark attendence_mark before_person_start_mark color'>"+match+"</td>");
											//	before_person_start_mark
										}else if(color == 1 && start_date == 0 && stop_date === 0 && after_person_stop == 0){
											$('#attendance_table_'+i+' #td'+y+'_'+w).after("<td  id='td"+y+"_"+(w+1)+"' class='freeze_mark attendence_mark color'>"+match+"</td>");
										}else if(color == 1 && start_date == 1){
											$('#attendance_table_'+i+' #td'+y+'_'+w).after("<td bgcolor='#0033FF' id='td"+y+"_"+(w+1)+"' class='freeze_mark attendence_mark person_start_mark color'>"+match+"</td>");
										}

										else if(color_freeze == 1 && start_date == 0 && stop_date === 0  && before_person_start == 1){ // color_freeze
											$('#attendance_table_'+i+' #td'+y+'_'+w).after("<td  id='td"+y+"_"+(w+1)+"' class='freeze_mark attendence_mark before_person_start_mark color_freeze'>"+match+"</td>");
											//	before_person_start_mark
										}else if(color_freeze == 1 && start_date == 0 && stop_date === 0 && before_person_start == 0){
											$('#attendance_table_'+i+' #td'+y+'_'+w).after("<td  id='td"+y+"_"+(w+1)+"' class='freeze_mark attendence_mark color_freeze'>"+match+"</td>");
										}else if(color_freeze == 1 && start_date == 0  && stop_date === 0 && before_person_start == 0 && after_person_stop == 1){
											$('#attendance_table_'+i+' #td'+y+'_'+w).after("<td  id='td"+y+"_"+(w+1)+"' class='freeze_mark attendence_mark before_person_start_mark color_freeze'>"+match+"</td>");
											//	before_person_start_mark
										}else if(color_freeze == 1 && start_date == 0 && stop_date === 0 && after_person_stop == 0){
											$('#attendance_table_'+i+' #td'+y+'_'+w).after("<td bgcolor='#0033FF' id='td"+y+"_"+(w+1)+"' class='freeze_mark attendence_mark color_freeze'>"+match+"</td>");
										}else if(color_freeze == 1 && start_date == 1){
											$('#attendance_table_'+i+' #td'+y+'_'+w).after("<td  id='td"+y+"_"+(w+1)+"' class='freeze_mark attendence_mark person_start_mark color_freeze'>"+match+"</td>");
										} // /color_freeze

										else if(color == 0 && start_date == 1){
											$('#attendance_table_'+i+' #td'+y+'_'+w).after("<td id='td"+y+"_"+(w+1)+"' class='freeze_mark attendence_mark person_start_mark'>"+match+"</td>");
										}else if(color == 1 && stop_date == 1){
											// console.log(color, stop_date);
											$('#attendance_table_'+i+' #td'+y+'_'+w).after("<td bgcolor='#0033FF' id='td"+y+"_"+(w+1)+"' class='freeze_mark attendence_mark person_stop_mark color'>"+match+"</td>");
										}
										else if(color_freeze == 1 && stop_date == 1){  // color_freeze
											// console.log(color, stop_date);
											$('#attendance_table_'+i+' #td'+y+'_'+w).after("<td bgcolor='#0033FF' id='td"+y+"_"+(w+1)+"' class='freeze_mark attendence_mark person_stop_mark color_freeze'>"+match+"</td>");
										} // /color_freeze 

										else if(color == 0 && stop_date == 1){
											$('#attendance_table_'+i+' #td'+y+'_'+w).after("<td id='td"+y+"_"+(w+1)+"' class='freeze_mark attendence_mark person_stop_mark'>"+match+"</td>");
										}else if(color == 0 && before_person_start == 1){
											$('#attendance_table_'+i+' #td'+y+'_'+w).after("<td id='td"+y+"_"+(w+1)+"' class='freeze_mark attendence_mark before_person_start_mark'>"+match+"</td>");
											//	before_person_start_mark
										}else if(color == 0 && after_person_stop == 0 && before_person_start == 0){
											$('#attendance_table_'+i+' #td'+y+'_'+w).after("<td id='td"+y+"_"+(w+1)+"' class='freeze_mark attendence_mark'>"+match+"</td>");
										}else if(color == 0 && after_person_stop == 1){
											$('#attendance_table_'+i+' #td'+y+'_'+w).after("<td id='td"+y+"_"+(w+1)+"' class='freeze_mark attendence_mark before_person_start_mark'>"+match+"</td>");
											//	before_person_start_mark
										}else if(color == 0 && after_person_stop == 0){
											$('#attendance_table_'+i+' #td'+y+'_'+w).after("<td id='td"+y+"_"+(w+1)+"' class='freeze_mark attendence_mark'>"+match+"</td>");
										}
										w++;
									}
									y++;
								}

							}

						},
						error: function(xhr, str){
							alert('Возникла ошибка: ' + xhr.responseCode);
						}
					});
				}
				// console.log($freeze_dates_arr);
			}
			function pay2(){
				var person_start_arr =[];
				for(var i =0;i<data[2].length;i++){
					person_start_arr[i] = parseInt($('#attendance_table_'+i+' .person_start_mark').attr('id').replace('td0_', ''));
					$.ajax({
						type: 'POST',
						async: false,
						url: 'payed_lessons.php',
						dataType: 'json',
						data: {id_person:person,teacher:data[2][i][0],timetable:data[2][i][1],level_start:data[2][i][2]},
						success: function(data) {
							var cell_now = person_start_arr[i];
							// console.log(data);
							$('#stack_'+i).after("<p>Оплачено "+data[0][0]+" ("+(data[0][0]*data[1]).toFixed(2)+") из "+data[0][1]+" ("+(data[0][1]*data[1]).toFixed(2)+")</p><p>Осталось оплатить: "+((data[0][1]*data[1]).toFixed(2)-(data[0][0]*data[1]).toFixed(2)).toFixed(2)+"</p>");
							$('#stack_'+i).after("<input class='one_lesson_"+i+"' type='hidden' value='"+data[1]+"' />");
							var cell_now2 = person_start_arr[i];
							for(var b=0; b<data[0][0];b++){
								check();
								function check(){
									if($('#attendance_table_'+i+' #td0_'+cell_now).hasClass('color_freeze')){
										// alert($('#attendance_table_'+i+' #td0_'+cell_now).attr('class'));
										cell_now++;
										check();
									}
								}
								$('#attendance_table_'+i+' #td0_'+cell_now).addClass('payed_lesson');
								cell_now++;
							}
						},
						error: function(xhr, str){
							alert('Возникла ошибка: ' + xhr.responseCode);
						}
					});
				}
			}

			function pay3(){
				var person_start_arr =[];
				for(var i =0;i<data[2].length;i++){
					person_start_arr[i] = parseInt($('#attendance_table_'+i+' .person_start_mark').attr('id').replace('td0_', ''));
					// console.log(person_start_arr);
					$.ajax({
						type: 'POST',
						async: false,
						url: 'payed_lessons.php',
						dataType: 'json',
						data: {id_person:person,teacher:data[2][i][0],timetable:data[2][i][1],level_start:data[2][i][2]},
						success: function(data) {
							var cell_now2 = person_start_arr[i];
							for(var w=0; w<data[0][1];w++){
								$('#attendance_table_'+i+' #td0_'+cell_now2).removeClass('payed_lesson');
								cell_now2++;
							}
						},
						error: function(xhr, str){
							alert('Возникла ошибка: ' + xhr.responseCode);
						}
					});
				}
			}

			pay3();
			pay2();
		},
		error: function(xhr, str){
			alert('Возникла ошибка: ' + xhr.responseCode);
		}
	});

	if(location.pathname == "/bigstep/freeze_table.php"){
		$('.freeze_mark').unbind('click');
		$('.freeze_mark').not('.before_person_start_mark').not('.color').click(function(){
			var person = getParameterByName('person');
			var der = $(event.target).attr('class');
			d = der.split(" ");
			// console.log(d);
			var this_thing = $(event.target).parents('.attendance_table').attr('id');
			var what_i = this_thing.split("_");
			var i = what_i[2];
			var stack = $('#stack_'+i).text().split('/');
			var date = $(this).text();
			var r = stack[0];
			var t = stack[1];
			var u = stack[2];
			var one_lesson = $('.one_lesson_'+i).val();
			var is_payed=0;
			// console.log(d.length);
			for(var y=0;y<d.length;y++){
				// console.log(d[y]);
				if(d[y]=="payed_lesson"){is_payed=1;}
			}
			console.log(is_payed);
			if(is_payed==1){
				$.ajax({
					type:'POST',
					url: 'date_of_freeze_to_bd_payday_to_balance.php',
					data: {person:person,date:date,teacher:r,timetable:t,level_start:u,one_lesson:one_lesson},
					success: function(data){
						// console.log(data);
						freeze_match(person);
					},
					error:  function(xhr, str){
						alert('Возникла ошибка: ' + xhr.responseCode);
					}
				});
			}
			if(is_payed==0){
				$.ajax({
					type:'POST',
					url: 'date_of_freeze_to_bd.php',
					data: {person:person,date:date,teacher:r,timetable:t,level_start:u},
					success: function(data){
						// console.log(data);
						freeze_match(person);
					},
					error:  function(xhr, str){
						alert('Возникла ошибка: ' + xhr.responseCode);
					}
				});
			}
		});
	}
}

function get_timetable(teacher){
	if($('.timetable_soch')){$('.timetable_soch').remove();}
	if($('.level_start_soch')){$('.level_start_soch').remove();}
	if($('.level_soch')){$('.level_soch').remove();}
	if($('.person_start_soch')){$('.person_start_soch').remove();}
	if($('.person_stop_soch')){$('.person_stop_soch').remove();}
	if(teacher == "choose_teacher"){
		if($('.timetable_soch')){$('.timetable_soch').remove();}
	}else{
		var teacher= "'"+teacher+"'";
		$.ajax({
			type: 'POST',
			url: 'get_timetable.php',
			dataType: 'json',
			data: {teacher:teacher},
			success: function(data) {
				// console.log(data);
				$('.timetable_soch').remove();
				$('.teacher_soch').after('<div class="item timetable_soch"><label for="timetable_sel">Расписание:</label><select name="timetable_sel" id="timetable_sel" class="add_form_select" onchange="get_level_start('+teacher+',this.value)"></select></div>');
			$('#timetable_sel').append('<option value="choose_timetable">Выберите расисание</option>');
				for(var i in data){
					$('#timetable_sel').append('<option value="'+data[i]+'">'+data[i]+'</option>');
					
				}
			},
			error: function(xhr, str){
				alert('Возникла ошибка: ' + xhr.responseCode);
			}
		});
	}
}

function get_level_start(teacher,timetable){
	if($('.level_start_soch')){$('.level_start_soch').remove();}
	if($('.level_soch')){$('.level_soch').remove();}
	if($('.person_start_soch')){$('.person_start_soch').remove();}
	if($('.person_stop_soch')){$('.person_stop_soch').remove();}
	if(timetable == "choose_timetable"){
		if($('.level_start_soch')){$('.level_start_soch').remove();}
	}else{
		var teacher= "'"+teacher+"'";
		var timetable = "'"+timetable+"'";
		var id_person = "'"+$('input#id_person').val()+"'";
		$.ajax({
			type: 'POST',
			url: 'get_level_start.php',
			dataType: 'json',
			data: {teacher:teacher,timetable:timetable},
			success: function(data) {
				// console.log(data);
				$('.level_start_soch').remove();
				$('.timetable_soch').after('<div class="item level_start_soch"><label for="level_start_sel">Дата старта уровня:</label><select name="level_start_sel" id="level_start_sel" class="add_form_select" onchange="get_level('+teacher+','+timetable+',this.value,'+id_person+')"></select></div>');
				$('#level_start_sel').append('<option value="choose_level_start">Выберите дату старта уровня</option>');
				for(var i in data){
					$('#level_start_sel').append('<option value="'+data[i]+'">'+data[i]+'</option>');
				}
			},
			error: function(xhr, str){
				alert('Возникла ошибка: ' + xhr.responseCode);
			}
		});
	}
}
function get_level(teacher,timetable,level_start,id_person){
	if($('.level_soch')){$('.level_soch').remove();}
	if($('.person_start_soch')){$('.person_start_soch').remove();}
	if($('.person_stop_soch')){$('.person_stop_soch').remove();}
	if(level_start == "choose_level_start"){
		if($('.level_soch')){$('.level_soch').remove();}
	}else{
		var teacher= "'"+teacher+"'";
		var timetable = "'"+timetable+"'";
		var level_start_without_quotes = level_start;
		var level_start = "'"+level_start+"'";
		var id_person = "'"+id_person+"'";
		$.ajax({
			type: 'POST',
			url: 'get_level.php',
			dataType: 'json',
			data: {teacher:teacher,timetable:timetable,level_start:level_start,id_person:id_person},
			success: function(data) {
				// console.log($.isArray(data));
				if(!$.isArray(data)){
					// console.log(1);
					$('.level_soch').remove();
					$('.level_start_soch').after('<div class="item level_soch"><label for="level_soch">Уровень:</label> <input class="add_form_select" type="text" id="level_soch" name="level_soch" value='+data+' style="border:none;" readonly></div>');
					$('.warning').show();
				}
				if($.isArray(data)){
					// console.log(2);
					$('.warning').hide();
					$('.level_soch').remove();
					$('.level_start_soch').after('<div class="item level_soch"><label for="level_soch">Уровень:</label> <input class="add_form_select" type="text" id="level_soch" name="level_soch" value='+data[0]+' style="border:none;" readonly></div>');
					data.splice(0,1)

					$('.person_start_soch').remove();
					$('.level_soch').after('<div class="item person_start_soch"><label for="person_start_soch">Дата старта уровня:</label><select name="person_start_sel" id="person_start_sel" class="add_form_select" onchange="fix_person_stop(this.value)"></select></div>');
					for(var i in data){
						if( i == 0){$('#person_start_sel').append('<option value="'+data[i]+'" selected>'+data[i]+'</option>');}else{$('#person_start_sel').append('<option value="'+data[i]+'">'+data[i]+'</option>');}
					}

					$('.person_stop_soch').remove();
					$('.person_start_soch').after('<div class="item person_stop_soch"><label for="person_stop_soch">Дата финиша уровня:</label><select name="person_stop_sel" id="person_stop_sel" class="add_form_select" onchange="fix_person_start(this.value)"></select></div>');
					for(var i in data){
						if( i == data.length-1){$('#person_stop_sel').append('<option value="'+data[i]+'" selected>'+data[i]+'</option>');}else{$('#person_stop_sel').append('<option value="'+data[i]+'">'+data[i]+'</option>');}
					}
				}

			},
			error: function(xhr, str){
				alert('Возникла ошибка: ' + xhr.responseCode);
			}
		});
	}
}
function fix_person_stop(date){
	var flag=0;
	$( "#person_stop_sel option" ).each(function(  ) {
		if(date == $( this ).val()){flag=1;}
		if(flag==0){$( this ).prop('disabled', true);}
	});
}
function fix_person_start(date){
	var flag=1;
	$( "#person_start_sel option" ).each(function(  ) {
		if(flag==0){$( this ).prop('disabled', true);}
		if(date == $( this ).val()){flag=0;}
	});
}

function change_start_date(r,t,u){
	var new_level_start = $('#new_level_start').val();
	if(new_level_start==""){alert('Введите новую дату старта');}else{
		$.ajax({
			type: 'POST',
			url: 'change_start_date.php',
			// dataType: 'json',
			data: {teacher:r,timetable:t,level_start:u,new_level_start:new_level_start},
			success: function(data) {
				if(data=="bad"){alert('Данная дата не совпадает с расписанием(не тот день недели');}else{
					// console.log(r,t,new_level_start);
					lgtt_match_fn(r,t,new_level_start); 
					$('.brick').remove();
					building_blocks(r,t,new_level_start);
				} 
			},
			error: function(xhr, str){
				alert('Возникла ошибка: ' + xhr.responseCode);
			}
		});
	}
}

function remove_combination(r,t,u){
	if(confirm("Вы действительно хотите удалить сочетание: "+r+"/"+t+"/"+u+" ?")){
		$.ajax({
			type: 'POST',
			url: 'remove_combination.php',
			dataType: 'json',
			data: {teacher:r,timetable:t,level_start:u},
			success: function(data) {
				// console.log(r,t,new_level_start);
				$(".brick[style*='blue']").remove();
				var r = $('.brick:first').children('[name=teacher_choose]').val();
				var t = $('.brick:first').children('[name=timetable_choose]').val();
				var u = $('.brick:first').children('[name=level_start_choose]').val();
				$('.brick:first').css('borderColor','blue');
				lgtt_match_fn(r,t,u); 
			},
			error: function(xhr, str){
				alert('Возникла ошибка: ' + xhr.responseCode);
			}
		});
	}
}

function send_to_archive(r,t,u){
	if(confirm("Вы действительно хотите отправить в архив сочетание: "+r+"/"+t+"/"+u+" ?")){
		var teacher_quoted = "'"+r+"'";
		var timetable_quoted = "'"+t+"'";
		var level_start_quoted = "'"+u+"'";

		var status = -1;

		$.ajax({
			type: 'POST',
			url: 'status_update.php',
			dataType: 'json',
			data: {teacher:teacher_quoted,timetable:timetable_quoted,level_start:level_start_quoted,status:status},
			success: function(data) {
				console.log();
				$('.past_combinations').append('<div class="brick"><input class="brick_input" type="text" name="teacher_choose" id="teacher_choose_archive" disabled /><input class="brick_input" type="text" name="timetable_choose" id="timetable_choose_archive" disabled /><input class="brick_input" type="text" name="level_start_choose" id="level_start_choose_archive" disabled /><input class="brick_input" type="text" name="level_choose" id="level_choose_archive" disabled /></div>')
				$('#teacher_choose_archive').val(r);
				$('#timetable_choose_archive').val(t);
				$('#level_start_choose_archive').val(u);

				$.ajax({
					type: 'POST',
					url: 'get_level.php',
					dataType: 'json',
					data: {teacher:teacher_quoted,timetable:timetable_quoted,level_start:level_start_quoted},
					success: function(data) {
						console.log();
						$('#level_choose_archive').val(data[0]);
						$(".brick[style*='blue']").remove();
						$('.brick:first').css('borderColor','blue');
						// lgtt_match_fn(r,t,u); 
					},
					error: function(xhr, str){
						alert('Возникла ошибка: ' + xhr.responseCode);
					}
				});
			},
			error: function(xhr, str){
				alert('Возникла ошибка: ' + xhr.responseCode);
			}
		});

	}
}

function removePersonFromCombo(fio,id_person,teacher,timetable,level_start,level){
	if(confirm("Вы действительно хотите далить студента: "+fio+" с сочетания : "+teacher+"/"+timetable+"/"+level_start+" ?")){
		var notExistFlag = 0;
		$.ajax({
			type: 'POST',
			async: false,
			url: 'checkPayedAttenedFrozenLessonsExist.php',
			// dataType: 'json',
			data: {id_person:id_person,teacher:teacher,timetable:timetable,level_start:level_start},
			success: function(data) {
				if(data=="good"){
					notExistFlag = 1;
				}
				if(data=="bad"){
					alert('Для удаления студента с сочетания, удалите все проплаты, посещения либо заморозки студента на данном сочетании.');
				}
			},
			error: function(xhr, str){
				alert('Возникла ошибка: ' + xhr.responseCode);
			}
		});

		if(notExistFlag==1){

			$.ajax({
				type: 'POST',
				async: false,
				url: 'removePersonFromCombo.php',
				// dataType: 'json',
				data: {id_person:id_person,teacher:teacher,timetable:timetable,level_start:level_start},
				success: function(data) {				
					$('p').each(function(){
						if($(this).text()==teacher+"/"+timetable+"/"+level_start+"/"+level){
							// console.log($(this).parent().next());
							$(this).parent().next().empty();
							$(this).parent().empty();
						}
					});
				},
				error: function(xhr, str){
					alert('Возникла ошибка: ' + xhr.responseCode);
				}
			});
		}
	}
}
