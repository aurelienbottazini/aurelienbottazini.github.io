var i, src, extension = Modernizr.svg ? '.svg' : '.png';

elements = $('img');
for (i=0;i<elements.length;i++) {
    src = elements[i].getAttribute('data-svg');
    if (src) {
        elements[i].src = src + extension;
        elements[i].removeAttribute('data-svg');
    }
}
