---
title: "Street"
date: 2026-05-04
draft: false
---

<style>
/* 1. 你的专属 Sparose 标题定制 */
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
color: #333;
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
flex: 0 0 280px; /* 控制每张图片的固定宽度，高度会按比例自适应 */
cursor: pointer;
transition: filter 0.3s, transform 0.3s;
}
.photo-item:hover { filter: brightness(0.8); transform: translateY(-5px); }
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
</style>

<!-- ================= 页面结构 ================= -->
<div class="carousel-wrapper">
<!-- 左箭头 -->
<button class="nav-arrow left-arrow" onclick="scrollGallery(-1)">&#10094;</button>

<div class="scroll-container">
<div class="scroll-track" id="street-track">
  <!-- 注意：这里我帮你提取了所有21张图片的名字，极其小心地保留了大小写！ -->
  <!-- 参数分别是：(1)图片路径, (2)编号, (3)详细描述 -->
  
  <div class="photo-item" onclick="openSpotlight('street1.jpeg', '(01)', 'Dalian, Liaoning<br>A family by the sea, 2025')">
    <img src="street1.jpeg" alt="street1">
  </div>
<div class="photo-item" onclick="openSpotlight('street5.jpg', '(05)', 'yantai, shandong<br>Fisherman and sunset, 2025')"><img src="street5.jpg"></div>
  <div class="photo-item" onclick="openSpotlight('street2.jpg', '(02)', 'Arxan City, Inner Mongolia<br>Winter Street, 2025')">
    <img src="street2.jpg" alt="street2">
  </div>
  <div class="photo-item" onclick="openSpotlight('street3.jpg', '(03)', 'Arxan City, Inner Mongolia<br>Cows and Snow, 2025')">
    <img src="street3.jpg" alt="street3">
  </div>
<div class="photo-item" onclick="openSpotlight('street8.JPG', '(08)', 'shenyang, liaoning<br>Storefront')"><img src="street8.JPG"></div>
  <div class="photo-item" onclick="openSpotlight('street4.jpg', '(04)', 'Arxan City, Inner Mongolia<br>malamute, 2025')">
    <img src="street4.jpg" alt="street4">
  </div>
<div class="photo-item" onclick="openSpotlight('street12.JPG', '(12)', 'yaan, sichuan<br>Minimalist sky')"><img src="street12.JPG"></div>
<div class="photo-item" onclick="openSpotlight('street6.jpg', '(06)', 'yantai, shandong<br>Haenyeo and shoreline')"><img src="street6.jpg"></div>
<div class="photo-item" onclick="openSpotlight('street11.jpeg', '(11)', 'shenyang, liaoning<br>fishing sunset')"><img src="street11.jpeg"></div>
  <div class="photo-item" onclick="openSpotlight('street7.JPG', '(07)', 'shenyang, liaoning<br>snow and window')"><img src="street7.JPG"></div>
  <div class="photo-item" onclick="openSpotlight('street9.jpeg', '(09)', 'quanzhou, fujian<br>Night market')"><img src="street9.jpeg"></div>
  <div class="photo-item" onclick="openSpotlight('street10.jpeg', '(10)', 'quanzhou, fujian<br>Bookstore and Pretty Boy')"><img src="street10.jpeg"></div>
  <div class="photo-item" onclick="openSpotlight('street13.JPG', '(13)', 'yaan, sichuan<br>Fruit stand')"><img src="street13.JPG"></div>
  <div class="photo-item" onclick="openSpotlight('street14.JPG', '(14)', 'lanzhou, gansu<br>High vantage point')"><img src="street14.JPG"></div>
  <div class="photo-item" onclick="openSpotlight('street15.jpeg', '(15)', 'yaan, sichuan<br>Geometric lines')"><img src="street15.jpeg"></div>
  <div class="photo-item" onclick="openSpotlight('street16.jpg', '(16)', 'cehngdu, sichuan<br>Birds resting')"><img src="street16.jpg"></div>
  <div class="photo-item" onclick="openSpotlight('street17.jpg', '(17)', 'dalian, liaoning<br>fishermen')"><img src="street17.jpg"></div>
  <div class="photo-item" onclick="openSpotlight('street18.089.jpg', '(18)', 'dalian, liaoning<br>reader')"><img src="street18.089.jpg"></div>
  <div class="photo-item" onclick="openSpotlight('street19.jpeg', '(19)', 'chengdu, sichuan<br>Peddler and fish')"><img src="street19.jpeg"></div>
  <div class="photo-item" onclick="openSpotlight('street21.jpg', '(21)', 'chengdu, sichuan<br>Building gap')"><img src="street21.jpg"></div>
<div class="photo-item" onclick="openSpotlight('street20.jpg', '(20)', 'chengdu, sichuan<br>Traditional textures')"><img src="street20.jpg"></div>

</div>
</div>

<!-- 右箭头 -->
<button class="nav-arrow right-arrow" onclick="scrollGallery(1)">&#10095;</button>
</div>

<!-- 沉浸式放大层：平时隐藏，点击后触发 -->
<div id="spotlight-modal" class="spotlight-modal" onclick="closeSpotlight()">
<!-- 阻止点击内部图片时关闭模态框 -->
<div class="spotlight-content" onclick="event.stopPropagation()">
<!-- 截图2里的文字信息区域 -->
<div class="spotlight-info">
  <div id="spotlight-id" style="margin-bottom: 8px;">(00)</div>
  <div id="spotlight-desc">DESC TEXT</div>
</div>
<!-- 被放大的图片 -->
<img id="spotlight-img" class="spotlight-img" src="" alt="Spotlight">
</div>
</div>

<!-- ================= 核心交互脚本 ================= -->
<script>
// 1. 控制画廊左右滑动的魔法
function scrollGallery(direction) {
const track = document.getElementById('street-track');
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
