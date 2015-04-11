$(document).ready(function() {
	$.getJSON('/posts', function(data) {
		console.log(data);
	});

	$('#nextMonth').click(function(e) {
		cal.month++;
		updateCal();

		e.preventDefault();
	});

	$('#prevMonth').click(function(e) {
		cal.month--;
		updateCal();

		e.preventDefault();
	});

	var cal = new Calendar();
	updateCal();

	function updateCal() {
		cal.generateHTML();
		$('div.calendar').html(cal.getHTML());
	}
});