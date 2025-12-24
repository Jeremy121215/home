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
        
        // 生成探索更多精彩网站卡片
        renderWebsiteCards('explore', data.explore);
        
        // 生成测试开发网站卡片
        renderWebsiteCards('test', data.test);
        
    } catch (error) {
        console.error('加载网站数据时出错:', error);
        showErrorMessage();
    }
}

// 渲染网站卡片
function renderWebsiteCards(type, websitesData) {
    const containerId = type === 'explore' ? 'explore-websites-container' : 'test-websites-container';
    const websitesContainer = document.getElementById(containerId);
    
    // 清空加载状态
    websitesContainer.innerHTML = '';
    
    // 如果没有网站数据，显示提示信息
    if (!websitesData || websitesData.length === 0) {
        websitesContainer.innerHTML = `
            <div class="error-message">
                <i class="fas fa-info-circle"></i>
                <h3>暂无网站数据</h3>
                <p>请添加网站数据到websites.json文件中</p>
            </div>
        `;
        return;
    }
    
    // 遍历数据创建卡片
    websitesData.forEach((website, index) => {
        const card = document.createElement('div');
        const delayClass = `delay-${Math.min(index % 3, 3)}`;
        
        // 根据类型设置不同的卡片样式
        if (type === 'explore') {
            card.className = `website-card fade-in ${delayClass}`;
        } else {
            card.className = `test-website-card fade-in ${delayClass}`;
        }
        
        // 根据网站类型设置图标
        const icon = getWebsiteIcon(website["网站名称"], website["介绍"], type);
        
        // 获取标签
        const tag = getWebsiteTag(website["网站名称"], website["介绍"], type);
        
        card.innerHTML = `
            <h3><i class="${icon}"></i> ${website["网站名称"]}${tag}</h3>
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
function getWebsiteIcon(websiteName, description, type) {
    const name = websiteName.toLowerCase();
    const desc = description.toLowerCase();
    
    // 测试开发板块的特殊图标
    if (type === 'test') {
        if (name.includes('测试') || desc.includes('测试')) {
            return 'fas fa-vial';
        }
        if (name.includes('开发') || desc.includes('开发') || desc.includes('编程')) {
            return 'fas fa-code';
        }
        if (name.includes('调试') || desc.includes('调试')) {
            return 'fas fa-bug';
        }
        if (name.includes('文档') || desc.includes('文档')) {
            return 'fas fa-book';
        }
        if (name.includes('工具') || desc.includes('工具')) {
            return 'fas fa-tools';
        }
        if (name.includes('api') || desc.includes('api')) {
            return 'fas fa-cloud';
        }
        if (name.includes('部署') || desc.includes('部署')) {
            return 'fas fa-rocket';
        }
        return 'fas fa-laptop-code';
    }
    
    // 探索更多精彩板块的图标
    if (name.includes('个人')) {
        return 'fas fa-star';
    }
    if (name.includes('科技') || desc.includes('科技') || desc.includes('技术') || desc.includes('ai') || desc.includes('人工智能')) {
        return 'fas fa-microchip';
    }
    if (name.includes('设计') || desc.includes('设计') || desc.includes('创意') || desc.includes('艺术')) {
        return 'fas fa-palette';
    }
    if (name.includes('学习') || desc.includes('学习') || desc.includes('教育') || desc.includes('课程')) {
        return 'fas fa-graduation-cap';
    }
    if (name.includes('旅行') || desc.includes('旅行') || desc.includes('旅游') || desc.includes('摄影')) {
        return 'fas fa-plane';
    }
    if (name.includes('健康') || desc.includes('健康') || desc.includes('健身') || desc.includes('医疗')) {
        return 'fas fa-heartbeat';
    }
    if (name.includes('音乐') || desc.includes('音乐') || desc.includes('歌曲')) {
        return 'fas fa-music';
    }
    if (name.includes('美食') || desc.includes('美食') || desc.includes('烹饪') || desc.includes('食谱')) {
        return 'fas fa-utensils';
    }
    if (name.includes('购物') || desc.includes('购物') || desc.includes('电商') || desc.includes('商品')) {
        return 'fas fa-shopping-cart';
    }
    if (name.includes('社交') || desc.includes('社交') || desc.includes('社区') || desc.includes('论坛')) {
        return 'fas fa-users';
    }
    
    return 'fas fa-globe';
}

// 获取网站标签
function getWebsiteTag(websiteName, description, type) {
    const name = websiteName.toLowerCase();
    const desc = description.toLowerCase();
    
    // 测试开发板块的标签
    if (type === 'test') {
        if (name.includes('测试') || desc.includes('测试')) {
            return '<span class="website-tag test-tag">测试</span>';
        }
        if (name.includes('开发') || desc.includes('开发') || desc.includes('编程')) {
            return '<span class="website-tag test-tag">开发</span>';
        }
        if (name.includes('工具') || desc.includes('工具')) {
            return '<span class="website-tag test-tag">工具</span>';
        }
        if (name.includes('文档') || desc.includes('文档')) {
            return '<span class="website-tag test-tag">文档</span>';
        }
        if (name.includes('部署') || desc.includes('部署')) {
            return '<span class="website-tag test-tag">部署</span>';
        }
        return '<span class="website-tag test-tag">开发</span>';
    }
    
    // 探索更多精彩板块的标签
    if (name.includes('星河') || name.includes('梦想')) {
        return '<span class="website-tag">个人</span>';
    }
    if (name.includes('科技') || desc.includes('科技') || desc.includes('技术')) {
        return '<span class="website-tag">科技</span>';
    }
    if (name.includes('设计') || desc.includes('设计')) {
        return '<span class="website-tag">设计</span>';
    }
    if (name.includes('学习') || desc.includes('学习')) {
        return '<span class="website-tag">学习</span>';
    }
    
    return '';
}

// 显示错误信息
function showErrorMessage() {
    const exploreContainer = document.getElementById('explore-websites-container');
    const testContainer = document.getElementById('test-websites-container');
    
    const errorHtml = `
        <div class="error-message">
            <i class="fas fa-exclamation-triangle"></i>
            <h3>加载失败</h3>
            <p>无法加载网站数据，请检查网络连接或刷新页面重试。</p>
            <button class="btn" onclick="location.reload()">
                <i class="fas fa-redo"></i> 刷新页面
            </button>
        </div>
    `;
    
    if (exploreContainer) exploreContainer.innerHTML = errorHtml;
    if (testContainer) testContainer.innerHTML = errorHtml;
}

// 添加GitHub链接
function addGitHubLink() {
    const githubBtn = document.querySelector('.github-btn');
    if (githubBtn) {
        // 在实际项目中，这里应该替换为您的GitHub仓库链接
        githubBtn.href = 'https://github.com/Jeremy121215';
    }
}

// 添加快捷键支持
document.addEventListener('keydown', function(event) {
    // Ctrl + Enter 刷新页面
    if (event.ctrlKey && event.key === 'Enter') {
        location.reload();
    }
});

// 添加视差滚动效果
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const stars = document.querySelector('.stars');
    
    if (stars) {
        stars.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});
