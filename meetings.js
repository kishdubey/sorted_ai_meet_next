var events = localStorage.getItem("events");
events = JSON.parse(events)
var table = document.getElementById("eventsTable");

if (events.length > 0) {
  for (i = 0; i < events.length; i++) {
    var event = events[i];
    var row = table.insertRow(i+1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    cell1.innerHTML = event.description;
    cell2.innerHTML = event.summary;
    cell3.innerHTML = event.originalStartTime;
    cell4.innerHTMl = event.location;
    console.log(event.summary);
  }
} else {
  console.log('No upcoming events found.');
}
