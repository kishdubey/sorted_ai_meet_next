chrome.browserAction.onClicked.addListener(function() {
  var newURL = "meetings.html";
  chrome.tabs.create({url: newURL})
})
