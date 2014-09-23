var i, src, extension = Modernizr.svg ? '.svg' : '.png';
var planete_rouge_circles = $('#planete-rouge-circles');
var planete_rouge_circles_circles =
        planete_rouge_circles.find('circle');
var circles_number = planete_rouge_circles_circles.length;
var planete_rouge_paths = planete_rouge_circles.find('path');
var paths_number = planete_rouge_paths.length;

elements = $('img');
for (i=0;i<elements.length;i++) {
    src = elements[i].getAttribute('data-svg');
    if (src) {
        elements[i].src = src + extension;
        elements[i].removeAttribute('data-svg');
    }
}

$('#hello').css({"visibility": "visible"});
var hello_paths = $('#hello-i-am-aurelien path');
var hello_paths_length = hello_paths.length;
var svg_path;
var svg_path_length;
for(i = 0; i< hello_paths_length; i++) {

    svg_path = hello_paths.eq(i);
    svg_path_length = svg_path[0].getTotalLength();

    svg_path.css({"fill-opacity": 0,
                  "stroke-dasharray": svg_path_length,
                  "stroke-dashoffset": svg_path_length})
        .velocity({strokeDashoffset: 0}, {duration: 3000, delay: 600})
        .velocity({fillOpacity: [1, 0], strokeOpacity:[0,1]});
}

$('#scene').css({"visibility": "visible"});
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

$( "#planete-rouge" ).mouseenter(function() {
    for(i=0 ;i < circles_number; i++) {
        planete_rouge_circles_circles
            .eq(i)
            .velocity({ fill: "#ff694d"},
                      {duration: 500});
    }
    for(i=0; i < paths_number; i++) {
        planete_rouge_paths.eq(i).
            velocity({ fill: "#ff694d"},
                     {duration: 500});
    }
}).mouseleave(function() {
    for(i=0 ;i < circles_number; i++) {
        planete_rouge_circles_circles
            .eq(i)
            .velocity({ fill: "#c22327"},
                      {duration: 500});
    }
    for(i=0; i < paths_number; i++) {
        planete_rouge_paths.eq(i).
            velocity({ fill: "#c22327"},
                     {duration: 500});
    }
});

$('#about-link').click(function() {
    $('#about').velocity("scroll", 1000);
    return false;
});
