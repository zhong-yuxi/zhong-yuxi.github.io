<style>
/* 隐藏 Paige 主题底部自动生成的子页面列表 */
#paige-page-pages {
  display: none !important;
}

/* 引入外部自定义字体 */
@font-face {
  font-family: 'Sparose'; /* 给这个字体起个代号，随便叫什么都行，这里我们就叫 Sparose */
  /* 注意这里的路径！在 Hugo 里，static 目录代表根目录 / ，所以不要写 static 进去 */
  src: url('/fonts/sparose.ttf') format('truetype'); 
  font-weight: normal;
  font-style: normal;
}

/* --- 核心容器 --- */
.gallery-container {
  display: flex;
  flex-wrap: wrap; /* 允许换行 */
  width: 100%;
  max-width: 100%;
  margin: 2rem 0;
  overflow: hidden; /* 防止边缘溢出 */
  row-gap: 0; /* 桌面端和平板端上下无缝贴合 */
}

/* --- 核心卡片 & 斜切魔法 --- */
.photo-card {
  --s: 35px; /* 控制斜切的角度和宽度，数值越大倾斜越猛 */
  height: 450px; 
  position: relative;
  background-size: cover;
  background-position: center;
  text-decoration: none !important;
  color: white !important;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 顶部和底部内容分离 */
  padding: 30px;
  
  /* 默认：电脑端一排4张 */
  /* 精确的数学计算，让它们互相叠加且填满 100% 宽度 */
  width: calc(25% + var(--s));
  margin-left: calc(-1 * var(--s));
  clip-path: polygon(var(--s) 0, 100% 0, calc(100% - var(--s)) 100%, 0 100%);
  transition: filter 0.4s ease;
}

/* 电脑端(4张一排)：修复最左边和最右边卡片的边缘，让它外侧是直的 */
.photo-card:nth-child(4n + 1) {
  margin-left: 0;
  width: calc(25% + (var(--s) / 2));
  clip-path: polygon(0 0, 100% 0, calc(100% - var(--s)) 100%, 0 100%);
}
.photo-card:nth-child(4n) {
  width: calc(25% + (var(--s) / 2));
  clip-path: polygon(var(--s) 0, 100% 0, 100% 100%, 0 100%);
}

/* 渐变遮罩：让白色文字在任何背景下都清晰可见 */
.photo-card::before {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  /* 顶部有轻微变暗，底部加深变暗 */
  background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 100%);
  z-index: 1;
  transition: background 0.4s ease;
}

/* 鼠标悬停时的微光效果 */
.photo-card:hover::before {
  background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 100%);
}
.photo-card:hover {
  filter: brightness(1.05); 
}

/* --- 文字排版完全复刻图1 --- */
.card-top, .card-bottom {
  position: relative;
  z-index: 2; /* 保证文字浮在遮罩上面 */
}

/* 左上角细小文字 */
.card-top {
  font-size: 0.65rem;
  letter-spacing: 4px; /* 字间距拉开显得高级 */
  text-transform: uppercase;
  opacity: 0.8;
  font-weight: 500;
}

/* 左下角标题与描述 */
.card-bottom h3 {
font-family: 'Sparose', serif;
  font-size: 1.5rem;
  font-weight: 200; /* 细体，还原图1优雅感 */
  margin: 0 0 8px 0;
  padding: 0;
  border: none;
  letter-spacing: 2px;
}
.card-bottom p {
  font-size: 0.85rem;
  line-height: 1.4;
  opacity: 0.9;
  margin: 0 0 20px 0;
  max-width: 90%;
  font-weight: 300;
}
.view-btn {
  font-size: 0.7rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  font-weight: 500;
  opacity: 0.9;
}

/* --- 响应式：平板端 (1排2张) --- */
@media (max-width: 1024px) {
  .photo-card {
    width: calc(50% + var(--s)) !important;
    margin-left: calc(-1 * var(--s)) !important;
    clip-path: polygon(var(--s) 0, 100% 0, calc(100% - var(--s)) 100%, 0 100%) !important;
  }
  /* 平板端重置首尾边缘修复 */
  .photo-card:nth-child(2n + 1) {
    margin-left: 0 !important;
    width: calc(50% + (var(--s) / 2)) !important;
    clip-path: polygon(0 0, 100% 0, calc(100% - var(--s)) 100%, 0 100%) !important;
  }
  .photo-card:nth-child(2n) {
    width: calc(50% + (var(--s) / 2)) !important;
    clip-path: polygon(var(--s) 0, 100% 0, 100% 100%, 0 100%) !important;
  }
}

/* --- 响应式：手机端 (1排1张) --- */
@media (max-width: 768px) {
  .gallery-container {
    row-gap: 5px; /* 手机端上下加上一点点间隙，显得不那么压抑 */
  }
  .photo-card {
    width: 100% !important;
    margin-left: 0 !important;
    clip-path: none !important; /* 手机屏幕太窄，去掉斜切变回常规矩形更易阅读 */
    height: 380px;
    padding: 25px;
  }
}
</style>

<!-- 网页的结构部分 -->
<div class="gallery-container">

<!-- 卡片 1: 乡城 -->
  <a href="/photos/xiangcheng/" class="photo-card" style="background-image: url('/images/photoxiangcheng.jpg');">
    <div class="card-top">-</div>
    <div class="card-bottom">
      <h3>Xiangcheng</h3>
      <p>Where my roots lie.</p>
    </div>
  </a>

  <!-- 卡片 2: 寺庙 -->
  <a href="/photos/temple/" class="photo-card" style="background-image: url('/images/phototemple.jpg');">
    <div class="card-top">-</div>
    <div class="card-bottom">
      <h3>Temple</h3>
      <p>Tucked away in the corners of countless temples.</p>
    </div>
  </a>

  <!-- 卡片 3: 街头 -->
  <a href="/photos/street/" class="photo-card" style="background-image: url('/images/photostreet.jpg');">
    <div class="card-top">-</div>
    <div class="card-bottom">
      <h3>Street</h3>
      <p>The lived warmth and rhythm encountered on the streets.</p>
    </div>
  </a>
  
<!-- 卡片 6: 胶片 -->
  <a href="/photos/film/" class="photo-card" style="background-image: url('/images/photofilm.jpg');">
    <div class="card-top">-</div>
    <div class="card-bottom">
      <h3>Film</h3>
      <p>Nostalgic tones and grain-rich storytelling on celluloid.</p>
    </div>
  </a>
  
<!-- 卡片 8: 一诺 -->
  <a href="/photos/yinuo/" class="photo-card" style="background-image: url('/images/photoyinuo.jpg');">
    <div class="card-top">-</div>
    <div class="card-bottom">
      <h3>YiNuo</h3>
      <p>The heartbeat at my feet.</p>
    </div>
  </a>

  <!-- 卡片 5: 山脉 -->
  <a href="/photos/mountains/" class="photo-card" style="background-image: url('/images/photomountain.jpg');">
    <div class="card-top">-</div>
    <div class="card-bottom">
      <h3>Mountains</h3>
      <p>The fleeting contours of the land.</p>
    </div>
  </a>

  <!-- 卡片 7: 戏曲/戏剧 -->
  <a href="/photos/opera/" class="photo-card" style="background-image: url('/images/photoopera.jpg');">
    <div class="card-top">-</div>
    <div class="card-bottom">
      <h3>Opera</h3>
      <p>Peking Opera in Life and Performance.</p>
    </div>
  </a>
  
<!-- 卡片 4: 动物 -->
  <a href="/photos/portraits/" class="photo-card" style="background-image: url('/images/photoanimal.jpg');">
    <div class="card-top">-</div>
    <div class="card-bottom">
      <h3>Portraits</h3>
      <p>Faces encountered at the sanctuary.</p>
    </div>
  </a>

</div>
