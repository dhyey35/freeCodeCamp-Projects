$(document).ready(function(){
	// building the loading gif with pure js
	var opts = {
	  lines: 13 // The number of lines to draw
	, length: 14 // The length of each line
	, width: 7 // The line thickness
	, radius: 19 // The radius of the inner circle
	, scale: 1 // Scales overall size of the spinner
	, corners: 1 // Corner roundness (0..1)
	, color: '#000' // #rgb or #rrggbb or array of colors
	, opacity: 0.25 // Opacity of the lines
	, rotate: 0 // The rotation offset
	, direction: 1 // 1: clockwise, -1: counterclockwise
	, speed: 1 // Rounds per second
	, trail: 60 // Afterglow percentage
	, fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
	, zIndex: 2e9 // The z-index (defaults to 2000000000)
	, className: 'spinner' // The CSS class to assign to the spinner
	, top: '80%' // Top position relative to parent
	, left: '50%' // Left position relative to parent
	, shadow: false // Whether to render a shadow
	, hwaccel: false // Whether to use hardware acceleration
	, position: 'absolute' // Element positioning
	}
	var target = document.getElementById('loading')
	var spinner = new Spinner(opts).spin(target);

	//simulating click on icon when user presses enter
	$("#query").keypress(function(key){
		if(key.keyCode == "13"){
			$("#searchIcon").trigger("click");
		}
	});
	
	//sending ajax when user clicks
	$("#searchIcon").click(function(){

		var searchText = encodeURI($("#query").val());
		if(searchText.length < 1){
			//basic checking
			$("#no-data").html("Please enter Text !!");
			$("#query").focus();
			return;
		}
		$("#result").empty();//so that new results can be loaded without refreshing
		$("#no-data").empty();
		$("#loading").show();
		
		$.ajax({
			url: 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch='+searchText,
			dataType:'jsonp',
			success: function(data){	
				if(!data.query){
					$("#loading").hide();
					$("#no-data").html("Sorry No Data Found !! Try something else");

				}
				var i=0;
				$.each(data.query.pages, function(pageid,object){
						$("#result").append('<div class="dataRec" id="result'+i+'"></div>');
						$("#result"+i).append('<div title="Click to open in wikipedia" class="title" id="result'+i+'title" >'+object.title + '</div>');
						$("#result"+i).append('<div title="Click to open in wikipedia" class="snippet" id="result'+i+'snippet" >'+object.extract + '</div>');
						$(".title").each(function(){
							$(this).wrapInner('<a href="https://en.wikipedia.org/?curid='+pageid+
									'" target="_blank" ></a>' );
						});
						$(".snippet").each(function(){
							$(this).wrap('<a href="https://en.wikipedia.org/?curid='+pageid
								+'" target="_blank" ></a>' );
						});
						i++;

				});
				$("#loading").hide();
				$(".title").slideDown();
				$(".snippet").slideDown();
			}
		})



		
	});
	
});