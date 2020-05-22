chrome.browserAction.onClicked.addListener(function() {
  var newURL = "index.html";
  chrome.tabs.create({url: newURL})
})
