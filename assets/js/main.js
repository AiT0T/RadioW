// Hamburger toggle + active link highlight + resources builder
(function(){
  const nav = document.getElementById('site-nav');
  const btn = document.getElementById('hamburger');
  if(btn && nav){
    btn.addEventListener('click', (e)=>{
      e.stopPropagation(); // 阻止冒泡，避免立刻触发 document 的点击事件
      const isOpen = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));
    });

    // 点击页面空白 → 自动收起
    document.addEventListener('click', (e)=>{
      if (!nav.contains(e.target) && !btn.contains(e.target)) {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });

    // 点击菜单链接 → 自动收起
    const links = nav.querySelectorAll('a');
    links.forEach(link=>{
      link.addEventListener('click', ()=>{
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });
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
      const ext = it.file.split('.').pop().toUpperCase();
      meta.innerHTML = ext + ' · <span class="digits">' + (it.size || '未知大小') + '</span>';

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

// 首页标题分割线宽度
document.addEventListener("DOMContentLoaded", () => {
  const title = document.querySelector(".hero-title");
  const hr = document.querySelector(".hero-sep");
  if (title && hr) {
    hr.style.width = title.offsetWidth + "px";
  }
});
