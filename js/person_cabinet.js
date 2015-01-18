$(document).ready(function(){
	// function getParameterByName(name) {
	// 	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	// 	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	// 	results = regex.exec(location.search);
	// 	return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	// }
	var p = getParameterByName('person');
	// console.log(p);
	person_match(p);
	// var url = $(location).attr('href');
	// history.pushState('','',url+"&teacher=5");
	// lgtt_match_fn(r,t,u); 
});