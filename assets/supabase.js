window.SUPABASE = (function(){
  var url = 'https://shbkpqqpmllhognnaixv.supabase.co';
  var key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoYmtwcXFwbWxsaG9nbm5haXh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2MDc4NDMsImV4cCI6MjA5NTE4Mzg0M30.1FElsEaLOfT25grE8ERnuGwIAoROeQA1cpPkL5WLEvk';

  function getSession(){
    var s = localStorage.getItem('wllpppr_session');
    if(s) return s;
    s = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem('wllpppr_session', s);
    return s;
  }

  function headers(){
    return {'apikey':key,'Authorization':'Bearer '+key,'Content-Type':'application/json','Prefer':'return=minimal'};
  }

  function api(path, opts){
    return fetch(url+'/rest/v1/'+path, Object.assign({headers:headers()}, opts)).then(function(r){
      if(!r.ok) return r.text().then(function(t){throw new Error(t);});
      var ct = r.headers.get('content-type')||'';
      if(ct.indexOf('json')!==-1) return r.json();
      return r.text();
    });
  }

  function count(table, query){
    var q = '/rest/v1/'+table+'?select=id&'+query+'&limit=0';
    return fetch(url+q, {method:'HEAD', headers:headers()}).then(function(r){
      return parseInt(r.headers.get('x-total-count')||'0', 10);
    });
  }

  var sid = getSession();

  return {
    vote: function(type, id, dir){
      return api('upvotes?select=id', {method:'POST', body:JSON.stringify({
        target_type:type, target_id:id, session_id:sid, direction:dir
      })}).then(function(){
        return api('upvotes?target_type=eq.'+type+'&target_id=eq.'+id+'&select=direction', {method:'GET'});
      }).then(function(rows){
        var ups = rows.filter(function(r){return r.direction==='up';}).length;
        var downs = rows.filter(function(r){return r.direction==='down';}).length;
        return {up: ups, down: downs, net: ups - downs};
      });
    },
    getVotes: function(type, id){
      return api('upvotes?target_type=eq.'+type+'&target_id=eq.'+id+'&select=direction', {method:'GET'}).then(function(rows){
        var ups = rows.filter(function(r){return r.direction==='up';}).length;
        var downs = rows.filter(function(r){return r.direction==='down';}).length;
        var mine = null;
        for(var i=0;i<rows.length;i++){if(rows[i].session_id===sid){mine=rows[i].direction;break;}}
        return {up: ups, down: downs, net: ups - downs, mine: mine};
      });
    },
    download: function(type, id){
      return api('downloads', {method:'POST', body:JSON.stringify({
        target_type:type, target_id:id, session_id:sid
      })}).then(function(){return count('downloads','target_type=eq.'+type+'&target_id=eq.'+id);});
    },
    getDownloads: function(type, id){
      return count('downloads','target_type=eq.'+type+'&target_id=eq.'+id);
    },
    fav: function(type, id){
      return api('favorites?select=id', {method:'POST', body:JSON.stringify({
        target_type:type, target_id:id, session_id:sid
      })}).then(function(){return true;});
    },
    unfav: function(type, id){
      return api('favorites?target_type=eq.'+type+'&target_id=eq.'+id+'&session_id=eq.'+sid, {method:'DELETE'}).then(function(){return false;});
    },
    isFav: function(type, id){
      return api('favorites?target_type=eq.'+type+'&target_id=eq.'+id+'&session_id=eq.'+sid+'&select=id', {method:'GET'}).then(function(rows){
        return rows.length > 0;
      });
    },
    getFavs: function(session){
      return api('favorites?session_id=eq.'+(session||sid)+'&select=target_type,target_id,created_at&order=created_at.desc', {method:'GET'});
    },
    getFavCount: function(type, id){
      return count('favorites','target_type=eq.'+type+'&target_id=eq.'+id);
    },
    comment: function(type, id, text, author){
      return api('comments', {method:'POST', body:JSON.stringify({
        target_type:type, target_id:id, author:author||'anonymous', body:text
      })}).then(function(){return true;});
    },
    getComments: function(type, id){
      return api('comments?target_type=eq.'+type+'&target_id=eq.'+id+'&select=id,author,body,created_at&order=created_at.asc', {method:'GET'});
    },
    getCommentCount: function(type, id){
      return count('comments','target_type=eq.'+type+'&target_id=eq.'+id);
    },
    submitReport: function(url, issue, notes, page){
      return api('reports', {method:'POST', body:JSON.stringify({
        url:url, issue:issue, notes:notes||'', page:page||''
      })}).then(function(){return true;});
    },
    getReports: function(){
      return api('reports?select=id,url,issue,notes,page,created_at&order=created_at.desc', {method:'GET'});
    }
  };
})();
