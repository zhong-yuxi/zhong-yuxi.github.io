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
    color: #333;         /* 深灰色，比纯黑更有质感 */
  }
  
 /* 2. 核心：瀑布流外层容器 (Masonry Container) */
  .masonry-gallery {
    /* 电脑端默认分 3 列 */
    column-count: 3;
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
    .masonry-gallery { column-count: 2; } /* 平板变成 2 列 */
  }
  @media (max-width: 500px) {
    .masonry-gallery { column-count: 1; } /* 手机乖乖变成 1 列大图 */
  }
</style>

<!-- 网页内容区域：只管往里塞图片，瀑布流会自动接住它们！ -->
<div class="masonry-gallery">
  <!-- 我已经按照你的截图，仔细核对了每一张图的后缀名大小写 🤓 -->
  <img src="yinuo1.jpeg" alt="Yinuo 1">
  <img src="yinuo2.jpeg" alt="Yinuo 2">
  <img src="yinuo3.jpg" alt="Yinuo 3">
  <img src="yinuo4.JPG" alt="Yinuo 4">
  <img src="yinuo5.JPG" alt="Yinuo 5">
  <img src="yinuo6.JPG" alt="Yinuo 6">
  <img src="yinuo7.JPG" alt="Yinuo 7">
  
  <img src="yinuo8.JPG" alt="Yinuo 8">
  <img src="yinuo9.JPG" alt="Yinuo 9">
  <img src="yinuo10.JPG" alt="Yinuo 10">
  <img src="yinuo11.jpeg" alt="Yinuo 11">
  <img src="yinuo12.jpg" alt="Yinuo 12">
  <img src="yinuo13.jpg" alt="Yinuo 13">
  <img src="yinuo14.jpg" alt="Yinuo 14">
  
  <img src="yinuo15.jpg" alt="Yinuo 15">
  <img src="yinuo16.jpg" alt="Yinuo 16">
  <img src="yinuo17.jpg" alt="Yinuo 17">
  <img src="yinuo18.jpg" alt="Yinuo 18">
  <img src="yinuo19.jpg" alt="Yinuo 19">
</div>
