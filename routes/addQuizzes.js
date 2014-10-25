var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var quizzesSchema=new Schema({
	name:{type:String,index: { unique : true }},
	url:{type:String,index: { unique:true }}
});
var quizzesModel=mongoose.model("quizzes",quizzesSchema)
exports.addQuizzes=function (req,res) {
	var name=req.body.name;
	var url=req.body.url;
	new quizzesModel({
		name:name,
		url:url
	}).save(function(err,data){
		if(err){
			res.json({success:false,text:"Quizzes with this name or same image already exists"});
		}else{
			res.json({success:true,text:"Quizzes saved"});
		}
	})
}