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
