<div id="stage-1" class="container-fluid px-0 text-center my-5 breakout-width">
  <h3 class="fw-bold mb-5" style="font-family: 'MyJost', sans-serif; color: #008b8b;">Choose a stove you like.</h3>
  
  <div class="row justify-content-center g-4">
    <div class="col-12 col-md-4">
      <img src="stove1.jpg" class="img-fluid w-100 rounded-2 shadow stove-option" onclick="enterStage2('stove1.jpg')" alt="Stove 1">
    </div>
    <div class="col-12 col-md-4">
      <img src="stove2.jpg" class="img-fluid w-100 rounded-2 shadow stove-option" onclick="enterStage2('stove2.jpg')" alt="Stove 2">
    </div>
    <div class="col-12 col-md-4">
      <img src="stove3.jpg" class="img-fluid w-100 rounded-2 shadow stove-option" onclick="enterStage2('stove3.jpg')" alt="Stove 3">
    </div>
  </div>
</div>

<div id="stage-2" class="container-fluid px-0 d-none my-4">
<button onclick="goBack()" class="btn btn-sm btn-outline-secondary mb-3" style="font-family: 'MyJost', sans-serif;">&larr; Back to Stoves</button>

<div class="d-flex w-100" style="gap: 20px;">

<div id="main-image-wrapper" class="transition-layout" style="width: 100%;">

<!-- 1. 提示语放在最外面，它不再参与圆圈的定位计算 -->
<div id="explore-hint" class="text-center mb-3 fw-bold" style="font-family: 'MyJost', sans-serif; color: #008b8b;">
✨ Click the circle to explore the details you want to know.
</div>

<!-- 2. 新增一个专属的定位盒子 (position-relative)，紧紧包裹图片和圆圈 -->
<div class="position-relative w-100">
<img id="main-enlarged-img" src="" class="img-fluid rounded-4 shadow w-100" alt="Enlarged Stove">

<!-- 圆圈容器留在这个专属盒子里 -->
<div id="hotspots-container"></div>
</div>

</div>

<div id="details-panel" class="transition-layout d-flex flex-column gap-3" style="width: 0%; opacity: 0; max-height: 80vh; overflow-y: auto; overflow-x: hidden; padding-right: 10px;">
  <h5 id="detail-title" class="fw-bold m-0 sticky-top bg-white py-2" style="font-family: 'MyJost', sans-serif; z-index: 10;"></h5>
  <div id="detail-images-container" class="d-flex flex-column gap-3">
    </div>
</div>

</div>
</div>

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
    transition: color 0.2s ease-in-out, opacity 0.2s ease-in-out !important; 
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

.stove-option { cursor: pointer; transition: transform 0.3s ease, box-shadow 0.3s ease; }
.stove-option:hover { transform: translateY(-5px) scale(1.02); box-shadow: 0 10px 20px rgba(0,0,0,0.2) !important; }
.transition-layout { transition: width 0.6s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.4s ease; }
.hotspot-circle {
position: absolute; width: 90px; height: 90px; background: rgba(255, 255, 255, 0.2);
border: 2px solid #24F1FF; border-radius: 50%; transform: translate(-50%, -50%);
cursor: pointer; box-shadow: 0 0 0 0 rgba(36, 241, 255, 0.7); animation: pulse 2s infinite; transition: background 0.3s ease;
}
.hotspot-circle:hover { background: rgba(36, 241, 255, 0.8); }
@keyframes pulse {
0% { box-shadow: 0 0 0 0 rgba(36, 241, 255, 0.7); }
70% { box-shadow: 0 0 0 15px rgba(36, 241, 255, 0); }
100% { box-shadow: 0 0 0 0 rgba(36, 241, 255, 0); }
}
@media (prefers-color-scheme: dark) {
#stage-1 h3, #detail-title { color: #24F1FF !important; }
#detail-title { background-color: #121212 !important; } 
}
#details-panel::-webkit-scrollbar { width: 6px; }
#details-panel::-webkit-scrollbar-thumb { background-color: #008b8b; border-radius: 10px; }

/* ==========================================
   🚀 破壁魔法：打破主题容器限制，强制宽屏展示
   ========================================== */
.breakout-width {
  /* 使用 vw (viewport width) 强制占据屏幕的百分比宽度 */
  width: 90vw !important; 
  max-width: 1600px !important; /* 给超大带鱼屏一个极限值，防止大得太离谱 */
  
  /* 这一步是核心：把它强行拉回屏幕正中央 */
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}

/* 优化手机端体验：如果屏幕非常小（手机），让它占满 95% 的屏幕 */
@media (max-width: 768px) {
  .breakout-width {
    width: 95vw !important;
  }
}
</style>

<script>
// 1. 数据图库：存储所有 5 种分类的图片
const detailData = {
'cat': { title: "Stove Cat", images: ["cat1.jpg", "cat2.jpg", "cat3.jpg", "cat4.jpg"] },
'kirtimukha': { title: "Kirtimukha, the face of majesty", images: ["kirtimukha1.jpg", "kirtimukha2.jpg", "kirtimukha3.jpg", "kirtimukha4.jpg"] },
'stovegod': { title: "Stove God", images: ["stovegod1.jpg", "stovegod2.jpg", "stovegod3.jpg", "stovegod4.jpg"] },
'nehulay': { title: "Nehulay", images: ["nehulay1.jpg", "nehulay2.jpg", "nehulay3.jpg", "nehulay4.jpg"] },
'snow-lion': { title: "Snow Lion", images: ["snow-lion1.jpg", "snow-lion2.jpg", "snow-lion3.jpg", "snow-lion4.jpg"] }
};

// 2. 坐标分配器：告诉你哪张炉子有哪些圆圈，以及圆圈的位置！
// 💡 注意：你可以根据真实的图片画面，随时调整这里的 top 和 left 百分比！
const stoveHotspots = {
'stove1.jpg': [
{ id: 'cat', top: '49%', left: '30%' },
{ id: 'kirtimukha', top: '59%', left: '50.5%' }
],
'stove2.jpg': [
{ id: 'stovegod', top: '43%', left: '51%' }
],
'stove3.jpg': [
{ id: 'nehulay', top: '50%', left: '42%' },
{ id: 'snow-lion', top: '60%', left: '63%' }
]
};

// 进入第二幕
function enterStage2(imgSrc) {
document.getElementById('stage-1').classList.add('d-none');
document.getElementById('stage-2').classList.remove('d-none');
document.getElementById('main-enlarged-img').src = imgSrc;

// 核心魔法：根据点击的炉子，生成特定的圆圈
const container = document.getElementById('hotspots-container');
container.innerHTML = ''; // 先清空之前的圆圈

const spots = stoveHotspots[imgSrc]; // 查找当前炉子对应的圆圈列表
if (spots) {
spots.forEach(spot => {
  // 动态把圆圈代码写进网页
  container.innerHTML += `<div class="hotspot-circle" style="top: ${spot.top}; left: ${spot.left};" onclick="showDetails('${spot.id}')"></div>`;
});
}

resetLayout();
}

// 返回第一幕
function goBack() {
document.getElementById('stage-2').classList.add('d-none');
document.getElementById('stage-1').classList.remove('d-none');
}

// 展示侧边栏细节
function showDetails(keyword) {
document.getElementById('main-image-wrapper').style.width = '65%';
const panel = document.getElementById('details-panel');
panel.style.width = '35%';
panel.style.opacity = '1';

const data = detailData[keyword];
document.getElementById('detail-title').innerText = data.title;

const imgContainer = document.getElementById('detail-images-container');
imgContainer.innerHTML = ''; 

data.images.forEach(imgSrc => {
imgContainer.innerHTML += `<img src="${imgSrc}" class="img-fluid rounded-3 shadow-sm">`;
});
}

// 收起侧边栏
function resetLayout() {
document.getElementById('main-image-wrapper').style.width = '100%';
const panel = document.getElementById('details-panel');
panel.style.width = '0%';
panel.style.opacity = '0';
}
</script>
