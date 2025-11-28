// نظام الأثاث البسيط - يعمل بدون أخطاء
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 بدء نظام الأثاث البسيط');
    
    // إنشاء الأثاث
    setTimeout(createFurniture, 1000);
    
    // إعداد أزرار الألوان
    setupColorButtons();
});

function createFurniture() {
    const furniture = [
        { name: 'كنبة أمامية', x: '40%', y: '60%' },
        { name: 'كنبة يمنى', x: '65%', y: '50%' }, 
        { name: 'طاولة وسط', x: '45%', y: '70%' },
        { name: 'كرسي مكتب', x: '60%', y: '35%' }
    ];

    furniture.forEach(item => {
        const div = document.createElement('div');
        div.className = 'furniture-item';
        div.innerHTML = '🪑';
        div.title = item.name;
        div.style.cssText = `
            position: absolute; left: ${item.x}; top: ${item.y};
            width: 70px; height: 70px; background: rgba(139,69,19,0.9);
            border-radius: 50%; display: flex; align-items: center;
            justify-content: center; font-size: 24px; cursor: pointer;
            border: 3px solid white; transform: translate(-50%, -50%);
            z-index: 1000; box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            transition: all 0.3s ease;
        `;
        document.getElementById('pano').appendChild(div);
    });
    
    showMessage('✅ النظام جاهز! جرب تغيير الألوان');
}

function setupColorButtons() {
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const color = this.getAttribute('data-color');
            changeAllColors(color);
            
            document.querySelectorAll('.color-btn').forEach(b => {
                b.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    document.getElementById('reset-colors').addEventListener('click', function() {
        changeAllColors('default');
        document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
        document.querySelector('[data-color="default"]').classList.add('active');
    });

    document.getElementById('toggle-panel').addEventListener('click', function() {
        const panel = document.getElementById('furniture-control-panel');
        panel.classList.toggle('collapsed');
        this.textContent = panel.classList.contains('collapsed') ? '📋 إظهار' : '📋 إخفاء';
    });
}

function changeAllColors(color) {
    const colors = {
        'default': 'rgba(139, 69, 19, 0.9)',
        'brown': 'rgba(160, 82, 45, 0.9)', 
        'dark-brown': 'rgba(101, 67, 33, 0.9)',
        'black': 'rgba(47, 79, 79, 0.9)',
        'white': 'rgba(245, 245, 220, 0.9)',
        'walnut': 'rgba(119, 63, 26, 0.9)',
        'cherry': 'rgba(159, 29, 53, 0.9)',
        'oak': 'rgba(210, 180, 140, 0.9)',
        'mahogany': 'rgba(192, 64, 0, 0.9)'
    };
    
    const colorNames = {
        'default': 'بني خشبي', 'brown': 'بني', 'dark-brown': 'بني غامق',
        'black': 'أسود', 'white': 'أبيض', 'walnut': 'جوز',
        'cherry': 'كرزي', 'oak': 'بلوط', 'mahogany': 'ماهوجني'
    };

    document.querySelectorAll('.furniture-item').forEach(item => {
        item.style.background = colors[color] || colors['default'];
    });
    
    showMessage(`تم التغيير إلى ${colorNames[color]}`);
}

function showMessage(text) {
    const old = document.getElementById('temp-msg');
    if (old) old.remove();
    
    const msg = document.createElement('div');
    msg.id = 'temp-msg';
    msg.textContent = text;
    msg.style.cssText = `
        position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
        background: rgba(0,0,0,0.9); color: white; padding: 15px 25px;
        border-radius: 10px; z-index: 10001; font-size: 16px; font-weight: bold;
        border: 2px solid #4ECDC4;
    `;
    
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 3000);
}
