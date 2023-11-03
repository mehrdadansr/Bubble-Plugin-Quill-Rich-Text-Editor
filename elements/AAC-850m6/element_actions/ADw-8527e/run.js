function(instance, properties, context) {
    const { index, length } = properties;
    if (index == null || length == null) return;
    var delta = instance.data.quill.setSelection(index, length);
}