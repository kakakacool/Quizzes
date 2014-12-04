var mongoose=require('mongoose');
var userSchema=require('./schemaDB/user').userSchema;
var model=mongoose.model('users',userSchema);

exports.login=function(req,res){
	model.find({email:req.body.email,password:req.body.password},function(err,data){
		if(err||data.length==0){
			res.json({success:false,text:"User not found!"}); 
		}
		else{
			res.cookie("email",req.body.email);
			res.cookie("_id",data[0]._id);
			res.cookie("username",data[0].username);
			// console.log(req.cookies);
			// res.clearCookie("email");
			res.json({success:true});
		}
	});
}