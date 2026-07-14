window.addEventListener('load',function(){
  var btn=document.getElementById('upload-btn');
  if(!btn){console.warn('upload-btn not found');return;}
  if(!window.cloudinary){console.warn('Cloudinary widget script not loaded');return;}

  btn.addEventListener('click',function(e){
    e.preventDefault();
    var w = window.cloudinary.openUploadWidget({
      cloudName: window.CLOUDINARY.cloudName,
      uploadPreset: window.CLOUDINARY.uploadPreset,
      folder: 'wallpapers/community',
      tags: ['community'],
      sources: ['local','url','camera'],
      showPoweredBy: false,
      styles: {palette: {window:'#f6f6ef',windowBorder:'#cccabc',tabIcon:'#3a6ea5',menuIcons:'#555',textDark:'#1a1a1a',textLight:'#fff',link:'#3a6ea5',action:'#ff7a3d',inactiveTabIcon:'#7a7869',error:'#c0472a',inProgress:'#3a6ea5',complete:'#5a6b3d',sourceBg:'#f2f0e6',video:'#3a6ea5',sourceBorder:'#cccabc',hover:'#eaf1fa'}}
    }, function(error, result) {
      if(error){console.error('Upload error:',error);return;}
      if(result.event==='success'){
        var info=result.info;
        var stored=JSON.parse(localStorage.getItem('community_uploads')||'[]');
        stored.unshift({public_id:info.public_id,width:info.width,height:info.height,thumbnail_url:info.thumbnail_url,created_at:info.created_at});
        localStorage.setItem('community_uploads',JSON.stringify(stored));
        document.getElementById('upload-status').innerHTML='<div class="upload-done"><div class="upload-thumb" style="background-image:url('+info.thumbnail_url+');"></div><p><b>Uploaded!</b> Your wallpaper is now in the community gallery.</p><a href="community.html" class="follow-btn" style="display:inline-block;width:auto;padding:6px 16px;margin-top:8px;">go to community</a></div>';
        btn.textContent='upload another';
      }
    });
    w.open();
  });
});
