var i, src, extension = Modernizr.svg ? '.svg' : '.png';

elements = $('img');
for (i=0;i<elements.length;i++) {
    src = elements[i].getAttribute('data-svg');
    if (src) {
        elements[i].src = src + extension;
        elements[i].removeAttribute('data-svg');
    }
}

$("#hello").velocity("transition.slideDownBigIn",
                     { duration: 1500, delay: 500 });
$("#planete-anneaux").velocity("transition.slideDownBigIn",
                               { duration: 1500, delay: 500 });
$("#planete-rouge").velocity("transition.expandIn",
                             { duration: 1500, delay: 500 });
$("#aurelien-sur-la-lune").velocity("transition.bounceLeftIn",
                                    {duration: 1500, delay: 500});
$("#planete-rayures").velocity("transition.bounceLeftIn",
                               {duration: 1500, delay: 500});
$("#planete-vie").velocity("transition.bounceRightIn",
                           {duration: 1500, delay: 500});

$('#planete-rouge-circles circle').velocity({ fill: "#ff694d"},
                                            {duration: 3000, loop:
                                             true });
$('#planete-rouge-circles path').velocity({ fill: "#ff694d"},
                                            {duration: 3000, loop: true });
