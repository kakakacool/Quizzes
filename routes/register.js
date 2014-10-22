var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var userSchema=new Schema({
	email:{type:String,unique:true,required:true,index:true},
	password:{type:String,required:true}
})
var model=mongoose.model("users",userSchema);



exports.register=function(req,res){
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
exports.userSchema=userSchema;