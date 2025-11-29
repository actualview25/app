console.log(' البحث عن الصورة...');

function findImagePath() {
var testPaths = [
"tiles/0-prifit_reception/preview.jpg",
"tiles/0-prifit_reception.jpg",
"images/0-prifit_reception.jpg",
"img/panorama.jpg",
"panorama.jpg"
];

var found = false;

testPaths.forEach(function(path) {
var img = new Image();
img.onload = function() {
if (!found) {
found = true;
console.log(' الصورة موجودة في:', path);
loadPanoramaWithPath(path);
}
};
img.onerror = function() {
console.log(' لم توجد في:', path);
};
img.src = path;
});

setTimeout(function() {
if (!found) {
console.error(' لم أعثر على الصورة في أي مسار');
// استخدام صورة افتراضية من الإنترنت
loadPanoramaWithPath("https://www.marzipano.net/media/equirect/angra.jpg");
}
}, 2000);
}

function loadPanoramaWithPath(imagePath) {
var viewer = new Marzipano.Viewer(document.getElementById('pano'));

var source = Marzipano.ImageUrlSource.fromString(imagePath);
var geometry = new Marzipano.EquirectGeometry([{ width: 4000 }]);
var view = new Marzipano.RectilinearView({ pitch: 0, yaw: 0, fov: 1.57 });

var scene = viewer.createScene({ source: source, geometry: geometry, view: view });
scene.switchTo();

window.viewer = viewer;
console.log(' الجولة تعمل بنجاح!');
}

// استبدل الكود في index.js بهذا:
console.log(' بدء تحميل الجولة...');
window.addEventListener('load', findImagePath);
