console.log('🚀 بدء تحميل Marzipano...');

document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 الصفحة محملة - بدء تهيئة الجولة');
    
    // الانتظار حتى تحميل المكتبات
    if (typeof window.Marzipano === 'undefined') {
        console.error('❌ Marzipano غير محمل');
        return;
    }

    if (typeof window.APP_DATA === 'undefined') {
        console.error('❌ APP_DATA غير محمل');
        return;
    }

    console.log('✅ المكتبات محملة - بدء التهيئة');
    initViewer();
});

function initViewer() {
    try {
        console.log('🎯 بدء إنشاء المشاهد...');
        
        var panoElement = document.getElementById('pano');
        if (!panoElement) {
            console.error('❌ عنصر pano غير موجود');
            return;
        }

        // 1. إنشاء Viewer أولاً
        var viewer = new Marzipano.Viewer(panoElement);
        console.log('✅ Viewer تم إنشاؤه');

        // 2. الحصول على بيانات المشهد الأول
        var sceneData = window.APP_DATA.scenes[0];
        if (!sceneData) {
            console.error('❌ لا توجد بيانات للمشهد');
            return;
        }

        console.log('🖼️ تحميل المشهد:', sceneData.id);

        // 3. إنشاء مصدر الصور - إصلاح السطر الذي به المشكلة
        var source = Marzipano.ImageUrlSource.fromString(
            "tiles/" + sceneData.id + "/{z}/{f}/{y}/{x}.jpg"
        );

        // 4. إنشاء الهندسة
        var geometry = new Marzipano.CubeGeometry(sceneData.levels);

        // 5. إنشاء المنظور
        var limiter = Marzipano.RectilinearView.limit.traditional(
            sceneData.faceSize, 
            100 * Math.PI / 180, 
            120 * Math.PI / 180
        );
        var view = new Marzipano.RectilinearView(sceneData.initialViewParameters, limiter);

        // 6. إنشاء المشهد
        var scene = viewer.createScene({
            source: source,
            geometry: geometry,
            view: view,
            pinFirstLevel: true
        });

        // 7. تحميل المشهد
        scene.switchTo();
        console.log('✅ المشهد محمل بنجاح!');

        // 8. جعل viewer متاحاً globally لنظام الأثاث
        window.viewer = viewer;
        console.log('🌐 Viewer جاهز لنظام الأثاث');

    } catch (error) {
        console.error('💥 خطأ في التهيئة:', error);
        console.error('🔧 تفاصيل الخطأ:', error.message);
    }
}
