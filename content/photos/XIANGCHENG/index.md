---
title: "Xiangcheng"
date: 2026-05-06
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
  
  /* 2. 画廊最外层包装：控制箭头和内容的位置 */
.carousel-wrapper {
position: relative;
max-width: 1200px;
margin: 60px auto;
display: flex;
align-items: center;
}

/* 3. 半透明滑动箭头 */
.nav-arrow {
position: absolute;
z-index: 10;
background: rgba(255, 255, 255, 0.6);
backdrop-filter: blur(4px);
border: none;
border-radius: 50%;
width: 40px;
height: 40px;
font-size: 18px;
cursor: pointer;
box-shadow: 0 2px 8px rgba(0,0,0,0.1);
transition: all 0.3s ease;
}
.nav-arrow:hover { background: rgba(255, 255, 255, 0.9); transform: scale(1.1); }
.left-arrow { left: -20px; }
.right-arrow { right: -20px; }

/* 4. 滚动轨道，带有截图1两边变淡消失的魔法 (Mask Image) */
.scroll-container {
width: 100%;
overflow: hidden;
/* 让左右两边缘产生渐变透明的效果 */
-webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
}

.scroll-track {
display: flex;
align-items: center;
gap: 25px;
overflow-x: auto;
scroll-behavior: smooth; /* 丝滑滚动 */
padding: 20px 5%;
scrollbar-width: none; /* Firefox 隐藏原生的丑陋滚动条 */
}
.scroll-track::-webkit-scrollbar { display: none; } /* Mac/Safari/Chrome 隐藏滚动条 */

/* 5. 单张图片设置 */
.photo-item {
flex: 0 0 350px; /* 控制每张图片的固定宽度，高度会按比例自适应 */
cursor: pointer;
transition: filter 0.3s, transform 0.3s;
}
.photo-item:hover { filter: brightness(0.8); transform: translateY(-5px); }

/* 适配 Paige 短代码生成的图片容器 */
.photo-item img {
width: 100%;
height: auto;
display: block;
box-shadow: 0 10px 20px rgba(0,0,0,0.08);
}

/* 6. 截图2特效：点击后弹出的沉浸式放大层 (Modal) */
.spotlight-modal {
position: fixed;
top: 0; left: 0; width: 100vw; height: 100vh;
background: #f8f8f8; /* 极简的米白色背景 */
z-index: 9999;
display: flex;
justify-content: center;
align-items: center;
opacity: 0;
pointer-events: none;
transition: opacity 0.4s ease;
}
.spotlight-modal.active { opacity: 1; pointer-events: auto; }

.spotlight-content {
position: relative;
max-width: 60%;
max-height: 80vh;
}

/* 悬浮在图片左上角的具体信息 */
.spotlight-info {
position: absolute;
top: -80px; /* 放在图片正上方 */
left: -40px; /* 稍微偏左，营造截图2的错落感 */
font-family: 'Courier New', Courier, monospace; /* 使用打字机字体模拟截图2的复古印刷感 */
font-size: 0.85rem;
line-height: 1.4;
color: #111;
font-weight: bold;
text-transform: uppercase;
}

.spotlight-img {
width: 100%;
max-height: 75vh;
object-fit: contain;
box-shadow: 0 30px 60px rgba(0,0,0,0.2);
animation: popIn 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes popIn {
0% { transform: scale(0.95); opacity: 0; }
100% { transform: scale(1); opacity: 1; }
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

<div class="carousel-wrapper">
<button class="nav-arrow left-arrow" onclick="scrollGallery(-1)">&#10094;</button>

<div class="scroll-container">
<div class="scroll-track" id="xiangcheng-track">
  
<div class="photo-item" onclick="openSpotlight(this.querySelector('img').src, '(01)', 'Xiangcheng, Sichuan<br>the Sangpiling Temple in the morning light')">
    {{< paige/image src="xiangcheng10.JPG" alt="Xiangcheng 10" >}}
</div>
<div class="photo-item" onclick="openSpotlight(this.querySelector('img').src, '(02)', 'Xiangcheng, Sichuan<br>A corner between the houses')">
    {{< paige/image src="xiangcheng11.jpeg" alt="Xiangcheng 11" >}}
</div>
<div class="photo-item" onclick="openSpotlight(this.querySelector('img').src, '(03)', 'Xiangcheng, Sichuan<br>Blue sky and eaves')">
    {{< paige/image src="xiangcheng15.JPG" alt="Xiangcheng 15" >}}
</div>
<div class="photo-item" onclick="openSpotlight(this.querySelector('img').src, '(04)', 'Xiangcheng, Sichuan<br>Road to the snow mountains')">
    {{< paige/image src="xiangcheng13.JPG" alt="Xiangcheng 13" loading="lazy" process="resize 800x webp" >}}
</div>
<div class="photo-item" onclick="openSpotlight(this.querySelector('img').src, '(05)', 'Xiangcheng, Sichuan<br>Texture of the abandoned White Tibetan House')">
    {{< paige/image src="xiangcheng14.JPG" alt="Xiangcheng 14" loading="lazy" process="resize 800x webp" >}}
</div>
<div class="photo-item" onclick="openSpotlight(this.querySelector('img').src, '(06)', 'Xiangcheng, Sichuan<br>A corner of the Sangpiling Temple')">
    {{< paige/image src="xiangcheng5.JPG" alt="Xiangcheng 5" loading="lazy" process="resize 800x webp" >}}
</div>
<div class="photo-item" onclick="openSpotlight(this.querySelector('img').src, '(07)', 'Xiangcheng, Sichuan<br>Winding mountain road')">
    {{< paige/image src="xiangcheng6.JPG" alt="Xiangcheng 6" loading="lazy" process="resize 800x webp" >}}
</div>
<div class="photo-item" onclick="openSpotlight(this.querySelector('img').src, '(08)', 'Xiangcheng, Sichuan<br>Star trails over the valley')">
    {{< paige/image src="xiangcheng7.JPG" alt="Xiangcheng 7" loading="lazy" process="resize 800x webp" >}}
</div>
<div class="photo-item" onclick="openSpotlight(this.querySelector('img').src, '(09)', 'Xiangcheng, Sichuan<br>Highland pasture')">
    {{< paige/image src="xiangcheng12.JPG" alt="Xiangcheng 12" loading="lazy" process="resize 800x webp" >}}
</div>
<div class="photo-item" onclick="openSpotlight(this.querySelector('img').src, '(10)', 'Xiangcheng, Sichuan<br>Rapeseed flowers, mountains and rivers')">
    {{< paige/image src="xiangcheng16.jpg" alt="Xiangcheng 16" loading="lazy" process="resize 800x webp" >}}
</div>
<div class="photo-item" onclick="openSpotlight(this.querySelector('img').src, '(11)', 'Xiangcheng, Sichuan<br>Sunlight on the Golden Mountain')">
    {{< paige/image src="xiangcheng17.jpg" alt="Xiangcheng 17" loading="lazy" process="resize 800x webp" >}}
</div>
<div class="photo-item" onclick="openSpotlight(this.querySelector('img').src, '(12)', 'Xiangcheng, Sichuan<br>Panoramic valley view')">
    {{< paige/image src="xiangcheng9.JPG" alt="Xiangcheng 9" loading="lazy" process="resize 800x webp" >}}
</div>
<div class="photo-item" onclick="openSpotlight(this.querySelector('img').src, '(13)', 'Xiangcheng, Sichuan<br>Village in the mist')">
    {{< paige/image src="xiangcheng1.jpg" alt="Xiangcheng 1" loading="lazy" process="resize 800x webp" >}}
</div>
<div class="photo-item" onclick="openSpotlight(this.querySelector('img').src, '(14)', 'Xiangcheng, Sichuan<br>Monastery and mountain silhouette')">
    {{< paige/image src="xiangcheng8.JPG" alt="Xiangcheng 8" loading="lazy" process="resize 800x webp" >}}
</div>
<div class="photo-item" onclick="openSpotlight(this.querySelector('img').src, '(15)', 'Xiangcheng, Sichuan<br>Stupa and snow peaks')">
    {{< paige/image src="xiangcheng2.JPG" alt="Xiangcheng 2" loading="lazy" process="resize 800x webp" >}}
</div>
<div class="photo-item" onclick="openSpotlight(this.querySelector('img').src, '(16)', 'Xiangcheng, Sichuan<br>Traditional attire and culture')">
    {{< paige/image src="xiangcheng3.JPG" alt="Xiangcheng 3" loading="lazy" process="resize 800x webp" >}}
</div>
<div class="photo-item" onclick="openSpotlight(this.querySelector('img').src, '(17)', 'Xiangcheng, Sichuan<br>Local gathering')">
    {{< paige/image src="xiangcheng4.JPG" alt="Xiangcheng 4" >}}
</div>

</div>
</div>

<button class="nav-arrow right-arrow" onclick="scrollGallery(1)">&#10095;</button>
</div>

<div id="spotlight-modal" class="spotlight-modal" onclick="closeSpotlight()">
<div class="spotlight-content" onclick="event.stopPropagation()">
<div class="spotlight-info">
  <div id="spotlight-id" style="margin-bottom: 8px;">(00)</div>
  <div id="spotlight-desc">DESC TEXT</div>
</div>
<img id="spotlight-img" class="spotlight-img" src="" alt="Spotlight">
</div>
</div>

<script>
// 1. 控制画廊左右滑动的魔法
function scrollGallery(direction) {
const track = document.getElementById('xiangcheng-track');
// 每次点击滑动 400 像素，你可以自己微调这个数字
const scrollAmount = 400; 
track.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}

// 2. 点击照片，激活高级放大层的魔法
function openSpotlight(imgSrc, idText, descText) {
document.getElementById('spotlight-img').src = imgSrc;
document.getElementById('spotlight-id').innerHTML = idText;
document.getElementById('spotlight-desc').innerHTML = descText;
document.getElementById('spotlight-modal').classList.add('active');
}

// 3. 点击背景空白处，关闭放大层
function closeSpotlight() {
document.getElementById('spotlight-modal').classList.remove('active');
}
</script>
