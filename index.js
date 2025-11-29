console.log('🚀 بدء تحميل Marzipano...');

document.addEventListener('DOMContentLoaded', function() {
    // الانتظار حتى تحميل المكتبات
    if (typeof Marzipano === 'undefined') {
        console.error('❌ Marzipano غير محمل');
        return;
    }

    if (typeof APP_DATA === 'undefined') {
        console.error('❌ APP_DATA غير محمل');
        return;
    }

    console.log('✅ المكتبات محملة - بدء التهيئة');

    try {
        // العناصر الأساسية
        var panoElement = document.getElementById('pano');
        if (!panoElement) {
            throw new Error('عنصر pano غير موجود');
        }

        // إنشاء الـ Viewer أولاً - هذا هو الإصلاح!
        var viewer = new Marzipano.Viewer(panoElement);
        console.log('✅ تم إنشاء Viewer');

        // إنشاء المشاهد
        var scenes = APP_DATA.scenes.map(function(sceneData) {
            console.log('🎯 إنشاء مشهد:', sceneData.id);
            
            var source = Marzipano.ImageUrlSource.fromString(
                "tiles/" + sceneData.id + "/{z}/{f}/{y}/{x}.jpg",
                { 
                    cubeMapPreviewUrl: "tiles/" + sceneData.id + "/preview.jpg" 
                }
            );
            
            var geometry = new Marzipano.CubeGeometry(sceneData.levels);
            
            var limiter = Marzipano.RectilinearView.limit.traditional(
                sceneData.faceSize, 
                100*Math.PI/180, 
                120*Math.PI/180
            );
            var view = new Marzipano.RectilinearView(sceneData.initialViewParameters, limiter);
            
            var scene = viewer.createScene({
                source: source,
                geometry: geometry,
                view: view,
                pinFirstLevel: true
            });

            return {
                data: sceneData,
                scene: scene
            };
        });

        // تبديل إلى المشهد الأول
        if (scenes.length > 0) {
            console.log('🔄 التحويل إلى المشهد الأول');
            scenes[0].scene.switchTo();
            console.log('✅ تم تحميل المشهد الأول');
        } else {
            console.warn('⚠️ لا توجد مشاهد متاحة');
        }

    } catch (error) {
        console.error('❌ خطأ في التهيئة:', error);
    }
});

// إزالة هذا السطر - كان يسبب المشكلة
// var viewer = new Marzipano.Viewer(document.getElementById('pano'));


  // Display the initial scene.
  switchScene(scenes[0]);

})();
