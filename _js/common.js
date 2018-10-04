var setUpCaps = function(){
    var dropcaps = document.querySelectorAll(".dropcap");
    window.Dropcap.layout(dropcaps, 3);
};

window.addEventListener('load', setUpCaps)

document.addEventListener("DOMContentLoaded", function(event) {
  var links = document.querySelectorAll("#main_navigation ul li a");
  var pathname = location.href;

  for(var i = 0, length = links.length; i < length; i += 1) {
    if (pathname === links[i].href) {
      links[i].classList.add('current');
    }
  }
});

var isAnimating = false


document.querySelectorAll('#main_navigation [data-type="page-transition"]').forEach(function(e) {
  e.addEventListener('click', function(event){
    event.preventDefault();
    //detect which page has been selected

    var newPage = this.getAttribute('href');

    var links = document.querySelectorAll("#main_navigation ul li a");
    var pathname = location.href;

    for(var i = 0, length = links.length; i < length; i += 1) {
      links[i].classList.remove('current');
    }

    this.classList.add('current');
    //if the page is not animating - trigger animation
    if( !isAnimating ) changePage(newPage, true);
  });
})

function changePage(url, bool) {
  isAnimating = true;
  document.querySelector('body').classList.add('page-is-changing');
  loadNewContent(url, bool);
}

function loadNewContent(url, bool) {
  var newSectionName = url.replace('.html', ''),
      section = $('<div id="wrapper"></div>');

  section.load(url + ' #frame', function(event){
    // load new content and replace <main> content with the new one
    setTimeout(function() {
      // document.querySelector('#wrapper').replaceWith(section);
      $('#wrapper').replaceWith(section);
      isAnimating = false;
      document.querySelector('body').classList.remove('page-is-changing');
      if(url != window.location){
        window.history.pushState({path: url},'',url);
      }
    }, 200);
  });
}

window.addEventListener('popstate', function() {
  var newPageArray = location.pathname.split('/'),
      //this is the url of the page to be loaded
      newPage = newPageArray[newPageArray.length - 1];
  if( !isAnimating ) changePage(newPage);
});
