//CALENDAR FOR DRIFT


// these are labels for the days of the week
cal_days_labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// these are human-readable month name labels, in order
cal_months_labels = ['January', 'February', 'March', 'April',
                     'May', 'June', 'July', 'August', 'September',
                     'October', 'November', 'December'];

// these are the days of the week for each month, in order
cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// this is the current date
cal_current_date = new Date();
cal_current_date.setHours(0, 0, 0, 0);

function Calendar(month, year) {
  this.month = (isNaN(month) || month == null) ? cal_current_date.getMonth() : month;
  this.year  = (isNaN(year) || year == null) ? cal_current_date.getFullYear() : year;
  this.html = '';
}

Calendar.prototype.generateHTML = function(data){
  var posts = (data) ? data : [];

  // get first day of month
  var firstDay = new Date(this.year, this.month, 1);
  var startingDay = firstDay.getDay();
  
  // find number of days in month
  var monthLength = cal_days_in_month[this.month];
  
  // compensate for leap year
  if (this.month == 1) { // February only!
    if((this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0){
      monthLength = 29;
    }
  }
  
  // do the header
  var monthName = cal_months_labels[this.month]
  var html = '<table class="calendar-table">';
  html += '<tr><th colspan="7">';
  //html +=  monthName + "&nbsp;" + this.year;
  html +=  monthName;
  html += '</th></tr>';
  html += '<tr class="calendar-header">';
  for(var i = 0; i <= 6; i++ ){
    html += '<td class="calendar-header-day">';
    html += cal_days_labels[i];
    html += '</td>';
  }
  html += '</tr><tr>';

  // fill in the days
  var day = 1;
  // this loop is for is weeks (rows)
  for (var i = 0; i < 9; i++) {
    // this loop is for weekdays (cells)
    for (var j = 0; j <= 6; j++) { 
      var pastDateClass = '';

      if (new Date(this.year, this.month, day) < cal_current_date) {
        pastDateClass = 'gray';
      }

      html += '<td class="calendar-day ' + pastDateClass + ' ' + monthName + day + this.year + '">';
      if (day <= monthLength && (i > 0 || j >= startingDay)) {
        html += day;

        //console.log(this.year, this.month+1, day);

        var postsToday = findDate(posts, this.year, this.month+1, day);

        for(var k = 0; k < postsToday.length; k++) {
          var post = postsToday[k];

          // Only do post end dates that are in the future
          if (new Date(post.enddate.substr(0, 10)) >= cal_current_date) {
            html += "<span class='post'><a href='" + post.url + "'>" + post.title + "</a></span> ";
          }
        }

        day++;
      }
      html += '</td>';
    }
    // stop making rows if we've run out of days
    if (day > monthLength) {
      break;
    } else {
      html += '</tr><tr>';
    }
  }
  html += '</tr></table>';

  this.html = html;
}

Calendar.prototype.getHTML = function() {
  return this.html;
}