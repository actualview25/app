console.log('🎨 نظام الأثاث يعمل!');

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 بدء نظام الأثاث...');
    initFurnitureSystem();
});

function initFurnitureSystem() {
    console.log('🔧 تهيئة النظام...');
    
    // نظام الألوان
    const colorButtons = document.querySelectorAll('.color-btn');
    const resetButton = document.getElementById('reset-colors');
    const toggleButton = document.getElementById('toggle-panel');

    // أحداث الألوان
    colorButtons.forEach(button => {
        button.addEventListener('click', function() {
            const color = this.getAttribute('data-color');
            applyFurnitureColor(color);
            
            // تحديث النشط
            colorButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            showMessage(`تم تطبيق اللون: ${getColorName(color)}`);
        });
    });

    // إعادة التعيين
    resetButton.addEventListener('click', function() {
        resetFurnitureColors();
        colorButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector('[data-color="default"]').classList.add('active');
        showMessage('تم إعادة التعيين');
    });

    // إظهار/إخفاء
    toggleButton.addEventListener('click', function() {
        const panel = document.getElementById('furniture-control-panel');
        panel.classList.toggle('collapsed');
        this.textContent = panel.classList.contains('collapsed') ? '📋 إظهار' : '📋 إخفاء';
    });

    // إنشاء قطع الأثاث
    createFurnitureItems();
    
    console.log('✅ نظام الأثاث جاهز!');
}

function createFurnitureItems() {
    console.log('🪑 إنشاء قطع الأثاث...');
    
    // تنظيف القديم
    document.querySelectorAll('.furniture-item').forEach(item => item.remove());
    
    // قطع الأثاث
    const items = [
        { name: 'كنبة أمامية', top: '40%', left: '50%', icon: '🛋️' },
        { name: 'طاولة وسط', top: '60%', left: '50%', icon: '🪑' },
        { name: 'كرسي', top: '70%', left: '30%', icon: '💺' },
        { name: 'كنبة جانبية', top: '40%', left: '20%', icon: '🛋️' },
        { name: 'كنبة جانبية', top: '40%', left: '80%', icon: '🛋️' }
    ];

    items.forEach(item => {
        const element = document.createElement('div');
        element.className = 'furniture-item';
        element.innerHTML = item.icon;
        element.title = item.name;
        element.style.cssText = `
            position: absolute;
            top: ${item.top};
            left: ${item.left};
            width: 60px;
            height: 60px;
            background: rgba(76, 175, 80, 0.9);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            cursor: pointer;
            border: 3px solid white;
            z-index: 1000;
            transform: translate(-50%, -50%);
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        `;

        // تأثيرات التفاعل
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translate(-50%, -50%) scale(1.2)';
            this.style.boxShadow = '0 6px 20px rgba(0,0,0,0.4)';
        });

        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(-50%, -50%) scale(1)';
            this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
        });

        element.addEventListener('click', function() {
            showMessage(`تم تحديد: ${item.name}`);
        });

        document.getElementById('pano').appendChild(element);
    });
    
    console.log(`✅ تم إنشاء ${items.length} قطع أثاث`);
}

function applyFurnitureColor(color) {
    const items = document.querySelectorAll('.furniture-item');
    const colorMap = {
        'default': 'rgba(76, 175, 80, 0.9)',
        'brown': 'rgba(160, 82, 45, 0.9)',
        'dark-brown': 'rgba(101, 67, 33, 0.9)',
        'black': 'rgba(47, 79, 79, 0.9)',
        'white': 'rgba(245, 245, 220, 0.9)',
        'gray': 'rgba(128, 128, 128, 0.9)',
        'walnut': 'rgba(119, 63, 26, 0.9)',
        'cherry': 'rgba(159, 29, 53, 0.9)'
    };
    
    const newColor = colorMap[color] || colorMap['default'];
    items.forEach(item => {
        item.style.background = newColor;
    });
}

function resetFurnitureColors() {
    const items = document.querySelectorAll('.furniture-item');
    items.forEach(item => {
        item.style.background = 'rgba(76, 175, 80, 0.9)';
    });
}

function getColorName(color) {
    const names = {
        'default': 'أخضر',
        'brown': 'بني',
        'dark-brown': 'بني غامق', 
        'black': 'أسود',
        'white': 'أبيض',
        'gray': 'رمادي',
        'walnut': 'جوز',
        'cherry': 'كرزي'
    };
    return names[color] || color;
}

function showMessage(text) {
    // إزالة الرسائل القديمة
    document.querySelectorAll('.furniture-message').forEach(msg => msg.remove());
    
    const message = document.createElement('div');
    message.className = 'furniture-message';
    message.textContent = text;
    message.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.95);
        color: #00ff00;
        padding: 15px 30px;
        border-radius: 10px;
        border: 2px solid #00ff00;
        z-index: 10000;
        font-size: 16px;
        font-weight: bold;
        box-shadow: 0 5px 20px rgba(0,255,0,0.3);
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        if (message.parentNode) {
            message.parentNode.removeChild(message);
        }
    }, 3000);
}

console.log('🎯 نظام الأثاث محمل وجاهز!');
