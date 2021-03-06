var mongoose=require('mongoose');
var questionSchema=require('./schemaDB/question').questionSchema;
var questionModel=mongoose.model("questions",questionSchema)
var scoresSchema=require('./schemaDB/scores').scoresSchema;
var scoreModel=mongoose.model('scores',scoresSchema);

var dif=3*86400000;
exports.getQuestion=function(req,res) {
	var test=req.url.split('=')[1];
	var _id=req.cookies._id;
	scoreModel.findOne({testName:test,taker:_id},{passDate:1,_id:0},function(err,time){
		var today=new Date();
		var str="Earliest day you can retake this test is: ";
		if(!err&&time&&today-time.passDate<dif){
			var nextPass=(time.passDate).getTime()+dif;
			var nextDate=new Date(nextPass);
			res.json({success:false,text:str+nextDate});
		}else{
			questionModel.find({test:test},function(err,data){
				if(err||data.length==0){
					res.json({success:false,text:"Question(s) not found"});
				}else{
					res.json({success:true,arr:data});
				}
			});
		}
	})
	
}