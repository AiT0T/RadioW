document.addEventListener("DOMContentLoaded", function () {
  // 1) 选择元素（并自动注入 overlay）
  const nav = document.getElementById("site-nav");
  const btn = document.getElementById("hamburger");
  let overlay = document.getElementById("overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "overlay";
    document.body.appendChild(overlay);
  }

  // 2) 汉堡菜单交互（含遮罩、外部点击关闭、链接点击关闭、窗口恢复）
  if (btn && nav && overlay) {
    // 点击按钮 → 开/关
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(isOpen));
      overlay.style.display = isOpen ? "block" : "none";
    });

    // 点击遮罩 → 关
    overlay.addEventListener("click", () => {
      nav.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
      overlay.style.display = "none";
    });

    // 点击菜单外 → 关
    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && !btn.contains(e.target)) {
        nav.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
        overlay.style.display = "none";
      }
    });

    // 点击菜单链接 → 关
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
        overlay.style.display = "none";
      });
    });

    // 视口恢复到桌面宽度 → 复位
    window.addEventListener("resize", () => {
      if (window.innerWidth > 860) {
        nav.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
        overlay.style.display = "none";
      }
    });
  } else {
    // 帮你排查：打开控制台看是哪一项缺失
    console.warn("[BA8AKA] nav/btn/overlay 缺失：", { nav: !!nav, btn: !!btn, overlay: !!overlay });
  }

  // 3) active link 高亮（保持你的逻辑）
  const links = nav ? nav.querySelectorAll("a") : [];
  links.forEach((a) => {
    if (location.pathname.endsWith(a.getAttribute("href"))) {
      a.classList.add("active");
    }
  });

  // 4) 资源页卡片（保持你的逻辑）
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

  // 5) 首页标题分割线宽度（保持你的逻辑）
  const title = document.querySelector(".hero-title");
  const hr = document.querySelector(".hero-sep");
  if (title && hr) {
    hr.style.width = title.offsetWidth + "px";
  }
});
