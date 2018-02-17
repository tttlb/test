

var express = require("express");
var superagent=require("superagent");

var app = express();
  


app.get('/',function(req,res,next){
    var city=req.query.city;
    superagent.get('http://www.sojson.com/open/api/weather/json.shtml?city='+city)
    .end(function(err,sres){

        if(err){
			return next(err);
        };
        var data=sres.text;
        console.log(data);
        res.send(data);
          });

});

 

app.listen(3000,function(req,res){
console.log('app is running at port 3000');
});