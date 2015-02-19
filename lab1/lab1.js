$(document).ready(function() {
	// save all tweets
	var tweets = [];

	// parse JSON file
	$.getJSON("tweets-clean.json", function(data) {
		$.each(data, function(num, obj) {
			var tweet = {};

			// for each tweet
			$.each(obj, function(key, val) {

				// save the text
				if (key === "text") {
					tweet["text"] = "<li class='tweet'>" + val + "</li>";
					// console.log("val = " + val);
				}

				// save the related hashtags
				else if (key === "entities") {
					var hashtags = [];
					$.each(val["hashtags"], function(k, v) {
						$.each(v, function(ht, t) {
							if (ht === "text") {
								hashtags.push("<li class='tag truncate'>#" + t + "</li>");
								// console.log("hashtag = #" + t);
							}
						});	
					});
					tweet["hashtags"] = hashtags;
					// console.log(tweet);
				}
			});
			// save the whole tweet object
			tweets.push(tweet);
		});
	}).done(function() {
		// keeps track of the current tweet index
		var ctweet = 0;

		// prints the next five or remaining tweets
		function printTweets() {
			for (var i = 0; i < 5; i++) {
				if (ctweet < tweets.length) {
					$(tweets[ctweet]["text"]).hide().prependTo('#tweets').slideDown("slow");
		    	// $("#tweets").fadeIn().prepend(tweets[ctweet]["text"]);
		    	for (ht in tweets[ctweet]["hashtags"]) {
		    		$(tweets[ctweet]["hashtags"][ht]).hide().prependTo('#tags').slideDown("slow");
		    	}
		    	ctweet++;
		    }
		    else { break; }
		  }
		}

		// runs printTweets() every 3 seconds
		function runner() {
	    printTweets();
	    setTimeout(function() {
	      runner();
	    }, 3000);
		}

		runner();
	})

});

