var express=require("express");
var bodyParser=require("body-parser");
var methodOverride=require("method-override");
var cookieParser=require("cookie-parser");
var routes=require("./routes");
var userRoute=require("./routes/user");
var app=express();
var router=express.Router();

app.set('port',process.env.PORT||3000);
app.set('views',__dirname+'/views');
app.set('view engine','jade');

app.use(bodyParser());
app.use(methodOverride());
app.use(express.static(__dirname+"/public"));

router
	.route('')
		.get(routes.index)
		.post(userRoute.user)






app.use("/",router);

app.listen(3000,function(err,data) {
	if(err){
		console.log("error while connecting this port");
	}
	console.log("connected PORT: "+app.get('port'));
});