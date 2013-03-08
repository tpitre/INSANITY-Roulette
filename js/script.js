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
				counter = setInterval(intervalTimer, 1000); //1000 will run it every 1 second

		if (i === 0) { $countDown.html(":" + countDown); }

		// add the interval timer
		function intervalTimer() {
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

	// set total time
	function totalTime() {
    var $tt = $('.total-time-countdown'),
    		$m = $('.time-min'),
    		$s = $('.time-sec');

    if($m.html() == 0 && $s.html() == '00') {
      $tt.html('Workout Complete!').addClass('wide');
      clearInterval(totalTime);
      clearInterval(insanityMoves);
    }
    if(parseInt($s.html()) <= 0) {
      $m.html(parseInt($m.html()-1));
      $s.html(60);
    }
    if(parseInt($s.html()) <= 10) {
    	$s.html('0' + parseInt($s.html()-1));
    }
    else {
	    $s.html(parseInt($s.html()-1));
    }
  }

	// start everything
	var beginMoves = function(){

		setTimeout(function(){
			document.getElementById('audio-shaunt').play();
		}, 1500);

		setTimeout(function(){
			insanityMoves();
			setInterval(totalTime,1000);
			setInterval(insanityMoves, intervalTime);
		}, readyTime);
	};

	$('.start a').on('click touchstart', function(){
		beginMoves();
		$('.start').addClass('hide');
		$('.settings').addClass('off')
		$('.data, .total-time-countdown').removeClass('hide');

		$("input[type=checkbox]:checked").each(function() {
			moves.push($(this).val());
		});

		intervalTime = ($('.time-interval').val()) ? $('.time-interval').val() : intervalTime;
		intervalTime = intervalTime * 1000;

		intervalBreak = ($('.break-interval').val()) ? $('.break-interval').val() : intervalBreak;
	});

	// change slider value
	var $timeIntervalValue = $('.time-interval-value'),
			$breakIntervalValue = $('.break-interval-value'),
			$totalMinValue = $('.total-time-value, .time-min');

	$('.time-interval').change(function(){
	  $timeIntervalValue.html(this.value);
	});
	$('.break-interval').change(function(){
	  $breakIntervalValue.html(this.value);
	});
	$('.total-time').change(function(){
	  $totalMinValue.html(this.value);
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