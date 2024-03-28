function(instance, properties, context) {
    var quill = instance.data.quill;
    if (!quill) return;
    quill.clipboard.dangerouslyPasteHTML(properties.index || 0, properties.html_raw || "");
    instance.data.saveAutoBinding();

}