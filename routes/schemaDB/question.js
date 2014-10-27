var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var questionSchema=new Schema({
	text:{type:String,index: { unique : true }},
	answers:[],
	test:{type:String,index:true}
});

exports.questionSchema=questionSchema;