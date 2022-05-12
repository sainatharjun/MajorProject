//var con = require('./db_connection');
const { MongoClient } = require('mongodb');
const url = "mongodb+srv://sainatharjun:saisai71@cluster0.zroar.mongodb.net/SVSB?retryWrites=true&w=majority";







module.exports.addReply = async (req,res) => {

        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
          var dbo = db.db("NFTForum");
          console.log(req.body.pId)
          dbo.collection("Posts").updateOne({pId:parseInt(req.body.pId)},{$set:{replies:JSON.parse(req.body.replies)}}, function(err, res) {
              if (err) console.log(err) ;
             flag=0;
              console.log(res)
            });
            var send="reply added!"
            res.send(send)

          
          });
}