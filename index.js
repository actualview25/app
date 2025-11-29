console.log(' بدء تحميل الجولة...');

window.addEventListener('load', function() {
console.log(' الصفحة جاهزة');

if (typeof Marzipano === 'undefined') {
console.error('Marzipano غير محمل');
return;
}

var panoElement = document.getElementById('pano');
if (!panoElement) return;

try {
var viewer = new Marzipano.Viewer(panoElement);

//  الإصلاح: تحميل الصورة الحقيقية
var source = Marzipano.ImageUrlSource.fromString(
"tiles/0-prifit_reception/preview.jpg" // تأكد من المسار الصحيح
);

// استخدام EquirectGeometry للصورة الواحدة
var geometry = new Marzipano.EquirectGeometry([
{ width: 4000 } // يمكنك تعديل العرض حسب حجم صورتك
]);

var view = new Marzipano.RectilinearView({
pitch: 0,
yaw: 0,
fov: 1.57
});

// إنشاء وتحويل المشهد
var scene = viewer.createScene({
source: source,
geometry: geometry,
view: view
});

scene.switchTo(); //  هذا السطر المفقود!

window.viewer = viewer;
console.log(' الجولة محملة بنجاح!');

} catch (error) {
console.error(' خطأ في تحميل الجولة:', error);
}
})
