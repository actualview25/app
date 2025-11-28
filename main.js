// main.js
class FurnitureApp {
    constructor() {
        this.system = null;
        this.isRunning = false;
    }

    async start() {
        if (this.isRunning) {
            console.log('⚠️ التطبيق يعمل مسبقاً');
            return;
        }
        
        console.log('🎬 بدء تطبيق الأثاث المتكامل...');
        
        try {
            this.system = new AdvancedFurnitureSystem();
            await this.system.init();
            
            this.isRunning = true;
            this.setupGlobalControls();
            
            console.log('🎉 تطبيق الأثاث يعمل بنجاح!');
            
        } catch (error) {
            console.error('❌ فشل بدء التطبيق:', error);
            this.showError('تعذر بدء نظام الأثاث');
        }
    }

    setupGlobalControls() {
        this.addStatsButton();
        this.addSystemInfoButton();
        this.addClearDataButton();
    }

    addStatsButton() {
        const statsBtn = document.createElement('button');
        statsBtn.id = 'global-stats-btn';
        statsBtn.textContent = '📊 الإحصائيات';
        statsBtn.className = 'global-control-btn';
        
        statsBtn.addEventListener('click', () => {
            if (this.system) {
                const stats = this.system.analyticsManager.showStats();
                alert(stats);
            }
        });
        
        document.body.appendChild(statsBtn);
    }

    addSystemInfoButton() {
        const infoBtn = document.createElement('button');
        infoBtn.id = 'system-info-btn';
        infoBtn.textContent = 'ℹ️ النظام';
        infoBtn.className = 'global-control-btn';
        
        infoBtn.addEventListener('click', () => {
            if (this.system) {
                this.system.showSystemInfo();
            }
        });
        
        document.body.appendChild(infoBtn);
    }

    addClearDataButton() {
        const clearBtn = document.createElement('button');
        clearBtn.id = 'clear-data-btn';
        clearBtn.textContent = '🧹 تنظيف';
        clearBtn.className = 'global-control-btn';
        
        clearBtn.addEventListener('click', () => {
            if (confirm('هل تريد مسح جميع البيانات المحفوظة؟')) {
                if (this.system) {
                    this.system.preferenceManager.clearPreferences();
                    this.system.analyticsManager.resetStats();
                    alert('✅ تم مسح جميع البيانات');
                }
            }
        });
        
        document.body.appendChild(clearBtn);
    }

    stop() {
        if (this.system) {
            this.system.destroy();
            this.system = null;
        }
        this.isRunning = false;
        
        // إزالة أزرار التحكم
        document.querySelectorAll('.global-control-btn').forEach(btn => btn.remove());
        
        console.log('🛑 تطبيق الأثاث متوقف');
    }

    showError(message) {
        // ... كود عرض الأخطاء
    }
}

// البدء التلقائي للتطبيق
const furnitureApp = new FurnitureApp();

window.addEventListener('load', async () => {
    console.log('🚀 بدء تشغيل التطبيق المتكامل...');
    await furnitureApp.start();
});

// جعل التطبيق متاحاً globally للتحكم
window.FurnitureApp = furnitureApp;
