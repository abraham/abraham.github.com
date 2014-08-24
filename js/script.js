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


// Google Fonts
(function() {
  var l = document.createElement('link'); l.rel = 'stylesheet';
  l.href = 'https://fonts.googleapis.com/css?family=Roboto';
  var h = document.getElementsByTagName('head')[0]; h.parentNode.insertBefore(l, h);
})();


// Trigger install of Chrome extension
function cwsClickHandler(event) {
    chrome.webstore.install(event.currentTarget.getAttribute('href'));
    event.preventDefault();
}
if (typeof chrome === 'object' && typeof chrome.webstore === 'object' && typeof chrome.webstore.install === 'function') {
  var cwsItems = document.getElementsByClassName("chrome-web-store");
  for (var i = 0; i < cwsItems.length; i++) {
    cwsItems[i].addEventListener('click', cwsClickHandler);
  }
}


// Load higher resolution background image
setTimeout(function() {
    var imageObj = new Image();
    imageObj.src = '/img/lake.jpg';
    imageObj.onload= function() {
      document.body.style.backgroundImage = "url('/img/lake.jpg')";
    };
}, 0);


// Page is ready to be displayed
document.addEventListener("DOMContentLoaded", function(event) {
    setTimeout(function() {
        document.body.classList.remove('blur');
    }, 500);
});
