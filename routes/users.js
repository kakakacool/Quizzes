var mongoose=require('mongoose');
<<<<<<< HEAD

var scoresSchema=require('./schemaDB/scores').scoresSchema;
var scoreModel=mongoose.model('scores',scoresSchema);

var testsSchema=require('./schemaDB/test').testsSchema;
var testsModel=mongoose.model("tests",testsSchema);

var userSchema=require('./schemaDB/user').userSchema;
var userModel=mongoose.model('users',userSchema);

var async=require('async');
=======
var testsSchema=require('./schemaDB/test').testsSchema;

var testsModel=mongoose.model("tests",testsSchema);
>>>>>>> 6f004bee1a86ffb051373bf6a9b55579f11b8bf9

exports.users=function(req,res) {
	var email=req.cookies.email;
	if(email===undefined||email=="admin@gmail.com"){
		res.redirect('/');
	}else{
<<<<<<< HEAD
		async.waterfall([
			function(callback){
				testsModel.find({},{_id:0,__v:0},function(err,data){
					callback(null,data);
				});
			},
			function(data,callback){
				var arr=[];				
				data.forEach(function(i){
					arr.push(i.name)
				})
				userModel.find({email:email},{_id:1},function(err,data){
					var _id=data[0]._id;
					callback(null,arr,_id);
				});
			},
			function(arr,_id,callback){
				scoreModel.find({testName:{'$in':arr},taker:_id},{_id:0,taker:0},function(err,data){
					callback(null,data);
				});
			},
			function(scores,callback){
				testsModel.find({},{_id:0,__v:0},function(err,data){
					objArr={};
					data.forEach(function(i){
						objArr[i.name]={
							name:i.name,
							url:i.url,
							score:0
						}
					})
					data.forEach(function(i){
						scores.forEach(function(j){
							if(i.name==j.testName){
								objArr[i.name]={
									name:i.name,
									url:i.url,
									score:j.score
								}
							}							
						})
					})
					callback(null,objArr);
				});
			},
			// function(objArr,callback){
			// 	testsModel.aggregate({},{_id:0,__v:0},function(err,data){
			// 		callback(null,data);
			// 	});
			// }
		],
		function(err,data){
=======
		testsModel.find({},{_id:0,__v:0},function(err,data){
>>>>>>> 6f004bee1a86ffb051373bf6a9b55579f11b8bf9
			if(err||data.length==0){
				res.render('user',{title:"No test found"});
			}else{
				res.render('user',{title:"Quizzes",tests:data});
			}
		});
	}
}