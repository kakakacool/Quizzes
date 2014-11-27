$("#login").on('click',function(e){
	e.preventDefault();
	var email=$("#email").val().trim();
	var password=$("#password").val().trim();
	
	var inputs=$('.indexForm').find('input');

	var len=inputs.filter(function(){
		return $(this).val().trim()=="";
		}).popover('show').css("border","1px solid tomato").focus();
	if(!email&&!password)
		return;
	$.post("/users",{email:email,password:password},function(data){
		if(data.success){
			if(email=="admin@gmail.com"){
				window.location="/admin";
			}else{
				window.location="/users";
			}
		}else{
			$(".page-header").addClass("alert-warning",2000,"easeOutBounce" );
			$(".page-header h3").html(data.text);
		}
	});
});
$('.respond').on('click',function(e){
	e.preventDefault();
});
$("#register").on('click',function(e){
	e.preventDefault();
	var fullname=$(".fullname").val().trim();
	var username=$(".username").val().trim();
	var email=$(".email").val().trim();
	var password=$(".password").val().trim();
	var inputs=$('.tani').find('input');
	inputs.filter(function(){
		return $(this).val().trim()=="";
	}).popover('show');
	if(!password||!email||!username||!fullname)
		return;

	$.post("/",{fullname:fullname,username:username,email:email,password:password},function(data){
		if(data.success){
			inputs.val("");
			$('.registration').modal('hide');
			$(".page-header").addClass("alert-success",1500,"easeOutBounce" );
			$(".page-header h3").html(data.text+" please log in");
		}else{
			$(".modal-header").addClass("alert-warning",1500,"easeOutBounce" );
			$(".modal-header h3").html(data.text);
		}
	});
});