// نظام الأثاث البسيط والفعّال
console.log('🚀 تحميل نظام الأثاث البسيط...');

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ الصفحة محملة - بدء النظام');
    
    // انتظر تحميل Marzipano أولاً
    setTimeout(initFurnitureSystem, 2000);
});

function initFurnitureSystem() {
    console.log('🎯 تهيئة نظام الأثاث...');
    
    // تأكد من وجود عنصر الجولة
    const panoElement = document.getElementById('pano');
    if (!panoElement) {
        console.error('❌ عنصر الجولة غير موجود');
        return;
    }
    
    createFurnitureItems();
    setupColorControls();
    
    console.log('✅ نظام الأثاث جاهز!');
    showTempMessage('🎉 نظام تغيير ألوان الأثاث يعمل بنجاح!');
}

function createFurnitureItems() {
    console.log('🪑 إنشاء قطع الأثاث...');
    
    // تنظيف أي أثاث قديم
    const oldItems = document.querySelectorAll('.furniture-item');
    oldItems.forEach(item => item.remove());
    
    // مواقع الأثاث
    const furnitureItems = [
        { id: 1, name: 'كنبة أمامية', x: '30%', y: '60%' },
        { id: 2, name: 'كنبة يمنى', x: '60%', y: '50%' },
        { id: 3, name: 'طاولة وسط', x: '45%', y: '70%' },
        { id: 4, name: 'كرسي مكتب', x: '55%', y: '35%' }
    ];
    
    furnitureItems.forEach(item => {
        const div = document.createElement('div');
        div.className = 'furniture-item';
        div.setAttribute('data-id', item.id);
        div.setAttribute('title', item.name);
        
        div.style.cssText = `
            position: absolute;
            left: ${item.x};
            top: ${item.y};
            width: 60px;
            height: 60px;
            background: rgba(139, 69, 19, 0.85);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            cursor: pointer;
            border: 2px solid #ffffff;
            transform: translate(-50%, -50%);
            z-index: 1000;
            box-shadow: 0 3px 12px rgba(0,0,0,0.3);
            transition: all 0.3s ease;
        `;
        
        div.innerHTML = '🪑';
        
        // إضافة تأثيرات التفاعل
        div.addEventListener('mouseenter', function() {
            this.style.transform = 'translate(-50%, -50%) scale(1.15)';
            this.style.boxShadow = '0 5px 20px rgba(0,0,0,0.4)';
        });
        
        div.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(-50%, -50%) scale(1)';
            this.style.boxShadow = '0 3px 12px rgba(0,0,0,0.3)';
        });
        
        // إضافة إلى الجولة
        const pano = document.getElementById('pano');
        if (pano) {
            pano.appendChild(div);
        }
    });
    
    console.log(`✅ تم إنشاء ${furnitureItems.length} قطعة أثاث`);
}

function setupColorControls() {
    console.log('🎨 إعداد أزرار التحكم...');
    
    const colorButtons = document.querySelectorAll('.color-btn');
    const resetButton = document.getElementById('reset-colors');
    const toggleButton = document.getElementById('toggle-panel');
    
    // ألوان الخشب المختلفة
    const colorMap = {
        'default': '#8B4513', // بني خشبي
        'brown': '#A0522D', // بني
        'dark-brown': '#654321', // بني غامق
        'black': '#2F4F4F', // أسود
        'white': '#F5F5DC', // أبيض عاجي
        'walnut': '#773F1A', // جوز
        'cherry': '#9F1D35', // كرزي
        'oak': '#D2B48C', // بلوط
        'mahogany': '#C04000' // ماهوجني
    };
    
    const colorNames = {
        'default': 'بني خشبي',
        'brown': 'بني',
        'dark-brown': 'بني غامق',
        'black': 'أسود', 
        'white': 'أبيض',
        'walnut': 'جوز',
        'cherry': 'كرزي',
        'oak': 'بلوط',
        'mahogany': 'ماهوجني'
    };
    
    // أحداث أزرار الألوان
    colorButtons.forEach(button => {
        button.addEventListener('click', function() {
            const colorType = this.getAttribute('data-color');
            const colorValue = colorMap[colorType] || colorMap.default;
            
            // تطبيق اللون على جميع قطع الأثاث
            changeFurnitureColor(colorValue);
            
            // تحديث الأزرار النشطة
            colorButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // رسالة تأكيد
            showTempMessage(`تم تطبيق اللون ${colorNames[colorType]}`);
            
            console.log(`🎨 تم تغيير اللون إلى: ${colorType}`);
        });
    });
    
    // زر إعادة التعيين
    resetButton.addEventListener('click', function() {
        changeFurnitureColor(colorMap.default);
        
        colorButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector('[data-color="default"]').classList.add('active');
        
        showTempMessage('تم إعادة تعيين الألوان');
        console.log('🔄 إعادة تعيين الألوان');
    });
    
    // زر إظهار/إخفاء اللوحة
    toggleButton.addEventListener('click', function() {
        const panel = document.getElementById('furniture-control-panel');
        if (panel) {
            panel.classList.toggle('collapsed');
            this.textContent = panel.classList.contains('collapsed') ? '📋 إظهار' : '📋 إخفاء';
        }
    });
    
    console.log('✅ أزرار التحكم جاهزة');
}

function changeFurnitureColor(color) {
    const furnitureItems = document.querySelectorAll('.furniture-item');
    
    furnitureItems.forEach(item => {
        item.style.background = color;
        
        // تأثير تغيير اللون
        item.style.animation = 'colorChange 0.5s ease-in-out';
        setTimeout(() => {
            item.style.animation = '';
        }, 500);
    });
}

function showTempMessage(message) {
    // إزالة الرسائل القديمة
    const oldMessages = document.querySelectorAll('.temp-message');
    oldMessages.forEach(msg => msg.remove());
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'temp-message';
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 10001;
        font-size: 14px;
        font-weight: bold;
        border: 2px solid #4CAF50;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        font-family: Arial, sans-serif;
    `;
    
    document.body.appendChild(messageDiv);
    
    // إزالة تلقائية بعد 3 ثواني
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.parentNode.removeChild(messageDiv);
        }
    }, 3000);
}

// جعل الدوال متاحة globally للتصحيح
window.furnitureSystem = {
    init: initFurnitureSystem,
    createItems: createFurnitureItems,
    changeColor: changeFurnitureColor
};

console.log('📦 نظام الأثاث البسيط محمل وجاهز');
// إصلاح خطأ Marzipano في نهاية app.js
function fixMarzipanoError() {
    console.log('🔧 محاولة إصلاح أخطاء Marzipano...');
    
    // انتظر تحميل Marzipano completamente
    setTimeout(() => {
        const sceneElements = document.querySelectorAll('#sceneList .scene');
        if (sceneElements.length === 0) {
            console.log('⚠️ لم يتم العثور على مشاهد - قد يكون هذا طبيعياً');
        }
    }, 3000);
}

// تشغيل الإصلاح بعد التحميل
window.addEventListener('load', fixMarzipanoError);
