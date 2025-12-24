// 网站数据加载和页面交互

document.addEventListener('DOMContentLoaded', function() {
    // 初始化星星背景
    createStars();
    
    // 加载网站数据
    loadWebsitesData();
    
    // 添加GitHub链接
    addGitHubLink();
});

// 创建星星背景
function createStars() {
    const starsContainer = document.getElementById('stars');
    const starCount = 80;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // 随机位置和大小
        const size = Math.random() * 3 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5;
        
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${posX}%`;
        star.style.top = `${posY}%`;
        star.style.animationDelay = `${delay}s`;
        
        starsContainer.appendChild(star);
    }
}

// 加载网站数据
async function loadWebsitesData() {
    try {
        // 从JSON文件加载数据
        const response = await fetch('websites.json');
        
        if (!response.ok) {
            throw new Error(`HTTP错误! 状态: ${response.status}`);
        }
        
        const data = await response.json();
        
        // 更新特色网站
        updateFeaturedWebsite(data.featured);
        
        // 生成网站卡片
        renderWebsiteCards(data.websites);
        
    } catch (error) {
        console.error('加载网站数据时出错:', error);
        showErrorMessage();
    }
}

// 更新特色网站
function updateFeaturedWebsite(featuredData) {
    const featuredTitle = document.querySelector('.featured-body h3');
    const featuredDescription = document.getElementById('featured-description');
    const featuredLink = document.getElementById('featured-link');
    
    if (featuredTitle && featuredData["网站名称"]) {
        featuredTitle.textContent = featuredData["网站名称"];
    }
    
    if (featuredDescription && featuredData["介绍"]) {
        featuredDescription.textContent = featuredData["介绍"];
    }
    
    if (featuredLink && featuredData["网址"]) {
        featuredLink.href = featuredData["网址"];
    }
}

// 渲染网站卡片
function renderWebsiteCards(websitesData) {
    const websitesContainer = document.getElementById('websites-container');
    
    // 清空加载状态
    websitesContainer.innerHTML = '';
    
    // 遍历数据创建卡片
    websitesData.forEach((website, index) => {
        const card = document.createElement('div');
        card.className = `website-card fade-in delay-${Math.min(index + 1, 3)}`;
        
        // 根据网站类型设置图标
        const icon = getWebsiteIcon(website["网站名称"], website["介绍"]);
        
        card.innerHTML = `
            <h3><i class="${icon}"></i> ${website["网站名称"]}</h3>
            <div class="url">${website["网址"]}</div>
            <p>${website["介绍"]}</p>
            <a href="${website["网址"]}" target="_blank" class="btn">
                <i class="fas fa-external-link-alt"></i> 访问网站
            </a>
        `;
        
        websitesContainer.appendChild(card);
    });
}

// 根据网站信息获取图标
function getWebsiteIcon(websiteName, description) {
    const name = websiteName.toLowerCase();
    const desc = description.toLowerCase();
    
    if (name.includes('科技') || desc.includes('科技') || desc.includes('技术')) {
        return 'fas fa-microchip';
    }
    if (name.includes('设计') || desc.includes('设计') || desc.includes('创意')) {
        return 'fas fa-palette';
    }
    if (name.includes('学习') || desc.includes('学习') || desc.includes('教育') || desc.includes('课程')) {
        return 'fas fa-graduation-cap';
    }
    if (name.includes('旅行') || desc.includes('旅行') || desc.includes('旅游')) {
        return 'fas fa-plane';
    }
    if (name.includes('健康') || desc.includes('健康') || desc.includes('健身') || desc.includes('医疗')) {
        return 'fas fa-heartbeat';
    }
    if (name.includes('音乐') || desc.includes('音乐')) {
        return 'fas fa-music';
    }
    if (name.includes('美食') || desc.includes('美食') || desc.includes('烹饪')) {
        return 'fas fa-utensils';
    }
    if (name.includes('购物') || desc.includes('购物') || desc.includes('电商')) {
        return 'fas fa-shopping-cart';
    }
    if (name.includes('社交') || desc.includes('社交') || desc.includes('社区')) {
        return 'fas fa-users';
    }
    
    return 'fas fa-globe';
}

// 显示错误信息
function showErrorMessage() {
    const websitesContainer = document.getElementById('websites-container');
    
    websitesContainer.innerHTML = `
        <div class="error-message">
            <i class="fas fa-exclamation-triangle"></i>
            <h3>加载失败</h3>
            <p>无法加载网站数据，请检查网络连接或刷新页面重试。</p>
            <button class="btn" onclick="location.reload()">
                <i class="fas fa-redo"></i> 刷新页面
            </button>
        </div>
    `;
    
    // 设置特色网站的默认信息
    const featuredDescription = document.getElementById('featured-description');
    if (featuredDescription) {
        featuredDescription.textContent = "一个充满创意与灵感的个人空间，记录梦想与思考的旅程。这里汇聚了技术分享、生活感悟、创意设计和旅行见闻，旨在为访客提供一个轻松愉悦的阅读体验，同时激发对生活的热爱与对未来的憧憬。";
    }
}

// 添加GitHub链接
function addGitHubLink() {
    // 这里可以添加实际的GitHub仓库链接
    const githubBtn = document.querySelector('.github-btn');
    if (githubBtn) {
        // 在实际项目中，这里应该替换为您的GitHub仓库链接
        githubBtn.href = 'https://github.com/yourusername/星河导航';
    }
}

// 添加快捷键支持
document.addEventListener('keydown', function(event) {
    // Alt + 1 跳转到特色网站
    if (event.altKey && event.key === '1') {
        const featuredLink = document.getElementById('featured-link');
        if (featuredLink) {
            featuredLink.click();
        }
    }
    
    // Alt + R 刷新页面
    if (event.altKey && event.key === 'r') {
        location.reload();
    }
});

// 添加视差滚动效果
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const stars = document.querySelector('.stars');
    
    if (stars) {
        stars.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});
