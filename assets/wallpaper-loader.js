(function(){

  function getSlug(el) {
    var row = el.closest('.row, .post');
    if (!row) return null;
    var a = row.querySelector('.title a[href*="slug="]');
    if (!a) return null;
    var m = a.getAttribute('href').match(/slug=([^&]+)/);
    return m ? m[1] : null;
  }

  function cid(slug) {
    return 'wallpapers/' + slug;
  }

  function loadImages() {
    var els = document.querySelectorAll('.thumb, .preview');
    for (var i = 0; i < els.length; i++) {
      (function(el) {
        var slug = el.classList.contains('preview')
          ? getSlugFromUrl()
          : getSlug(el);
        if (!slug) return;
        var isPreview = el.classList.contains('preview');
        var url = isPreview
          ? window.CLOUDINARY.preview(cid(slug))
          : window.CLOUDINARY.thumb(cid(slug));
        el.style.backgroundImage = 'url(' + url + ')';
        el.style.backgroundSize = 'cover';
        el.style.backgroundPosition = 'center';
      })(els[i]);
    }
  }

  function getSlugFromUrl() {
    var m = location.search.match(/slug=([^&]+)/);
    return m ? m[1] : null;
  }

  function openDownload(slug, label) {
    if (!slug) return;
    var id = cid(slug);
    var url;
    if (label.indexOf('mobile') !== -1) {
      url = window.CLOUDINARY.mobile(id);
    } else if (label.indexOf('1080') !== -1 || label.indexOf('1080p') !== -1) {
      url = window.CLOUDINARY.url(id, { width: 1920 });
    } else if (label.indexOf('1440') !== -1 || label.indexOf('1440p') !== -1) {
      url = window.CLOUDINARY.url(id, { width: 2560 });
    } else if (label.indexOf('2160') !== -1 || label.indexOf('4K') !== -1) {
      url = window.CLOUDINARY.url(id, { width: 3840 });
    } else if (label.indexOf('2880') !== -1 || label.indexOf('5K') !== -1) {
      url = window.CLOUDINARY.url(id, { width: 5120 });
    } else if (label.indexOf('2532') !== -1) {
      url = window.CLOUDINARY.url(id, { width: 1170 });
    } else if (label.indexOf('3200') !== -1) {
      url = window.CLOUDINARY.url(id, { width: 1440 });
    } else if (label.indexOf('2340') !== -1) {
      url = window.CLOUDINARY.url(id, { width: 1080 });
    } else if (label.indexOf('3000') !== -1) {
      url = window.CLOUDINARY.url(id, { width: 4000 });
    } else if (label.indexOf('UW') !== -1 || label.indexOf('ultrawide') !== -1) {
      url = window.CLOUDINARY.url(id, { width: 3440 });
    } else {
      url = window.CLOUDINARY.full(id);
    }
    if (url) window.open(url, '_blank');
  }

  document.addEventListener('click', function(e) {
    var a = e.target.closest('a');
    if (!a) return;

    // download stat link
    if (a.innerHTML.indexOf('⬇') !== -1 && a.getAttribute('href') === '#') {
      e.preventDefault();
      var row = a.closest('.row');
      if (!row) return;
      var slug = getSlug(row);
      if (slug) openDownload(slug, 'full');
    }

    // resolution button
    if (a.classList.contains('res-btn')) {
      e.preventDefault();
      var slug;
      var post = a.closest('.post');
      if (post) {
        slug = getSlugFromUrl();
      } else {
        var row = a.closest('.row');
        if (row) slug = getSlug(row);
      }
      if (slug) openDownload(slug, a.textContent);
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadImages);
  } else {
    loadImages();
  }
})();
