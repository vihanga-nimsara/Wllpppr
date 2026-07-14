(function(){
  if (!window.PIXABAY_KEY) return;

  var pending = {};
  var hits = {};

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

  function fetchData(query) {
    if (hits[query]) return Promise.resolve(hits[query]);
    if (pending[query]) return pending[query];
    var orient = query.indexOf('mobile') !== -1 ? 'vertical' : 'horizontal';
    pending[query] = fetch('https://pixabay.com/api/?key=' + PIXABAY_KEY + '&q=' + encodeURIComponent(query) + '&image_type=photo&orientation=' + orient + '&per_page=3&safesearch=true')
      .then(function(r){ return r.json(); })
      .then(function(data){
        if (data.hits && data.hits[0]) {
          hits[query] = data.hits[0];
          return data.hits[0];
        }
        return null;
      }).catch(function(){ return null; });
    return pending[query];
  }

  async function loadImages() {
    var els = document.querySelectorAll('.thumb, .preview');
    for (var i = 0; i < els.length; i++) {
      (function(el){
        var query = getQuery(el);
        var isPreview = el.classList.contains('preview');
        fetchData(query).then(function(hit){
          if (!hit) return;
          var url = isPreview ? hit.largeImageURL : hit.webformatURL;
          el.style.backgroundImage = 'url(' + url + ')';
          el.style.backgroundSize = 'cover';
          el.style.backgroundPosition = 'center';
        });
      })(els[i]);
    }
  }

  document.addEventListener('click', function(e){
    var a = e.target.closest('a');
    if (!a) return;

    // Download stat link
    if (a.innerHTML.indexOf('⬇') !== -1 && a.getAttribute('href') === '#') {
      e.preventDefault();
      var row = a.closest('.row, .post');
      if (!row) return;
      var thumb = row.querySelector('.thumb, .preview');
      if (!thumb) return;
      var query = getQuery(thumb);
      fetchData(query).then(function(hit){
        if (hit) window.open(hit.largeImageURL, '_blank');
      });
    }

    // Resolution download button
    if (a.classList.contains('res-btn')) {
      e.preventDefault();
      var post = a.closest('.post');
      if (!post) return;
      var preview = post.querySelector('.preview');
      if (!preview) return;
      var query = getQuery(preview);
      var txt = a.textContent;
      fetchData(query).then(function(hit){
        if (!hit) return;
        var url;
        if (txt.indexOf('mobile') !== -1 || txt.indexOf('1080') !== -1) {
          url = hit.webformatURL;
        } else {
          url = hit.largeImageURL || hit.webformatURL;
        }
        if (url) window.open(url, '_blank');
      });
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadImages);
  } else {
    loadImages();
  }
})();
