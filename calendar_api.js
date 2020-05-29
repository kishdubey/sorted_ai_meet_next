let script = document.createElement('script');
script.src = "https://apis.google.com/js/api.js"
script.onload= function(){};handleClientLoad();
script.onreadystatechange=if (this.readyState === 'complete') this.onload();
