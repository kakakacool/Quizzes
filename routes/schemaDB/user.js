var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var userSchema=new Schema({
	email:{type:String,index: { unique: true },required:true},
	password:{type:String,required:true}
})

exports.userSchema=userSchema;