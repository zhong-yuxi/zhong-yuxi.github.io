---
title: "Mountains"
date: 2026-05-04
draft: false
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

/* 2. 画廊最外层包装 */
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

/* 4. 滚动轨道与 Mask Image 边缘消隐 */
.scroll-container {
width: 100%;
overflow: hidden;
-webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
}

.scroll-track {
display: flex;
align-items: center;
gap: 50px;
overflow-x: auto;
scroll-behavior: smooth;
padding: 20px 5%;
scrollbar-width: none;
}
.scroll-track::-webkit-scrollbar { display: none; }

/* 5. 单张图片设置 */
.photo-item {
flex: 0 0 400px;
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

/* 6. Spotlight 沉浸式放大层 */
.spotlight-modal {
position: fixed;
top: 0; left: 0; width: 100vw; height: 100vh;
background: #f8f8f8;
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
max-width: 80%;
max-height: 80vh;
}

.spotlight-info {
position: absolute;
top: -80px;
left: -40px;
font-family: 'Courier New', Courier, monospace;
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
<button class="nav-arrow left-arrow" onclick="scrollGallery(-1)">&#10094;</button>

<div class="scroll-container">
<div class="scroll-track" id="mountain-track">
  
  <div class="photo-item" onclick="openSpotlight('mountain10.jpeg', '(01)', 'Mount Gongga<br>Kangding, Sichuan')">
    <img src="mountain10.jpeg" alt="Mingshashan">
  </div>
  
  <div class="photo-item" onclick="openSpotlight('mountain1.jpeg', '(02)', 'Qiangren Valley<br>Aba Prefecture, Sichuan')">
    <img src="mountain1.jpeg" alt="Qiangren Valley">
  </div>
  
  <div class="photo-item" onclick="openSpotlight('mountain9.JPG', '(03)', 'Dawa Gengzha<br>Ya\'an, Sichuan')">
    <img src="mountain9.JPG" alt="Dawa Gengzha">
  </div>
  
  <div class="photo-item" onclick="openSpotlight('mountain2.jpeg', '(04)', 'Snow Mountain and Halaha River<br>Arxan, Inner Mongolia')">
    <img src="mountain2.jpeg" alt="Arxan River">
  </div>
  
  <div class="photo-item" onclick="openSpotlight('mountain6.JPG', '(05)', 'Singing Sand Mountains<br>Dunhuang, Gansu')">
    <img src="mountain6.JPG" alt="Mingshashan">
  </div>
  
  <div class="photo-item" onclick="openSpotlight('mountain3.jpg', '(06)', 'Snow Mountain<br>Arxan, Inner Mongolia')">
    <img src="mountain3.jpg" alt="Arxan Mountain">
  </div>
  
  <div class="photo-item" onclick="openSpotlight('mountain4.jpeg', '(07)', 'Sundog over Arxan<br>Arxan, Inner Mongolia')">
    <img src="mountain4.jpeg" alt="Sundog">
  </div>
  
  <div class="photo-item" onclick="openSpotlight('mountain11.JPG', '(08)', 'Mount Genyen<br>Litang, Sichuan')">
    <img src="mountain11.JPG" alt="Mingshashan">
  </div>
  
  <div class="photo-item" onclick="openSpotlight('mountain5.JPG', '(09)', 'Qianshan Mountain<br>Anshan, Liaoning')">
    <img src="mountain5.JPG" alt="Qianshan">
  </div>
  
<div class="photo-item" onclick="openSpotlight('mountain8.jpeg', '(11)', 'Landscape of Ya\'an<br>Ya\'an, Sichuan')">
    <img src="mountain8.jpeg" alt="Ya'an">
  </div>
  
  <div class="photo-item" onclick="openSpotlight('mountain7.jpeg', '(10)', 'Mount Gongga<br>Garze Prefecture, Sichuan')">
    <img src="mountain7.jpeg" alt="Gongga">
  </div>

</div>
</div>

<button class="nav-arrow right-arrow" onclick="scrollGallery(1)">&#10095;</button>
</div>

<!-- Spotlight 模态框 -->
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
function scrollGallery(direction) {
const track = document.getElementById('mountain-track');
const scrollAmount = 400; 
track.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}

function openSpotlight(imgSrc, idText, descText) {
document.getElementById('spotlight-img').src = imgSrc;
document.getElementById('spotlight-id').innerHTML = idText;
document.getElementById('spotlight-desc').innerHTML = descText;
document.getElementById('spotlight-modal').classList.add('active');
}

function closeSpotlight() {
document.getElementById('spotlight-modal').classList.remove('active');
}
</script>
