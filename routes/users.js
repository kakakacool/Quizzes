

exports.users=function(req,res) {
	res.send(req.cookies.email);
}