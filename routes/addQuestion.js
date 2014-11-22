var mongoose=require('mongoose');
var questionSchema=require('./schemaDB/question').questionSchema;
var questionModel=mongoose.model("questions",questionSchema)
var conn=mongoose.connection;
exports.addQuestion=function (req,res) {
	var questions=JSON.parse(req.body.arr);
	var error=false;
	var ansArr=[];
	for(var i=0;i<questions.length;i++){
		validate(questions[i],function(err,question){
			if(err){
				console.log(err);
			}else{
				var arr=question.answers;
				var filterAns=[];
				for(var i=0;i<arr.length-1;i++){
					question.answers[i]=question.answers[i].trim();
				}
				var arr=question.answers;
				for(var i=0;i<arr.length-1;i++){
					if(arr[i]!=""){
						filterAns.push(arr[i])
					}
				}
				filterAns.push(arr[arr.length-1])
				var obj={
					text:question.text.trim(),
					answers:filterAns,
					test:question.test
				}
				ansArr.push(obj);
			}
		})
	}
	conn.collection('questions').insert(ansArr,function(err,data){
		console.log(data);
		if(error||err){
			res.json({success:false,text:"Some Question(s) not saved"});
		}else{
			res.json({success:true,text:"Question(s) saved"});
		}	
	})
}
function validate(obj,callback){
	var err=false;
	if(obj.text==""){
		err=true;
	}
	var arr=obj.answers;
	var filterArr=[];
	for(var i=0;i<arr.length-1;i++){
		if(arr[i].trim()!=""){
			filterArr.push(arr[i])
		}
	}
	if(filterArr.length<2){
		err=true;
	}
	if(arr[arr.length-1]==-1){
		err=true;
	}
	callback(err,obj);
}