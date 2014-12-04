var mongoose=require('mongoose');

var scoresSchema=require('./schemaDB/scores').scoresSchema;
var scoreModel=mongoose.model('scores',scoresSchema);




exports.addScore=function (req,res) {
	var email=req.cookies.email;
	var test=req.body.test;
	var score=req.body.score;
	var time=req.body.time;
	var _id=req.cookies._id;
	var username=req.cookies.username;
	var dge=new Date()
	dge.setHours("7");
	dge.setMinutes("0");
	dge.setSeconds("0");
	console.log(test,score,time,username,_id,dge)
	scoreModel.update({taker:_id,testName:test},
		{testName:test,taker:_id,takerUsername:username,score:score,
			time:time,passDate:dge},{upsert:true},function(err,data){
				console.log(data)
		res.send(score);
	});
	
}