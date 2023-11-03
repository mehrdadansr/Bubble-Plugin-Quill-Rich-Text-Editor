function(instance, properties, context) {
    var quill = instance.data.quill;
    if (!quill) return;
    quill.clipboard.dangerouslyPasteHTML(properties.index, properties.html_raw);

}