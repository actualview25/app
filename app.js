// نظام الأثاث - ملف JavaScript منفصل// نظام الأثاث - ملف JavaScript محسن مع الخامات
console.log('🚀 بدء تحميل نظام الأثاث المتقدم...');

// خامات الأثاث في الجولة
let furnitureMaterials = {};

function initSystem() {
    console.log('🔧 بدء تهيئة النظام المتقدم...');
    initColorSystem();
    loadFurnitureMaterials();
    setTimeout(createFurnitureHotspots, 2000);
}

function initColorSystem() {
    console.log('🎨 تهيئة نظام الألوان...');
    
    const colorButtons = document.querySelectorAll('.color-btn');
    const resetButton = document.getElementById('reset-colors');
    const toggleButton = document.getElementById('toggle-panel');
    
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
        document.querySelector('[data-color="default"]').classList.add('active');
    });
    
    // زر إظهار/إخفاء اللوحة
    toggleButton.addEventListener('click', function() {
        const controlPanel = document.getElementById('furniture-control-panel');
        controlPanel.classList.toggle('collapsed');
        this.textContent = controlPanel.classList.contains('collapsed') ? '📋 إظهار' : '📋 إخفاء';
    });
    
    console.log('✅ نظام الألوان جاهز!');
}

function loadFurnitureMaterials() {
    console.log('📦 تحميل خامات الأثاث...');
    
    // محاكاة لخامات الأثاث الحقيقية في الجولة
    furnitureMaterials = {
        'sofa1': { element: null, originalColor: '#8B4513', currentColor: '#8B4513' },
        'sofa2': { element: null, originalColor: '#8B4513', currentColor: '#8B4513' },
        'sofa3': { element: null, originalColor: '#8B4513', currentColor: '#8B4513' },
        'table1': { element: null, originalColor: '#654321', currentColor: '#654321' },
        'chair1': { element: null, originalColor: '#A0522D', currentColor: '#A0522D' },
        'chair2': { element: null, originalColor: '#A0522D', currentColor: '#A0522D' }
    };
    
    console.log('✅ تم تحميل خامات الأثاث:', Object.keys(furnitureMaterials));
}

function createFurnitureHotspots() {
    console.log('🪑 إنشاء هوت سبوتات الأثاث المتقدمة...');
    
    // تنظيف أي هوت سبوتات قديمة
    const oldHotspots = document.querySelectorAll('.furniture-hotspot');
    oldHotspots.forEach(hotspot => hotspot.remove());
    
    // إحداثيات أكثر دقة بناءً على الجولة الحقيقية
    const hotspots = [
        { id: 'sofa1', name: 'كنبة أمامية', x: '35%', y: '65%', type: 'sofa' },
        { id: 'sofa2', name: 'كنبة يمنى', x: '65%', y: '55%', type: 'sofa' },
        { id: 'sofa3', name: 'كنبة يسرى', x: '25%', y: '55%', type: 'sofa' },
        { id: 'table1', name: 'طاولة وسط', x: '45%', y: '70%', type: 'table' },
        { id: 'chair1', name: 'كرسي مكتب', x: '60%', y: '35%', type: 'chair' },
        { id: 'chair2', name: 'كرسي استقبال', x: '30%', y: '35%', type: 'chair' }
    ];
    
    hotspots.forEach(spot => {
        const element = document.createElement('div');
        element.className = 'furniture-hotspot';
        element.id = `hotspot-${spot.id}`;
        element.dataset.furnitureId = spot.id;
        element.dataset.furnitureType = spot.type;
        element.style.left = spot.x;
        element.style.top = spot.y;
        
        // أيقونة مختلفة حسب نوع الأثاث
        const icon = getFurnitureIcon(spot.type);
        element.innerHTML = icon;
        element.title = spot.name;
        
        // إضافة للتلميح
        const tooltip = document.createElement('div');
        tooltip.className = 'furniture-tooltip';
        tooltip.textContent = spot.name;
        element.appendChild(tooltip);
        
        // أحداث التفاعل
        element.addEventListener('click', function() {
            const furnitureId = this.dataset.furnitureId;
            highlightFurniture(furnitureId);
        });
        
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translate(-50%, -50%) scale(1.3)';
            this.style.zIndex = '1002';
            const tooltip = this.querySelector('.furniture-tooltip');
            if (tooltip) tooltip.style.opacity = '1';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(-50%, -50%) scale(1)';
            this.style.zIndex = '1000';
            const tooltip = this.querySelector('.furniture-tooltip');
            if (tooltip) tooltip.style.opacity = '0';
        });
        
        // إضافة إلى عنصر الجولة
        const panoElement = document.getElementById('pano');
        if (panoElement) {
            panoElement.appendChild(element);
            furnitureMaterials[spot.id].element = element;
        }
    });
    
    console.log('✅ تم إنشاء هوت سبوتات الأثاث المتقدمة!');
}

function getFurnitureIcon(type) {
    const icons = {
        'sofa': '🛋️',
        'table': '🪑',
        'chair': '💺',
        'default': '🪑'
    };
    return icons[type] || icons['default'];
}

function applyFurnitureColor(color) {
    console.log('🎨 تطبيق اللون على الأثاث:', color);
    
    const colorValue = getColorValue(color);
    const colorName = getColorName(color);
    
    // تطبيق اللون على جميع قطع الأثاث
    Object.keys(furnitureMaterials).forEach(furnitureId => {
        const furniture = furnitureMaterials[furnitureId];
        if (furniture.element) {
            furniture.currentColor = colorValue;
            furniture.element.style.background = colorValue;
            furniture.element.style.borderColor = getBorderColor(colorValue);
            
            // تأثير بصري عند تغيير اللون
            furniture.element.style.boxShadow = `0 0 20px ${colorValue}`;
            setTimeout(() => {
                furniture.element.style.boxShadow = '';
            }, 1000);
        }
    });
    
    showMessage(`تم تطبيق اللون ${colorName} على جميع قطع الأثاث`);
    
    // في البيئة الحقيقية، هنا نطبق اللون على الخامات 3D
    applyColorTo3DMaterials(colorValue);
}

function applyColorTo3DMaterials(colorValue) {
    console.log('🎨 تطبيق اللون على الخامات ثلاثية الأبعاد:', colorValue);
    
    // هذه الدالة ستتصل مع نظام الخامات في الجولة الافتراضية
    // في التطبيق الحقيقي، هذا هو المكان الذي تتغير فيه خامات الأثاث 3D
    
    // محاكاة لتغيير الخامات
    const furnitureElements = document.querySelectorAll('.furniture-hotspot');
    furnitureElements.forEach(element => {
        element.style.background = colorValue;
        element.style.borderColor = getBorderColor(colorValue);
    });
    
    // يمكن إضافة كود هنا للاتصال مع WebGL أو Three.js لتغيير خامات 3D
}

function resetFurnitureColors() {
    console.log('🔄 إعادة تعيين ألوان الأثاث');
    
    Object.keys(furnitureMaterials).forEach(furnitureId => {
        const furniture = furnitureMaterials[furnitureId];
        if (furniture.element) {
            furniture.currentColor = furniture.originalColor;
            furniture.element.style.background = furniture.originalColor;
            furniture.element.style.borderColor = getBorderColor(furniture.originalColor);
        }
    });
    
    showMessage('تم إعادة تعيين ألوان الأثاث إلى الألوان الأصلية');
}

function highlightFurniture(furnitureId) {
    const furniture = furnitureMaterials[furnitureId];
    if (furniture && furniture.element) {
        // تأثير تمييز عند النقر
        furniture.element.style.animation = 'pulse 0.5s ease-in-out';
        furniture.element.style.boxShadow = '0 0 30px gold';
        
        setTimeout(() => {
            furniture.element.style.boxShadow = '';
        }, 2000);
        
        showMessage(`تم تحديد ${furnitureId} - جاهز لتغيير اللون`);
    }
}

function getColorValue(color) {
    const colors = {
        'default': 'rgba(139, 69, 19, 0.9)', // بني خشبي
        'brown': 'rgba(160, 82, 45, 0.9)', // بني
        'dark-brown': 'rgba(101, 67, 33, 0.9)', // بني غامق
        'black': 'rgba(47, 79, 79, 0.9)', // أسود
        'white': 'rgba(245, 245, 220, 0.9)', // أبيض عاجي
        'gray': 'rgba(128, 128, 128, 0.9)', // رمادي
        'walnut': 'rgba(119, 63, 26, 0.9)', // جوز
        'cherry': 'rgba(159, 29, 53, 0.9)', // كرزي
        'oak': 'rgba(210, 180, 140, 0.9)', // بلوط
        'mahogany': 'rgba(192, 64, 0, 0.9)' // ماهوجني
    };
    return colors[color] || colors['default'];
}

function getBorderColor(colorValue) {
    // إنشاء لون حدود متناسق مع اللون الأساسي
    return colorValue.replace('0.9', '1');
}

function getColorName(color) {
    const colorNames = {
        'default': 'بني خشبي',
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
        background: rgba(0, 0, 0, 0.95);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 10001;
        font-size: 16px;
        font-weight: bold;
        border: 2px solid #4ECDC4;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        font-family: Arial, sans-serif;
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.parentNode.removeChild(messageDiv);
        }
    }, 3000);
}

// بدء النظام بعد تحميل الصفحة والجولة
window.addEventListener('load', function() {
    console.log('📄 الصفحة محملة - بدء النظام المتقدم...');
    setTimeout(initSystem, 1500);
});

// تصدير الدوال للاستخدام الخارجي إذا لزم الأمر
window.FurnitureSystem = {
    applyFurnitureColor,
    resetFurnitureColors,
    highlightFurniture,
    getFurnitureMaterials: () => furnitureMaterials
};

console.log('📦 انتهى تحميل نظام الأثاث المتقدم');
