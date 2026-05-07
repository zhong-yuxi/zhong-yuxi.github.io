---
title: "Film"
date: 2026-05-04
draft: false
weight: 3
---

<style>
#paige-site-title,
#paige-site-title a,
#paige-site-description {
    display: none !important;
}

#paige-site-header {
    margin-top: 2rem !important; /* 这里的 4rem 就是往下移的距离，你可以随便改！ */
}

/* ==========================================
   🌟 强制注入：导航栏字体与颜色魔法 (Brute Force Styles)
   ========================================== */
/* 1. 加载导航栏专属的 Jost 字体 (与相册标题的 Sparose 互不冲突) */
@font-face {
    font-family: 'MyJost';
    src: url('/fonts/Jost-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}

/* 2. 强制覆盖导航栏的字体和初始颜色 */
#paige-site-menu a {
    font-family: 'MyJost', sans-serif !important; 
    color: #008b8b !important;
    font-weight: 500 !important;
    letter-spacing: 0.05em !important;
    transition: color 0.2s ease-in-out, opacity 0.2s ease-in-out !important; 
}

/* 3. 鼠标悬停变浅（变白一点） */
#paige-site-menu a:hover {
    color: #66cdcd !important; 
}

/* 4. 鼠标点下去的瞬间变深 */
#paige-site-menu a:active {
    color: #004d4d !important; 
}

/* 5. 当前所在页面的高亮保持深色 (表示你正在 Photos 页面) */
#paige-site-menu a.active,
#paige-site-menu a[aria-current="page"] {
    color: #004d4d !important; 
    font-weight: 700 !important; 
}


/* 1. 字体定制 - 沿用你最爱的 Sparose */
@font-face { 
font-family: 'sparose'; 
src: url('/fonts/sparose.ttf') format('truetype'); 
}
h1 {
font-family: 'sparose', sans-serif;
font-size: 1.5rem;
font-weight: 300;
text-align: center;
margin-top: 20px;
letter-spacing: 2px;
color: #166D7A; /* 👈 白底时的专属颜色 */
  transition: color 0.3s ease; /* 加个小魔法：切换黑白模式时，颜色会有0.3秒的渐变动画，极其丝滑 */
}

/* 2. 当用户系统是暗黑模式时（黑底 / Dark Mode），自动变成白色 */
@media (prefers-color-scheme: dark) {
  h1 {
    color: #ffffff !important; /* 加上 !important 就像给代码发了 VIP 通行证，强制生效 */
  }
}

/* 3. 针对 Hugo Paige 主题的防弹装甲（防止手动点击主题按钮时颜色没变） */
[data-bs-theme="dark"] h1, 
[data-theme="dark"] h1 {
  color: #ffffff !important;
}
  
  /* 3. 核心魔法：瀑布流画廊 (Masonry Gallery) */
  .masonry-gallery {
    /* 默认在电脑上显示 4 列 */
    column-count: 4;
    /* 列与列之间的间距 */
    column-gap: 20px; 
    /* 给画廊整体加一点内边距 */
    padding: 20px;
    max-width: 1200px; /* 限制一下最大宽度，让排版更好看 */
    margin: 0 auto;    /* 让整个画廊居中 */
  }

  /* ⚠️ 为了兼容 Paige 主题的 div 包装，添加了针对外层容器的设置以防止图片被劈开 */
  .masonry-gallery .paige-shortcode-image {
    break-inside: avoid;
    margin-bottom: 15px;
  }

  /* 单张图片的设置 */
  .masonry-gallery img {
    width: 100%;       /* 图片宽度占满所在的列 */
    height: auto;      /* 高度自适应，保持原有比例 */
    display: block;    /* 去掉图片底部的默认留白 */
    
    /* ⚠️ 最关键的一句：防止一张图片被从中间劈开分到两列去 */
    break-inside: avoid; 
    
    /* （可选）如果你想让图片像风景图那样有一点点精致的白边和阴影，可以保留下面两行；不需要就删掉 */
    border: 5px solid #fff; 
    box-shadow: 0 4px 6px rgba(0,0,0,0.05); 
  }

  /* 4. 响应式设计：在手机屏幕上自动变成 2 列，平板上 4 列 */
  @media (max-width: 800px) {
    .masonry-gallery { column-count: 4; }
  }
  @media (max-width: 500px) {
    .masonry-gallery { column-count: 2; }
  }
  
  /* 1. 系统级别的夜间模式适配 */
@media (prefers-color-scheme: dark) {
    /* 常驻颜色为 24F1FF */
    #paige-site-menu a { color: #24F1FF !important; }
    /* 鼠标指向的颜色为 B1F5FA */
    #paige-site-menu a:hover { color: #B1F5FA !important; }
    /* 选中之后的颜色为 FFFFFF */
    #paige-site-menu a.active,
    #paige-site-menu a[aria-current="page"] { color: #FFFFFF !important; }
}
  
</style>

<div class="masonry-gallery">
  {{< paige/image src="film1.jpg" alt="Film 1" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="film2.JPG" alt="Film 2" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="film3.jpg" alt="Film 3" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="film4.JPG" alt="Film 4" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="film5.JPG" alt="Film 5" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="film6.JPG" alt="Film 6" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="film7.JPG" alt="Film 7" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="film8.JPG" alt="Film 8" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="film9.JPG" alt="Film 9" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="film10.JPG" alt="Film 10" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="film11.JPG" alt="Film 11" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="film12.JPG" alt="Film 12" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="film13.jpg" alt="Film 13" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="film14.JPG" alt="Film 14" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="film15.JPG" alt="Film 15" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="film16.JPG" alt="Film 16" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="film17.jpg" alt="Film 17" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="film18.JPG" alt="Film 18" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="film19.jpg" alt="Film 19" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="film20.jpg" alt="Film 20" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="film48.JPG" alt="Film 48" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="film21.jpg" alt="Film 21" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="film22.jpg" alt="Film 22" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="film23.JPG" alt="Film 23" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="film24.JPG" alt="Film 24" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="film25.JPG" alt="Film 25" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="film26.jpg" alt="Film 26" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="film27.JPG" alt="Film 27" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="film28.JPG" alt="Film 28" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="film29.JPG" alt="Film 29" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="film30.jpg" alt="Film 30" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="film31.jpg" alt="Film 31" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="film32.jpg" alt="Film 32" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="film33.JPG" alt="Film 33" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="film34.jpg" alt="Film 34" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="film35.jpg" alt="Film 35" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="film36.jpg" alt="Film 36" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="film37.jpg" alt="Film 37" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="film38.jpg" alt="Film 38" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="film39.JPG" alt="Film 39" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="film40.JPG" alt="Film 40" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="film41.jpg" alt="Film 41" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="film42.jpg" alt="Film 42" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="film43.jpg" alt="Film 43" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="film44.jpg" alt="Film 44" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="film45.jpg" alt="Film 45" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="film46.JPG" alt="Film 46" loading="lazy" process="resize 800x webp" >}}
{{< paige/image src="film47.jpg" alt="Film 45" loading="lazy" process="resize 800x webp" >}}
</div>
