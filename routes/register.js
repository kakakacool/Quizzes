var mongoose=require('mongoose');
var userSchema=require('./schemaDB/user').userSchema;
var model=mongoose.model("users",userSchema);



exports.register=function(req,res){
	if(req.body.email==""||req.body.password==""){

	}else{
		new model({
			email:req.body.email,
			password:req.body.password
		}).save(function(err,data){
			if(err){
				res.json({success:false,text:"User with this email already exists!"}); 
			}
			else{
				res.json({success:true,text:"Your registration was successfull"});	
			}
		})
	}
}