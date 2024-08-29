function(instance, properties, context) {
    const quill = instance.data.quill;
    if (!quill) return;
    quill.clipboard.dangerouslyPasteHTML(properties.index || 0, properties.html_raw || "");
    instance.data.saveAutoBinding();

}