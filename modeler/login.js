//var con = require('./db_connection');
const { MongoClient } = require('mongodb');
const url = "mongodb+srv://sainatharjun:saisai71@cluster0.zroar.mongodb.net/SVSB?retryWrites=true&w=majority";






module.exports.login = (req,res) => {
   
       
        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
            if (err) throw err;
            
            // db.close();
            var dbo = db.db("NFTForum");
            query={email:req.body.email}
            dbo.collection("Users").find(query).toArray(function(err, result) {
                if (err) throw err;
                if(result.length>0&&req.body.password==result[0].password){
                  
                  req.session.user=result[0];
                  //console.log(req.session.user)
                  res.send(['success',result[0]]);
                }
                else{
                  res.send('failed');
                }
              });
          });



}