var qArr,k=0,n;
var count;
var array=[];
var test;
$('tbody tr:eq(0)').css('background-color','#1975FF');
$('tbody tr:eq(1)').css('background-color','#599CFF');
$('tbody tr:eq(2)').css('background-color','#8BBAFF');
$('tbody tr:eq(3)').css('background-color','#AECFFF');
$('tbody tr:eq(4)').css('background-color','#CEE2FF');
var time;
var timeInterval
$('.startQuiz').on('click',function(){
	time=0;
	test=$(this).attr("name");
	$.get('/admin/question',{test:test},function(data){
		if(data.success){
			timeInterval=setInterval(function(){
				time++
				$('.dro').html(" "+time);
			},1000);
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
			
			$.post('/users/scores',{test:test,score:answersArr,time:time},function(data){
				$('.question').text("YOUR SCORE IS "+data+" %");
				time=0;
				clearInterval(timeInterval)
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
	time=0;
})
$('.closed').click(function(){
	location.reload();
	time=0;
})

$('li a').on('click',function(e){
	e.preventDefault();
	var test=$(this).html().trim();
	$("#dLabel").html(test+" Ranking")
	var tbody=$('tbody');
	tbody.html("");
	$.get('/users/rank',{test:test},function(data){
		if(data.success){
			var arr=data.arr;
			for(var i=0;i<arr.length;i++){
				tbody.append("<tr><td>"+(i+1)+"</td><td>"+arr[i].takerUsername+"</td><td>"+arr[i].score+"</td><td>"+arr[i].time+"</td></tr>")
			}
		}else{
			alert("test not found");
		}
	});
})