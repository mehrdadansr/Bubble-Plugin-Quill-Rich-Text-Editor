function(instance, properties, context) {
    var quill = instance.data.quill
    quill.clipboard.dangerouslyPasteHTML(properties.index, properties.html_raw)

}