document.addEventListener("DOMContentLoaded", function () {
  const nav = document.getElementById("site-nav");
  const btn = document.getElementById("hamburger");
  let overlay = document.getElementById("overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "overlay";
    document.body.appendChild(overlay);
  }

  if (btn && nav && overlay) {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(isOpen));
      overlay.style.display = isOpen ? "block" : "none";
    });

    overlay.addEventListener("click", () => {
      nav.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
      overlay.style.display = "none";
    });

    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && !btn.contains(e.target)) {
        nav.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
        overlay.style.display = "none";
      }
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
        overlay.style.display = "none";
      });
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 860) {
        nav.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
        overlay.style.display = "none";
      }
    });
  } else {
    console.warn("[BA8AKA] nav/btn/overlay 缺失：", { nav: !!nav, btn: !!btn, overlay: !!overlay });
  }

  // 保留你的 active link & 资源卡片 & 首页分割线逻辑
  const links = nav ? nav.querySelectorAll("a") : [];
  links.forEach((a) => {
    if (location.pathname.endsWith(a.getAttribute("href"))) a.classList.add("active");
  });

  const container = document.getElementById("downloads");
  if (container) {
    const items = window.BA8AKA_DOWNLOADS || [];
    items.forEach((it) => {
      const card = document.createElement("div");
      card.className = "card";

      const title = document.createElement("div");
      title.className = "card-title";
      title.textContent = it.title || "下载项";

      const meta = document.createElement("div");
      meta.className = "card-meta";
      const ext = it.file.split(".").pop().toUpperCase();
      meta.innerHTML = ext + ' · <span class="digits">' + (it.size || "未知大小") + "</span>";

      const link = document.createElement("a");
      link.className = "btn";
      link.href = it.file;
      link.textContent = "下载";
      link.setAttribute("download", "");

      card.append(title, meta, link);
      container.append(card);
    });
  }

  const title = document.querySelector(".hero-title");
  const hr = document.querySelector(".hero-sep");
  if (title && hr) hr.style.width = title.offsetWidth + "px";
});
