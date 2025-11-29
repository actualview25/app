console.log('🚀 بدء تحميل الجولة...');

window.addEventListener('load', function() {
    console.log('📄 الصفحة جاهزة');
    
    if (typeof Marzipano === 'undefined') {
        console.error('Marzipano غير محمل');
        return;
    }

    // عنصر الجولة
    var panoElement = document.getElementById('pano');
    if (!panoElement) return;

    // إنشاء viewer بسيط
    try {
        var viewer = new Marzipano.Viewer(panoElement);
        window.viewer = viewer;
        console.log('✅ الجولة جاهزة لنظام الأثاث');
    } catch (error) {
        console.error('خطأ في الجولة:', error);
    }
});
