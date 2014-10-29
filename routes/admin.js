var mongoose=require('mongoose');
var testsSchema=require('./schemaDB/test').testsSchema;

var testsModel=mongoose.model("tests",testsSchema);


exports.admin=function(req,res) {
	testsModel.find({},{_id:0,__v:0},function(err,data){
		if(err||req.cookies.email!="admin@gmail.com"){
			console.log("error while getting tests");
			res.redirect('/');
		}else{
			res.render('admin',{title:'Admin Panel',tests:data});
		}
	});
}