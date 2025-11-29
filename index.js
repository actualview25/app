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
    if (typeof APP_DATA === 'undefined' || !APP_DATA.scenes || APP_DATA.scenes.length === 0) {
        console.error('❌ لا توجد بيانات للمشاهد');
        loadDefaultScene(viewer);
        return;
    }

    var sceneData = APP_DATA.scenes[0];
    console.log('🖼️ تحميل المشهد:', sceneData.name);

    let scene; // ⬅ إعلان المشهد خارج الـ try

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
        console.log('⚠️ فشل المكعب — تشغيل وضع Equirect…');
        return loadEquirectScene(viewer, sceneData);
    }

    // ⬅ توفير المتغيرات عالمياً
    window.viewer = viewer;
    window.scene = scene;

    // ⬅ إخفاء أي عناصر قديمة
    document.querySelectorAll('.furniture-item').forEach(el => el.style.display = 'none');

    // ⬅ إنشاء الماسكات
    initSofaMasks();

    return scene;
}

  // إذا كانت ماسكات سابقة موجودة، نحذفها أول
  sofaMasks.forEach(m => {
    if (m.parentNode) m.parentNode.removeChild(m);
  });
  sofaMasks = [];

  // ********* هذه الاحداثيات والقيم تقريبية ، ستحتاج ضبط بسيط (انظر تحت) *********
  // القيم هنا هي أمثلة لثلاث مناطق: كنبة يسار - كنبة وسط - كنبة يمين
  // yaw/pitch تقريبا (قم بتعديلها لاحقاً حسب التعليمات أدناه)
  sofaMasks.push(createMask(window.scene, -0.25, -0.06, 420, 260, 'sofa-left'));
  sofaMasks.push(createMask(window.scene,  0.00, -0.06, 480, 300, 'sofa-center'));
  sofaMasks.push(createMask(window.scene,  0.25, -0.06, 420, 260, 'sofa-right'));

  // نخفي ماسكات حواف الشاشة لو أردت إظهار واحدة فقط — هنا نضع كل الماسكات كخيار
  // يمكنك التحكم في ظهورها فقط لو رغبت (مثلاً عرض الماسك الأوسط افتراضياً)
  // مثال: إخفاء اليسار واليمين إذا تريد العمل على الكنبة الوسطى فقط:
  // sofaMasks[0].style.display = 'none';
  // sofaMasks[2].style.display = 'none';

  console.log('✅ تم إنشاء ' + sofaMasks.length + ' ماسك للكنب (تقريبية).');
}

/* تحويل اسم اللون (data-color) إلى rgba مع ألفا مناسبة */
function colorToRgba(colorKey) {
  const colorMap = {
    'default': 'rgba(139,69,19,0.45)',   // بني افتراضي
    'brown':   'rgba(160,82,45,0.45)',
    'dark-brown': 'rgba(101,67,33,0.45)',
    'black':   'rgba(47,79,79,0.45)',
    'white':   'rgba(245,245,220,0.45)',
    'gray':    'rgba(128,128,128,0.45)'
  };
  return colorMap[colorKey] || colorMap['default'];
}

/* تغيير لون جميع ماسكات الكنَب */
function changeSofaColorByKey(colorKey) {
  const rgba = colorToRgba(colorKey);
  sofaMasks.forEach(m => {
    m.setColor(rgba);
  });
}

/* إعادة تعيين */
function resetSofaColors() {
  sofaMasks.forEach(m => {
    m.setColor(colorToRgba('default'));
  });
}

/* ربط أزرار لوحة التحكم (تتوفر في HTML لديك) */
function bindColorButtons() {
  const colorButtons = document.querySelectorAll('.color-btn');
  const resetButton = document.getElementById('reset-colors');
  const toggleButton = document.getElementById('toggle-panel');

  colorButtons.forEach(button => {
    button.addEventListener('click', function () {
      const colorKey = this.getAttribute('data-color');
      changeSofaColorByKey(colorKey);

      // تحديث النشط بصريًا
      colorButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
    });
  });

  if (resetButton) {
    resetButton.addEventListener('click', function () {
      resetSofaColors();
      colorButtons.forEach(btn => btn.classList.remove('active'));
      const def = document.querySelector('[data-color="default"]');
      if (def) def.classList.add('active');
    });
  }

  if (toggleButton) {
    toggleButton.addEventListener('click', function() {
      const panel = document.getElementById('furniture-control-panel');
      panel.classList.toggle('collapsed');
      this.textContent = panel.classList.contains('collapsed') ? '📋 إظهار' : '📋 إخفاء';
    });
  }
}

/* تهيئة الربط بعد تحميل المشهد والماسكات */
function initFurnitureUI() {
  bindColorButtons();
  // اجعل اللون الافتراضي يعمل فورًا
  changeSofaColorByKey('default');
}

/* نفّذ ضمن بداية الصفحة (أو بعد إنشاء الـ scene) */
window.addEventListener('load', function () {
  // عندما يتم تحميل المشهد، تأكد أن المشهد جاهز ثم ابدأ UI
  // إذا كان scene جاهزًا الآن، نفّذ فورًا
  if (window.scene) initFurnitureUI();
  else {
    // في حال لم يكن جاهزًا فورًا، استمع لمتأخرًا (fallback)
    setTimeout(function () {
      if (window.scene) initFurnitureUI();
    }, 500);
  }
});

