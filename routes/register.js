var mongoose=require('mongoose');
var userSchema=require('./schemaDB/user').userSchema;
var model=mongoose.model("users",userSchema);



exports.register=function(req,res){
<<<<<<< HEAD
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
=======
<<<<<<< HEAD
	if(req.body.email.trim()==""||req.body.password.trim()==""){
=======
<<<<<<< HEAD
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
=======
	if(req.body.email==""||req.body.password==""){
>>>>>>> d8602cb6499071e98739a3297304e14c37174c1b

	}else{
		new model({
			email:req.body.email,
			password:req.body.password
		}).save(function(err,data){
			if(err){
				res.json({success:false,text:"User with this email already exists!"}); 
>>>>>>> 6f004bee1a86ffb051373bf6a9b55579f11b8bf9
			}
			else{
				res.json({success:true,text:"Your registration was successfull"});	
			}
		})
	}
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> 68ff6dc994d1ebe287868125fd2b882885c090f4
>>>>>>> d8602cb6499071e98739a3297304e14c37174c1b
>>>>>>> 6f004bee1a86ffb051373bf6a9b55579f11b8bf9
}