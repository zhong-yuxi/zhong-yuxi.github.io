---
title: "Mountains"
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
  
  /* 隐藏页面的全局滚动条（可选，让页面看起来更干净） */
  body { overflow-x: hidden; }

  /* 画廊容器的设置 */
  .horizontal-gallery {
    display: flex;             /* 让图片横向排列 */
    overflow-x: auto;          /* 开启横向滚动 */
    overflow-y: hidden;
    scroll-snap-type: x mandatory; /* 增加滑动时的吸附感（像手机相册一样） */
    
    /* 这里的 gap 控制图片之间的间距。
       假设你的图片宽度大约是 60vw（屏幕宽度的60%），半张图片的距离就是 30vw。
       你可以随意修改这个数值（比如改成 400px 或者 20vw）来达到你想要的效果 */
    gap: 10vw;                 
    
    padding: 20px 50vw 50px 20px; /* 右侧留白，让最后一张图能滑到中间 */
  }

  /* 隐藏画廊容器自带的丑陋滚动条 */
  .horizontal-gallery::-webkit-scrollbar {
    display: none; 
  }

  /* 单张图片的设置 */
  .horizontal-gallery img {
    height: 70vh;              /* 统一图片的高度，占据屏幕高度的70% */
    width: auto;               /* 宽度自动适应，保持比例 */
    max-width: none;           /* 覆盖主题可能自带的图片限制 */
    object-fit: contain;       /* 保证图片完整显示 */
    scroll-snap-align: center; /* 滑动停下时，图片自动居中对齐 */
    flex-shrink: 0;            /* 防止图片被挤压变形 */
  }
</style>

<div class="horizontal-gallery">
  <img src="mountain1.jpeg" alt="mountain 1">
  <img src="mountain2.jpeg" alt="mountain 2">
  <img src="mountain3.jpg" alt="mountain 3">
  <img src="mountain4.jpeg" alt="mountain 4">
  <img src="mountain5.JPG" alt="mountain 5">
  <img src="mountain6.JPG" alt="mountain 6">
  <img src="mountain7.jpeg" alt="mountain 7">
  <img src="mountain8.jpeg" alt="mountain 8">
  <img src="mountain9.JPG" alt="mountain 9">
  </div>
