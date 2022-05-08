const express = require('express');
const path = require('path'); // required for absolute path while rendering html pages
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

app.use(express.static("public"));
//app.use(express.static("public/scripts"));
//app.use('./modeler');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()) ;
app.use(session({secret: 'ssshhhhh'})); // secret is necessary for managing sessions

let login = require('./modeler/login');
let register = require('./modeler/register');
let plagiarismCheck = require('./modeler/plagiarismCheck');
let fuzzyLogic = require('./modeler/fuzzyLogic');
let createPost = require('./modeler/createPost');
let getPosts = require('./modeler/getPosts');
let addReply = require('./modeler/addReply');
let upvote = require('./modeler/upvote');
let downvote = require('./modeler/downvote');
let createNFT = require('./modeler/createNFT');


// do url routing
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/detail.html'));
});


app.post('/login',(req,res)=>{
    //const s = req.session;
    login.login(req,res);
})
app.post('/register',(req,res)=>{
    //const s = req.session;
    register.register(req,res);
})
app.post('/plagiarismCheck',(req,res)=>{
    //const s = req.session;
    plagiarismCheck.plagiarismCheck(req,res);
})
app.post('/fuzzyLogic',(req,res)=>{
    //const s = req.session;
    fuzzyLogic.fuzzyLogic(req,res);
})
app.get('/getPosts',(req,res)=>{
    //const s = req.session;
    getPosts.getPosts(req,res);
})
app.post('/createPost',(req,res)=>{
    //const s = req.session;
    createPost.createPost(req,res);
})
app.post('/addReply',(req,res)=>{
    //const s = req.session;
    addReply.addReply(req,res);
})
app.post('/upvote',(req,res)=>{
    //const s = req.session;
    upvote.upvote(req,res);
})
app.post('/downvote',(req,res)=>{
    //const s = req.session;
    downvote.downvote(req,res);
})

app.post('/createNFT',(req,res)=>{
    //const s = req.session;
    createNFT.createNFT(req,res);
})

// listen @ 3000
app.listen(process.env.PORT || 3000,()=>{
    console.log('Listening at port 3000');
});


/*
inside any function, create a variable say 'sess' and assign it as req.session;
this sess is an object like our $_SESSION variable in php
we can set the name like:
    sess.name = 'Kaushik'; // this is same as $_SESSION['name'] = 'Kaushik';
*/
