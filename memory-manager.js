// memory-manager.js
class MemoryManager {
    constructor(maxSize = 50) {
        this.cache = new Map();
        this.maxSize = maxSize;
        console.log('🧠 نظام إدارة الذاكرة مفعل - السعة:', maxSize);
    }
    
    cacheTexture(textureId, textureData) {
        if (this.cache.size >= this.maxSize) {
            const firstKey = this.cache.keys().next().value;
            console.log('🗑️ تنظيف ذاكرة التخزين المؤقت:', firstKey);
            this.cache.delete(firstKey);
        }
        this.cache.set(textureId, textureData);
        console.log('💾 حفظ في الذاكرة:', textureId);
    }
    
    getTexture(textureId) {
        const texture = this.cache.get(textureId);
        if (texture) {
            console.log('📂 جلب من الذاكرة:', textureId);
        }
        return texture;
    }
    
    clearCache() {
        const size = this.cache.size;
        this.cache.clear();
        console.log('🧹 تنظيف الذاكرة - العناصر المحذوفة:', size);
    }
    
    getCacheStats() {
        return {
            size: this.cache.size,
            maxSize: this.maxSize,
            usage: `${this.cache.size}/${this.maxSize}`
        };
    }
}

// جعل الفصل متاحاً globally
window.MemoryManager = MemoryManager;
