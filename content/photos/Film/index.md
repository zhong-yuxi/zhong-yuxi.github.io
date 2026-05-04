---
title: "Film"
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
  
  /* 3. 核心魔法：瀑布流画廊 (Masonry Gallery) */
  .masonry-gallery {
    /* 默认在电脑上显示 3 列 */
    column-count: 3;
    /* 列与列之间的间距 */
    column-gap: 15px; 
    /* 给画廊整体加一点内边距 */
    padding: 20px;
    max-width: 1200px; /* 限制一下最大宽度，让排版更好看 */
    margin: 0 auto;    /* 让整个画廊居中 */
  }

  /* 单张图片的设置 */
  .masonry-gallery img {
    width: 100%;       /* 图片宽度占满所在的列 */
    height: auto;      /* 高度自适应，保持原有比例 */
    display: block;    /* 去掉图片底部的默认留白 */
    margin-bottom: 15px; /* 上下图片之间的间距，要和 column-gap 保持一致 */
    
    /* ⚠️ 最关键的一句：防止一张图片被从中间劈开分到两列去 */
    break-inside: avoid; 
    
    /* （可选）如果你想让图片像风景图那样有一点点精致的白边和阴影，可以保留下面两行；不需要就删掉 */
    border: 5px solid #fff; 
    box-shadow: 0 4px 6px rgba(0,0,0,0.05); 
  }

  /* 4. 响应式设计：在手机屏幕上自动变成 1 列，平板上 2 列 */
  @media (max-width: 800px) {
    .masonry-gallery { column-count: 2; }
  }
  @media (max-width: 500px) {
    .masonry-gallery { column-count: 1; }
  }
</style>

<!-- 5. 你的胶片照片墙 -->
<div class="masonry-gallery">
  <!-- ⚠️ 敲黑板：再次提醒，仔细看你的截图，后缀名大小写不一样哦！ -->
  <img src="film1.jpg" alt="Film 1">
  <img src="film2.JPG" alt="Film 2">
  <img src="film3.jpg" alt="Film 3">
  <img src="film4.JPG" alt="Film 4">
  <img src="film5.JPG" alt="Film 5">
  <img src="film6.JPG" alt="Film 6">
  <img src="film7.JPG" alt="Film 7">
  <img src="film8.JPG" alt="Film 8">
  <img src="film9.JPG" alt="Film 9">
  <img src="film10.JPG" alt="Film 10">
  <img src="film11.JPG" alt="Film 11">
  <img src="film12.JPG" alt="Film 12">
  <img src="film13.jpg" alt="Film 13">
  <img src="film14.JPG" alt="Film 14">
  <img src="film15.JPG" alt="Film 15">
  <img src="film16.JPG" alt="Film 16">
  <img src="film17.jpg" alt="Film 17">
  <img src="film18.JPG" alt="Film 18">
</div>
