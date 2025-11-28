// preference-manager.js
class PreferenceManager {
    constructor(storageKey = 'furniture_preferences_v1') {
        this.storageKey = storageKey;
        console.log('💾 نظام التفضيلات مفعل - المفتاح:', storageKey);
    }
    
    savePreferences(color, selectedFurniture = [], additionalData = {}) {
        const preferences = {
            color: color,
            selectedFurniture: selectedFurniture,
            additionalData: additionalData,
            timestamp: Date.now(),
            version: '1.0'
        };
        
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(preferences));
            console.log('✅ حفظ التفضيلات:', { color, furnitureCount: selectedFurniture.length });
            return true;
        } catch (error) {
            console.error('❌ خطأ في حفظ التفضيلات:', error);
            return false;
        }
    }
    
    loadPreferences() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            if (saved) {
                const preferences = JSON.parse(saved);
                console.log('📂 تحميل التفضيلات المحفوظة:', preferences);
                return preferences;
            }
        } catch (error) {
            console.error('❌ خطأ في تحميل التفضيلات:', error);
            this.clearPreferences(); // تنظيف البيانات التالفة
        }
        return null;
    }
    
    clearPreferences() {
        localStorage.removeItem(this.storageKey);
        console.log('🧹 مسح جميع التفضيلات');
    }
    
    getStorageInfo() {
        const saved = this.loadPreferences();
        return saved ? {
            hasData: true,
            lastSave: new Date(saved.timestamp).toLocaleString(),
            color: saved.color,
            furnitureCount: saved.selectedFurniture.length
        } : {
            hasData: false,
            lastSave: null
        };
    }
}

window.PreferenceManager = PreferenceManager;
