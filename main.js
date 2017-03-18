
var express = require('express')
var app = express()

app.get('/' , function (req , res) {
  var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
  var natural_language_understanding = new NaturalLanguageUnderstandingV1({
    'username': '36c8ab97-4c8a-4dd8-90c0-3c7d764470bc',
    'password': 'StsxGCcAI6ct',
    'version_date': '2017-02-27'
  });

  var parameters = {
    'text': 'you are a terrible human being and I do not like you. Please go kill yourself.',
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
  });


})

app.listen(3000,function () {
  console.log("Started Watson interface")
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
