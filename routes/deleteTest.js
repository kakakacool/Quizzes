var mongoose=require('mongoose');
var testsSchema=require('./schemaDB/test').testsSchema;
var testsModel=mongoose.model("tests",testsSchema);


exports.deleteTest=function(req,res) {
	var test=req.params.test;
	testsModel.remove({name:test},function(err,data){
		if(err){
			console.log("error while removing tests");
		}else{
			res.send("test deleted");
		}
	});
}