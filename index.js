console.log('🚀 بدء تحميل Marzipano...');

// انتظر حتى تحميل كل شيء
window.addEventListener('load', function() {
    console.log('📄 الصفحة محملة بالكامل');
    initializeMarzipano();
});

function initializeMarzipano() {
    try {
        console.log('🎯 بدء تهيئة Marzipano...');
        
        // التحقق من المكتبات
        if (typeof Marzipano === 'undefined') {
            console.error('❌ Marzipano غير محمل');
            return;
        }
        
        if (typeof APP_DATA === 'undefined') {
            console.error('❌ APP_DATA غير محمل');
            return;
        }

        // العنصر الرئيسي
        var panoElement = document.getElementById('pano');
        if (!panoElement) {
            console.error('❌ عنصر pano غير موجود');
            return;
        }

        console.log('✅ كل المتطلبات جاهزة');

        // 1. إنشاء Viewer
        var viewer = new Marzipano.Viewer(panoElement);
        console.log('✅ Viewer تم إنشاؤه');

        // 2. بيانات المشهد الأول
        var sceneData = APP_DATA.scenes[0];
        if (!sceneData) {
            console.error('❌ لا توجد مشاهد');
            return;
        }

        console.log('🖼️ تحميل المشهد:', sceneData.name);

        // 3. مصدر الصور - بطريقة أبسط
        var source = Marzipano.ImageUrlSource.fromString(
            "tiles/" + sceneData.id + "/{z}/{f}/{y}/{x}.jpg"
        );

        // 4. الهندسة
        var geometry = new Marzipano.CubeGeometry(sceneData.levels);

        // 5. المنظور - بدون limiter معقد
        var view = new Marzipano.RectilinearView(sceneData.initialViewParameters);

        // 6. إنشاء المشهد
        var scene = viewer.createScene({
            source: source,
            geometry: geometry,
            view: view
        });

        // 7. تحميل المشهد
        scene.switchTo();
        console.log('✅ المشهد محمل بنجاح!');

        // 8. جعل viewer متاحاً لنظام الأثاث
        window.viewer = viewer;
        console.log('🌐 Viewer جاهز لنظام الأثاث');

    } catch (error) {
        console.error('💥 خطأ فادح:', error);
        console.error('📝 تفاصيل الخطأ:', error.message);
    }
}

