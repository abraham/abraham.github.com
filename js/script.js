// Google Analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-2706568-4']);
_gaq.push(['_trackPageview']);
_gaq.push(['_trackPageLoadTime']);
(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();


// Google+ widgets
(function() {
  var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
  po.src = 'https://apis.google.com/js/plusone.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
})();



// Trigger install of Chrome extension
if (typeof chrome === 'object' && typeof chrome.webstore === 'object' && typeof chrome.webstore.install === 'function') {
  var cwsItems = document.getElementsByClassName("chrome-web-store");
  for (var i = 0; i < cwsItems.length; i++) {
    cwsItems[i].addEventListener('click', function(event){
      chrome.webstore.install(event.currentTarget.getAttribute('href'));
      event.preventDefault();
    });
  }
}

var imageObj = new Image();
imageObj.src = '/img/lake-small.jpg';
imageObj.onload= function() {
  document.body.classList.add('body');
}

setTimeout(function() {
  document.body.classList.remove('blur');
}, 1000);
