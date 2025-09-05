(function(){
  const nav=document.getElementById('site-nav');const btn=document.getElementById('hamburger');
  if(btn&&nav){btn.addEventListener('click',()=>{const isOpen=nav.classList.toggle('open');btn.setAttribute('aria-expanded',isOpen);});}
  const container=document.getElementById('downloads');
  if(container){(window.BA8AKA_DOWNLOADS||[]).forEach(it=>{const card=document.createElement('div');card.className='card';card.innerHTML='<div class="card-title">'+it.title+'</div><div class="card-meta">PDF</div><a class="btn" href="'+it.file+'" download>下载</a>';container.append(card);});}
})();