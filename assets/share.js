document.addEventListener('click',function(e){
  var btn=e.target.closest('.share');
  if(!btn)return;
  e.preventDefault();
  var url=location.href;
  if(navigator.share){
    navigator.share({title:document.title,url:url}).catch(function(){});
  }else if(navigator.clipboard){
    navigator.clipboard.writeText(url).then(function(){
      var orig=btn.innerHTML;
      btn.innerHTML='✓ copied!';
      setTimeout(function(){btn.innerHTML=orig;},2000);
    }).catch(function(){prompt('Copy this URL:',url);});
  }else{
    prompt('Copy this URL:',url);
  }
});
