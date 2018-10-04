var i, src, extension = '.svg';

elements = $('img');
for (i=0;i<elements.length;i++) {
    src = elements[i].getAttribute('data-svg');
    if (src) {
        elements[i].src = src + extension;
        elements[i].removeAttribute('data-svg');
    }
}

$(document).ready(function(){

    var menu = document.querySelector('#menu');
    var origOffsetY = menu.offsetTop;

    function scroll () {
        if ($(window).scrollTop() > origOffsetY) {
            $('#menu').addClass('sticky');
        } else {
            $('#menu').removeClass('sticky');
        }
    }

    document.onscroll = scroll;
});
