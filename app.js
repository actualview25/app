// app.js - النسخة الكاملة المصلحة
console.log('🚀 تحميل نظام الأثاث المتقدم...');

// الأنظمة المساعدة (يجب تحميلها أولاً)
class MemoryManager {
    constructor(maxSize = 50) {
        this.cache = new Map();
        this.maxSize = maxSize;
    }
    
    cacheTexture(textureId, textureData) {
        if (this.cache.size >= this.maxSize) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        this.cache.set(textureId, textureData);
    }
    
    getTexture(textureId) {
        return this.cache.get(textureId);
    }
    
    clearCache() {
        this.cache.clear();
    }
}

class PreferenceManager {
    constructor(storageKey = 'furniture_preferences_v1') {
        this.storageKey = storageKey;
    }
    
    savePreferences(color, selectedFurniture = []) {
        const preferences = {
            color: color,
            selectedFurniture: selectedFurniture,
            timestamp: Date.now()
        };
        localStorage.setItem(this.storageKey, JSON.stringify(preferences));
        return true;
    }
    
    loadPreferences() {
        const saved = localStorage.getItem(this.storageKey);
        return saved ? JSON.parse(saved) : null;
    }
    
    clearPreferences() {
        localStorage.removeItem(this.storageKey);
    }
}

class AnalyticsManager {
    constructor() {
        this.stats = {
            colorChanges: 0,
            furnitureClicks: 0,
            resets: 0,
            panelToggles: 0,
            sessionStart: Date.now(),
            colorUsage: {}
        };
    }
    
    trackColorChange(color) {
        this.stats.colorChanges++;
        this.stats.colorUsage[color] = (this.stats.colorUsage[color] || 0) + 1;
    }
    
    trackFurnitureClick(furnitureId) {
        this.stats.furnitureClicks++;
    }
    
    trackReset() {
        this.stats.resets++;
    }
    
    trackPanelToggle() {
        this.stats.panelToggles++;
    }
}

// النظام الرئيسي
class AdvancedFurnitureSystem {
    constructor() {
        this.memoryManager = new MemoryManager();
        this.preferenceManager = new PreferenceManager();
        this.analyticsManager = new AnalyticsManager();
        this.materials = new Map();
        this.hotspots = new Map();
        this.currentColor = 'default';
        this.isInitialized = false;
    }

    async init() {
        if (this.isInitialized) return;
        
        console.log('🔧 بدء التهيئة...');
        
        try {
            await this.loadSavedPreferences();
            await this.loadMaterials();
            this.initColorSystem();
            this.initEventListeners();
            await this.createFurnitureHotspots();
            
            this.isInitialized = true;
            console.log('✅ النظام جاهز!');
            this.showWelcomeMessage();
            
        } catch (error) {
            console.error('❌ خطأ في التهيئة:', error);
            this.showError('تعذر تهيئة النظام');
        }
    }

    async loadSavedPreferences() {
        const saved = this.preferenceManager.loadPreferences();
        if (saved && saved.color) {
            this.currentColor = saved.color;
        }
    }

    async loadMaterials() {
        return new Promise((resolve) => {
            setTimeout(() => {
                const materialsData = [
                    { id: 'sofa1', name: 'كنبة أمامية', type: 'sofa', position: { x: '35%', y: '65%' }, size: { width: '120px', height: '80px' }},
                    { id: 'sofa2', name: 'كنبة يمنى', type: 'sofa', position: { x: '65%', y: '55%' }, size: { width: '100px', height: '70px' }},
                    { id: 'table1', name: 'طاولة وسط', type: 'table', position: { x: '45%', y: '70%' }, size: { width: '90px', height: '90px' }},
                    { id: 'chair1', name: 'كرسي مكتب', type: 'chair', position: { x: '60%', y: '35%' }, size: { width: '60px', height: '70px' }}
                ];

                materialsData.forEach(material => {
                    this.materials.set(material.id, {
                        ...material,
                        textures: this.generateTextures(material.type)
                    });
                });
                resolve();
            }, 500);
        });
    }

    generateTextures(type) {
        return {
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
    }

    createWoodTexture(color) {
        const darkColor = this.darkenColor(color, 20);
        return `linear-gradient(45deg, ${color} 25%, ${darkColor} 25%, ${darkColor} 50%, ${color} 50%, ${color} 75%, ${darkColor} 75%), linear-gradient(45deg, ${darkColor} 25%, ${color} 25%, ${color} 50%, ${darkColor} 50%, ${darkColor} 75%, ${color} 75%)`;
    }

    createFabricTexture(color) {
        const lightColor1 = this.lightenColor(color, 10);
        const lightColor2 = this.lightenColor(color, 15);
        return `radial-gradient(circle at 25% 25%, ${lightColor1} 10%, transparent 20%), radial-gradient(circle at 75% 75%, ${lightColor2} 10%, transparent 20%), ${color}`;
    }

    darkenColor(hex, percent) {
        let r = parseInt(hex.substring(1, 3), 16);
        let g = parseInt(hex.substring(3, 5), 16);
        let b = parseInt(hex.substring(5, 7), 16);
        r = Math.max(0, Math.min(255, r - Math.round(2.55 * percent)));
        g = Math.max(0, Math.min(255, g - Math.round(2.55 * percent)));
        b = Math.max(0, Math.min(255, b - Math.round(2.55 * percent)));
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    }

    lightenColor(hex, percent) {
        let r = parseInt(hex.substring(1, 3), 16);
        let g = parseInt(hex.substring(3, 5), 16);
        let b = parseInt(hex.substring(5, 7), 16);
        r = Math.max(0, Math.min(255, r + Math.round(2.55 * percent)));
        g = Math.max(0, Math.min(255, g + Math.round(2.55 * percent)));
        b = Math.max(0, Math.min(255, b + Math.round(2.55 * percent)));
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
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
                this.analyticsManager.trackColorChange(color);
            });
        });

        resetButton.addEventListener('click', () => {
            this.resetFurnitureColors();
            this.analyticsManager.trackReset();
        });

        toggleButton.addEventListener('click', () => {
            this.toggleControlPanel();
            this.analyticsManager.trackPanelToggle();
        });

        const currentButton = document.querySelector(`[data-color="${this.currentColor}"]`);
        if (currentButton) currentButton.classList.add('active');
    }

    applyFurnitureColor(color) {
        this.currentColor = color;
        this.preferenceManager.savePreferences(color, Array.from(this.materials.keys()));

        this.materials.forEach((material, id) => {
            const element = this.hotspots.get(id);
            if (element && material.textures[color]) {
                element.style.background = material.textures[color];
                element.style.animation = 'materialChange 0.5s ease-in-out';
                setTimeout(() => element.style.animation = '', 500);
            }
        });

        this.showMessage(`تم تغيير الخامات إلى ${this.getColorName(color)}`);
    }

    getColorName(color) {
        const names = {
            'default': 'بني خشبي', 'brown': 'بني', 'dark-brown': 'بني غامق', 
            'black': 'أسود', 'white': 'أبيض', 'gray': 'رمادي',
            'walnut': 'جوز', 'cherry': 'كرزي', 'oak': 'بلوط', 'mahogany': 'ماهوجني'
        };
        return names[color] || color;
    }

    async createFurnitureHotspots() {
        document.querySelectorAll('.furniture-item').forEach(el => el.remove());

        this.materials.forEach((material, id) => {
            const element = this.createFurnitureElement(material);
            document.getElementById('pano').appendChild(element);
            this.hotspots.set(id, element);
        });
    }

    createFurnitureElement(material) {
        const element = document.createElement('div');
        element.className = 'furniture-item';
        element.id = `furniture-${material.id}`;
        element.dataset.furnitureId = material.id;

        const currentTexture = material.textures[this.currentColor] || material.textures.default;
        
        element.style.cssText = `
            position: absolute; left: ${material.position.x}; top: ${material.position.y};
            width: ${material.size.width}; height: ${material.size.height};
            background: ${currentTexture}; background-size: 20px 20px, 20px 20px;
            border: 3px solid white; border-radius: 10px; transform: translate(-50%, -50%);
            cursor: pointer; z-index: 1000; box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            transition: all 0.3s ease; display: flex; flex-direction: column;
            align-items: center; justify-content: center; font-family: Arial, sans-serif;
        `;

        element.innerHTML = `
            <div class="furniture-icon">${this.getFurnitureIcon(material.type)}</div>
            <div class="furniture-label">${material.name}</div>
        `;

        element.addEventListener('click', () => {
            this.highlightFurniture(material.id);
            this.analyticsManager.trackFurnitureClick(material.id);
        });

        element.addEventListener('mouseenter', () => {
            element.style.transform = 'translate(-50%, -50%) scale(1.1)';
            element.style.zIndex = '1002';
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(-50%, -50%) scale(1)';
            element.style.zIndex = '1000';
        });

        return element;
    }

    getFurnitureIcon(type) {
        return { 'sofa': '🛋️', 'table': '🗄️', 'chair': '💺' }[type] || '🪑';
    }

    highlightFurniture(furnitureId) {
        const element = this.hotspots.get(furnitureId);
        if (element) {
            element.style.animation = 'highlightPulse 1s ease-in-out';
            element.style.boxShadow = '0 0 30px gold';
            setTimeout(() => element.style.boxShadow = '0 5px 20px rgba(0,0,0,0.3)', 2000);
            this.showMessage(`تم تحديد ${this.materials.get(furnitureId).name}`);
        }
    }

    resetFurnitureColors() {
        this.currentColor = 'default';
        this.materials.forEach((material, id) => {
            const element = this.hotspots.get(id);
            if (element) element.style.background = material.textures.default;
        });
        document.querySelectorAll('.color-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector('[data-color="default"]').classList.add('active');
        this.showMessage('تم إعادة التعيين');
    }

    toggleControlPanel() {
        const panel = document.getElementById('furniture-control-panel');
        const toggleButton = document.getElementById('toggle-panel');
        if (panel && toggleButton) {
            panel.classList.toggle('collapsed');
            toggleButton.textContent = panel.classList.contains('collapsed') ? '📋 إظهار' : '📋 إخفاء';
        }
    }

    initEventListeners() {
        window.addEventListener('resize', () => this.updateHotspotsPosition());
        const systemInfoBtn = document.getElementById('system-info');
        if (systemInfoBtn) systemInfoBtn.addEventListener('click', () => this.showSystemInfo());
    }

    updateHotspotsPosition() {
        this.hotspots.forEach((element, id) => {
            const material = this.materials.get(id);
            if (material) {
                element.style.left = material.position.x;
                element.style.top = material.position.y;
            }
        });
    }

    showSystemInfo() {
        const duration = Math.round((Date.now() - this.analyticsManager.stats.sessionStart) / 1000);
        this.showMessage(`
🧠 حالة النظام:
⏱️ المدة: ${duration} ثانية
🎨 تغييرات الألوان: ${this.analyticsManager.stats.colorChanges}
🪑 نقرات الأثاث: ${this.analyticsManager.stats.furnitureClicks}
        `);
    }

    showWelcomeMessage() {
        this.showMessage('🎉 نظام الأثاث الذكي يعمل بنجاح!');
    }

    showMessage(message, duration = 3000) {
        const oldMessage = document.getElementById('temp-message');
        if (oldMessage) oldMessage.remove();
        
        const messageDiv = document.createElement('div');
        messageDiv.id = 'temp-message';
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
            background: rgba(0,0,0,0.95); color: white; padding: 15px 25px;
            border-radius: 10px; z-index: 10001; font-size: 16px; font-weight: bold;
            border: 2px solid #4ECDC4; box-shadow: 0 4px 20px rgba(0,0,0,0.5);
            text-align: center; white-space: pre-line;
        `;
        
        document.body.appendChild(messageDiv);
        setTimeout(() => messageDiv.remove(), duration);
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
            background: rgba(255,0,0,0.9); color: white; padding: 20px 30px;
            border-radius: 10px; z-index: 10000; text-align: center;
            font-size: 16px; font-weight: bold; box-shadow: 0 5px 25px rgba(0,0,0,0.5);
        `;
        errorDiv.innerHTML = `❌ ${message}`;
        document.body.appendChild(errorDiv);
        setTimeout(() => errorDiv.remove(), 5000);
    }

    destroy() {
        this.hotspots.forEach(element => element.remove());
        this.hotspots.clear();
        this.materials.clear();
        this.isInitialized = false;
    }
}

// البدء التلقائي
let furnitureSystem;
window.addEventListener('load', () => {
    furnitureSystem = new AdvancedFurnitureSystem();
    furnitureSystem.init();
});

window.AdvancedFurnitureSystem = AdvancedFurnitureSystem;
