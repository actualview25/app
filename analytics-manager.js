// analytics-manager.js
class AnalyticsManager {
    constructor() {
        this.stats = {
            colorChanges: 0,
            furnitureClicks: 0,
            resets: 0,
            panelToggles: 0,
            sessionStart: Date.now(),
            colorUsage: {} // تتبع استخدام كل لون
        };
        console.log('📊 نظام الإحصائيات مفعل');
    }
    
    trackColorChange(color) {
        this.stats.colorChanges++;
        
        // تتبع استخدام الألوان
        this.stats.colorUsage[color] = (this.stats.colorUsage[color] || 0) + 1;
        
        console.log(`🎨 إحصائية: تغيير لون ${color} - الإجمالي: ${this.stats.colorChanges}`);
    }
    
    trackFurnitureClick(furnitureId) {
        this.stats.furnitureClicks++;
        console.log(`🪑 إحصائية: نقرة على ${furnitureId} - الإجمالي: ${this.stats.furnitureClicks}`);
    }
    
    trackReset() {
        this.stats.resets++;
        console.log(`🔄 إحصائية: إعادة تعيين - الإجمالي: ${this.stats.resets}`);
    }
    
    trackPanelToggle() {
        this.stats.panelToggles++;
        console.log(`📋 إحصائية: تبديل اللوحة - الإجمالي: ${this.stats.panelToggles}`);
    }
    
    getSessionDuration() {
        return Date.now() - this.stats.sessionStart;
    }
    
    getMostUsedColor() {
        let maxColor = 'default';
        let maxCount = 0;
        
        for (const [color, count] of Object.entries(this.stats.colorUsage)) {
            if (count > maxCount) {
                maxColor = color;
                maxCount = count;
            }
        }
        
        return { color: maxColor, count: maxCount };
    }
    
    showStats() {
        const duration = Math.round(this.getSessionDuration() / 1000);
        const mostUsed = this.getMostUsedColor();
        
        return `
📊 إحصائيات الجلسة:
⏱️ المدة: ${duration} ثانية
🎨 تغييرات الألوان: ${this.stats.colorChanges}
🪑 نقرات الأثاث: ${this.stats.furnitureClicks}
🔄 عمليات إعادة التعيين: ${this.stats.resets}
📋 تبديل اللوحة: ${this.stats.panelToggles}
🏆 اللون الأكثر استخداماً: ${mostUsed.color} (${mostUsed.count} مرات)
        `.trim();
    }
    
    exportStats() {
        return {
            ...this.stats,
            sessionDuration: this.getSessionDuration(),
            mostUsedColor: this.getMostUsedColor()
        };
    }
    
    resetStats() {
        this.stats = {
            colorChanges: 0,
            furnitureClicks: 0,
            resets: 0,
            panelToggles: 0,
            sessionStart: Date.now(),
            colorUsage: {}
        };
        console.log('🔄 إعادة تعيين الإحصائيات');
    }
}

window.AnalyticsManager = AnalyticsManager;
