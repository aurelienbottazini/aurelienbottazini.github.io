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


(function() {
  window.signature = {
    initialize: function() {
      return $('#hello-aurelien').each(function() {
        var delay, length, path, paths, previousStrokeLength, speed, _i, _len, _results;
        paths = $('path, circle, rect', this);
        delay = 0;
        _results = [];
        for (_i = 0, _len = paths.length; _i < _len; _i++) {
          path = paths[_i];
          length = path.getTotalLength();
          previousStrokeLength = speed || 0;
          speed = length < 100 ? 20 : Math.floor(length);
          delay += previousStrokeLength + 100;
          _results.push($(path).css('transition', 'none').attr('data-length', length).attr('data-speed', speed).attr('data-delay', delay).attr('stroke-dashoffset', length).attr('stroke-dasharray', length + ',' + length));
        }
        return _results;
      });
    },
    animate: function() {
      return $('#hello-aurelien').each(function() {
        var delay, length, path, paths, speed, _i, _len, _results;
        paths = $('path, circle, rect', this);
        _results = [];
        for (_i = 0, _len = paths.length; _i < _len; _i++) {
          path = paths[_i];
          length = $(path).attr('data-length');
          speed = $(path).attr('data-speed');
          delay = $(path).attr('data-delay');
          _results.push($(path).css('transition', 'stroke-dashoffset ' + speed + 'ms ' + delay + 'ms linear').attr('stroke-dashoffset', '0'));
        }
        return _results;
      });
    }
  };

  $(document).ready(function() {
    window.signature.initialize();
  });

  $(window).load(function() {
    return window.signature.animate();
  });

}).call(this);
