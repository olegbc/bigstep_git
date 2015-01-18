$(document).ready(function(){
	building_blocks();
	var r = $('.peresent_combinations .brick:first').children('[name=teacher_choose]').val();
	var t = $('.peresent_combinations .brick:first').children('[name=timetable_choose]').val();
	var u = $('.peresent_combinations .brick:first').children('[name=level_start_choose]').val();
	$('.peresent_combinations .brick:first').css('borderColor','blue');
	lgtt_match_fn(r,t,u); 
});