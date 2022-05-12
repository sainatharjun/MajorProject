//var con = require('./db_connection');
const { MongoClient } = require('mongodb');
const url = "mongodb+srv://sainatharjun:saisai71@cluster0.zroar.mongodb.net/SVSB?retryWrites=true&w=majority";
const BigchainDB = require('bigchaindb-driver')




module.exports.register = async (req,res) => {
  req.body.keys= new BigchainDB.Ed25519Keypair()

        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
            if (err) throw err;
            var dbo = db.db("NFTForum");
            var flag=0;
            var query={username:req.body.username}
            dbo.collection("Users").find(query).toArray(function(err, result) {
             
              if(result.length>0){
              flag=1;
              res.send('Account already exists');
               }
               else{
                dbo.collection("Users").insertOne(req.body, function(err, res) {
                  if (err) throw err;
                 
                 flag=0;
                  
                });
                var send="Account Created!"
                res.send(send)
               }
            })
           
             
          
          
           
          });

          

}