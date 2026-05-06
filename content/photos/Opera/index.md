---
title: "Opera"
date: 2026-05-04
draft: false
weight: 3
---

<style>
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
    font-size: 1.5rem;   /* 大小：适中偏大，很有张力 */
    font-weight: 300;    /* 粗细：500是中等粗细，600是半粗体 */
    text-align: center;  /* 居中对齐，更有仪式感 */
    margin-top: 20px;    /* 顶部留白 */
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

  /* 3. 图片的自我修养：不裁剪、不断裂 */
  .masonry-gallery img {
    width: 100%;       /* 宽度占满当前列 */
    height: auto;      /* ⭐️ 核心魔法：高度自适应！绝不裁剪任何一丝一毫！ */
    display: block;
    margin-bottom: 15px; /* 上下照片的间距，和 column-gap 保持一致 */
    border-radius: 4px;  /* 可选：加一点极微小的圆角，质感更温润 */
    
    /* ⭐️ 防坑指南：防止一张图片被从中间劈开，分到两列去 */
    break-inside: avoid; 
    -webkit-column-break-inside: avoid;
    
    /* 一点点极简的交互：鼠标放上去微微发光 */
    transition: filter 0.3s ease;
  }
  
  .masonry-gallery img:hover {
    filter: brightness(1.05); /* 鼠标悬停稍微变亮一点，高级感拉满 */
  }

  /* 4. 响应式布局：照顾手机和平板用户 (Mobile Friendly) */
  @media (max-width: 800px) {
    .masonry-gallery { column-count: 4; } /* 平板变成 4 列 */
  }
  @media (max-width: 500px) {
    .masonry-gallery { column-count: 2; } /* 手机乖乖变成 2 列大图 */
  }
</style>

<!-- 网页内容区域：只管往里塞图片，瀑布流会自动接住它们！ -->
<div class="masonry-gallery">
  <!-- 我已经按照你的截图，仔细核对了每一张图的后缀名大小写 🤓 -->
<img src="opera1.jpeg" alt="Opera 1">
<img src="opera2.jpeg" alt="Opera 2">
<img src="opera3.jpeg" alt="Opera 3">
<img src="opera4.JPG" alt="Opera 4">
<img src="opera5.JPG" alt="Opera 5">
<img src="opera6.JPG" alt="Opera 6">
<img src="opera7.jpg" alt="Opera 7">
<img src="opera8.jpg" alt="Opera 8">
<img src="opera9.JPG" alt="Opera 9">
<img src="opera10.JPG" alt="Opera 10">
<img src="opera11.JPG" alt="Opera 11">
<img src="opera12.JPG" alt="Opera 12">
<img src="opera13.JPG" alt="Opera 13">
<img src="opera14.JPG" alt="Opera 14">
<img src="opera15.JPG" alt="Opera 15">
<img src="opera16.jpg" alt="Opera 16">
<img src="opera17.jpg" alt="Opera 17">
</div>
