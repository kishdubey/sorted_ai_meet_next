var events = localStorage.getItem("events");
events = JSON.parse(events)
var table = document.getElementById("eventsTable");

if (events.length > 0) {
  for (i = 0; i < events.length; i++) {
    var event = events[i];
    var row = table.insertRow(i);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    cell1.innerHTML = event.summary;
    var when = event.start.dateTime || event.start.date;
    cell2.innerHTML = when;
    cell3.innerHTMl = event.location;
    console.log(event.summary);
  }
} else {
  console.log('No upcoming events found.');
}
