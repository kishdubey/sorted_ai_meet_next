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
        'maxResults': 1,
        'orderBy': 'startTime'
      }).then(function(response) {
        var events = response.result.items;
        // Store Events
        chrome.storage.sync.set({'events': JSON.stringify(events)}, function() {
          console.log('Value Set');
        });
      });
    })
  }, function(error) {
    console.log('error', error)
  });
}

chrome.browserAction.onClicked.addListener(function() {
  onGAPILoad();

  // HTML rerouting
  var meetings = "meetings.html";
  var noMeetings = "noMeetings.html";

  chrome.storage.sync.get(['events'], function(result) {
    var events = JSON.parse(result['events']);
    if (events.length > 0){
      chrome.tabs.create({url: meetings});
    }
    else {
      chrome.tabs.create({url: noMeetings});
    }
  });
})
