//var con = require('./db_connection');
const { MongoClient } = require('mongodb');
const url = "mongodb+srv://sainatharjun:saisai71@cluster0.zroar.mongodb.net/SVSB?retryWrites=true&w=majority";
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );
const fuzzyis = require('fuzzyis');


function putNFT(a,post){
  console.log(post)
  console.log('Plagiarism Check Done')
  if(a='ok'){

    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
      var dbo = db.db("NFTForum");
      dbo.collection("NFTs").insertOne(post, function(err, resultt) {
          if (err) throw err;
         
         flag=0;
          console.log(resultt)
        });
        var send="NFT Created!"
        return send
      
      });


  }
}


module.exports.fuzzyLogic = async (req,res) => {
  req.body.post=JSON.parse(req.body.post)
  const {LinguisticVariable, Term, Rule, FIS} = fuzzyis;
  
  // describe new system, input and output variables
  
  const system = new FIS('Correctness system');
  
  // init and add variables into system
  
  const CORRECTNESS = new LinguisticVariable('correctness', [0, 30]);
  system.addOutput(CORRECTNESS);
  
  const UPVOTES = new LinguisticVariable('UPVOTES', [0, 10]);
  const EXPERIENCE = new LinguisticVariable('experience', [0, 10]);
  
  system.addInput(UPVOTES);
  system.addInput(EXPERIENCE);
  
  // describe terms for each variable
  
  UPVOTES.addTerm(new Term('poor', 'gauss', [2.123, 0]));
  UPVOTES.addTerm(new Term('normal', 'gauss', [2.123, 5]));
  UPVOTES.addTerm(new Term('excellent', 'gauss', [2.123, 10]));
  
  EXPERIENCE.addTerm(new Term('bad', 'trapeze', [0, 0, 1, 3]));
  EXPERIENCE.addTerm(new Term('good', 'trapeze', [7, 9, 10, 10]));
  
  CORRECTNESS.addTerm(new Term('wrong', 'triangle', [0, 5, 10]));
  CORRECTNESS.addTerm(new Term('correct', 'triangle', [10, 15, 20]));
  
  // describe system rules
  
  // NB! It's important to preserve the same order in description
  // as you had when defined inputs
  // e.g. if you've added SERVICE first, then first value should be one of the possible values for this variable
  
  system.rules = [
    new Rule(
        ['poor', 'bad'],
        ['wrong'],
        'and'
    ),
    new Rule(
      ['poor', 'good'],
      ['wrong'],
      'and'
  ),
    new Rule(
        ['normal', 'bad'],
        ['wrong'],
        'and'
    ),
    new Rule(
      ['normal', 'good'],
      ['correct'],
      'and'
  ),
    new Rule(
        ['excellent', 'good'],
        ['correct'],
        'and'
    ),
    new Rule(
      ['excellent', 'bad'],
      ['correct'],
      'and'
  ),
  ];
  // console.log(req.session.user)
  // get some calculation
  var correct=system.getPreciseOutput([req.body.post.upvotes, req.session.user])
  console.log(correct)
  if(correct<=10){
  console.log(
    'wrong'
  );
  
}
  else{
    console.log('correct')
    $.ajax({
      url:'plagiarismCheck',
      type:'post',
      success:res.send(putNFT('ok',req.body.post))
    })
  }

  

}