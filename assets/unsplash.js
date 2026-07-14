(function(){
  if (!window.PIXABAY_KEY) return;

  var cache = {};
  var pending = {};

  function getQuery(el) {
    var row = el.closest('.row, .post');
    if (!row) return 'wallpaper';
    var title = row.querySelector('.title a, h1');
    if (title) return title.textContent.trim();
    var credit = row.querySelector('.credit a');
    if (credit) return credit.textContent.trim() + ' wallpaper';
    var tag = row.querySelector('.cat-tag');
    if (tag) return tag.textContent.trim() + ' wallpaper';
    return 'wallpaper';
  }

  async function fetchImage(query, large) {
    if (cache[query]) return cache[query];
    if (pending[query]) return pending[query];
    var orient = query.indexOf('mobile') !== -1 ? 'vertical' : 'horizontal';
    pending[query] = fetch('https://pixabay.com/api/?key=' + PIXABAY_KEY + '&q=' + encodeURIComponent(query) + '&image_type=photo&orientation=' + orient + '&per_page=3&safesearch=true')
      .then(function(r){ return r.json(); })
      .then(function(data){
        if (data.hits && data.hits[0]) {
          var url = large ? data.hits[0].largeImageURL : data.hits[0].webformatURL;
          cache[query] = url;
          return url;
        }
        return null;
      }).catch(function(){ return null; });
    return pending[query];
  }

  async function loadImages() {
    var thumbs = document.querySelectorAll('.thumb, .preview');
    for (var i = 0; i < thumbs.length; i++) {
      (function(el){
        var query = getQuery(el);
        var isPreview = el.classList.contains('preview');
        fetchImage(query, isPreview).then(function(url){
          if (url) {
            el.style.backgroundImage = 'url(' + url + ')';
            el.style.backgroundSize = 'cover';
            el.style.backgroundPosition = 'center';
          }
        });
      })(thumbs[i]);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadImages);
  } else {
    loadImages();
  }
})();
