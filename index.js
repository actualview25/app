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

        loadSceneFromData(viewer);

    } catch (error) {
        console.error('💥 خطأ في تحميل الجولة:', error);
    }
});

/* ----------------------------------------------------------
   تحميل المشهد من البيانات
---------------------------------------------------------- */
function loadSceneFromData(viewer) {
    if (typeof APP_DATA === 'undefined' || !APP_DATA.scenes || APP_DATA.scenes.length === 0) {
        console.error('❌ لا توجد بيانات للمشاهد');
        return loadDefaultScene(viewer);
    }

    var sceneData = APP_DATA.scenes[0];
    let scene;

    try {
        var source = Marzipano.ImageUrlSource.fromString(
            "tiles/" + sceneData.id + "/{z}/{f}/{y}/{x}.jpg",
            { cubeMapPreviewUrl: "tiles/" + sceneData.id + "/preview.jpg" }
        );

        var geometry = new Marzipano.CubeGeometry(sceneData.levels);

        var limiter = Marzipano.RectilinearView.limit.traditional(
            sceneData.faceSize,
            100 * Math.PI / 180,
            120 * Math.PI / 180
        );

        var view = new Marzipano.RectilinearView(sceneData.initialViewParameters, limiter);

        scene = viewer.createScene({
            source: source,
            geometry: geometry,
            view: view,
            pinFirstLevel: true
        });

        scene.switchTo();
        console.log('✅ المشهد (Cube) محمل بنجاح!');

    } catch (cubeError) {
        console.log('⚠️ فشل المكعب — تشغيل وضع Equirect…');
        return loadEquirectScene(viewer, sceneData);
    }

    /* توفير scene و viewer */
    window.viewer = viewer;
    window.scene = scene;

    /* تنظيف العناصر القديمة */
    document.querySelectorAll('.furniture-item').forEach(el => el.style.display = 'none');

    /* إنشاء الماسكات */
    initSofaMasks();

    /* تفعيل واجهة التحكم */
    initFurnitureUI();

    return scene;
}

/* ----------------------------------------------------------
   وضع الصورة الكروية (Equirect)
---------------------------------------------------------- */
function loadEquirectScene(viewer, sceneData) {
    try {
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
        window.scene = scene;

        initSofaMasks();
        initFurnitureUI();

        return scene;

    } catch (equirectError) {
        console.error('❌ فشل تحميل الصورة الكروية:', equirectError);
        return loadDefaultScene(viewer);
    }
}

/* ----------------------------------------------------------
   مشهد افتراضي
---------------------------------------------------------- */
function loadDefaultScene(viewer) {
    console.log('🔄 تحميل مشهد افتراضي...');

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
    window.scene = scene;

    initSofaMasks();
    initFurnitureUI();

    console.log('✅ المشهد الافتراضي محمل!');
    return scene;
}

/* ----------------------------------------------------------
   نظام الماسكات (Mask System)
---------------------------------------------------------- */
var sofaMasks = [];

/* إنشاء ماسك واحد */
function createMask(scene, yaw, pitch, width, height, name) {
    const el = document.createElement('div');
    el.className = 'furniture-mask';
    if (name) el.dataset.name = name;

    el.style.width = width + 'px';
    el.style.height = height + 'px';
    el.style.backgroundColor = 'rgba(139,69,19,0.45)';

    el.setColor = function (rgba) {
        el.style.backgroundColor = rgba;
    };

    scene.hotspotContainer().createHotspot(el, { yaw: yaw, pitch: pitch });

    return el;
}

/* إنشاء ماسكات الكنب */
function initSofaMasks() {
    if (!window.scene) {
        console.warn('⚠️ scene غير جاهز للماسكات بعد');
        return;
    }

    sofaMasks.forEach(m => m.remove());
    sofaMasks = [];

    sofaMasks.push(createMask(window.scene, -0.25, -0.06, 420, 260, 'sofa-left'));
    sofaMasks.push(createMask(window.scene,  0.00, -0.06, 480, 300, 'sofa-center'));
    sofaMasks.push(createMask(window.scene,  0.25, -0.06, 420, 260, 'sofa-right'));

    console.log('✅ تم إنشاء ' + sofaMasks.length + ' ماسكات للكنب.');
}

/* ----------------------------------------------------------
   تغيير اللون
---------------------------------------------------------- */
function colorToRgba(key) {
    const map = {
        'default': 'rgba(139,69,19,0.45)',
        'brown': 'rgba(160,82,45,0.45)',
        'dark-brown': 'rgba(101,67,33,0.45)',
        'black': 'rgba(47,79,79,0.45)',
        'white': 'rgba(245,245,220,0.45)',
        'gray': 'rgba(128,128,128,0.45)'
    };
    return map[key] || map.default;
}

function changeSofaColorByKey(key) {
    const rgba = colorToRgba(key);
    sofaMasks.forEach(mask => mask.setColor(rgba));
}

function resetSofaColors() {
    changeSofaColorByKey('default');
}

/* ----------------------------------------------------------
   واجهة التحكم
---------------------------------------------------------- */
function bindColorButtons() {
    const btns = document.querySelectorAll('.color-btn');
    const reset = document.getElementById('reset-colors');

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const color = btn.dataset.color;
            changeSofaColorByKey(color);

            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    if (reset) {
        reset.addEventListener('click', () => {
            resetSofaColors();
            btns.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-color="default"]').classList.add('active');
        });
    }
}

function initFurnitureUI() {
    bindColorButtons();
    changeSofaColorByKey('default');
}


