---
title: "Portraits"
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

  /* 1. 引入你的本地字体（这就是字体的“身份证”） */
  @font-face {
    font-family: 'MySparoseFont'; 
    /* 路径必须从根目录开始写，因为在 static 下，所以直接写 /fonts/ */
    src: url('/fonts/sparose.ttf') format('truetype'); 
    font-display: swap; /* 增加加载性能，防止字体没出来时文字消失 */
  }

  /* 2. 让这个页面的标题（h1）变身 */
  h1 {
    font-family: 'MySparoseFont', serif; /* 如果 Caliban 加载失败，默认使用衬线体 */
    font-size: 1.5rem;    /* 大小：适中偏大，很有张力 */
    font-weight: 300;     /* 粗细：500是中等粗细，600是半粗体 */
    text-align: center;   /* 居中对齐，更有仪式感 */
    margin-top: 20px;     /* 顶部留白 */
    letter-spacing: 2px; /* 字符间距：稍微拉开一点，更高级 */
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
  
 /* 2. 核心：瀑布流外层容器 (Masonry Container) */
  .masonry-gallery {
    /* 电脑端默认分 4 列 */
    column-count: 4;
    /* 列与列之间的呼吸感间距 */
    column-gap: 30px; 
    max-width: 1200px; 
    margin: 40px auto; /* 居中显示 */
    padding: 0 20px;
  }

  /* 适配 Paige 短代码容器，防止瀑布流断裂，并保持 30px 间距 */
  .masonry-gallery .paige-shortcode-image {
    break-inside: avoid;
    -webkit-column-break-inside: avoid;
    margin-bottom: 30px;
  }

  /* 3. 图片的自我修养：不裁剪、不断裂 */
  .masonry-gallery img {
    width: 100%;       /* 宽度占满当前列 */
    height: auto;      /* ⭐️ 核心魔法：高度自适应！ */
    display: block;
    border-radius: 0px;  /* 肖像保持原汁原味的直角 */
    
    /* 交互：鼠标放上去稍微变亮 */
    transition: filter 0.3s ease;
  }
  
  .masonry-gallery img:hover {
    filter: brightness(1.05); 
  }

  /* 4. 响应式布局：照顾手机和平板用户 (Mobile Friendly) */
  @media (max-width: 800px) {
    .masonry-gallery { column-count: 3; } /* 平板保持 3 列 */
  }
  @media (max-width: 500px) {
    .masonry-gallery { column-count: 2; } /* 手机变成 2 列 */
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
  {{< paige/image src="portrait1.jpeg" alt="Portrait 1" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="portrait2.jpeg" alt="Portrait 2" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="portrait3.jpeg" alt="Portrait 3" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="portrait4.jpeg" alt="Portrait 4" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="portrait5.jpg" alt="Portrait 5" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="portrait6.JPG" alt="Portrait 6" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="portrait7.JPG" alt="Portrait 7" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="portrait8.JPG" alt="Portrait 8" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="portrait9.JPG" alt="Portrait 9" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="portrait10.JPG" alt="Portrait 10" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="portrait11.JPG" alt="Portrait 11" loading="lazy" process="resize 800x webp" >}}
</div>
