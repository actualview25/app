console.log('🎨 تحميل نظام الأثاث...');

function initFurnitureSystem() {
    console.log('🔧 بدء نظام الأثاث...');
    
    // التأكد من وجود العناصر
    const panel = document.getElementById('furniture-control-panel');
    if (!panel) {
        console.error('❌ لوحة التحكم غير موجودة');
        return;
    }

    // نظام الألوان
    const colorButtons = document.querySelectorAll('.color-btn');
    const resetButton = document.getElementById('reset-colors');
    const toggleButton = document.getElementById('toggle-panel');

    console.log('🎯 عدد أزرار الألوان:', colorButtons.length);

    // أحداث الألوان
    colorButtons.forEach(button => {
        button.addEventListener('click', function() {
            const color = this.getAttribute('data-color');
            console.log('🎨 تطبيق اللون:', color);
            
            // إزالة النشط من جميع الأزرار
            colorButtons.forEach(btn => btn.classList.remove('active'));
            // إضافة النشط للزر المختار
            this.classList.add('active');
            
            showMessage('تم تغيير اللون: ' + color);
        });
    });

    // زر الإعادة
    resetButton.addEventListener('click', function() {
        console.log('🔄 إعادة التعيين');
        colorButtons.forEach(btn => btn.classList.remove('active'));
        colorButtons[0].classList.add('active');
        showMessage('تم إعادة التعيين');
    });

    // زر الإظهار/الإخفاء
    toggleButton.addEventListener('click', function() {
        panel.classList.toggle('collapsed');
        this.textContent = panel.classList.contains('collapsed') ? '📋 إظهار' : '📋 إخفاء';
    });

    // إنشاء قطع الأثاث
    createFurnitureItems();
    
    console.log('✅ نظام الأثاث جاهز');
}

function createFurnitureItems() {
    console.log('🪑 إنشاء قطع الأثاث...');
    
    // مواقع افتراضية للقطع
    const items = [
        { name: 'كنبة', top: '30%', left: '40%' },
        { name: 'طاولة', top: '60%', left: '50%' },
        { name: 'كرسي', top: '70%', left: '30%' }
    ];

    items.forEach((item, index) => {
        const element = document.createElement('div');
        element.className = 'furniture-item';
        element.innerHTML = '🪑';
        element.title = item.name;
        element.style.cssText = `
            position: absolute;
            top: ${item.top};
            left: ${item.left};
            width: 50px;
            height: 50px;
            background: rgba(76, 175, 80, 0.8);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            cursor: pointer;
            border: 2px solid white;
            z-index: 1000;
            transform: translate(-50%, -50%);
        `;

        document.getElementById('pano').appendChild(element);
        console.log('✅ تم إنشاء: ' + item.name);
    });
}

function showMessage(text) {
    // إزالة أي رسالة قديمة
    const oldMsg = document.getElementById('system-message');
    if (oldMsg) oldMsg.remove();

    // إنشاء رسالة جديدة
    const msg = document.createElement('div');
    msg.id = 'system-message';
    msg.textContent = text;
    msg.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0,0,0,0.9);
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        z-index: 10000;
    `;

    document.body.appendChild(msg);

    // إزالة الرسالة بعد 3 ثوان
    setTimeout(() => {
        if (msg.parentNode) msg.parentNode.removeChild(msg);
    }, 3000);
}

// بدء النظام عندما تكون الصفحة جاهزة
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFurnitureSystem);
} else {
    initFurnitureSystem();
}
