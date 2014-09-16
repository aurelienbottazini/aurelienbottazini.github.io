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

$('#planete-rouge-circles circle:eq(0)').
    velocity({ fill: "#ff694d"}, {duration: 2000, loop: true,
                                  delay: 600});

$('#planete-rouge-circles circle:eq(1)'). velocity({ fill:
                                                     "#ff694d"}, {duration: 2000, loop: true, delay: 600*2});

$('#planete-rouge-circles circle:eq(2)'). velocity({ fill:
                                                     "#ff694d"}, {duration: 2000, loop: true, delay: 600*3});

$('#planete-rouge-circles circle:eq(3)'). velocity({ fill:
                                                     "#ff694d"}, {duration: 2000, loop: true, delay: 600*4});

$('#planete-rouge-circles circle:eq(4)'). velocity({ fill:
                                                     "#ff694d"}, {duration: 2000, loop: true, delay: 600*5});


$('#planete-rouge-circles path:eq(0)').
    velocity({ fill: "#ff694d"},
             {delay: 1000, duration: 2000, loop: true });
$('#planete-rouge-circles path:eq(1)').
    velocity({ fill: "#ff694d"},
             {delay: 900, duration: 2000, loop: true });
$('#planete-rouge-circles path:eq(2)').
    velocity({ fill: "#ff694d"},
             {delay: 1500, duration: 2000, loop: true });
$('#planete-rouge-circles path:eq(3)').
    velocity({ fill: "#ff694d"},
             {delay: 2000, duration: 2000, loop: true });
$('#planete-rouge-circles path:eq(4)').
    velocity({ fill: "#ff694d"},
             {delay: 3000, duration: 2000, loop: true });
$('#planete-rouge-circles path:eq(5)').
    velocity({ fill: "#ff694d"},
             {delay: 2500, duration: 2000, loop: true });
$('#planete-rouge-circles path:eq(6)').
    velocity({ fill: "#ff694d"},
             {delay: 4000, duration: 2000, loop: true });
$('#planete-rouge-circles path:eq(7)').
    velocity({ fill: "#ff694d"},
             {delay: 4500, duration: 2000, loop: true });
