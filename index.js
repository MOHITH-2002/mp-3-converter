import express from 'express';
import * as dotenv from 'dotenv'
dotenv.config();

import bodyParser from 'body-parser';
import axios from "axios"
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');
//needed to parse html data to post request
app.use(express.urlencoded({ extended:true}));
app.use(express.json());
app.get('/', function(req, res){
    res.render("app");
})
app.post("/mp3-converter",(req, res)=>{
    const Vid = req.body.vId;
    if(Vid === undefined || Vid === null || Vid === ""){
        res.render("app",{success:false, msg: "Please enter the video ID"})
    }else{
const options = {
  method: 'GET',
  url: 'https://youtube-mp36.p.rapidapi.com/dl',
  params: {id: Vid},
  headers: {
    'X-RapidAPI-Key':process.env.API_KEY,
    'X-RapidAPI-Host': process.env.HOST
  }
};

axios.request(options).then(function (response) {

  if(response.data.status === "ok"){
    return res.render("app",{success:true ,song_title:response.data.title, song_url:response.data.link})

  }
}).catch(function (error) {
return res.render("app",{success:false, msg:" Oops! Today's download limit exceeded"});
});
    }
})
const port = process.env.PORT ||3000;
app.listen(port ,function(req,res){
   console.log("server is running in port 3000");
})
