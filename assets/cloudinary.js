window.CLOUDINARY = {
  cloudName: 'jki1ap2a',
  uploadPreset: 'wllpppr-unsigned',

  url: function(publicId, opts) {
    opts = opts || {};
    var base = 'https://res.cloudinary.com/' + this.cloudName + '/image/upload/';
    var t = [];
    if (opts.width) t.push('w_' + opts.width);
    if (opts.height) t.push('h_' + opts.height);
    if (opts.crop) t.push('c_' + opts.crop);
    t.push('q_auto', 'f_auto');
    return base + t.join(',') + '/' + publicId;
  },

  preview: function(publicId) {
    return this.url(publicId, { width: 1280 });
  },

  thumb: function(publicId) {
    return this.url(publicId, { width: 320, height: 224, crop: 'fill' });
  },

  mobile: function(publicId) {
    return this.url(publicId, { width: 1170 });
  },

  full: function(publicId) {
    return this.url(publicId, {});
  },

  download: function(publicId, filename, width) {
    var t = [];
    if (width) t.push('w_' + width);
    t.push('fl_attachment:' + encodeURIComponent(filename.replace(/[^a-zA-Z0-9_-]/g,'_')));
    var base = 'https://res.cloudinary.com/' + this.cloudName + '/image/upload/';
    return base + t.join(',') + '/' + publicId;
  }
};
