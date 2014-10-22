var express=require("express");
var bodyParser=require("body-parser");
var methodOverride=require("method-override");
var cookieParser=require("cookie-parser");
var stylus=require("stylus");
var routes=require("./routes");
var userRoute=require("./routes/user");
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
		.post(userRoute.user)


app.use("/",router);

app.listen(3000,function(err,data) {
	if(err){
		console.log("error while connecting this port");
	}
	console.log("connected PORT: "+app.get('port'));
});