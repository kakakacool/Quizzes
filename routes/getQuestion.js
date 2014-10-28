var mongoose=require('mongoose');
var questionSchema=require('./schemaDB/question').questionSchema;
var questionModel=mongoose.model("questions",questionSchema)

exports.getQuestion=function(req,res) {
	var test=req.url.split('=')[1];
	questionModel.find({test:test},function(err,data){
		if(err||data.length==0){
			res.json({success:false,text:"Question(s) not found"});
		}else{
			res.json({success:true,arr:data});
		}
	});
}