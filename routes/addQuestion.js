var mongoose=require('mongoose');
var questionSchema=require('./schemaDB/question').questionSchema;
var questionModel=mongoose.model("questions",questionSchema)

exports.addQuestion=function (req,res) {
	var questions=JSON.parse(req.body.arr);
	var error=false;
	for(var i=0;i<questions.length;i++){
		if(validate(questions[i])){
			var question=questions[i];
			var arr=question.answers;
			var filterAns=[];
			for(var i=0;i<arr.length-1;i++){
				if(arr[i].trim()!=""){
					filterAns.push(arr[i].trim())
				}
			}
			filterAns.push(arr[arr.length-1])
			new questionModel({
				text:question.text.trim(),
				answers:filterAns,
				test:question.test
			}).save(function(err,data){
				if(err){
					error=true;
				}
			})
		}else{
			error=true;
		}
	}
	if(error){
		res.json({success:false,text:"Some Question(s) not saved"});
	}else{
		res.json({success:true,text:"Question(s) saved"});
	}	
}
function validate(obj){
	if(obj.text==""){
		return false;
	}
	var arr=obj.answers;
	var filterArr=[];
	for(var i=0;i<arr.length-1;i++){
		if(arr[i].trim()!=""){
			filterArr.push(arr[i])
		}
	}
	if(filterArr.length<2){
		return false;
	}
	if(arr[arr.length-1]==-1){
		return false;
	}
	return true;
}