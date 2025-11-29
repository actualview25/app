console.log('🚀 بدء تحميل الجولة...');

window.addEventListener('load', function () {
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


// =============================
// تحميل المشهد من data.js
// =============================
function loadSceneFromData(viewer) {
    if (typeof APP_DATA === 'undefined' || !APP_DATA.scenes || APP_DATA.scenes.length === 0) {
        console.error('❌ لا توجد بيانات للمشاهد');
        loadDefaultScene(viewer);
        return;
    }

    var sceneData = APP_DATA.scenes[0];
    console.log('🖼️ تحميل المشهد:', sceneData.name);

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
        console.log('✅ المشهد محمل بنجاح!');

    } catch (cubeError) {
        console.log('⚠️ فشل المكعب — تشغيل الوضع البديل');
        return loadEquirectScene(viewer, sceneData);
    }

    window.viewer = viewer;
    window.scene = scene;

    initSofaMasks();   // ← تشغيل ماسكات الكنب
    initFurnitureUI(); // ← تشغيل نظام الألوان
}


// =============================
// تحميل بديل (Equirect)
// =============================
function loadEquirectScene(viewer, sceneData) {
    try {
        var source = Marzipano.ImageUrlSource.fromString(
            "tiles/" + sceneData.id + "/preview.jpg"
        );

        var geometry = new Marzipano.EquirectGeometry([{ width: 2000 }]);
        var view = new Marzipano.RectilinearView(sceneData.initialViewParameters);

        var scene = viewer.createScene({ source, geometry, view });

        scene.switchTo();
        console.log('📷 وضع Equirect يعمل الآن');

        window.viewer = viewer;
        window.scene = scene;

        initSofaMasks();
        initFurnitureUI();

    } catch (err) {
        console.error('❌ فشل تحميل الوضع البديل');
    }
}


// =============================
//  ماسكات الكنب (تخمينية دقيقة)
// =============================
window.sofaMasks = [];

function createMask(scene, yaw, pitch, width, height, id) {
    const el = document.createElement('div');
    el.className = 'furniture-mask';
    el.id = id;

    el.style.width = width + 'px';
    el.style.height = height + 'px';
    el.style.background = 'rgba(255,255,255,0.35)';
    el.style.borderRadius = '12px';
    el.style.position = 'absolute';
    el.style.pointerEvents = 'none';
    el.style.zIndex = 5;

    // خاصية تغيير اللون
    el.setColor = function (c) {
        el.style.background = c;
    };

    scene.hotspotContainer().createHotspot(el, { yaw, pitch });

    return el;
}

function initSofaMasks() {
    // إزالة القديم
    sofaMasks.forEach(m => m.remove && m.remove());
    sofaMasks = [];

    // 🎯 القيم التخمينية للكنب
    sofaMasks.push(createMask(window.scene, -0.38, -0.10, 420, 240, 'sofa-left'));
    sofaMasks.push(createMask(window.scene,  0.00, -0.12, 520, 300, 'sofa-center'));
    sofaMasks.push(createMask(window.scene,  0.40, -0.10, 420, 240, 'sofa-right'));

    console.log('🎉 تم إنشاء ماسكات الكنب (تخميني)');
}


// =============================
//  نظام تغيير الألوان
// =============================
function colorToRgba(key) {
    const map = {
        'default':    'rgba(139,69,19,0.45)',
        'brown':      'rgba(160,82,45,0.45)',
        'dark-brown': 'rgba(101,67,33,0.45)',
        'black':      'rgba(0,0,0,0.45)',
        'white':      'rgba(255,255,255,0.45)',
        'gray':       'rgba(128,128,128,0.45)'
    };
    return map[key] || map['default'];
}

function changeSofaColorByKey(key) {
    const c = colorToRgba(key);
    sofaMasks.forEach(m => m.setColor(c));
}

function resetSofaColors() {
    changeSofaColorByKey('default');
}


// =============================
//  ربط الأزرار مع الألوان
// =============================
function bindColorButtons() {
    const colorButtons = document.querySelectorAll('.color-btn');
    const resetButton  = document.getElementById('reset-colors');
    const toggleButton = document.getElementById('toggle-panel');

    colorButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const color = this.getAttribute('data-color');
            changeSofaColorByKey(color);

            colorButtons.forEach(x => x.classList.remove('active'));
            this.classList.add('active');
        });
    });

    if (resetButton) {
        resetButton.addEventListener('click', function () {
            resetSofaColors();
            colorButtons.forEach(x => x.classList.remove('active'));
        });
    }

    if (toggleButton) {
        toggleButton.addEventListener('click', function () {
            const panel = document.getElementById('furniture-control-panel');
            panel.classList.toggle('collapsed');
        });
    }
}

function initFurnitureUI() {
    bindColorButtons();
    changeSofaColorByKey('default');
}


