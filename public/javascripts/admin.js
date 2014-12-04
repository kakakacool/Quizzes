$('.logout').on('click',function(){
	delete_cookie('username')
	delete_cookie('email')
	delete_cookie('_id')
	window.location.replace('/');
})
function delete_cookie( name ) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
$('#addTests').on('click',function(e){
	e.preventDefault();
	var testsName=$("#testsName").val();
	var testsImage=$("#testsImage").val().split("\\");
	testsImage="/images/"+testsImage[testsImage.length-1];
	if(testsName==""||testsImage==""){
		$("#createTests").addClass("alert-danger");
		$("#createTests").html("Fill all fields");				
	}else{
		$.post('/admin',{name:testsName,url:testsImage},function(data){
			if(data.success){
				$("#createTests").removeClass("alert-danger");
				$("#createTests").addClass("alert-success");
				$("#createTests").html(data.text);
				$("#addTests").addClass("disabled");
				setTimeout(function(){
					window.location='/admin';
				},500);
			}else{
				$("#createTests").addClass("alert-danger");
				$("#createTests").html(data.text);	
			}
		});
	}
});


//add questions
var test="";
$('.add').on('click',function(){
	test=$(this).attr('name');
})
$("#saveQuestion").on('click',function(){
	var children=$('.questionsForm').children();
	var n=children.length;
	var questions=[];
	for(var i=0;i<n;i++){
		var questionText=$(children[i]).find('textarea');
		var answers=$(children[i]).find('input');
		var obj={text:"",answers:[],test:""};
		obj.text=$(questionText).val();
		for(var j=0;j<answers.length-1;j++){
			obj.answers.push($(answers[j]).val());
		}
		if(!eval($(answers[answers.length-1]).val())){
			obj.answers.push(-1);
		}
		else{
			obj.answers.push(Number($(answers[answers.length-1]).val()));
		}

		obj.test=test;
		questions.push(obj);
	}
	$.post('/admin/question',{arr:JSON.stringify(questions)},function(data){
		if(data.success){
				$("#questionResult").removeClass("alert-danger");
				$("#questionResult").addClass("alert-success");
				$("#questionResult").html(data.text);
				$("#addTests").addClass("disabled");
				setTimeout(function(){
					window.location='/admin';
				},1000);
			}else{
				$("#questionResult").addClass("alert-danger");
				$("#questionResult").html(data.text);
				setTimeout(function(){
					window.location='/admin';
				},1000);	
			}
	});
	
});

$(".addAnswer").on('click',function(e){
	e.preventDefault();
	$(this).prev().before("<input class='answer form-control' placeholder='Enter answer' type='text'>");
})
				
$("#addQuestion").on('click',function(e){
	e.preventDefault();
	$('.questionsForm').append(
		"<div class='form-group row' style='border:1px solid orange;border-radius:5px'>"+
			"<div class='col-md-10 col-md-offset-1'>"+
				"<div class='form-group'>"+
					"<label for='name'>Question:</label>"+
					"<textarea class='form-control questionText' placeholder='Enter question'></textarea>"+
				"</div>"+
				"<div class='form-group answers'>"+
					"<label for='answers'>Answers:</label>"+
					"<input class='answer form-control' placeholder='Enter answer' type='text'>"+
					"<input class='answer form-control' placeholder='Enter answer' type='text'>"+
					"<input class='answer form-control' placeholder='Enter correct answer' type='number'>"+
					"<button class='btn btn-default addAnswer'>add answer</button>"+
				"</div>"+
			"</div>"+
		"</div>");
	$(".addAnswer").unbind('click');
	$(".addAnswer").on('click',function(e){
		e.preventDefault();
		$(this).prev().before("<input class='answer form-control' placeholder='Enter answer' type='text'>");
	})
})

//change question
$(".change").on('click',function(){
	var test=$(this).attr("name");
	$.get('/admin/question',{test:test},function(data){
		if(data.success){
			var qArr=data.arr;
			$('.changeForm').html("");
			for(var i=0;i<qArr.length;i++){
				var str="";
				var arr=qArr[i].answers;
				str+="<div class='form-group row' style='border:1px solid orange;border-radius:5px'>"+
						"<div class='col-md-10 col-md-offset-1'>"+
							"<div class='form-group'>"+
								"<label for='name'>Question:</label>"+
								"<textarea class='form-control questionText'>"+qArr[i].text+"</textarea>"+
							"</div>"+
							"<div class='form-group answers'>"+
								"<label for='answers'>Answers:</label>";
				for(var j=0;j<arr.length-1;j++){
					str+="<input class='answer form-control' value='"+arr[j]+"' type='text'>";
				}
				str+="<input class='answer form-control' value='"+arr[arr.length-1]+"' type='text'>";
				str+="<button class='btn btn-warning changeQ ' name='"+qArr[i]._id+"' data-loading-text='Saving...'>change</button>"+
						"<button class='btn btn-danger deleteQ ' name='"+qArr[i]._id+"'>delete</button>"+
							"</div>"+
						"</div>"+
					"</div>";
				$('.changeForm').append(str);
			}
			$('.changeQ').on('click',function(e){
				e.preventDefault();
				var btn = $(this)
				btn.button('loading')
				var _id=btn.attr("name");
				var divi=btn.parent().parent()
				var text=divi.find('textarea').val();
				var ans=divi.find('input');
				var answers=[];
				for(var i=0;i<ans.length;i++){
					answers.push($(ans[i]).val());
				}
				var object={}
				object._id=_id;
				object.text=text;
				object.answers=answers;
				$.ajax({
						url:'/admin/question',
						type:'PUT',
						data:{obj:JSON.stringify(object)},
						success:function(data){
							alert('question changed')
						},
						error:function(err){
							alert(err)
						}
					}).always(function () {
					btn.button('reset')
				});
			})
			$('.deleteQ').on('click',function(e){
				e.preventDefault();
				var btn = $(this)
				btn.button('loading')
				var _id=btn.attr("name");
				$.ajax({
						url:'/admin/question',
						type:'DELETE',
						data:{_id:_id},
						success:function(data){
							btn.closest('.row').remove();
						},
						error:function(err){
							alert(err)
						}
					}).always(function () {
					btn.button('reset')
				});
			})

			$(".changeQuestions").removeClass("alert-danger");
			$(".changeQuestions").addClass("alert-success");
			$(".changeQuestions").html(data.data);
		}else{
			$(".changeQuestions").addClass("alert-danger");
			$(".changeQuestions").html(data.text);	
		}
	});
});


//delete test
$(".delete").on('click',function(){
	$.ajax({
		url:'/admin/'+$(this).attr('name'),
		type:"DELETE",
		success:function(result){
			location.reload();
		}
	})
})
