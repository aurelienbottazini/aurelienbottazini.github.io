document.addEventListener('DOMContentLoaded',function() {
  var tableOfContents = document.getElementById("table-of-contents")

  tableOfContents && tableOfContents.addEventListener('click', function() {
    this.style.display = this.style.display == "block" ? "none" : "block";
  });
});
