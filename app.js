(function(){
var tabs=document.querySelectorAll('.tabs a'),panes=document.querySelectorAll('.pane');
function show(t){if(!document.getElementById(t))t='calendrier';tabs.forEach(function(a){a.classList.toggle('on',a.dataset.t===t)});panes.forEach(function(p){p.classList.toggle('on',p.id===t)});}
tabs.forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();history.replaceState(null,'','#'+a.dataset.t);show(a.dataset.t);window.scrollTo({top:0,behavior:'smooth'})})});
show((location.hash||'#calendrier').slice(1));
// filtre des posts
function filt(f){document.querySelectorAll('.ff button').forEach(function(b){b.classList.toggle('on',b.dataset.f===f)});document.querySelectorAll('.kpis .kpi[data-f]').forEach(function(b){b.classList.toggle('on',b.dataset.f===f)});document.querySelectorAll('.post').forEach(function(p){p.classList.toggle('hide',f!=='all'&&p.dataset.st!==f)})}
document.querySelectorAll('.ff button').forEach(function(b){b.onclick=function(){filt(b.dataset.f)}});
document.querySelectorAll('.kpis .kpi[data-f]').forEach(function(b){b.onclick=function(){var on=b.classList.contains('on');filt(on?'all':b.dataset.f);document.querySelector('.filhead').scrollIntoView({behavior:'smooth'})}});
// filtre commentaires
document.querySelectorAll('.cf').forEach(function(b){b.onclick=function(){document.querySelectorAll('.cf').forEach(function(x){x.classList.toggle('on',x===b)});document.querySelectorAll('.com').forEach(function(c){c.classList.toggle('hide',b.dataset.c!=='all'&&c.dataset.c!==b.dataset.c)})}});
document.querySelectorAll('.copy').forEach(function(b){b.onclick=function(){var t=b.closest('.rep').querySelector('p').textContent;if(navigator.clipboard)navigator.clipboard.writeText(t);b.textContent='Copiée';b.classList.add('ok');setTimeout(function(){b.textContent='Copier la réponse';b.classList.remove('ok')},1600)}});
// fenêtre post + carte ClickUp
var m=document.getElementById('m');
var cu='<svg viewBox="0 0 24 24"><path d="M4 17.2l2.9-2.2c1.5 2 3.2 2.9 5.1 2.9s3.6-.9 5.1-2.9l2.9 2.2c-2.2 2.9-4.9 4.4-8 4.4s-5.8-1.5-8-4.4zM12 6.6 6.8 11.1 4.4 8.4 12 1.8l7.6 6.6-2.4 2.7z"/></svg>';
var next={produire:'Visuel et légende à produire, puis envoi au client pour validation.',valider:'Lien envoyé au client ; dès son accord, la carte passe à « Validé ».',valide:'Programmé ; la carte passera à « Publié » à l\'heure prévue.',publie:'Publié ; les statistiques remontent dans le bilan mensuel.'};
function esc(s){var d=document.createElement('div');d.textContent=s;return d.innerHTML}
function open(id){var p=window.POSTS[id];if(!p)return;m.querySelector('.mph').innerHTML=p.ph;
m.querySelector('.mi').innerHTML='<span class="badge s-'+p.st+'">'+p.stl+'</span><h3>'+esc(p.t)+'</h3><dl><dt>Date</dt><dd>'+p.j+'</dd><dt>Réseau</dt><dd>'+p.res+'</dd><dt>Format</dt><dd>'+esc(p.fmt)+'</dd><dt>Responsable</dt><dd>'+esc(p.resp)+'</dd></dl><p class="capf">'+esc(p.cap)+'</p>'+
'<div class="cucard"><div class="cuh">'+cu+'ClickUp | Lagune | Novembre | #'+id+'</div><div class="cub"><p><b>Statut dans ClickUp :</b> '+p.stl+'</p><p><b>Étape suivante :</b> '+next[p.st]+'</p><p class="sync">Le statut choisi ici se reporte dans la carte ClickUp : rien n\'est saisi deux fois.</p></div></div>';
m.hidden=false;document.body.style.overflow='hidden'}
function close(){m.hidden=true;document.body.style.overflow=''}
document.querySelectorAll('.chip,.cu').forEach(function(b){b.onclick=function(){open(b.dataset.id)}});
m.onclick=function(e){if(e.target===m||e.target.classList.contains('x'))close()};
document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
})();
