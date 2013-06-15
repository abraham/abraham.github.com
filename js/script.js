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


// Bootstrap carousel
$('.carousel').carousel();


// Trigger install of Chrome extension
if (chrome && chrome.webstore && chrome.webstore.install) {
  $('.chrome-web-store').on('click', function(event){
    chrome.webstore.install('https://chrome.google.com/webstore/detail/hngjfhijhmcechdkbgopbgghajokogdi');
    event.preventDefault();
  });
}
