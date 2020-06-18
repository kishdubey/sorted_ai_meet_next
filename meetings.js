function findUrl(text) {
  var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  var url = text.match(expression);

  console.log(text);

  if (text.match(regex)) {
    return url[0]; // returns first link it finds
  }
  else {
    return "Not Found";
  }

}

chrome.storage.sync.get(['events'], function(result) {
  var events = JSON.parse(result['events']);
  var table = document.getElementById("eventsTable");

  if (events.length > 0) {
    for (i = 0; i < events.length; i++) {
      var event = events[i];
      var row = table.insertRow(i);
      var cell0 = row.insertCell(0);
      var cell1 = row.insertCell(1);
      var cell2 = row.insertCell(2);

      var when = event.start.dateTime || event.start.date;
      var url = (event.location + event.hangoutLink + event.description).replace('undefined','');
      url = findUrl(url);

      cell0.innerHTML = event.summary;
      cell1.innerHTML = when;
      cell2.innerHTML = '<a href="'+url+'">Join</a>';
      console.log("this is", url);
      console.log(event.summary);
    }
  } else {
    console.log('No upcoming events found.');
  }
});
