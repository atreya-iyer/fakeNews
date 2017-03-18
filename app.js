var PythonShell = require('python-shell')
var express = require('express')
var app = express()

app.get('/' , function (req , res) {

  var inputArticleDivs = ""
  console.log('This is the URL: ' + req.query.url)
  var scraper = new PythonShell('scraper.py')
  scraper.send(req.query.url)
  scraper.on('message', function(message) {
    inputArticleDivs.concat(message)
  })
  scraper.end(function (err) {
    if (err) throw err;
    console.log('scraper finished')
  })

  var inputAnalysis = {}

  var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
  var natural_language_understanding = new NaturalLanguageUnderstandingV1({
    'username': '36c8ab97-4c8a-4dd8-90c0-3c7d764470bc',
    'password': 'StsxGCcAI6ct',
    'version_date': '2017-02-27'

  });
  
  var inputParameters = {
    'text': inputArticleDivs,
    'features': {
      'entities': {
        'emotion': true,
        'sentiment': true,
        'limit': 2
      },
      'keywords': {
        'emotion': true,
        'sentiment': true,
        'limit': 2
      }
    }
  }

  natural_language_understanding.analyze(inputParameters, function(err, response) {

    if (err)
      res.send('error:', err);
    else
      inputAnalysis = response
  });


  var bingArticleDivs = ""
  var bing = new PythonShell('bing.py')
  bing.send(req.query.query)
  bing.on('message', function(message) {
    bingArticleDivs.concat(message)
  })
  bing.end(function(err) {
    if (err) throw err;
    console.log('bing finished')
  })

  var bingAnalysis = {}

  

  var bingParameters = {
    'text': bingArticleDivs,
    'features': {
      'entities': {
        'emotion': true,
        'sentiment': true,
        'limit': 2
      },
      'keywords': {
        'emotion': true,
        'sentiment': true,
        'limit': 2
      }
    }
  }

  natural_language_understanding.analyze(bingParameters, function(err, response) {

    if (err)
      res.send('error:', err);
    else
      bingAnalysis = response
  });
  
  res.status(200).send(JSON.stringify(inputAnalysis, null, 2) + JSON.stringify(bingAnalysis, null, 2))
})

app.listen(80, function() {
	console.log("Listenig on port 80 for http calls")
})

app.listen(3000,function () {
  console.log("Started trial Watson interface on port 3000")
})
