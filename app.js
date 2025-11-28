// نظام الأثاث - ملف JavaScript منفصل// نظام الأثاث - ملف JavaScript محسن مع الخاماتconsole.log('🚀 بدء تحميل نظام الأثاث مع الخامات...');

class FurnitureSystem {
    constructor() {
        this.materials = new Map();
        this.hotspots = new Map();
        this.currentColor = 'default';
        this.init();
    }

    init() {
        console.log('🔧 تهيئة نظام الخامات...');
        this.loadMaterials();
        this.initColorSystem();
        setTimeout(() => this.createFurnitureHotspots(), 2000);
    }

    loadMaterials() {
        // محاكاة خامات حقيقية مع صور
        this.materials.set('sofa1', {
            id: 'sofa1',
            name: 'كنبة أمامية',
            type: 'sofa',
            textures: this.generateTextures('sofa'),
            position: { x: '35%', y: '65%' },
            size: { width: '120px', height: '80px' }
        });

        this.materials.set('sofa2', {
            id: 'sofa2', 
            name: 'كنبة يمنى',
            type: 'sofa',
            textures: this.generateTextures('sofa'),
            position: { x: '65%', y: '55%' },
            size: { width: '100px', height: '70px' }
        });

        this.materials.set('table1', {
            id: 'table1',
            name: 'طاولة وسط',
            type: 'table',
            textures: this.generateTextures('table'),
            position: { x: '45%', y: '70%' },
            size: { width: '90px', height: '90px' }
        });

        this.materials.set('chair1', {
            id: 'chair1',
            name: 'كرسي مكتب',
            type: 'chair',
            textures: this.generateTextures('chair'),
            position: { x: '60%', y: '35%' },
            size: { width: '60px', height: '70px' }
        });

        console.log('✅ تم تحميل خامات الأثاث:', this.materials.size);
    }

    generateTextures(type) {
        // إنشاء خامات مرئية بدل الألوان المسطحة
        const baseTextures = {
            'default': this.createWoodTexture('#8B4513'),
            'brown': this.createWoodTexture('#A0522D'),
            'dark-brown': this.createWoodTexture('#654321'),
            'black': this.createFabricTexture('#2F4F4F'),
            'white': this.createFabricTexture('#F5F5DC'),
            'walnut': this.createWoodTexture('#773F1A'),
            'cherry': this.createWoodTexture('#9F1D35'),
            'oak': this.createWoodTexture('#D2B48C'),
            'mahogany': this.createWoodTexture('#C04000')
        };
        return baseTextures;
    }

    createWoodTexture(color) {
        // إنشاء نسيج خشب مرئي
        return `
            linear-gradient(45deg, 
                ${color} 25%, 
                ${this.darkenColor(color, 20)} 25%, 
                ${this.darkenColor(color, 20)} 50%, 
                ${color} 50%, 
                ${color} 75%, 
                ${this.darkenColor(color, 20)} 75%
            ),
            linear-gradient(45deg, 
                ${this.darkenColor(color, 20)} 25%, 
                ${color} 25%, 
                ${color} 50%, 
                ${this.darkenColor(color, 20)} 50%, 
                ${this.darkenColor(color, 20)} 75%, 
                ${color} 75%
            )
        `;
    }

    createFabricTexture(color) {
        // إنشاء نسيج قماش مرئي
        return `
            radial-gradient(circle at 25% 25%, 
                ${this.lightenColor(color, 10)} 10%, 
                transparent 20%),
            radial-gradient(circle at 75% 75%, 
                ${this.lightenColor(color, 15)} 10%, 
                transparent 20%),
            ${color}
        `;
    }

    darkenColor(color, percent) {
        // تحويل الألوان إلى قيم RGB لتغميقها
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) - amt;
        const G = (num >> 8 & 0x00FF) - amt;
        const B = (num & 0x0000FF) - amt;
        return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    }

    lightenColor(color, percent) {
        // تحويل الألوان إلى قيم RGB لتفتيحها
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return "#" + (0x1000000 + (R > 255 ? 255 : R) * 0x10000 +
            (G > 255 ? 255 : G) * 0x100 +
            (B > 255 ? 255 : B)).toString(16).slice(1);
    }

    createFurnitureHotspots() {
        console.log('🪑 إنشاء أثاث مع خامات حقيقية...');

        // تنظيف القديم
        document.querySelectorAll('.furniture-item').forEach(el => el.remove());

        this.materials.forEach((material, id) => {
            const element = this.createFurnitureElement(material);
            document.getElementById('pano').appendChild(element);
            this.hotspots.set(id, element);
        });

        console.log('✅ تم إنشاء الأثاث مع الخامات!');
    }

    createFurnitureElement(material) {
        const element = document.createElement('div');
        element.className = 'furniture-item';
        element.id = `furniture-${material.id}`;
        element.dataset.furnitureId = material.id;
        element.dataset.furnitureType = material.type;

        // تطبيق الخامة الحالية
        const currentTexture = material.textures[this.currentColor] || material.textures.default;
        
        element.style.cssText = `
            position: absolute;
            left: ${material.position.x};
            top: ${material.position.y};
            width: ${material.size.width};
            height: ${material.size.height};
            background: ${currentTexture};
            background-size: 20px 20px, 20px 20px;
            border: 3px solid white;
            border-radius: 10px;
            transform: translate(-50%, -50%);
            cursor: pointer;
            z-index: 1000;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            transition: all 0.3s ease;
        `;

        // إضافة أيقونة ونص
        element.innerHTML = `
            <div class="furniture-icon">${this.getFurnitureIcon(material.type)}</div>
            <div class="furniture-label">${material.name}</div>
        `;

        // أحداث التفاعل
        this.addInteractions(element, material);

        return element;
    }

    addInteractions(element, material) {
        element.addEventListener('click', () => {
            this.highlightFurniture(material.id);
        });

        element.addEventListener('mouseenter', () => {
            element.style.transform = 'translate(-50%, -50%) scale(1.1)';
            element.style.zIndex = '1002';
            element.style.boxShadow = '0 8px 30px rgba(0,0,0,0.4)';
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(-50%, -50%) scale(1)';
            element.style.zIndex = '1000';
            element.style.boxShadow = '0 5px 20px rgba(0,0,0,0.3)';
        });
    }

    getFurnitureIcon(type) {
        const icons = {
            'sofa': '🛋️',
            'table': '🗄️',
            'chair': '💺'
        };
        return icons[type] || '🪑';
    }

    initColorSystem() {
        const colorButtons = document.querySelectorAll('.color-btn');
        const resetButton = document.getElementById('reset-colors');
        const toggleButton = document.getElementById('toggle-panel');

        colorButtons.forEach(button => {
            button.addEventListener('click', () => {
                const color = button.getAttribute('data-color');
                this.applyFurnitureColor(color);
                
                colorButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });

        resetButton.addEventListener('click', () => {
            this.resetFurnitureColors();
            colorButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelector('[data-color="default"]').classList.add('active');
        });

        toggleButton.addEventListener('click', () => {
            const panel = document.getElementById('furniture-control-panel');
            panel.classList.toggle('collapsed');
            toggleButton.textContent = panel.classList.contains('collapsed') ? '📋 إظهار' : '📋 إخفاء';
        });
    }

    applyFurnitureColor(color) {
        console.log('🎨 تطبيق اللون على الخامات:', color);
        this.currentColor = color;

        this.materials.forEach((material, id) => {
            const element = this.hotspots.get(id);
            if (element && material.textures[color]) {
                // تطبيق الخامة الجديدة
                element.style.background = material.textures[color];
                
                // تأثير التغيير
                element.style.animation = 'materialChange 0.5s ease-in-out';
                setTimeout(() => {
                    element.style.animation = '';
                }, 500);
            }
        });

        this.showMessage(`تم تغيير خامات الأثاث إلى اللون ${this.getColorName(color)}`);
    }

    resetFurnitureColors() {
        this.currentColor = 'default';
        this.materials.forEach((material, id) => {
            const element = this.hotspots.get(id);
            if (element && material.textures.default) {
                element.style.background = material.textures.default;
            }
        });
        this.showMessage('تم إعادة تعيين خامات الأثاث');
    }

    highlightFurniture(furnitureId) {
        const element = this.hotspots.get(furnitureId);
        if (element) {
            element.style.animation = 'highlightPulse 1s ease-in-out';
            element.style.boxShadow = '0 0 30px gold, 0 5px 20px rgba(0,0,0,0.4)';
            
            setTimeout(() => {
                element.style.boxShadow = '0 5px 20px rgba(0,0,0,0.3)';
            }, 2000);
            
            this.showMessage(`تم تحديد ${this.materials.get(furnitureId).name}`);
        }
    }

    getColorName(color) {
        const names = {
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
        return names[color] || color;
    }

    showMessage(message) {
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
        `;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 3000);
    }
}

// بدء النظام
let furnitureSystem;

window.addEventListener('load', () => {
    console.log('📄 بدء نظام الأثاث مع الخامات...');
    furnitureSystem = new FurnitureSystem();
});

// جعل النظام متاحاً globally
window.FurnitureSystem = FurnitureSystem;
