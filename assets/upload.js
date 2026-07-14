window.addEventListener('load',function(){
  var btn=document.getElementById('upload-btn');
  if(!btn){console.warn('upload-btn not found');return;}
  if(!window.cloudinary){console.warn('Cloudinary widget script not loaded');return;}

  function getMeta(){
    var o=document.querySelector('input[name="orientation"]:checked');
    return{
      title:(document.getElementById('upload-title').value||'').trim(),
      desc:(document.getElementById('upload-desc').value||'').trim(),
      location:(document.getElementById('upload-location').value||'').trim(),
      tags:(document.getElementById('upload-tags').value||'').split(',').map(function(s){return s.trim();}).filter(Boolean),
      orientation:o?o.value:'desktop'
    };
  }

  btn.addEventListener('click',function(e){
    e.preventDefault();
    var meta=getMeta();
    if(!meta.title){
      document.getElementById('upload-title').style.borderColor='#c0472a';
      document.getElementById('upload-title').placeholder='title is required';
      return;
    }
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
        var meta2=getMeta();
        var stored=JSON.parse(localStorage.getItem('community_uploads')||'[]');
        stored.unshift({public_id:info.public_id,width:info.width,height:info.height,thumbnail_url:info.thumbnail_url,created_at:info.created_at,title:meta2.title,desc:meta2.desc,location:meta2.location,tags:meta2.tags,orientation:meta2.orientation});
        localStorage.setItem('community_uploads',JSON.stringify(stored));
        document.getElementById('upload-form').style.display='none';
        document.getElementById('upload-status').innerHTML='<div class="upload-done"><div class="upload-thumb" style="background-image:url('+info.thumbnail_url+');"></div><p><b>Uploaded!</b> Your wallpaper is now in the community gallery.</p><a href="community.html" class="follow-btn" style="display:inline-block;width:auto;padding:6px 16px;margin-top:8px;">go to community</a></div>';
        btn.textContent='upload another';
        btn.onclick=function(){location.reload();};
      }
    });
    w.open();
  });
});
