require('dotenv').config()
const port= 8000;
const express=require('express');
const app=express();
const cors = require('cors');
const instagramGetUrl = require("instagram-url-direct");
const path=require('path')
// const HttpsProxyAgent = require('https-proxy-agent');
// const proxyAgent = new HttpsProxyAgent('http://172.31.2.4:8080');

app.use(cors())
console.log(__dirname);
app.use('/photo',express.static(path.join(__dirname)))
app.get('/',(req,res)=>{
    return res.send('<h1>Home</h1>')
})

app.post('/api/link',async (req,res)=>{
    try {
        const url=req.query.url;
        console.log(url);
        let links = await instagramGetUrl(url);
        if(links.results_number)
       {
        // console.log(links);
        return res.status(200).json({links});
       }
        else
        return res.status(404).json({msg:"No video/photo found"});
        
    } catch (err) {
        console.log(`error in fetching data`);
    }
})

app.listen(port,(err)=>{
    if(err) 
    console.log(`error in running serveron port : ${port}`);
    console.log(`Server is successfully running on port: ${port}`);
})