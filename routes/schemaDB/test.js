var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var testsSchema=new Schema({
	name:{type:String,index: { unique : true }},
	url:{type:String,index: { unique:true }}
});

exports.testsSchema=testsSchema;