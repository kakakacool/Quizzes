var express=require("express");
var bodyParser=require("body-parser");
var methodOverride=require("method-override");
var cookieParser=require("cookie-parser");
var stylus=require("stylus");
var routes=require("./routes");
var loginRoute=require("./routes/login");
var usersRoute=require("./routes/users");
var adminRoute=require("./routes/admin");
var addTests=require("./routes/addTests");
var deleteTest=require("./routes/deleteTest")
var registerRoute=require("./routes/register");
var app=express();

var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/Quizzes',function(err,data){
	if(!err){
		console.log("connected to database");
	}
	else{
		return;
	}
});

app.set('port',process.env.PORT||3000);
app.set('views',__dirname+'/views');
app.set('view engine','jade');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cookieParser())
app.use(methodOverride());
app.use(stylus.middleware('./public'));
app.use(express.static(__dirname+"/public"));

var router=express.Router();

router
	.route('')
		.get(routes.index)
		.post(registerRoute.register)

router
	.route('/users')
		.get(usersRoute.users)
		.post(loginRoute.login)


router
	.route('/admin')
		.get(adminRoute.admin)
		.post(addTests.addTests)

router
	.route('/admin/:test')
		.delete(deleteTest.deleteTest)

app.use("/",router);

app.listen(3000,function(err,data) {
	if(err){
		console.log("error while connecting this port");
	}
	console.log("connected PORT: "+app.get('port'));
});