$(function(){
	console.log('Hello, bower test quest!');

	$.ajax({
		url: "http://alex.devel.softservice.org/testapi/",
		success: handleSuccess,
		error: handleError
	});

	function handleSuccess(data) {
		console.log('Success!');
		const target = 1500;
		const $window = $('.window');
		const $bar = $('.load');
		const $pointer = $('.pointer');
		const $currentValue = $('.current');
		const $leftValue = $('.left');

		let currentValue = data.balance_usd * 100; // better not to work with floats, many problems with rounding
		let leftValue = target - currentValue;
		let percent = (currentValue / target * 100).toFixed(2);

		$bar.css({width: `${percent}%`});
		$pointer.css({left: `${percent}%`});
		$currentValue.text(currentValue/100);
		$leftValue.text(leftValue/100);

		const timerId = setInterval(function() {
			currentValue += 20;
			leftValue = target - currentValue;
			percent = (currentValue / target * 100).toFixed(2);

			$bar.css({width: `${percent}%`});
			$pointer.css({left: `${percent}%`});
			$currentValue.text(currentValue/100);
			$leftValue.text(leftValue/100);
			if (currentValue >= target) {
				clearInterval(timerId);
				$window.addClass('_achieved');
			}
		},2000);

	};

	function handleError() {
		console.log('Error!');
		const $desc = $('.desc');
		$desc.text("Error occurred during AJAX request.")
	};
});