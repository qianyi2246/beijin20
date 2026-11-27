/* ============================================================
   FLASH* · 影像冲印 —— 网站模板 06
   拼贴网格 / 分类筛选 / 洗牌 / 灯箱
   ============================================================ */

const WORKS = [
  {
    num: "01", src: "images/g01.jpg", w: 1240, h: 1420,
    title: "00:15 的生日消息", category: "聊天",
    alt: "聊天记录：朋友在零点十五分发来生日祝福",
  },
  {
    num: "02", src: "images/g02.jpg", w: 1240, h: 1000,
    title: "生日快乐哈", category: "聊天",
    alt: "聊天记录：朋友说加油，并祝生日快乐",
  },
  {
    num: "03", src: "images/g03.jpg", w: 1003, h: 1800,
    title: "2 小时 06 分的通话", category: "聊天",
    alt: "聊天记录：一通两小时零六分的语音通话",
  },
  {
    num: "04", src: "images/g04.jpg", w: 1240, h: 1610,
    title: "任宇航的红包", category: "聊天",
    alt: "聊天记录：领取了任宇航的生日红包",
  },
  {
    num: "05", src: "images/g05.jpg", w: 1220, h: 1800,
    title: "刀刀的祝福", category: "聊天",
    alt: "聊天记录：刀刀发来生日祝福和红包",
  },
  {
    num: "06", src: "images/g06.jpg", w: 1238, h: 874,
    title: "想好愿望了吗", category: "聊天",
    alt: "聊天记录：朋友问有没有想好生日愿望",
  },
  {
    num: "07", src: "images/g07.jpg", w: 1234, h: 268,
    title: "下午几点在家", category: "聊天",
    alt: "聊天记录：朋友点了蛋糕，问下午几点在家",
  },
  {
    num: "08", src: "images/g08.jpg", w: 985, h: 1800,
    title: "阿米娅兔宝宝", category: "聊天",
    alt: "聊天记录：朋友要地址，准备寄阿米娅兔宝宝",
  },
  {
    num: "09", src: "images/g09.jpg", w: 1240, h: 1086,
    title: "严肃学习与胃镜", category: "聊天",
    alt: "聊天记录：朋友说刚做完胃镜，补上生日祝福",
  },
  {
    num: "10", src: "images/g10.jpg", w: 1800, h: 1350,
    title: "肯德基生日餐", category: "美食",
    alt: "两个人坐在肯德基里吃生日餐",
  },
  {
    num: "11", src: "images/g11.jpg", w: 1352, h: 1800,
    title: "冰淇淋蛋糕到了", category: "蛋糕",
    alt: "外卖送到的冰淇淋蛋糕保温袋",
  },
  {
    num: "12", src: "images/g12.jpg", w: 1350, h: 1800,
    title: "一头饥饿的雄狮", category: "日常",
    alt: "夜晚坐在长椅上，旁边放着蛋糕袋",
  },
  {
    num: "13", src: "images/g13.jpg", w: 913, h: 1800,
    title: "霸道总裁篇", category: "聊天",
    alt: "聊天记录：朋友说请吃肯德基，被调侃霸道总裁",
  },
  {
    num: "14", src: "images/g14.jpg", w: 1800, h: 1350,
    title: "三头雄狮", category: "美食",
    alt: "两个人在肯德基低头吃生日餐",
  },
  {
    num: "15", src: "images/g15.jpg", w: 1350, h: 1800,
    title: "蓝莓蛋糕", category: "蛋糕",
    alt: "点着蜡烛的蓝莓蛋糕",
  },
  {
    num: "16", src: "images/g16.jpg", w: 1350, h: 1800,
    title: "许愿", category: "蛋糕",
    alt: "盒子里铺满蓝莓的生日蛋糕",
  },
  {
    num: "17", src: "images/g17.jpg", w: 1350, h: 1800,
    title: "北槿与坦克", category: "日常",
    alt: "包装好的玩偶坐在坦克模型上",
  },
  {
    num: "18", src: "images/g18.jpg", w: 1350, h: 1800,
    title: "桌面一角", category: "日常",
    alt: "摆着玩偶、坦克模型和键盘的桌面",
  },
  {
    num: "19", src: "images/g19.jpg", w: 1237, h: 732,
    title: "饥饿鲨：进化", category: "聊天",
    alt: "聊天记录：用表情包开玩笑说饥饿鲨进化",
  },
];

const CAT_COLORS = {
  聊天: { bg: "#d8f24a", fg: "#111110" },
  美食: { bg: "#ff3b1e", fg: "#f4f0e6" },
  蛋糕: { bg: "#ffa4c4", fg: "#111110" },
  日常: { bg: "#2b32ff", fg: "#f4f0e6" },
};

(() => {
  "use strict";

  const grid = document.getElementById("grid");
  const filtersEl = document.getElementById("filters");
  const emptyEl = document.getElementById("empty");
  const shuffleBtn = document.getElementById("shuffle");

  const lightbox = document.getElementById("lightbox");
  const lbImg = document.getElementById("lb-img");
  const lbNo = document.getElementById("lb-no");
  const lbTitle = document.getElementById("lb-title");
  const lbCat = document.getElementById("lb-cat");
  const lbCount = document.getElementById("lb-count");
  const btnClose = document.getElementById("lb-close");
  const lbPrev = document.getElementById("lb-prev");
  const lbNext = document.getElementById("lb-next");

  const cards = [];
  const state = { visible: [], pos: -1, lastFocus: null };

  const categories = ["全部", ...new Set(WORKS.map((w) => w.category))];

  /* ---------- 分类按钮 ---------- */

  categories.forEach((cat) => {
    const count =
      cat === "全部"
        ? WORKS.length
        : WORKS.filter((w) => w.category === cat).length;

    const pill = document.createElement("button");
    pill.type = "button";
    pill.className = "pill" + (cat === "全部" ? " is-active" : "");
    pill.dataset.cat = cat;
    pill.innerHTML = `${cat}<span class="n">${count}</span>`;
    pill.setAttribute("aria-pressed", cat === "全部" ? "true" : "false");
    pill.addEventListener("click", () => applyFilter(cat));
    filtersEl.appendChild(pill);
  });

  /* ---------- 卡片 ---------- */

  WORKS.forEach((work, i) => {
    const color = CAT_COLORS[work.category] || { bg: "#d8f24a", fg: "#111110" };

    const card = document.createElement("figure");
    card.className = "card";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `查看照片：${work.title}`);
    card.innerHTML = `
      <div class="frame">
        <img src="${work.src}" alt="${work.alt}" width="${work.w}" height="${work.h}"
             loading="${i < 4 ? "eager" : "lazy"}" decoding="async">
      </div>
      <figcaption>
        <span class="no">${work.num}</span>
        <span class="ttl">${work.title}</span>
        <span class="cat" style="background:${color.bg};color:${color.fg}">${work.category}</span>
      </figcaption>`;

    card.addEventListener("click", () => openLightbox(i));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(i);
      }
    });

    grid.appendChild(card);
    cards.push(card);
  });

  /* ---------- 筛选 ---------- */

  function applyFilter(cat) {
    state.visible = [];

    cards.forEach((card, i) => {
      const show = cat === "全部" || WORKS[i].category === cat;
      card.classList.toggle("is-hidden", !show);
      if (show) state.visible.push(i);
    });

    filtersEl.querySelectorAll(".pill").forEach((pill) => {
      const active = pill.dataset.cat === cat;
      pill.classList.toggle("is-active", active);
      pill.setAttribute("aria-pressed", String(active));
    });

    emptyEl.hidden = state.visible.length > 0;
  }

  /* ---------- 洗牌 ---------- */

  shuffleBtn.addEventListener("click", () => {
    const order = cards.slice();
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }

    order.forEach((card) => grid.appendChild(card));

    cards.forEach((card, i) => {
      card.animate(
        [
          { opacity: 0.3, transform: "scale(0.96)" },
          { opacity: 1, transform: "scale(1)" },
        ],
        { duration: 320, delay: i * 14, easing: "ease-out" }
      );
    });

    shuffleBtn.animate(
      [{ transform: "rotate(0deg)" }, { transform: "rotate(180deg)" }],
      { duration: 380, easing: "ease-out" }
    );
  });

  /* ---------- 灯箱 ---------- */

  function openLightbox(index) {
    state.pos = state.visible.indexOf(index);
    if (state.pos < 0) {
      state.visible = WORKS.map((_, i) => i);
      state.pos = index;
    }

    state.lastFocus = document.activeElement;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");

    show(state.pos);
    btnClose.focus();
  }

  function show(pos) {
    const work = WORKS[state.visible[pos]];
    const color = CAT_COLORS[work.category] || { bg: "#d8f24a", fg: "#111110" };

    lbImg.src = work.src;
    lbImg.alt = work.alt;
    lbNo.textContent = work.num;
    lbTitle.textContent = work.title;
    lbCat.textContent = work.category;
    lbCat.style.background = color.bg;
    lbCat.style.color = color.fg;
    lbCount.textContent = `${String(pos + 1).padStart(2, "0")} / ${String(
      state.visible.length
    ).padStart(2, "0")}`;

    state.pos = pos;
  }

  function step(delta) {
    const total = state.visible.length;
    show((state.pos + delta + total) % total);
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    lbImg.removeAttribute("src");
    if (state.lastFocus instanceof HTMLElement) state.lastFocus.focus();
  }

  const isOpen = () => lightbox.classList.contains("is-open");

  btnClose.addEventListener("click", closeLightbox);
  lbPrev.addEventListener("click", () => step(-1));
  lbNext.addEventListener("click", () => step(1));
  lightbox.querySelector(".lb-backdrop").addEventListener("click", closeLightbox);

  document.addEventListener("keydown", (e) => {
    if (!isOpen()) return;

    if (e.key === "Escape") {
      e.preventDefault();
      closeLightbox();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    } else if (e.key === "Tab") {
      const focusables = [btnClose, lbPrev, lbNext];
      const i = focusables.indexOf(document.activeElement);
      e.preventDefault();
      const next = e.shiftKey
        ? i <= 0 ? focusables.length - 1 : i - 1
        : (i + 1) % focusables.length;
      focusables[next].focus();
    }
  });

  /* 手机端左右滑动 */
  let touchX = null;
  lightbox.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "touch") touchX = e.clientX;
  });
  lightbox.addEventListener("pointerup", (e) => {
    if (touchX === null) return;
    const dx = e.clientX - touchX;
    touchX = null;
    if (Math.abs(dx) > 52) step(dx < 0 ? 1 : -1);
  });

  /* ---------- 初始化 ---------- */

  applyFilter("全部");
})();
