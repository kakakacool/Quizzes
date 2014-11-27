var mongoose=require('mongoose');

var scoresSchema=require('./schemaDB/scores').scoresSchema;
var scoreModel=mongoose.model('scores',scoresSchema);

exports.getRank=function(req,res) {
	var test=req.url.split('=')[1];
	scoreModel.aggregate([
		{$sort: { score : -1,time:1} },
		{$match:{testName:test}},
		{$limit:5}],function(err,data){
			if(err||data.length==0){
				res.json({success:false,text:"Test Takers not found"});
			}else{
				res.json({success:true,arr:data});
			}
	});
}