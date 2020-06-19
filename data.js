function findUrl(text) {
  var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);
  var url = text.match(expression);

  if (text.match(regex)) {
    if(url[0].includes("https://")){
      return url[0];
    }
    else{
      return "https://"+url[0];
    }
  }
  else {
    return "Not Found";
  }
}

chrome.storage.sync.get(['events'], function(result) {
  var calendar_event = JSON.parse(result['events']);
  //var table = document.getElementById("eventsTable");
  console.log(calendar_event);

  if (calendar_event.length > 0) {
      calendar_event = calendar_event[0];
      var when = calendar_event.start.dateTime || calendar_event.start.date;
      var url = (calendar_event.location + calendar_event.hangoutLink + calendar_event.description).split("undefined").join("");
      url = findUrl(url);

      var summary = document.getElementById("sum");
      summary.innerHTML = calendar_event.summary;

      var date = document.getElementById("date");
      date.innerHTML = when;

      var join = document.getElementById("link");
      join.innerHTML = '<a href="'+url+'" target="_blank">Join</a>';

      var calendarLink = document.getElementById("details")
      calendarLink.innerHTML = '<a href="'+calendar_event.htmlLink+'" target="_blank">Check Details</a>';
      console.log("this is", url);
      console.log(calendar_event.summary);

  } else {
    console.log('No upcoming events found.');
  }
});
