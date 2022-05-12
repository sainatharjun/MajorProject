//var con = require('./db_connection');
const { MongoClient } = require('mongodb');
const url = "mongodb+srv://sainatharjun:saisai71@cluster0.zroar.mongodb.net/SVSB?retryWrites=true&w=majority";
const { JSDOM } = require( "jsdom" );
const { post } = require('jquery');
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );





module.exports.plagiarismCheck = async (req,res) => {
      var post=JSON.parse(req.body.post)
       console.log('Plagiarism Check in Progress')
  var request = require('request');
  var accessToken;

  headers = {
      'Content-type': 'application/json'
      
  };
  
  
  var dataString = {
    "email": "sainatharjun4@gmail.com",
    "key": "be600c6d-a89a-4a68-b16f-3baa147a072c"
  };
  
  var options = {
      url: 'https://id.copyleaks.com/v3/account/login/api',
      method: 'POST',
      headers: headers,
      body: JSON.stringify(dataString)
  };
  
  function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        body=JSON.parse(body)
          accessToken=body['access_token']
          console.log(body);
      }

      headers = {
        'Content-type': 'application/json',
        'Authorization': 'Bearer '+accessToken
    };
    
    
    var dataString = {
      "url": "http://example.com",
      "properties": {
        "action": 0,
        "includeHtml": false,
        "developerPayload": "Custom developer payload",
        "sandbox": true,
        "expiration": 480,
        "author": {
          "id": "Author id"
        },
        "webhooks": {
          "newResult": "http://example.com/webhook/new-result",
          "status": "http://localhost:3000/{STATUS}/100"
        },
        "filters": {
          "identicalEnabled": true,
          "minorChangesEnabled": true,
          "relatedMeaningEnabled": true,
          "minCopiedWords": 10,
          "safeSearch": false,
          "domains": [
            "www.example.com"
          ],
          "domainsMode": 1
        },
        "scanning": {
          "internet": true
        },
        "exclude": {
          "quotes": false,
          "titles": false,
          "htmlTemplate": false
        },
        "sensitivityLevel": 3
      }
    };
    
    var options = {
        url: 'https://api.copyleaks.com/v3/education/submit/url/003',
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(dataString)
    };
    
    function callback(error, response, body) {
      // console.log(body);
        // console.log(response);
      // console.log(error);
    
    
        if (!error) {
             console.log(body);
             
        }
    }
    
    request(options, callback);
    


  }
  
   request(options, callback);




  //--------------------------------------

  res.send('Sent for Plagiarism Check')
  

}