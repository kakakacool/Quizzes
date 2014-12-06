var express=require("express"),
	bodyParser=require("body-parser"),
	mongoose=require('mongoose'),
	methodOverride=require("method-override"),
	cookieParser=require("cookie-parser"),
	stylus=require("stylus"),
	routes=require("./routes"),
	loginRoute=require("./routes/login"),
	usersRoute=require("./routes/users"),
	adminRoute=require("./routes/admin"),
	addTests=require("./routes/addTests"),
	deleteTest=require("./routes/deleteTest")
	addQuestion=require("./routes/addQuestion"),
	getQuestion=require("./routes/getQuestion"),
	changeQuestion=require("./routes/changeQuestion"),
	deleteQuestion=require("./routes/deleteQuestion"),
	registerRoute=require("./routes/register"),
	scores=require('./routes/addScore'),
	rank=require('./routes/getRank'),
	app=express(),
	router=express.Router()

	mongoose.connect('mongodb://kaxi1993:kaxi@ds053090.mongolab.com:53090/quizzes',function(err,data){
		if(!err){
			console.log("connected to database");
		}
		else{
			return;
		}
	});

app.set('port', (process.env.PORT || 5000))
	.set('views',__dirname+'/views')
	.set('view engine','jade')
	.use(bodyParser.urlencoded({ extended: false }))
	.use(bodyParser.json())
	.use(cookieParser())
	.use(methodOverride())
	.use(stylus.middleware('./public'))
	.use(express.static(__dirname+"/public"))
	.use(function(req,res,next){
		if(req.url=='/'||req.url=='/users'||req.cookies.email){
			next()
		}else{
			res.redirect('/')
		}
	})

router
	.route('')
		.get(routes.index)
		.post(registerRoute.register)

router
	.route('/users')
		.get(usersRoute.users)
		.post(loginRoute.login)
router
	.route('/users/scores')
		.post(scores.addScore)

router
	.route('/users/rank')
		.get(rank.getRank);

router
	.route('/admin')
		.get(adminRoute.admin)
		.post(addTests.addTests)
router
	.route('/admin/question')
		.get(getQuestion.getQuestion)
		.post(addQuestion.addQuestion)
		.put(changeQuestion.changeQuestion)
		.delete(deleteQuestion.deleteQuestion)
		
router
	.route('/admin/:test')
		.delete(deleteTest.deleteTest)


app.use('/',router)

app.get('*', function(req, res){
  res.render('user',{title:"404 error Page not found"});
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})