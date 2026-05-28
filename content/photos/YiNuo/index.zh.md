---
title: "顗糯"
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
    transition: color 0.2s ease-in-out, opacity 0.2s ease-in-out;
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

/* 1. 字体定制 -  Slidexiaxing */
@font-face { 
    font-family: 'GillSans'; 
    src: url('/fonts/GillSans.ttc') format('truetype'); 
    font-weight: normal;
    font-style: normal;
}

h1 {
    font-family: 'GillSans', sans-serif; /* 👈 魔法生效点：更换为新字体 */
    font-size: 2rem; /* 💡 小贴士：中文字体通常比英文字体显小，我帮你稍微放大了点，如果觉得大可以改回 1.5rem */
    font-weight: normal; /* 书法字体建议用 normal 保持笔画原汁原味 */
    text-align: center;
    margin-top: 20px;
    letter-spacing: 2px; /* 如果觉得汉字太散，可以改成 0px */
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
    column-gap: 25px; 
    max-width: 1200px; 
    margin: 40px auto; /* 居中显示 */
    padding: 0 20px;
  }

  /* 适配 Paige 短代码生成的容器，防止瀑布流断裂 */
  .masonry-gallery .paige-shortcode-image {
    break-inside: avoid;
    -webkit-column-break-inside: avoid;
    margin-bottom: 15px;
  }

  /* 3. 图片的自我修养：不裁剪、不断裂 */
  .masonry-gallery img {
    width: 100%;       /* 宽度占满当前列 */
    height: auto;      /* ⭐️ 核心魔法：高度自适应！ */
    display: block;
    border-radius: 4px;  /* 可选：加一点极微小的圆角 */
    
    /* 交互：鼠标放上去稍微变亮 */
    transition: filter 0.3s ease;
  }
  
  .masonry-gallery img:hover {
    filter: brightness(1.06); 
  }

  /* 4. 响应式布局 */
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
  {{< paige/image src="yinuo1.jpeg" alt="Yinuo 1" >}}
  {{< paige/image src="yinuo2.jpeg" alt="Yinuo 2" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="yinuo3.jpg" alt="Yinuo 3" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="yinuo4.JPG" alt="Yinuo 4" >}}
  {{< paige/image src="yinuo5.JPG" alt="Yinuo 5" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="yinuo6.JPG" alt="Yinuo 6" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="yinuo7.JPG" alt="Yinuo 7" loading="lazy" process="resize 800x webp" >}}
  
  {{< paige/image src="yinuo8.JPG" alt="Yinuo 8" >}}
  {{< paige/image src="yinuo9.JPG" alt="Yinuo 9" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="yinuo10.JPG" alt="Yinuo 10" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="yinuo11.jpeg" alt="Yinuo 11" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="yinuo12.jpg" alt="Yinuo 12" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="yinuo13.jpg" alt="Yinuo 13" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="yinuo14.jpg" alt="Yinuo 14" loading="lazy" process="resize 800x webp" >}}
  
  {{< paige/image src="yinuo15.jpg" alt="Yinuo 15" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="yinuo16.jpg" alt="Yinuo 16" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="yinuo17.jpg" alt="Yinuo 17" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="yinuo18.jpg" alt="Yinuo 18" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="yinuo19.jpg" alt="Yinuo 19" loading="lazy" process="resize 800x webp" >}}
  
  {{< paige/image src="yinuo20.jpg" alt="Yinuo 20" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="yinuo21.jpg" alt="Yinuo 21" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="yinuo22.jpg" alt="Yinuo 22" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="yinuo23.jpg" alt="Yinuo 23" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="yinuo24.jpeg" alt="Yinuo 24" >}}
  {{< paige/image src="yinuo25.jpeg" alt="Yinuo 25" >}}  
  {{< paige/image src="yinuo26.jpg" alt="Yinuo 26" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="yinuo27.jpg" alt="Yinuo 27" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="yinuo28.jpg" alt="Yinuo 28" loading="lazy" process="resize 800x webp" >}}
</div>

<script>
// 等待网页内容加载完毕后再施展魔法
document.addEventListener("DOMContentLoaded", function() {
    const gallery = document.querySelector('.masonry-gallery');
    if (!gallery) return;

    // 获取相册里的所有图片项
    const items = Array.from(gallery.children);

    // 洗牌魔法：随机打乱这些图片的顺序
    for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // 交换位置
        [items[i], items[j]] = [items[j], items[i]];
    }

    // 按照新的随机顺序，把图片重新放回相册里
    items.forEach(item => gallery.appendChild(item));
});
</script>
