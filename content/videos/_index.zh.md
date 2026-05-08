<!-- 视频页面简介 -->
<div style="text-align: center; margin-bottom: 40px; margin-top: 10px;">
    <!-- 注意这里：我删掉了 color: #555; 并加上了 class="vlog-desc" -->
    <p class="vlog-desc" style="font-family: 'Slidexiaxing', sans-serif; font-size: 2rem; letter-spacing: 0px;">
        生活散记
    </p>
</div>

<!-- 视频 1 -->
<div style="margin-bottom: 60px; width: 73vw; max-width: 1000px; position: relative; left: 50%; transform: translateX(-50%);">
    <div style="width: 100%; aspect-ratio: 16 / 9; box-shadow: 0 10px 30px rgba(0,0,0,0.1); border-radius: 12px; overflow: hidden; background: #000;">
        <iframe src="//player.bilibili.com/player.html?bvid=BV12o4y1R7mC&page=1&high_quality=1&danmaku=0&autoplay=0" width="100%" height="100%" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>
    </div>
    <!-- 注意这里：我删掉了 color: #333; 并加上了 class="vlog-title" -->
    <p class="vlog-title" style="font-family: 'MySparose', 'Century Gothic', sans-serif; text-align: center; margin-top: 20px; font-size: 1.1em; font-weight: 500; letter-spacing: 1px;">
        The Road Home
    </p>
    <hr style="border: 0; border-top: 1px solid #eee; margin-top: 20px; width: 40%; margin-left: auto; margin-right: auto;">
</div>

<!-- 视频 2 -->
<div style="margin-bottom: 60px; width: 73vw; max-width: 1000px; position: relative; left: 50%; transform: translateX(-50%);">
    <div style="width: 100%; aspect-ratio: 16 / 9; box-shadow: 0 10px 30px rgba(0,0,0,0.1); border-radius: 12px; overflow: hidden; background: #000;">
        <iframe src="//player.bilibili.com/player.html?bvid=BV11r4y1Y7bu&page=1&high_quality=1&danmaku=0&autoplay=0" width="100%" height="100%" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>
    </div>
    <p class="vlog-title" style="font-family: 'MySparose', 'Century Gothic', sans-serif; text-align: center; margin-top: 20px; font-size: 1.1em; font-weight: 500; letter-spacing: 1px;">
        Wonderful Days: Pre-Graduation
    </p>
    <hr style="border: 0; border-top: 1px solid #eee; margin-top: 20px; width: 40%; margin-left: auto; margin-right: auto;">
</div>

<!-- 视频 3 -->
<div style="margin-bottom: 60px; width: 73vw; max-width: 1000px; position: relative; left: 50%; transform: translateX(-50%);">
    <div style="width: 100%; aspect-ratio: 16 / 9; box-shadow: 0 10px 30px rgba(0,0,0,0.1); border-radius: 12px; overflow: hidden; background: #000;">
        <iframe src="//player.bilibili.com/player.html?bvid=BV1rT4y1E7nA&page=1&high_quality=1&danmaku=0&autoplay=0" width="100%" height="100%" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>
    </div>
    <p class="vlog-title" style="font-family: 'MySparose', 'Century Gothic', sans-serif; text-align: center; margin-top: 20px; font-size: 1.1em; font-weight: 500; letter-spacing: 1px;">
        Stillness and Early Summer: 2020 School Days
    </p>
    <hr style="border: 0; border-top: 1px solid #eee; margin-top: 20px; width: 40%; margin-left: auto; margin-right: auto;">
</div>

<style>
/* ==========================================
    🎨 视频文字颜色管理 (日间 & 夜间模式)
   ========================================== */

/* 1. 默认状态（日间模式）的颜色 */
.vlog-desc {
    color: #555;
}
.vlog-title {
    color: #333;
}

/* 2. 跟随系统夜间模式 (OS Dark Mode) */
@media (prefers-color-scheme: dark) {
    .vlog-desc, 
    .vlog-title {
        color: #F2FBFF !important;
    }
}

/* 3. 跟随网页按钮切换的夜间模式 (Hugo Theme Dark Mode)
   包含了各种常见 Hugo 主题（比如 Paige）可能用的夜间模式标记 */
html[data-theme="dark"] .vlog-desc,
html[data-theme="dark"] .vlog-title,
html[data-bs-theme="dark"] .vlog-desc,
html[data-bs-theme="dark"] .vlog-title,
body.dark .vlog-desc,
body.dark .vlog-title {
    color: #F2FBFF !important;
}


/* ==========================================
    🚀 空间魔法：增加顶部留白，让整体往下移
   ========================================== */
#paige-site-header {
    margin-top: 2rem !important;
}

#paige-site-title,
#paige-site-title a,
#paige-site-description {
    display: none !important;
}

/* 声明 Jost 字体 */
@font-face {
    font-family: 'MyJost';
    src: url('/fonts/Jost-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}

/* 强制注入：声明 Sparose 字体 */
@font-face {
    font-family: 'MySparose';
    src: url('/fonts/sparose.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}

/* 声明 Gill Sans 字体 */
@font-face {
    font-family: 'MyGillSans';
    src: url('/fonts/GillSans.ttc') format('collection'), 
         url('/fonts/GillSans.ttc') format('truetype');
    font-weight: normal;
    font-style: normal;
}

/* 强制注入：声明 Slidexiaxing 字体 */
@font-face {
    font-family: 'Slidexiaxing';
    src: url('/fonts/Slidexiaxing.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}

/* 强制覆盖导航栏的字体和初始颜色 - 使用 Jost */
#paige-site-menu a {
    font-family: 'MyJost', sans-serif !important; 
    color: #008b8b !important;
    font-weight: 500 !important;
    letter-spacing: 0.05em !important;
    transition: color 0.2s ease-in-out, opacity 0.2s ease-in-out !important; 
}

/* 鼠标悬停变浅 */
#paige-site-menu a:hover {
    color: #66cdcd !important; 
}

/* 鼠标点下去的瞬间变深 */
#paige-site-menu a:active {
    color: #004d4d !important; 
}

/* 当前所在页面的高亮保持深色 */
#paige-site-menu a.active,
#paige-site-menu a[aria-current="page"] {
    color: #004d4d !important; 
    font-weight: 700 !important; 
}
</style>
