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

document.addEventListener("DOMContentLoaded", function(event) {
  var links = document.querySelectorAll("#main_navigation ul li a");
  var pathname = location.href;

  for(var i = 0, length = links.length; i < length; i += 1) {
    if (pathname === links[i].href) {
      links[i].classList.add('current');
    }
  }
});

var isAnimating = false;

$('#main_navigation').on('click', '[data-type="page-transition"]', function(event){
  event.preventDefault();
  //detect which page has been selected
  var newPage = $(this).attr('href');


  var links = document.querySelectorAll("#main_navigation ul li a");
  var pathname = location.href;

  for(var i = 0, length = links.length; i < length; i += 1) {
    links[i].classList.remove('current');
  }

  this.classList.add('current');
  //if the page is not animating - trigger animation
  if( !isAnimating ) changePage(newPage, true);
});

function changePage(url, bool) {
  isAnimating = true;
  $('body').addClass('page-is-changing');
  loadNewContent(url, bool);
}

function loadNewContent(url, bool) {
  var newSectionName = url.replace('.html', ''),
      section = $('<div id="frame" class="'+newSectionName.slice(1)+'"></div>');

  section.load(url + ' #frame', function(event){
    // load new content and replace <main> content with the new one
    setTimeout(function() {
      $('#wrapper').html(section);
      isAnimating = false;
      $('body').removeClass('page-is-changing');
      if(url != window.location){
        window.history.pushState({path: url},'',url);
      }
    }, 200);
  });
}

$(window).on('popstate', function() {
    var newPageArray = location.pathname.split('/'),
        //this is the url of the page to be loaded
        newPage = newPageArray[newPageArray.length - 1];
    if( !isAnimating ) changePage(newPage);
});
