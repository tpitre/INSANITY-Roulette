$(document).ready(function() {

	var i = 0,
			readyTime = 5000,
			intervalTime = 30,
			intervalBreak = 6,
			moves = [],
			$countDown = $('.countdown');

	// randomize moves
	var insanityMoves = function(){

		var randomMoves = moves[Math.floor(Math.random() * moves.length)];
	  moveDisplay = (i !== 0 && i % intervalBreak == 0) ? "BREAK" : randomMoves;

	  $('.data').html(moveDisplay);

	  var countDown = intervalTime / 1000,
	  		countDownDisplay = intervalTime / 1000,
				counter = setInterval(timer, 1000); //1000 will run it every 1 second

		if (i === 0) { $countDown.html(":" + countDown); }

		// add the timer
		function timer() {
		  countDown=countDown-1;
		  if (countDown <= 0) {
		     clearInterval(counter);
		     $countDown.html(":" + countDownDisplay);
		     document.getElementById('audio-horse').play();
		     return;
		  }
		  $countDown.html(":" + countDown);
		}
		i++;
	};

	var beginMoves = function(){

		setTimeout(function(){
			document.getElementById('audio-shaunt').play();
		}, 1500);

		setTimeout(function(){
			insanityMoves();
			setInterval(insanityMoves, intervalTime);
		}, readyTime);
	};

	$('.start a').on('click touchstart', function(){
		beginMoves();
		$('.start').addClass('hide');
		$('.settings').addClass('off')
		$('.data').removeClass('hide');

		$("input[type=checkbox]:checked").each(function() {
			moves.push($(this).val());
		});

		intervalTime = ($('.time-interval').val()) ? $('.time-interval').val() : intervalTime;
		intervalTime = intervalTime * 1000;

		intervalBreak = ($('.break-interval').val()) ? $('.break-interval').val() : intervalBreak;
	});

	// change slider value
	var timeIntervalValue = $('.time-interval-value'),
			breakIntervalValue = $('.break-interval-value');

	$('.time-interval').change(function(){
	  timeIntervalValue.html(this.value);
	});
	$('.break-interval').change(function(){
	  breakIntervalValue.html(this.value);
	});

	$('.time-interval, .break-interval').change();

	// check/uncheck all
	$('.check').toggle(function(){
    $('input:checkbox').removeAttr('checked');
    $(this).html('Check All');
  },function(){
    $('input:checkbox').attr('checked','checked');
    $(this).html('Uncheck All');
  });

  $('.open-settings').on('click', function(event) {
    $('.settings').toggleClass('on off');
    event.preventDefault();
  });

});