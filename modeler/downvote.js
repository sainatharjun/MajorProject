//var con = require('./db_connection');
const { MongoClient } = require('mongodb');
const url = "mongodb+srv://sainatharjun:saisai71@cluster0.zroar.mongodb.net/SVSB?retryWrites=true&w=majority";







module.exports.downvote = async (req,res) => {

        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
          var dbo = db.db("NFTForum");
          dbo.collection("Posts").updateOne({pId:req.body.pId},{$inc:{downvotes:-1}}, function(err, res) {
              if (err) throw err;
             
             flag=0;
              console.log(res)
            });
            var send="downvoted!"
            res.send(send)

          
          });
}