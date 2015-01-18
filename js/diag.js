function diag(e){
	arrayOfDataMulti = e;
	
	var first = true; // whether it first time legend_all clicked
	
	build(false,first); // first time, we do need inscriptions and legend
	build2(true);
	init(); // initialization .clickable and legend_all
	
	function init(){	
		$('.clickable').click(function(){
			var r = $(this).attr('id'); 
			var t;
			t = $(this).attr('id').substr(-1);
			
			legend_arr  = new Array(
				[[[3,6,2,2,1][t]],'02-01-2006 : 02-01-2006'],
				[[[3,8,2,2,3][t]],'02-01-2006 : 02-01-2006'],
				[[[4,18,2,1,4][t]],'02-01-2006 : 02-01-2006'],
				[[[4,22,3,5,2][t]],'02-01-2006 : 02-01-2006'],
				[[[4,22,3,5,2][t]],'02-01-2006 : 02-01-2006']
			);
			
			for(i in arrayOfDataMulti){
				legend_arr[i][0][0] = arrayOfDataMulti[i][0][t];
				legend_arr[i][1] = arrayOfDataMulti[i][1];
			} 
			
			$("#stackedGraph_multi").empty();
			$("#stackedGraph_multi").attr('style','');
			$("#stackedGraph_multi").prev('h3').remove();
			
			build_single(t);
			init();
		});
	
		$('#legend_all').click(function(){
			$("#graphHolder4stackedGraph_multi").remove();
			$('<div id="stackedGraph_multi"></div>').prependTo($("#stackedGraph_wrapper"));
			
		//	arrayOfDataMulti = arrayOfDataMulti_main;
		
			build(true,first); // build(all,times)	
			first = false;
			init();	
			
		});
	}
}