var mongoose=require('mongoose');
var questionSchema=require('./schemaDB/question').questionSchema;
var questionModel=mongoose.model("questions",questionSchema)

exports.changeQuestion=function(req,res) {
	var question=JSON.parse(req.body.obj);
	var _id=question._id;
	delete question._id
	
	for(var i=0;i<question.answers.length-1;i++){
		if(question.answers[i]==""){
			question.answers.splice(i,i+1);
		}
	}
	questionModel.update({_id:_id},question,function(err,data){
		if(err){
			res.json({success:false,text:"There was problem while changing question"});
		}else{
			res.json({success:true,text:"Question Changed"});
		}
	})
}  