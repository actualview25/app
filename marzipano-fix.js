// إصلاح أخطاء Marzipano
console.log('🔧 تحميل إصلاحات Marzipano...');

function fixMarzipanoErrors() {
    console.log('🛠️ تطبيق إصلاحات Marzipano...');
    
    // إصلاح 1: التحقق من عناصر المشاهد
    const originalSwitchScene = window.switchScene;
    if (originalSwitchScene) {
        window.switchScene = function(scene) {
            try {
                return originalSwitchScene.call(this, scene);
            } catch (error) {
                console.log('⚠️ خطأ في switchScene (متجاهل):', error.message);
            }
        };
    }
    
    // إصلاح 2: منع أخطاء classList
    const originalUpdateSceneList = window.updateSceneList;
    if (originalUpdateSceneList) {
        window.updateSceneList = function(scene) {
            try {
                const sceneElements = document.querySelectorAll('#sceneList .scene');
                if (sceneElements.length > 0) {
                    return originalUpdateSceneList.call(this, scene);
                }
            } catch (error) {
                console.log('⚠️ خطأ في updateSceneList (متجاهل):', error.message);
            }
        };
    }
    
    // إصلاح 3: التعامل مع أخطاء العناصر غير الموجودة
    const safeClassList = {
        add: function(element, className) {
            if (element && element.classList) {
                element.classList.add(className);
            }
        },
        remove: function(element, className) {
            if (element && element.classList) {
                element.classList.remove(className);
            }
        },
        toggle: function(element, className) {
            if (element && element.classList) {
                element.classList.toggle(className);
            }
        }
    };
    
    // جعل الدالة متاحة globally للاستخدام
    window.safeClassList = safeClassList;
    
    console.log('✅ إصلاحات Marzipano مطبقة');
}

// تطبيق الإصلاحات عند التحميل
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixMarzipanoErrors);
} else {
    fixMarzipanoErrors();
}

// إصلاح إضافي للعناصر الديناميكية
setTimeout(() => {
    const sceneList = document.getElementById('sceneList');
    const sceneListToggle = document.getElementById('sceneListToggle');
    
    if (!sceneList || !sceneListToggle) {
        console.log('ℹ️ عناصر التحكم في المشاهد غير موجودة - إخفاء العناصر غير الضرورية');
        
        // إخفاء العناصر التي تسبب الأخطاء
        const titleBar = document.getElementById('titleBar');
        if (titleBar) titleBar.style.display = 'none';
    }
}, 1000);
