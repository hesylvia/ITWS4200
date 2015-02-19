$(document).ready(function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showWeather);
    } else {
        $("#weatherapp").html("<h1>Geolocation is not supported by this browser.</h1>");
    }
	function showWeather(position) {
		// Send request to Open Weather Map
	    $.ajax({
	    	type: 'GET',
			// url: "https://api.forecast.io/forecast/b5cbb278610d6934fb80765a1f491426/" + position.coords.latitude + "," + position.coords.longitude + "/",
			url: "http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude+ "&APPID=2ecaf0716f9132c6b41d713b6e94a202",
			crossDomain: true,
			xhrFields: {
			    withCredentials: false
			},
			dataType: "jsonp", 
			error: function() { 
				$("#weatherapp").html("<h1>Error: Could not get weather at current location.</h1>") 
			},
		})
		// When data is received, populate html
		.done(function( data ) {
			console.log(data);
			$('#loading-image').hide();

			// Source: http://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format
			function formatAMPM(date) {
				var hours = date.getHours();
				var minutes = date.getMinutes();
				var ampm = hours >= 12 ? 'pm' : 'am';
				hours = hours % 12;
				hours = hours ? hours : 12;
				minutes = minutes < 10 ? '0'+ minutes : minutes;
			 	var strTime = hours + ':' + minutes + ' ' + ampm;
				return strTime;
			}
			var temp = parseInt(data["main"]["temp"]) - 273.15;
			temp = temp.toFixed(2);

			$("#weatherapp").css({
			   'text-align' : 'left'
			});

			$(".location").hide().html(
				"<h1>Current weather in <span>" + data["name"] + ", " + data["sys"]["country"] + "</span></h1>" +
				"<p>Current time: " + formatAMPM(new Date()) + " | Weather recorded at: " + formatAMPM(new Date(data["dt"])) + "</p>" +
				"<p>Latitude: " + data["coord"]["lat"] + " | Longitude: " + data["coord"]["lon"] + "</p>"
			).slideDown('slow');
			$(".temperature").hide().html(
				"<img src='http://openweathermap.org/img/w/" + data["weather"][0]["icon"] + ".png'/>" + 
				"<h2>" + temp + "&deg; C" + "</h2>"
			).slideDown('slow');
			$(".other").hide().html(
				"<p class='fix'>" + data["weather"][0]["description"] + "</p>" +
				"<p>Wind speed: " + data["wind"]["speed"]+ "mps</p>" + 
				"<p>Humidity: " + data["main"]["humidity"] + "&#37;</p>"
			).slideDown('slow');
		});
	}
});