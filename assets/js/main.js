// Hamburger toggle + active link highlight + resources builder
(function(){
  const nav = document.getElementById('site-nav');
  const btn = document.getElementById('hamburger');
  const overlay = document.getElementById('overlay');

  if(btn && nav && overlay){
    // 点击按钮 → 开关菜单 + 遮罩
    btn.addEventListener('click', (e)=>{
      e.stopPropagation(); // 避免冒泡触发文档点击
      const isOpen = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));
      overlay.style.display = isOpen ? 'block' : 'none';
    });

    // 点击遮罩 → 关闭
    overlay.addEventListener('click', ()=>{
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      overlay.style.display = 'none';
    });

    // 点击菜单外任意区域 → 关闭（兜底）
    document.addEventListener('click', (e)=>{
      if (!nav.contains(e.target) && !btn.contains(e.target)) {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        overlay.style.display = 'none';
      }
    });

    // 点击菜单里的链接 → 关闭
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link=>{
      link.addEventListener('click', ()=>{
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        overlay.style.display = 'none';
      });
    });

    // 视口从手机切回桌面时，确保状态复位（可选）
    window.addEventListener('resize', ()=>{
      if (window.innerWidth > 860) {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        overlay.style.display = 'none';
      }
    });
  }

  // active link（保持你原有逻辑）
  const links = (nav ? nav.querySelectorAll('a') : []);
  links.forEach(a=>{
    if (location.pathname.endsWith(a.getAttribute('href'))) {
      a.classList.add('active');
    }
  });

  // resources（保持你原有逻辑）
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
