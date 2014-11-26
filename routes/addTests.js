var mongoose=require('mongoose');
var testsSchema=require('./schemaDB/test').testsSchema;
var quizzesModel=mongoose.model("tests",testsSchema)
exports.addTests=function (req,res) {
	var name=req.body.name;
	var url=req.body.url;
	new quizzesModel({
		name:name,
		url:url
	}).save(function(err,data){
		if(err){
			res.json({success:false,text:"Test with this name or same image already exists"});
		}else{
			res.json({success:true,text:"Test saved"});
		}
	})
}
