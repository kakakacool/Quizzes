var mongoose=require('mongoose');
var testsSchema=require('./schemaDB/test').testsSchema;

var testsModel=mongoose.model("tests",testsSchema);

exports.users=function(req,res) {
	var email=req.cookies.email;
	if(email===undefined||email=="admin@gmail.com"){
		res.redirect('/');
	}else{
		testsModel.find({},{_id:0,__v:0},function(err,data){
			if(err||data.length==0){
				res.render('user',{title:"No test wwas found"});
			}else{
				res.render('user',{title:"Quizzes",tests:data});
			}
		});
	}
}