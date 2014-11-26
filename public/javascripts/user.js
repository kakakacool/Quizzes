var qArr,k=0,n;
var count;
var array=[];
var test;
$('.startQuiz').on('click',function(){
	test=$(this).attr("name");
	$.get('/admin/question',{test:test},function(data){
		if(data.success){
			qArr=_.shuffle(data.arr);
			n=data.arr.length;
			count=0;
			nexti();
			bindi();
			$('#next').on('click',function(){
				$(this).addClass('disabled');
				if(selected==qArr[k-1].answers[qArr[k-1].answers.length-1])
					count++;
				nexti();
				bindi();
			})
		}else{
			$('.modal-title').html("Questions not found for this category");
		}
	});
})

var nexti=(function(){
	$('.answers').text("");
	$('.question').text(qArr[k].text);
	for(var i=0;i<qArr[k].answers.length-1;i++){
		$('.answers').append($("<p name='"+(i+1)+"'></p>").text(qArr[k].answers[i]));
		
	}
	if(k==n-1){
		$('#next').addClass('btn-danger');
		$('#next').unbind('click');
		$('#next').html('Finish');
		$('#next').on('click',function(){
			if(selected==qArr[k-1].answers[qArr[k-1].answers.length-1])
					count++;
			$('.answers').text("");
			var answersArr=Math.ceil((count/n)*100);
			
			$.post('/users/scores',{test:test,score:answersArr},function(data){
				$('.question').text("YOUR SCORE IS "+data+" %");
			});
			$('#next').remove();
		});
	}
	k++;
	 
});
var selected;
function bindi(){
	$('.answers p').on('mouseover',function(){
		this.style.border="3px solid DodgerBlue"
	}).on('mouseout',function(){
		this.style.border="3px solid Lavender"
	}).on('click',function(){
		selected=Number($(this).attr('name'));
		$('#next').removeClass('disabled');
		$(this).siblings().css('border-color','Lavender');
		$(this).siblings().bind('mouseout',function(){
			this.style.border="3px solid Lavender"
		});
		this.style.border="3px solid DodgerBlue"
		$(this).unbind('mouseout');

	})
}
$('.close').click(function(){
	location.reload();
})
$('.closed').click(function(){
	location.reload();
})
