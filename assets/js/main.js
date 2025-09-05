// Hamburger toggle + active link highlight + resources builder
(function(){
  const nav = document.getElementById('site-nav');
  const btn = document.getElementById('hamburger');
  if(btn && nav){
    btn.addEventListener('click', ()=>{
      const isOpen = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));
    });
  }
  // active link
  const links = (nav ? nav.querySelectorAll('a') : []);
  links.forEach(a=>{
    if (location.pathname.endsWith(a.getAttribute('href'))) {
      a.classList.add('active');
    }
  });

  // resources
  const container = document.getElementById('downloads');
  if(container){
    const items = (window.BA8AKA_DOWNLOADS || []);
    items.forEach(it=>{
      const card = document.createElement('div');
      card.className = 'card';
      const title = document.createElement('div');
      title.className = 'card-title';
      title.textContent = it.title || '下载项';
      const meta = document.createElement('div');
      meta.className = 'card-meta';
      meta.innerHTML = 'PDF · <span class="digits">' + (it.size || '未知大小') + '</span>';
      const link = document.createElement('a');
      link.className = 'btn';
      link.href = it.file;
      link.textContent = '下载';
      link.setAttribute('download', '');
      card.append(title, meta, link);
      container.append(card);
    });
  }
})();
