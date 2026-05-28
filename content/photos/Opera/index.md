---
title: "Opera"
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
    column-gap: 15px; 
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
    height: auto;      /* ⭐️ 核心魔法：高度自适应！绝不裁剪任何一丝一毫！ */
    display: block;
    border-radius: 4px;  /* 可选：加一点极微小的圆角，质感更温润 */
    
    /* 一点点极简的交互：鼠标放上去微微发光 */
    transition: filter 0.3s ease;
  }
  
  .masonry-gallery img:hover {
    filter: brightness(1.08); /* 鼠标悬停稍微变亮一点，高级感拉满 */
  }

  /* 4. 响应式布局：照顾手机和平板用户 (Mobile Friendly) */
  @media (max-width: 800px) {
    .masonry-gallery { column-count: 4; } /* 平板保持 4 列 */
  }
  @media (max-width: 500px) {
    .masonry-gallery { column-count: 2; } /* 手机乖乖变成 2 列大图 */
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
  {{< paige/image src="opera1.jpeg" alt="Opera 1" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="opera2.jpeg" alt="Opera 2" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="opera3.jpeg" alt="Opera 3" >}}
  {{< paige/image src="opera4.JPG" alt="Opera 4" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="opera5.JPG" alt="Opera 5" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="opera6.JPG" alt="Opera 6" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="opera7.jpg" alt="Opera 7" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="opera8.jpg" alt="Opera 8" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="opera9.JPG" alt="Opera 9" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="opera10.JPG" alt="Opera 10" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="opera11.JPG" alt="Opera 11" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="opera12.JPG" alt="Opera 12" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="opera13.JPG" alt="Opera 13" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="opera14.JPG" alt="Opera 14" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="opera15.JPG" alt="Opera 15" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="opera16.jpg" alt="Opera 16" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="opera17.jpg" alt="Opera 17" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="opera18.jpg" alt="Opera 18" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="opera19.jpg" alt="Opera 19" loading="lazy" process="resize 800x webp" >}}
  {{< paige/image src="opera20.jpeg" alt="Opera 20" loading="lazy" process="resize 800x webp" >}}
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
