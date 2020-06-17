const API_KEY = 'AIzaSyABnJvSE2F0wNDHd_bn0Rm_K_eO-IGpHQg';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

function onGAPILoad() {
  gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: DISCOVERY_DOCS,
  }).then(function () {
    console.log('gapi initialized');

    chrome.identity.getAuthToken({interactive: true}, function(token) {
      console.log("token", token);
      gapi.auth.setToken({
        'access_token': token,
      });

      gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
      }).then(function(response) {
        var events = response.result.items;
        chrome.storage.sync.set({'events': JSON.stringify(events)}, function() {
          console.log('Value Set');
        });

        console.log('Upcoming events:');
        if (events.length > 0) {
          for (i = 0; i < events.length; i++) {
            var event = events[i];
            var when = event.start.dateTime;
            if (!when) {
              when = event.start.date;
            }
            console.log(event.summary + ' (' + when + ')')
          }
        } else {
          console.log('No upcoming events found.');
        }
      });
    })
  }, function(error) {
    console.log('error', error)
  });
}

chrome.browserAction.onClicked.addListener(function() {
  // add events if here
  var newURL = "meetings.html";
  chrome.tabs.create({url: newURL})
})
