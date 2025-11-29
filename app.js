// نظام الأثاث - ملف JavaScript منفصل
console.log('🚀 بدء تحميل نظام الأثاث...');

function initSystem() {
    console.log('🔧 بدء تهيئة النظام...');
    
    // الانتظار حتى تكون الجولة جاهزة
    if (typeof window.viewer !== 'undefined') {
        initColorSystem();
        createFurnitureHotspots();
    } else {
        console.log('⏳ في انتظار تحميل الجولة...');
        setTimeout(initSystem, 500);
    }
}

function initColorSystem() {
    console.log('🎨 تهيئة نظام الألوان...');
   
    const colorButtons = document.querySelectorAll('.color-btn');
    const resetButton = document.getElementById('reset-colors');
    const toggleButton = document.getElementById('toggle-panel');
   
    console.log('🎯 عدد أزرار الألوان:', colorButtons.length);

    if (colorButtons.length === 0) {
        console.error('❌ لم يتم العثور على أزرار الألوان!');
        return;
    }

    // أحداث أزرار الألوان
    colorButtons.forEach(button => {
        button.addEventListener('click', function() {
            const color = this.getAttribute('data-color');
            console.log('🎨 تطبيق اللون:', color);
            applyFurnitureColor(color);
           
            colorButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
   
    // زر إعادة التعيين
    resetButton.addEventListener('click', function() {
        console.log('🔄 إعادة تعيين الألوان');
        resetFurnitureColors();
        colorButtons.forEach(btn => btn.classList.remove('active'));
        const defaultBtn = document.querySelector('[data-color="default"]');
        if (defaultBtn) defaultBtn.classList.add('active');
    });
   
    // زر إظهار/إخفاء اللوحة
    toggleButton.addEventListener('click', function() {
        const controlPanel = document.getElementById('furniture-control-panel');
        if (controlPanel) {
            controlPanel.classList.toggle('collapsed');
            this.textContent = controlPanel.classList.contains('collapsed') ? '📋 إظهار' : '📋 إخفاء';
        }
    });
   
    console.log('✅ نظام الألوان جاهز!');
}

// باقي الدوال تبقى كما هي...
function createFurnitureHotspots() {
    console.log('🪑 إنشاء هوت سبوتات الأثاث...');
   
    // تنظيف أي هوت سبوتات قديمة
    const oldHotspots = document.querySelectorAll('.furniture-hotspot');
    oldHotspots.forEach(hotspot => {
        if (hotspot.parentNode) {
            hotspot.parentNode.removeChild(hotspot);
        }
    });
   
    // إنشاء دوائر تفاعلية في المواقع المناسبة للجولة
    const hotspots = [
        { id: 'sofa1', name: 'كنبة أمامية', x: '45%', y: '40%', icon: '🛋️' },
        { id: 'sofa2', name: 'كنبة يمنى', x: '70%', y: '40%', icon: '🛋️' },
        { id: 'sofa3', name: 'كنبة يسرى', x: '20%', y: '40%', icon: '🛋️' },
        { id: 'table1', name: 'طاولة وسط', x: '45%', y: '60%', icon: '🪑' },
        { id: 'cushion1', name: 'وسادة', x: '35%', y: '70%', icon: '🛏️' },
        { id: 'cushion2', name: 'وسادة', x: '55%', y: '70%', icon: '🛏️' }
    ];
   
    hotspots.forEach(spot => {
        const element = document.createElement('div');
        element.className = 'furniture-hotspot';
        element.id = spot.id;
        element.style.left = spot.x;
        element.style.top = spot.y;
        element.innerHTML = spot.icon;
        element.title = spot.name;
        element.setAttribute('data-name', spot.name);
       
        // إضافة للتلميح
        const tooltip = document.createElement('div');
        tooltip.className = 'furniture-tooltip';
        tooltip.textContent = spot.name;
        tooltip.style.cssText = `
            position: absolute;
            top: -35px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0,0,0,0.9);
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 12px;
            white-space: nowrap;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
            z-index: 1001;
        `;
       
        element.appendChild(tooltip);
       
        // أحداث التفاعل
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translate(-50%, -50%) scale(1.2)';
            tooltip.style.opacity = '1';
        });
       
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(-50%, -50%) scale(1)';
            tooltip.style.opacity = '0';
        });

        // حدث النقر
        element.addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            showMessage(`تم تحديد: ${name}`);
        });
       
        // إضافة إلى عنصر الجولة
        const panoElement = document.getElementById('pano');
        if (panoElement) {
            panoElement.appendChild(element);
            console.log(`✅ تم إنشاء ${spot.name}`);
        } else {
            console.error('❌ لم يتم العثور على عنصر الجولة');
        }
    });
   
    console.log(`✅ تم إنشاء ${hotspots.length} قطع أثاث تفاعلية!`);
}

// باقي الدوال تبقى كما هي في كودك الأصلي...
function applyFurnitureColor(color) {
    console.log('🎨 تغيير لون الأثاث إلى:', color);
   
    const hotspots = document.querySelectorAll('.furniture-hotspot');
    console.log('🔍 عدد قطع الأثاث:', hotspots.length);
   
    const colorValue = getColorValue(color);
    hotspots.forEach(hotspot => {
        hotspot.style.background = colorValue;
    });
   
    showMessage(`تم تطبيق اللون ${getColorName(color)} على ${hotspots.length} قطعة أثاث`);
}

function resetFurnitureColors() {
    const hotspots = document.querySelectorAll('.furniture-hotspot');
    hotspots.forEach(hotspot => {
        hotspot.style.background = 'rgba(76, 175, 80, 0.8)';
    });
    showMessage('تم إعادة تعيين ألوان الأثاث');
}

function getColorValue(color) {
    const colors = {
        'default': 'rgba(76, 175, 80, 0.8)',
        'brown': 'rgba(160, 82, 45, 0.8)',
        'dark-brown': 'rgba(101, 67, 33, 0.8)',
        'black': 'rgba(47, 79, 79, 0.8)',
        'white': 'rgba(245, 245, 220, 0.8)',
        'gray': 'rgba(128, 128, 128, 0.8)',
        'walnut': 'rgba(119, 63, 26, 0.8)',
        'cherry': 'rgba(159, 29, 53, 0.8)',
        'oak': 'rgba(210, 180, 140, 0.8)',
        'mahogany': 'rgba(192, 64, 0, 0.8)'
    };
    return colors[color] || colors['default'];
}

function getColorName(color) {
    const colorNames = {
        'default': 'أخضر',
        'brown': 'بني',
        'dark-brown': 'بني غامق',
        'black': 'أسود',
        'white': 'أبيض',
        'gray': 'رمادي',
        'walnut': 'جوز',
        'cherry': 'كرزي',
        'oak': 'بلوط',
        'mahogany': 'ماهوجني'
    };
    return colorNames[color] || color;
}

function showMessage(message) {
    const oldMessage = document.getElementById('temp-message');
    if (oldMessage) oldMessage.remove();
   
    const messageDiv = document.createElement('div');
    messageDiv.id = 'temp-message';
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 10001;
        font-size: 16px;
        font-weight: bold;
        border: 2px solid #4ECDC4;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    `;
   
    document.body.appendChild(messageDiv);
   
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.parentNode.removeChild(messageDiv);
        }
    }, 3000);
}

// بدء النظام بعد تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 الصفحة محملة - بدء النظام...');
    setTimeout(initSystem, 1000);
});
