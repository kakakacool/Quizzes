var mongoose=require('mongoose');
var userSchema=require('./schemaDB/user').userSchema;
var model=mongoose.model("users",userSchema);



exports.register=function(req,res){
	var fullname=req.body.fullname.trim();
	var username=req.body.username.trim();
	var email=req.body.email.trim();
	var password=req.body.password.trim();
	if(fullname==""||username==""||email==""||password==""){

	}else{
		new model({
			fullname:fullname,
			username:username,
			email:email,
			password:password
		}).save(function(err,data){
			if(err){
				res.json({success:false,text:"User with this email or username already exists!"}); 
			}
			else{
				res.json({success:true,text:"Your registration was successfull"});	
			}
		})
	}
}