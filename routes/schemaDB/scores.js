var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var scoresSchema=new Schema({
	testName:String,
	taker:{type:Schema.Types.ObjectId,ref:'users'},
	score:Number
})

exports.scoresSchema=scoresSchema;