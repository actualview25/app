console.log("🚀 بدء تشغيل الجولة مع نظام تغيير لون الكنب");

// -------------------------
// 1) تحميل Marzipano
// -------------------------
window.addEventListener("load", function () {

    var pano = document.getElementById("pano");
    var viewer = new Marzipano.Viewer(pano);

    var sceneData = APP_DATA.scenes[0];

    var source = Marzipano.ImageUrlSource.fromString(
        "tiles/" + sceneData.id + "/{z}/{f}/{y}/{x}.jpg"
    );

    var geometry = new Marzipano.CubeGeometry(sceneData.levels);

    var limiter = Marzipano.RectilinearView.limit.traditional(
        sceneData.faceSize,
        120 * Math.PI / 180,
        120 * Math.PI / 180
    );

    var view = new Marzipano.RectilinearView(
        sceneData.initialViewParameters,
        limiter
    );

    var scene = viewer.createScene({
        source: source,
        geometry: geometry,
        view: view,
    });

    scene.switchTo();

    window.viewer = viewer;
    window.scene = scene;

    console.log("✅ تم تحميل المشهد بنجاح");

    // إنشاء الماسك فوق الكنب
    createSofaMask();
    bindColorButtons();
});


// -----------------------------------------------------
// 2) إنشاء ماسك الكنب — بدون إحداثيات دقيقة (تخميني)
// -----------------------------------------------------
let sofaMask = null;

function createSofaMask() {

    // div للماسك
    sofaMask = document.createElement("div");
    sofaMask.className = "sofa-mask";

    // أسلوب الماسك (لون افتراضي شفاف)
    sofaMask.style.width = "900px";
    sofaMask.style.height = "520px";
    sofaMask.style.background = "rgba(255,255,255,0.25)";
    sofaMask.style.borderRadius = "20px";

    // وضع الماسك في وسط الكنب تقريبياً
    var hotspot = scene.hotspotContainer().createHotspot(sofaMask, {
        yaw: 0,       // الكنب تقريباً في المنتصف
        pitch: 0.08   // منخفض قليلاً للأرض
    });

    console.log("🎯 تم إضافة ماسك الكنب");
}


// -----------------------------------------------------
// 3) تغيير اللون
// -----------------------------------------------------
function changeSofaColor(hexColor) {
    if (!sofaMask) return;
    sofaMask.style.background = hexColor;
}


// -----------------------------------------------------
// 4) ربط أزرار التحكم
// -----------------------------------------------------
function bindColorButtons() {
    const btns = document.querySelectorAll(".color-btn");

    btns.forEach(btn => {
        btn.addEventListener("click", function () {
            const color = this.getAttribute("data-color");
            changeSofaColor(color);
        });
    });
}
