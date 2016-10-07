function addListener(event, obj, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(event, fn, false);   // modern browsers
    } else {
        obj.attachEvent("on"+event, fn);          // older versions of IE
    }
}

var setUpCaps = function(){
    var dropcaps = document.querySelectorAll(".dropcap");
    window.Dropcap.layout(dropcaps, 3);
};

addListener('load', window, setUpCaps);

$(document).ready(function(){
  var links = $("#main_navigation ul li a");
  var pathname = location.href;

  for(var i = 0, length = links.length; i < length; i += 1) {
    if (pathname === links[i].href) {
      links[i].classList.add('current');
    }
  }
});
