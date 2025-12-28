// 网站数据加载和页面交互

// 图标映射表
const iconMap = {
  0: "fas fa-globe", // 默认图标
  1: "fas fa-user",
  2: "fas fa-code",
  3: "fas fa-tools",
  4: "fas fa-file-alt",
  5: "fas fa-chart-line",
  6: "fas fa-music",
  7: "fas fa-gamepad",
  8: "fas fa-rocket",
  9: "fas fa-palette",
  10: "fas fa-cogs",
  11: "fas fa-globe",
  12: "fas fa-desktop",
  13: "fas fa-laptop-code",
  14: "fas fa-magic",
  15: "fas fa-star"
};

// 标签映射表
const tagMap = {
  0: "", // 无标签
  1: "个人",
  2: "工具",
  3: "开发",
  4: "学习",
  5: "娱乐",
  6: "游戏",
  7: "文件",
  8: "测试",
  9: "音乐",
  10: "绘图",
  11: "创意",
  12: "实用",
  13: "技术",
  14: "资源",
  15: "项目"
};

// 标签颜色映射
const tagColorMap = {
  1: "#4CAF50", // 个人 - 绿色
  2: "#2196F3", // 工具 - 蓝色
  3: "#9C27B0", // 开发 - 紫色
  4: "#FF9800", // 学习 - 橙色
  5: "#FF5722", // 娱乐 - 深橙色
  6: "#795548", // 游戏 - 棕色
  7: "#607D8B", // 文件 - 蓝灰色
  8: "#009688", // 测试 - 青色
  9: "#E91E63", // 音乐 - 粉色
  10: "#3F51B5", // 绘图 - 靛蓝色
  11: "#00BCD4", // 创意 - 青色
  12: "#8BC34A", // 实用 - 浅绿色
  13: "#FFC107", // 技术 - 琥珀色
  14: "#673AB7", // 资源 - 深紫色
  15: "#F44336"  // 项目 - 红色
};

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
        
        // 获取图标和标签
        const icon = getWebsiteIcon(website["图标"]);
        const tag = getWebsiteTag(website["标签"]);
        
        card.innerHTML = `
            <div class="card-header">
                <h3><i class="${icon}"></i> ${website["网站名称"]}</h3>
                ${tag}
            </div>
            <div class="url">${website["网址"]}</div>
            <p>${website["介绍"]}</p>
            <a href="${website["网址"]}" target="_blank" class="btn">
                <i class="fas fa-external-link-alt"></i> 访问网站
            </a>
        `;
        
        websitesContainer.appendChild(card);
    });
}

// 根据数字获取图标
function getWebsiteIcon(iconNumber) {
    // 如果未定义或为null，使用默认图标
    if (iconNumber === undefined || iconNumber === null) {
        return iconMap[0];
    }
    
    // 确保是数字
    const num = parseInt(iconNumber);
    
    // 如果数字在映射表中，返回对应的图标，否则返回默认图标
    return iconMap[num] || iconMap[0];
}

// 根据数字获取标签
function getWebsiteTag(tagNumber) {
    // 如果未定义、为null或为0，返回空字符串
    if (tagNumber === undefined || tagNumber === null || tagNumber === 0) {
        return '';
    }
    
    // 确保是数字
    const num = parseInt(tagNumber);
    
    // 如果数字在映射表中，返回对应的标签，否则返回空
    const tagText = tagMap[num];
    if (!tagText) return '';
    
    // 获取标签颜色
    const tagColor = tagColorMap[num] || '#5c6bc0';
    
    // 返回带样式的标签
    return `<span class="website-tag" style="background-color: ${tagColor}20; color: ${tagColor}; border-left-color: ${tagColor};">${tagText}</span>`;
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
        githubBtn.href = 'https://github.com/yourusername/starnavigation';
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
