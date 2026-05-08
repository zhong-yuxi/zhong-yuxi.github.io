+++
keywords = [
"Yuxi Zhong", "Tibet", "Material Culture", "Religion", "Cat", "Ganzi", 
"Visual", "Ecology", "Multi-species Ethnography", "Xiangcheng", 
"Stove Cat", "Nehulay", "Vernacular Religion", "Intangible Cultural Heritage", 
"ICH", "Sonam Dorji", "钟誉熙", "乡城", "灶壁猫",  "吐宝鼠", "物质文化"
]
[paige.pages]
disable_collections = true
disable_pages = true
disable_sections = true
+++

<div class="hero-banner full-bleed-banner position-relative mb-5 shadow-sm">
{{< paige/image alt="Landscape of Xiangcheng" src="images/my_home.jpg" class="w-100" style="display: block; height: auto;" >}}

<div class="position-absolute bottom-0 start-0 p-4 w-100" 
     style="background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);">
    <!-- 这里把 'MyGillSans' 换成了 'LXGWWenKai' -->
    <h1 class="text-white mb-0 text-uppercase" 
        style="font-family: 'LXGWWenKai', sans-serif; font-size: calc(1rem + 2vw); letter-spacing: 0em; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
        钟誉熙
    </h1>
    <!-- 这里把 'MyJost' 换成了 'LXGWWenKai' -->
    <p class="text-white mt-1 mb-0" 
       style="font-family: 'LXGWWenKai', sans-serif; font-size: 1.2rem; letter-spacing: 0.05em; text-shadow: 1px 1px 4px rgba(0,0,0,0.5);">
        物质文化，西藏，乡城，猫，灶
    </p>
</div>
</div>

<div class="container-fluid px-0 mb-5">
<div class="row align-items-center">
    <div class="col-md-5 mb-4 mb-md-0 text-center text-md-start">
        {{< paige/image alt="Yuxi Zhong" src="images/profile_pic.jpg" class="img-fluid shadow-sm rounded-1" >}}
    </div>
    <div class="col-md-7 px-md-5">
        <!-- 这里把 'Open Sans' 换成了 'LXGWWenKai' -->
        <p class="text-start bio-text" style="font-family: 'LXGWWenKai', sans-serif; font-size: 1.15rem; line-height: 1.8;">
            <strong style="font-weight: 600; -webkit-text-stroke: 0.4px currentColor;">嗨，你可以叫我斯朗多吉，这是我的藏文名字！</strong><br>
            我是一名探索信仰和身份是如何刻入物质世界的学者。我的研究集中于我的家乡--乡城，我借助人类学、艺术学和哲学的学科方法来研究不断演变的物质文化和仪式物品。在学术研究之外，你也能在京剧舞台和流浪动物的救助站发现我。
        </p>
        <div class="contact-info mt-4">
            <p class="mb-2 info-text">Email: <a href="mailto:yuxi.zhonggg@gmail.com" class="email-link">yuxi.zhonggg@gmail.com</a></p>
            <a href="/CV_Yuxi_Zhong.pdf" class="cv-link" style="font-family: 'MyJost', sans-serif; font-weight: bold; text-decoration: underline !important; letter-spacing: 0.05em; text-transform: uppercase;">下载我的简历</a>
        </div>
    </div>
</div>
</div>

<div class="column-gap-3 d-flex fs-4 justify-content-center mt-5 pt-4 border-top">
{{< paige/icon class="bi bi-instagram" title="Instagram" url="https://www.instagram.com/sonam_dorji__/" >}}
{{< paige/icon class="bi bi-twitter-x" title="X" url="https://x.com/dorji0704/" >}}
</div>

<style>
/* --- 字体声明区 --- */
/* 新增：定义 Slidexiaxing 字体 */
@font-face {
    font-family: 'Slidexiaxing';
    src: url('/fonts/Slidexiaxing.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}

/* 新增：定义 LXGWWenKai 字体 */
@font-face {
    font-family: 'LXGWWenKai';
    src: url('/fonts/LXGWWenKai.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'MyGillSans';
    src: url('/fonts/GillSans.ttc') format('collection'), 
         url('/fonts/GillSans.ttc') format('truetype');
    font-weight: bold;
    font-style: normal;
}
@font-face {
    font-family: 'MyJost';
    src: url('/fonts/Jost-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: 'Open Sans';
    src: url('/fonts/OpenSans.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}

/* --- 布局与导航魔法 --- */
#paige-site-header {
    margin-top: 2rem !important;
}

#paige-site-menu a {
    font-family: 'MyJost', sans-serif !important;
    color: #008b8b !important;
    font-weight: 500 !important;
    letter-spacing: 0.05em !important;
    transition: color 0.2s ease-in-out, opacity 0.2s ease-in-out !important; 
}

#paige-site-menu a:hover { color: #66cdcd !important; }
#paige-site-menu a:active { color: #004d4d !important; }

#paige-site-menu a.active,
#paige-site-menu a[aria-current="page"] {
    color: #004d4d !important; 
    font-weight: 700 !important; 
}

/* 隐藏顶部默认元素 */
#paige-site-title,
#paige-site-title a,
#paige-site-description {
    display: none !important;
}

/* 破框横幅 */
.full-bleed-banner {
    width: 100vw !important;
    max-width: 100vw !important;
    margin-left: calc(50% - 50vw) !important;
    margin-right: calc(50% - 50vw) !important;
}

.full-bleed-banner img { width: 100% !important; }

/* 其他样式及白天文字默认颜色 */
#paige-page a { text-decoration: none !important; }

/* ==========================================
   白天模式的文字与链接颜色 (增强权重版)
   ========================================== */
.bio-text, .info-text { color: #222 !important; }

/* 得分：Class(10) + 标签(1) + Class(10) = 21分！秒杀敌方的11分 */
.contact-info a.email-link, 
.contact-info a.cv-link { 
    color: #39A6C4 !important; 
}

/* ==========================================
   5. 夜间模式 (Dark Mode) 魔法
   ========================================== */

/* 1. 系统级别的夜间模式适配 */
@media (prefers-color-scheme: dark) {
    /* 导航栏 */
    #paige-site-menu a { color: #24F1FF !important; }
    #paige-site-menu a:hover { color: #B1F5FA !important; }
    #paige-site-menu a.active,
    #paige-site-menu a[aria-current="page"] { color: #FFFFFF !important; }
    
    /* 正文文字与 Email 前缀 */
    .bio-text, .info-text { color: #EDFAFF !important; }
    
    /* 邮箱链接与下载 CV 链接 */
    .email-link, .cv-link { color: #FFFFFF !important; }
}

/* 2. 兼容通过网页按钮手动切换的夜间模式 (Bootstrap 5 机制) */
[data-bs-theme="dark"] #paige-site-menu a { color: #24F1FF !important; }
[data-bs-theme="dark"] #paige-site-menu a:hover { color: #B1F5FA !important; }
[data-bs-theme="dark"] #paige-site-menu a.active,
[data-bs-theme="dark"] #paige-site-menu a[aria-current="page"] { color: #FFFFFF !important; }

[data-bs-theme="dark"] .bio-text,
[data-bs-theme="dark"] .info-text { color: #EDFAFF !important; }

[data-bs-theme="dark"] .email-link,
[data-bs-theme="dark"] .cv-link { color: #FFFFFF !important; }

</style>
