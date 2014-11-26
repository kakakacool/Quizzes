var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var userSchema=new Schema({
<<<<<<< HEAD
	fullname:{type:String,required:true},
	username:{type:String,index: { unique: true },required:true},
	email:{type:String,index: { unique: true },required:true},
	password:{type:String,required:true}
});
=======
	email:{type:String,index: { unique: true },required:true},
	password:{type:String,required:true}
})
>>>>>>> 6f004bee1a86ffb051373bf6a9b55579f11b8bf9

exports.userSchema=userSchema;