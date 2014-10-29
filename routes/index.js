
exports.index=function(req,res){
	res.clearCookie('email');
	res.render('index',{title:'Quizzes'})
}