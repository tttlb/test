var express = require('express');
var utility = require('utility');
var superagent = require('superagent');
var cheerio = require('cheerio');

var app = express();

app.get('/1',function (req,res){
var q = req.query.q;
var md5Value = utility.sha1(q);
res.send(md5Value);
});

app.get('/',function (req,res,next){
	superagent.get('https://cnodejs.org/')
	.end(function(err,sres){
		if(err){
			return next(err);
		}
		var $ =cheerio.load(sres.text);
		var items = [];
		$('#topic_list .cell').each(function(idx,element){
			var $element = $(element);
			var $element1 = $element.find('.topic_title');
			var $element2 = $element.find('.user_avatar img')
			items.push({
				title:$element1.attr('title'),
				href:$element1.attr('href'),
				author:$element2.attr('title')

			});
			
		});
		
		res.send(items);
	});
});

app.listen(3000,function(req,res){
console.log('app is running at port 3000');
});