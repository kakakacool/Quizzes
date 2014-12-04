var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var scoresSchema=new Schema({
	testName:String,
	taker:{type:Schema.Types.ObjectId,ref:'users'},
	takerUsername:String,
	score:Number,
	time:Number,
	passDate:Date
})

exports.scoresSchema=scoresSchema;