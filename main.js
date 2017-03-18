function pullRecentNewsArticles(query) {
    $(function() {
        var params = {
            // Request parameters
            "q": query,
            "count": "10",
            "offset": "0",
            "mkt": "en-us",
            "safeSearch": "Moderate",
        };
      
        $.ajax({
            url: "https://api.cognitive.microsoft.com/bing/v5.0/news/search?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","eca08643fb7245af80c9e6ad60e49bfe");
            },
            type: "GET",
            // Request body
            data: "{body}",
        })
        .done(function(data) {
            console.log("pulling news success");
            var articles = data["value"]
            var bingAnalyses = articles.map(function(a) {
            	var description = a['description']
            	var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function() {
    				if (this.readyState == 4 && this.status == 200) {
    					console.log(xhttp.responseText)
       					return xhttp.responseText
    				}
				}
				xhttp.open("GET", "http://172.30.33.79/watson?text=" + description, true);
				xhttp.send();
            })

        })
        .fail(function() {
            alert("error");
        });
    });
}

function stripInputURL(url) {
	var array = [];
	$( "div" ).each(function( index ) {
		array[index] = $( this ).text();
	});
	return array
}

function test() {
	$.ajax({
       url: 'http://www.cnn.com/2017/03/18/politics/trump-border-wall-specifications/index.html',
       type: 'GET',
       success: function(res) {
        	$(res.responseText).find('div.content').each(function(){
        		alert("here")
        		console.log($(this));
     		});
    	}
	});
}

pullRecentNewsArticles('trump')


