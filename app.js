var PythonShell = require('python-shell')
var express = require('express')
var app = express()

app.get('/' , function (req , res) {
  var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
  var natural_language_understanding = new NaturalLanguageUnderstandingV1({
    'username': '36c8ab97-4c8a-4dd8-90c0-3c7d764470bc',
    'password': 'StsxGCcAI6ct',
    'version_date': '2017-02-27'

  });
  
  var text = req.query.text;
  var parameters = {
    'text': text,
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
  natural_language_understanding.analyze(parameters, function(err, response) {

    if (err)
      res.send('error:', err);
    else
      res.send(JSON.stringify(response, null, 2));
      console.log(req.query.id);
      
  });
  var scraper = new PythonShell('scraper.py')
  scraper.send(req.query.url)
  scraper.on('message', function(message) {
 	console.log('Scraper says ' + message)
	//console.log(message.innerHTML)
  })
  scraper.end(function (err) {
	if (err) throw err;
	console.log('scraper finished')
  })

  var bing = new PythonShell('bing.py')
  bing.send(req.query.query)
  bing.on('message', function(message) {
  	console.log('bing says ' + message)
  })

  bing.end(function(err) {
	if (err) throw err;
	console.log('bing finished')
  })
  //PythonShell.run('scraper.py', function(err) {
//	if (err) throw err;
//	console.log('scraper successful')
  //})

  //var options = {
//	args: [req.query.testQuery]
 // }
  //PythonShell.run('test.py', options, function(err, results) {
//	if (err) throw err;
//	console.log('results: ' + results)
 // })
})

app.listen(80, function() {
	console.log("Listenig on port 80 for http calls")
})

app.listen(3000,function () {
  console.log("Started trial Watson interface on port 3000")
})

//
// var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
// var natural_language_understanding = new NaturalLanguageUnderstandingV1({
//   'username': '36c8ab97-4c8a-4dd8-90c0-3c7d764470bc',
//   'password': 'StsxGCcAI6ct',
//   'version_date': '2017-02-27'
// });
//
// var parameters = {
//   'text': 'IBM is an American multinational technology company headquartered in Armonk, New York, United States, with operations in over 170 countries.',
//   'features': {
//     'entities': {
//       'emotion': true,
//       'sentiment': true,
//       'limit': 2
//     },
//     'keywords': {
//       'emotion': true,
//       'sentiment': true,
//       'limit': 2
//     }
//   }
// }
//
// natural_language_understanding.analyze(parameters, function(err, response) {
//   if (err)
//     console.log('error:', err);
//   else
//     console.log(JSON.stringify(response, null, 2));
// });
// //
// //
// // //example request
