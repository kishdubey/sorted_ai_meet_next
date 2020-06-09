var events = localStorage.getItem("events");
events = JSON.parse(events)



if (events.length > 0) {
  for (i = 0; i < events.length; i++) {
    var event = events[i];
    console.log(event.summary);
  }
} else {
  console.log('No upcoming events found.');
}
