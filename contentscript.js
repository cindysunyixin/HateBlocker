var wordArray = [];

chrome.runtime.sendMessage({greeting:"getList"}, function(response) {
	console.log(response.content);
});

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		console.log(sender.tab? "from a content script:" + sender.tab.url : "from the extension");
	if (request.greeting == "background") {
		wordArray = request.content;
		sendResponse({content:wordArray});

		/************************************* Start of Image scripting ************************************* */
		$(function(){
			console.log("Image:");
			console.log(wordArray);
			//to append svg tag and css to the body
			$("body").append('<style>#css-filter-blur{-webkit-filter: blur(10px); filter:url(#blur-effect-1); }</style><svg id="svg-image-blur"><filter id="blur-effect-1"><feGaussianBlur stdDeviation="10" /></filter></svg>');

			//To iterate through all images
			var imgs = $("img");
			$.each(imgs, function( index, value ){
				var flag=false;

				if(checkValueExistsInArray(wordArray, value.alt) || checkValueExistsInArray(wordArray, value.src) || checkValueExistsInArray(wordArray, value.title)){
					flag=true;
				}

				if(flag){
					value.id="css-filter-blur";
				}
			});
		});



		//To check value exist or not in array
		function checkValueExistsInArray(wordArray, value){
			for(var key in wordArray){
				var item = wordArray[key];
				if(value.toLowerCase().indexOf(item) > -1){
					return true;
				}
			}
			return false;
		}
		/************************************* End of Image scripting ************************************* */

		walk(document.body);
		console.log("Text:");
		console.log(wordArray);

		function walk(node)
		{
			// I stole this function from here:
			// http://is.gd/mwZp7E

			var child, next;

			switch ( node.nodeType )
			{
				case 1:  // Element
				case 9:  // Document
				case 11: // Document fragment
					child = node.firstChild;
					while ( child )
					{
						next = child.nextSibling;
						walk(child);
						child = next;
					}
					break;

				case 3: // Text node
					handleText(node);
					break;
			}
		}

		function handleText(textNode)
		{
			var v = textNode.nodeValue;
			for (i = 0; i < wordArray.length; i++) {
				var replaceTextPattern = "\\b" + wordArray[i] + "\\b";
				var re = new RegExp(replaceTextPattern,"g");
				v = v.replace(re, "####")
			}
			// v = v.replace(/\bJustin\b/g, "##### #####");
			// v = v.replace(/\bmiley cyrus\b/g, "##### #####");
			// v = v.replace(/\bMiley Ray Cyrus\b/g, "##### ### #####");
			// v = v.replace(/\bBilly Ray Cyrus\b/g, "##### ### #####");
			// v = v.replace(/\bTwerk\b/g, "#####");
			// v = v.replace(/\btwerk\b/g, "#####");
			// v = v.replace(/\bTwerking\b/g, "########");
			// v = v.replace(/\btwerking\b/g, "########");
			// v = v.replace(/\bMileyCyrus\b/g, "##########");
			// v = v.replace(/\bmileycyrus\b/g, "##########");
			// v = v.replace(/\bWrecking Ball\b/g, "####### ###");
			// v = v.replace(/\bwrecking ball\b/g, "####### ###");
			// v = v.replace(/\bmileycyrus\b/g, "##########");
			// v = v.replace(/\bKardashians\b/g, "##########");
			// v = v.replace(/\bkardashians\b/g, "##########");
			// v = v.replace(/\bKim Kardashian\b/g, "### #######");
			// v = v.replace(/\bkim kardashian\b/g, "### #######");
			//
			//

			textNode.nodeValue = v;
		}









	}
});


		var _gaq = _gaq || [];
		_gaq.push(['_setAccount', 'UA-10523971-9']);
		_gaq.push(['_trackPageview']);
		_gaq.push(['_trackEvent', 'INSTALLED', '3.0']);


		(function() {
		  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		  ga.src = 'https://ssl.google-analytics.com/ga.js';
		  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		})();
