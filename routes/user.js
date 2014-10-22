var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var userSchema=new Schema({
	email:{type:String,unique:true,required:true,index:true},
	password:{type:String,required:true,index:true}
})

exports.user=function(req,res){

	res.redirect("/user");
}