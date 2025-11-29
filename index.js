console.log(' بدء تحميل الجولة...');

window.addEventListener('load', function() {
var viewer = new Marzipano.Viewer(document.getElementById('pano'));

// الطريقة الأكثر أماناً
var source = Marzipano.ImageUrlSource.fromString(
"tiles/0-prifit_reception/preview.jpg"
);

// تجربة أحجام مختلفة
var geometry = new Marzipano.EquirectGeometry([
{ width: 800 } // حجم صغير أولاً
]);

var view = new Marzipano.RectilinearView({
pitch: 0,
yaw: 0,
fov: 0.8 // مجال رؤية أصغر
});

var scene = viewer.createScene({
source: source,
geometry: geometry,
view: view
});

scene.switchTo();
window.viewer = viewer;

console.log(' الجولة محملة - إذا كانت مشوشة جرب حجم 1500 أو 2000');
});

// إذا كانت مشوشة، غير width إلى
