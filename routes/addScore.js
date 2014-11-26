var mongoose=require('mongoose');

var scoresSchema=require('./schemaDB/scores').scoresSchema;
var scoreModel=mongoose.model('scores',scoresSchema);

var userSchema=require('./schemaDB/user').userSchema;
var userModel=mongoose.model('users',userSchema);



exports.addScore=function (req,res) {
	var email=req.cookies.email;
	var test=req.body.test;
	var score=req.body.score;
	userModel.find({email:email},{_id:1},function(err,data){
		var _id=data[0]._id;
		scoreModel.update({taker:_id,testName:test},{testName:test,taker:_id,score:score},{upsert:true},function(err,data){
			res.send(score);
		});
	});
	
}