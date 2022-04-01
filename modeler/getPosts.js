//var con = require('./db_connection');
const { MongoClient } = require('mongodb');
const url = "mongodb+srv://sainatharjun:saisai71@cluster0.zroar.mongodb.net/NFTForum?retryWrites=true&w=majority";






module.exports.getPosts = (req,res) => {
   
       
        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
            if (err) throw err;
            
            // db.close();
            var dbo = db.db("NFTForum");
            query={}
            dbo.collection("Posts").find(query).toArray(function(err, result) {
                if (err) throw err;
                  res.send(['success',result]);
              });
          });



}