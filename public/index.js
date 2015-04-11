var cal = new Calendar();

var antonData;

function updateCal(data) {
	var dataToUse = (data) ? data : antonData;

	cal.generateHTML(dataToUse);
	$('div.calendar').html(cal.getHTML());
}

function getLatest() {
	$.getJSON('/posts', function(data) {
		antonData = data;
		updateCal(data);
	});
}

$(document).ready(function() {
	getLatest();

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

	updateCal();
});

function findDate(posts, year, month, day) {
	var results = [];

	var dateStr = year + '-' + pad(month) + '-' + pad(day);

	for(var i = 0; i < posts.length; i++) {
		var postEndDate = posts[i].enddate.substr(0,10);
		if(postEndDate === dateStr) {
			results.push(posts[i]);
		}
	}

	return results;
}

function pad(n) {
    return (n < 10) ? ("0" + n) : n;
}