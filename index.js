console.log('🚀 بدء تحميل الجولة...');

window.addEventListener('load', function() {
    console.log('📄 الصفحة جاهزة');
    
    if (typeof Marzipano === 'undefined') {
        console.error('Marzipano غير محمل');
        return;
    }

    var panoElement = document.getElementById('pano');
    if (!panoElement) {
        console.error('عنصر pano غير موجود');
        return;
    }

    try {
        var viewer = new Marzipano.Viewer(panoElement);
        console.log('✅ Viewer تم إنشاؤه');
        
        // تحميل المشهد باستخدام البيانات من data.js
        loadSceneFromData(viewer);
        
    } catch (error) {
        console.error('💥 خطأ في تحميل الجولة:', error);
    }
});

function loadSceneFromData(viewer) {
    // التحقق من وجود البيانات
    if (typeof APP_DATA === 'undefined' || !APP_DATA.scenes || APP_DATA.scenes.length === 0) {
        console.error('❌ لا توجد بيانات للمشاهد');
        loadDefaultScene(viewer);
        return;
    }

    var sceneData = APP_DATA.scenes[0];
    console.log('🖼️ تحميل المشهد:', sceneData.name);

    try {
        // طريقة المكعب (Cube)
        var source = Marzipano.ImageUrlSource.fromString(
            "tiles/" + sceneData.id + "/{z}/{f}/{y}/{x}.jpg",
            { 
                cubeMapPreviewUrl: "tiles/" + sceneData.id + "/preview.jpg" 
            }
        );

        var geometry = new Marzipano.CubeGeometry(sceneData.levels);
        
        var limiter = Marzipano.RectilinearView.limit.traditional(
            sceneData.faceSize, 
            100 * Math.PI / 180, 
            120 * Math.PI / 180
        );
        
        var view = new Marzipano.RectilinearView(sceneData.initialViewParameters, limiter);

        var scene = viewer.createScene({
            source: source,
            geometry: geometry,
            view: view,
            pinFirstLevel: true
        });

        scene.switchTo();
        console.log('✅ المشهد محمل بنجاح!');
        window.viewer = viewer;
        
    } catch (cubeError) {
        console.log('⚠️ فشل تحميل المكعب، جرب الصورة الكروية...');
        loadEquirectScene(viewer, sceneData);
    }
}

function loadEquirectScene(viewer, sceneData) {
    try {
        // طريقة الصورة الكروية (Equirect)
        var source = Marzipano.ImageUrlSource.fromString(
            "tiles/" + sceneData.id + "/preview.jpg"
        );

        var geometry = new Marzipano.EquirectGeometry([{ width: 2000 }]);
        var view = new Marzipano.RectilinearView(sceneData.initialViewParameters);

        var scene = viewer.createScene({
            source: source,
            geometry: geometry,
            view: view
        });

        scene.switchTo();
        console.log('✅ الصورة الكروية محملة بنجاح!');
        window.viewer = viewer;
        
    } catch (equirectError) {
        console.error('❌ فشل تحميل الصورة الكروية:', equirectError);
        loadDefaultScene(viewer);
    }
}

function loadDefaultScene(viewer) {
    console.log('🔄 تحميل مشهد افتراضي...');
    
    // صورة تجريبية من الإنترنت
    var source = Marzipano.ImageUrlSource.fromString(
        "https://www.marzipano.net/media/equirect/angra.jpg"
    );

    var geometry = new Marzipano.EquirectGeometry([{ width: 4000 }]);
    var view = new Marzipano.RectilinearView({ pitch: 0, yaw: 0, fov: 1.57 });

    var scene = viewer.createScene({
        source: source,
        geometry: geometry,
        view: view
    });

    scene.switchTo();
    window.viewer = viewer;
    console.log('✅ المشهد الافتراضي محمل!');
}
