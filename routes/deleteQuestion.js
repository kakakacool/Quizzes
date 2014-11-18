var mongoose=require('mongoose');
var questionSchema=require('./schemaDB/question').questionSchema;
var questionModel=mongoose.model("questions",questionSchema)

exports.deleteQuestion=function(req,res) {
	var _id=req.body._id;

	questionModel.remove({_id:_id},function(err,data){
		if(err){
			res.json({success:false,text:"There was problem while Deleting question"});
		}else{
			res.json({success:true,text:"Question Deleted"});
		}
	})
}