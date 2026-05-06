---
title: "Film"
date: 2026-05-04
draft: false
weight: 3
---

<style>
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
    /* 默认在电脑上显示 3 列 */
    column-count: 4;
    /* 列与列之间的间距 */
    column-gap: 20px; 
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
    .masonry-gallery { column-count: 3; }
  }
  @media (max-width: 500px) {
    .masonry-gallery { column-count: 2; }
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
<img src="film19.jpg" alt="Film 19">
<img src="film20.jpg" alt="Film 20">
<img src="film21.jpg" alt="Film 21">
<img src="film22.jpg" alt="Film 22">
<img src="film23.JPG" alt="Film 23">
<img src="film24.JPG" alt="Film 24">
<img src="film25.JPG" alt="Film 25">
<img src="film26.jpg" alt="Film 26">
<img src="film27.JPG" alt="Film 27">
<img src="film28.JPG" alt="Film 28">
<img src="film29.JPG" alt="Film 29">
<img src="film30.jpg" alt="Film 30">
<img src="film31.jpg" alt="Film 31">
<img src="film32.jpg" alt="Film 32">
<img src="film33.JPG" alt="Film 33">
<img src="film34.jpg" alt="Film 34">
<img src="film35.jpg" alt="Film 35">
<img src="film36.jpg" alt="Film 36">
<img src="film37.jpg" alt="Film 37">
<img src="film38.jpg" alt="Film 38">
<img src="film39.JPG" alt="Film 39">
<img src="film40.JPG" alt="Film 40">
<img src="film41.jpg" alt="Film 41">
<img src="film42.jpg" alt="Film 42">
<img src="film43.jpg" alt="Film 43">
<img src="film44.jpg" alt="Film 44">
<img src="film45.jpg" alt="Film 45">
<img src="film46.JPG" alt="Film 46">
</div>
