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
            alert("success");
            console.dir(data)
        })
        .fail(function() {
            alert("error");
        });
    });
}
