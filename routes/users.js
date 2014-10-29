

exports.users=function(req,res) {
	var email=req.cookies.email;
	if(email==undefined||email=="admin@gmail.com"){
		res.redirect('/');
	}else{
		res.render('user',{title:"users"});
	}
}