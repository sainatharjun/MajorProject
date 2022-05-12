const { Parser } = require('json2csv');

var MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://sainatharjun:saisai71@cluster0.zroar.mongodb.net/SVSB?retryWrites=true&w=majority";

const BigchainDB = require('bigchaindb-driver')

const API_PATH = 'https://test.ipdb.io/api/v1/'
const conn = new BigchainDB.Connection(API_PATH)

const bip39 = require('bip39')


// const { request } = require("express")


function createAsset(asset, alice) {
    var data=asset
    // console.log(typeof asset.convertToCSV)
    // Construct a transaction payload
    const txCreatePaint = BigchainDB.Transaction.makeCreateTransaction(
        // Asset field
        data,
        // Metadata field, contains information about the transaction itself
        // (can be `null` if not needed)
        {
            datetime: new Date().toString(),
            //teamName: asset.teamName,
            value: asset.price,

        },
        // Output. For this case we create a simple Ed25519 condition
        [BigchainDB.Transaction.makeOutput(
            BigchainDB.Transaction.makeEd25519Condition(alice.publicKey))],
        // Issuers
        alice.publicKey
    )
    // The owner of the painting signs the transaction
    const txSigned = BigchainDB.Transaction.signTransaction(txCreatePaint,
        alice.privateKey)

    // Send the transaction off to BigchainDB
    conn.postTransactionCommit(txSigned)
        .then(res => {
            console.log('Transaction created id: '+txSigned.id);
        })
       
        return txSigned.id


        
}





module.exports.createNFT = async (req,res) => {
// var sessionStorage=req.session
// const user=sessionStorage.user;
req.body.data=JSON.parse(req.body.data)
 const userKeys = req.body.data.keys
console.log(req.body.data)
const asset = JSON.parse(req.body.data.post);
//console.log(asset)
var txnId=createAsset(asset, userKeys)
// conn.searchAssets('Barca')
//  .then(assets => console.log(assets))
// conn.getTransaction('9480e9a2bb246231f1de3e84b560feffd3abc3e2bd181c06dd4659d3b2143556').then((tx)=>{console.log(tx.outputs)})

  MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        console.log("Database created!");
        
        // db.close();
        var dbo = db.db("NFTForum");
        var myobj = {post:JSON.parse(req.body.data.post), owner:req.body.data.owner}
        // myobj.txnId=txnId
        dbo.collection("NFTs").insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
        });
      });
     //console.log(req.body)
     res.send('Data entered in bigchaindb')
}