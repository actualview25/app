// app.js - النظام الرئيسي المحدث
class AdvancedFurnitureSystem {
    constructor() {
        // تهيئة الأنظمة المساعدة
        this.memoryManager = new MemoryManager(100); // سعة 100 عنصر
        this.preferenceManager = new PreferenceManager();
        this.analyticsManager = new AnalyticsManager();
        
        // البيانات الرئيسية
        this.materials = new Map();
        this.hotspots = new Map();
        this.currentColor = 'default';
        this.isInitialized = false;
        
        console.log('🚀 نظام الأثاث المتقدم - جاهز للتهيئة');
    }

    async init() {
        if (this.isInitialized) {
            console.log('⚠️ النظام متهيئ مسبقاً');
            return;
        }
        
        console.log('🔧 بدء التهيئة المتكاملة...');
        
        try {
            // تحميل التفضيلات المحفوظة أولاً
            await this.loadSavedPreferences();
            
            // ثم تحميل الخامات
            await this.loadMaterials();
            
            // تهيئة الأنظمة
            this.initColorSystem();
            this.initEventListeners();
            
            // إنشاء العناصر
            await this.createFurnitureHotspots();
            
            this.isInitialized = true;
            console.log('✅ النظام متهيئ وجاهز للعمل!');
            
            this.showWelcomeMessage();
            
        } catch (error) {
            console.error('❌ خطأ في التهيئة:', error);
            this.showError('تعذر تهيئة نظام الأثاث');
        }
    }

    async loadSavedPreferences() {
        const saved = this.preferenceManager.loadPreferences();
        if (saved && saved.color) {
            this.currentColor = saved.color;
            console.log('📁 تم تحميل التفضيلات المحفوظة:', saved.color);
        } else {
            console.log('📁 لا توجد تفضيلات محفوظة - استخدام الإعدادات الافتراضية');
        }
    }

    async loadMaterials() {
        console.log('📦 جاري تحميل الخامات...');
        
        return new Promise((resolve) => {
            setTimeout(() => {
                // تعريف الخامات مع استخدام مدير الذاكرة
                const materialsData = [
                    {
                        id: 'sofa1', name: 'كنبة أمامية', type: 'sofa',
                        position: { x: '35%', y: '65%' }, size: { width: '120px', height: '80px' }
                    },
                    {
                        id: 'sofa2', name: 'كنبة يمنى', type: 'sofa', 
                        position: { x: '65%', y: '55%' }, size: { width: '100px', height: '70px' }
                    },
                    {
                        id: 'table1', name: 'طاولة وسط', type: 'table',
                        position: { x: '45%', y: '70%' }, size: { width: '90px', height: '90px' }
                    },
                    {
                        id: 'chair1', name: 'كرسي مكتب', type: 'chair',
                        position: { x: '60%', y: '35%' }, size: { width: '60px', height: '70px' }
                    }
                ];

                materialsData.forEach(material => {
                    const textures = this.generateTextures(material.type);
                    
                    // حفظ الخامات في الذاكرة
                    this.memoryManager.cacheTexture(material.id, textures);
                    
                    this.materials.set(material.id, {
                        ...material,
                        textures: textures
                    });
                });

                console.log('✅ تم تحميل جميع الخامات:', this.materials.size);
                resolve();
            }, 800);
        });
    }

    generateTextures(type) {
        // استخدام الذاكرة المؤقتة إذا كانت الخامة موجودة
        const cacheKey = `${type}_textures`;
        const cached = this.memoryManager.getTexture(cacheKey);
        if (cached) return cached;

        // إنشاء خامات جديدة
        const textures = {
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

        // حفظ في الذاكرة للمستقبل
        this.memoryManager.cacheTexture(cacheKey, textures);
        return textures;
    }

    createWoodTexture(color) {
        // ... (نفس الكود السابق)
    }

    createFabricTexture(color) {
        // ... (نفس الكود السابق)
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
                
                // تتبع الإحصائيات
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

        // تعيين اللون الحالي النشط
        const currentButton = document.querySelector(`[data-color="${this.currentColor}"]`);
        if (currentButton) {
            currentButton.classList.add('active');
        }
    }

    applyFurnitureColor(color) {
        console.log('🎨 تطبيق اللون على الخامات:', color);
        this.currentColor = color;

        // حفظ التفضيل
        this.preferenceManager.savePreferences(
            color, 
            Array.from(this.materials.keys()),
            { lastUpdate: new Date().toISOString() }
        );

        // تطبيق اللون على جميع العناصر
        this.materials.forEach((material, id) => {
            const element = this.hotspots.get(id);
            if (element && material.textures[color]) {
                element.style.background = material.textures[color];
                
                element.style.animation = 'materialChange 0.5s ease-in-out';
                setTimeout(() => {
                    element.style.animation = '';
                }, 500);
            }
        });

        this.showMessage(`تم تغيير خامات الأثاث إلى اللون ${this.getColorName(color)}`);
    }

    // ... باقي الدوال بنفس الطريقة مع إضافة التتبع الإحصائي

    showWelcomeMessage() {
        const storageInfo = this.preferenceManager.getStorageInfo();
        const welcomeMsg = storageInfo.hasData ? 
            `🎉 مرحباً بعودتك! 
             آخر تفضيل: ${storageInfo.color} - ${storageInfo.lastSave}` :
            `🎉 مرحباً في نظام الأثاث الذكي!`;
            
        this.showMessage(welcomeMsg, 4000);
    }

    showSystemInfo() {
        const memoryStats = this.memoryManager.getCacheStats();
        const analytics = this.analyticsManager.exportStats();
        const preferences = this.preferenceManager.getStorageInfo();
        
        const info = `
🧠 حالة النظام:
💾 الذاكرة: ${memoryStats.usage}
📊 الجلسة: ${Math.round(analytics.sessionDuration/1000)} ثانية
🎨 تغييرات الألوان: ${analytics.colorChanges}
💾 التفضيلات: ${preferences.hasData ? 'محفوظة' : 'غير محفوظة'}
        `.trim();
        
        this.showMessage(info, 5000);
    }

    destroy() {
        // تنظيف جميع الموارد
        this.hotspots.forEach(element => element.remove());
        this.hotspots.clear();
        this.materials.clear();
        this.memoryManager.clearCache();
        this.isInitialized = false;
        
        console.log('🧹 تم تنظيف نظام الأثاث بالكامل');
    }
}

window.AdvancedFurnitureSystem = AdvancedFurnitureSystem;
