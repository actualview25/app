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

// استخدام CubeGeometry للصور المكعبة
var source = Marzipano.ImageUrlSource.fromString(
"tiles/0-prifit_reception/{z}/{f}/{y}/{x}.jpg",
{
cubeMapPreviewUrl: "tiles/0-prifit_reception/preview.jpg"
}
);

// هندسة المكعب - تأكد من أن الصور مقسمة بشكل صحيح
var geometry = new Marzipano.CubeGeometry([
{
tileSize: 256,
size: 256,
fallbackOnly: true
},
{
tileSize: 512,
size: 512
},
{
tileSize: 512,
size: 1024
}
]);

var view = new Marzipano.RectilinearView({
pitch: 0,
yaw: 0,
fov: 1.57
});

var scene = viewer.createScene({
source: source,
geometry: geometry,
view: view,
pinFirstLevel: true
});

scene.switchTo();
window.viewer = viewer;
console.log(' الجولة محملة بنجاح مع CubeGeometry!');

} catch (error) {
console.error(' خطأ في تحميل الجولة:', error);
// جرب الطريقة البديلة إذا فشلت
tryAlternativeMethod();
}
});

function tryAlternativeMethod() {
console.log(' تجربة طريقة بديلة...');

var viewer = new Marzipano.Viewer(document.getElementById('pano'));

// جرب استخدام preview.jpg فقط كصورة كروية
var source = Marzipano.ImageUrlSource.fromString(
"tiles/0-prifit_reception/preview.jpg"
);

var geometry = new Marzipano.EquirectGeometry([
{ width: 2000 } // حجم أصغر قد يكون أفضل
]);

var view = new Marzipano.RectilinearView({
pitch: 0,
yaw: 0,
fov: 1.0 // تقليل مجال الرؤية
});

var scene = viewer.createScene({
source: source,
geometry: geometry,
view: view
});

scene.switchTo();
window.viewer = viewer;
console.log(' الجولة محملة بالطريقة البديلة!');
