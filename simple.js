// نظام بسيط 100% يعمل
console.log('🌟 النظام البسيط يعمل!');

function startSimpleSystem() {
    console.log('🎯 بدء النظام البسيط...');
    
    // أنشئ 4 قطع أثاث بسيطة
    const positions = [
        { x: '30%', y: '60%', name: 'كنبة' },
        { x: '60%', y: '50%', name: 'كنبة' },
        { x: '45%', y: '70%', name: 'طاولة' },
        { x: '55%', y: '35%', name: 'كرسي' }
    ];
    
    positions.forEach((pos, index) => {
        const div = document.createElement('div');
        div.innerHTML = '🪑';
        div.title = pos.name;
        div.style.cssText = `
            position: absolute;
            left: ${pos.x};
            top: ${pos.y};
            width: 60px;
            height: 60px;
            background: #8B4513;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            cursor: pointer;
            border: 2px solid white;
            transform: translate(-50%, -50%);
            z-index: 1000;
        `;
        document.getElementById('pano').appendChild(div);
    });
    
    console.log('✅ تم إنشاء الأثاث!');
}

// ابدأ بعد 3 ثواني
setTimeout(startSimpleSystem, 3000);
