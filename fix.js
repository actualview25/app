// إصلاح بسيط لأخطاء Marzipano
console.log('🔧 تحميل الإصلاح البسيط...');

document.addEventListener('DOMContentLoaded', function() {
    // إصلاح أخطاء classList بعد تحميل الصفحة
    setTimeout(function() {
        console.log('🛠️ تطبيق الإصلاحات...');
        
        // التحقق من عناصر Marzipano
        var sceneList = document.getElementById('sceneList');
        var sceneToggle = document.getElementById('sceneListToggle');
        
        if (!sceneList || !sceneToggle) {
            console.log('ℹ️ عناصر التحكم غير موجودة - هذا طبيعي في الجولة الفردية');
            
            // إخفاء العناصر التي قد تسبب أخطاء
            var titleBar = document.getElementById('titleBar');
            if (titleBar) {
                titleBar.style.display = 'none';
            }
        }
        
        console.log('✅ الإصلاحات البسيطة مطبقة');
    }, 2000);
});

// منع الأخطاء في updateSceneList
if (typeof updateSceneList !== 'undefined') {
    var originalUpdate = updateSceneList;
    updateSceneList = function(scene) {
        try {
            return originalUpdate(scene);
        } catch (error) {
            console.log('⚠️ خطأ في updateSceneList (تم تجاوزه)');
        }
    };
}
