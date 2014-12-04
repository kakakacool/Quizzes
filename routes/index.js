
exports.index=function(req,res){
	if(req.cookies.username){
		res.redirect('/users')
	}
	res.render('index',{title:'Quizzes'})
}