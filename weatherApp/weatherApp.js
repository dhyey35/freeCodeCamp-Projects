$(document).ready(function(){
	
	$.getJSON("http://ip-api.com/json",function(jsonRec){
		if(jsonRec.status == "success"){
			getWeather(jsonRec.lat,jsonRec.lon,jsonRec.city,jsonRec.country);
		}
		else{
			$("#degrees").html("Sorry no data available for your location.");
		}
	});
	

	function getWeather(lat,lon,city,country){
		$.ajax({
		    xhrFields: {
		        withCredentials: true
		    },
		    type: "GET",
		    crossDomain:true,
		    dataType:"jsonp",// write this to avoid access-allow-origin-header prob
		    url: "https://api.forecast.io/forecast/8ac6d6bf55167ca75b8a1d60e58c71ab/"+lat+","+lon
		}).done(function (dataRec) {
			
		    var fahrenheit = dataRec.currently.temperature;
		    //converting fahrenheit to celsius 
		    var celsius = Math.round((fahrenheit -32)*(5/9));

		    var apparentFahrenheit = dataRec.currently.apparentTemperature;
		    var apparentCelsius = Math.round((apparentFahrenheit -32)*(5/9));

		    //to keep trac of what is being displayed celsius or fahrenheit
		    var displaying = "celsius";

		    //data is available so hide the gif
		    $("#loading").hide();
		    $("#location").html(city + " , " + country);
		    $("#degrees").html(celsius+" &#8451;");
		    if(celsius > 35){
		    	$("#degrees").css('color','red');
		    }
		    $("#apparent").html("Feels like "+apparentCelsius+" &#8451;");
		    $("#change").html("Change To Fahrenheit");
		    $("#change").click(function(){
		    	if(displaying == "celsius"){
		    		$("#degrees").html(fahrenheit+" &#8457;");
		    		$("#apparent").html("Feels like "+apparentFahrenheit+" &#8457;")
		    		$("#change").html("Change To Celsius");
		    		displaying = "fahrenheit";
		    	}
		    	else{
		    		$("#degrees").html(celsius+" &#8451;");
		    		$("#apparent").html("Feels like "+apparentCelsius+" &#8451;")
		    		$("#change").html("Change To Fahrenheit");
		    		displaying = "celsius";
		    	}
		    });
		    $("#description").html(dataRec.currently.summary);
		    $("#windSpeed").html("Wind Speed is "+dataRec.currently.windSpeed+" kmph");

		    //using skycons.js
		    var skycons = new Skycons({"color": "red"});
		    //showing icons acc to current mesurements eg: clear sky,cloudy etc..
		    var iconName = dataRec.currently.icon.toUpperCase();
		    var re = /-/g;
		    iconName = iconName.replace(re,"_");
		    skycons.add("icon",eval("Skycons."+iconName));
		    skycons.play();

		});

	}	

});



