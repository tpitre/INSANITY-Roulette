$(document).ready(function() {

	var i = 1,
			readyTime = 5000,
			intervalTime = 30,
			intervalBreak = 6,
			moves = [],
			$countDown = $('.countdown');

	// randomize moves
	var insanityMoves = function(){

		var randomMoves = moves[Math.floor(Math.random() * moves.length)];

	  if (i !== 0 && i % intervalBreak == 0) {
		  moveDisplay = "Break";
		  i = 0;
	  }
	  else {
	  	moveDisplay = randomMoves;
	  }

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
	
	var counter = 0;

	// set total time
	function totalTime() {
    var $timeContainer = $('.total-time-countdown'),
    		$marker = $('.marker'),
    		$min = $('.time-min'),
    		$sec = $('.time-sec'),
    		totalSecs = $('.total-time').val() * 60;
    		
		if (counter === 0) {
  		percentage = 100/totalSecs;
		}
		else {
  		percentage = (100/totalSecs) + percentage;
  		console.log(percentage);
		}
    		
    if ($min.html() == 0 && $sec.html() == '00') {
      $timeContainer.html('Workout Complete!').addClass('wide');
      clearInterval(totalTime);
      clearInterval(insanityMoves);
      beginMoves = '';
    }
    if (parseInt($sec.html()) <= 0) {
      $min.html(parseInt($min.html()-1));
      $sec.html(60);
    }
    if (parseInt($sec.html()) <= 10) {
    	$sec.html('0' + parseInt($sec.html()-1));
    }
    else {
	    $sec.html(parseInt($sec.html()-1));
    }
    
    $marker.width(percentage + '%');
    counter++;
    console.log(counter);
  }

	// start everything
	var beginMoves = function(){

		/*
setTimeout(function(){
			document.getElementById('audio-shaunt').play();
		}, 1500);
*/

		/*
setTimeout(function(){
			insanityMoves();
			setInterval(totalTime,1000);
			setInterval(insanityMoves, intervalTime);
		}, readyTime);
*/
		setTimeout(function(){
			insanityMoves();
			setInterval(totalTime,1000);
			setInterval(insanityMoves, intervalTime);
		}, 0);
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

  // setting toggle open/close
  $('.open-settings').on('click', function(event) {
    $('.settings').toggleClass('on off');
    event.preventDefault();
  });

  /*
$("input:checkbox").each(function() {
		var savedValue = localStorage.getItem($(this).val());
		if (savedValue){
			console.log("in it");
		 $(this).attr('checked', 'checked');
		}
		else {
			console.log($(this).attr('checked'));
		 $(this).removeAttr('checked');
		}
  });

  $("input:checkbox").on("change", function(){
  	//localStorage.clear();
  	console.log(localStorage.getItem('Heisman'));
		var cbVal = $(this).val();
		var cbState = $(this).attr('checked');
		localStorage.setItem(cbVal, cbState);
		console.log(cbState);
  });
*/

});