+++
keywords = [
"Yuxi Zhong", "Tibet", "Material Culture", "Religion", "Cat", "Ganzi", 
"Visual", "Ecology", "Multi-species Ethnography", "Xiangcheng", 
"Stove Cat", "Nehulay", "Vernacular Religion", "Intangible Cultural Heritage", 
"ICH", "Sonam Dorji"
]
[paige.pages]
disable_collections = true
disable_pages = true
disable_sections = true
+++

<!-- ==========================================
1. 顶部宽屏风景横幅 (True Responsive Banner) 
========================================== -->
<div class="hero-banner full-bleed-banner position-relative mb-5 shadow-sm">
{{< paige/image alt="Landscape of Xiangcheng" src="images/my_home.jpg" class="w-100" style="display: block; height: auto;" >}}

<!-- 名字与副标题浮层 -->
<div class="position-absolute bottom-0 start-0 p-4 w-100" 
     style="background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);">
    <h1 class="text-white mb-0 text-uppercase" 
        style="font-family: 'MyGillSans', sans-serif; font-size: calc(1rem + 2vw); letter-spacing: 0.15em; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
        YUXI ZHONG
    </h1>
    <p class="text-white mt-1 mb-0" 
       style="font-family: 'MyJost', sans-serif; font-size: 1.2rem; letter-spacing: 0.05em; text-shadow: 1px 1px 4px rgba(0,0,0,0.5);">
        Material, Tibet, Cat
    </p>
</div>
</div>

<!-- ==========================================
2. 下方两栏内容区 (Two-column Bio Section)
========================================== -->
<div class="container-fluid px-0 mb-5">
<div class="row align-items-center">
    <!-- 左侧：个人照 -->
    <div class="col-md-5 mb-4 mb-md-0 text-center text-md-start">
        {{< paige/image alt="Yuxi Zhong" src="images/profile_pic.jpg" class="img-fluid shadow-sm rounded-1" >}}
    </div>
    <!-- 右侧：文字介绍 (已更新欢迎语与字体) -->
    <div class="col-md-7 px-md-5">
        <p class="text-start" style="font-family: 'Open Sans', sans-serif; font-size: 1.15rem; line-height: 1.8; color: #222;">
            <strong>Hi, I'm Yuxi Zhong, you can call me Sonam Dorji!</strong><br>
            I am a scholar exploring how faith and identity are carved into the material world. My research tracks the evolving material culture and ritual objects of my hometown, Xiangcheng (乡城). Outside of academia, you'll find me performing Peking Opera or advocating for animal welfare.
        </p>
        <div class="contact-info mt-4">
            <p class="mb-2">Email: <a href="mailto:yuxi.zhonggg@gmail.com">yuxi.zhonggg@gmail.com</a></p>
            <a href="/CV_Yuxi_Zhong.pdf" style="font-family: 'MyJost', sans-serif; font-weight: bold; text-decoration: underline !important; letter-spacing: 0.05em; text-transform: uppercase;">Download CV</a>
        </div>
    </div>
</div>
</div>

<!-- ==========================================
3. 底部社交图标分割线
========================================== -->
<div class="column-gap-3 d-flex fs-4 justify-content-center mt-5 pt-4 border-top">
{{< paige/icon class="bi bi-instagram" title="Instagram" url="https://www.instagram.com/sonam_dorji__/" >}}
{{< paige/icon class="bi bi-twitter-x" title="X" url="https://x.com/dorji0704/" >}}
</div>

<!-- ==========================================
4. 全局 CSS 样式
========================================== -->
<style>
/* --- 字体声明区 --- */
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
/* 👇 新增：Open Sans 字体声明 */
@font-face {
    font-family: 'Open Sans';
    src: url('/fonts/OpenSans-Regular.ttf') format('truetype'); /* 请确保你有这个字体文件 */
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

/* 其他样式 */
#paige-page a { text-decoration: none !important; }
.contact-info { font-family: 'MyJost', sans-serif !important; color: #222 !important; }
.contact-info a { color: #008b8b !important; }
</style>
