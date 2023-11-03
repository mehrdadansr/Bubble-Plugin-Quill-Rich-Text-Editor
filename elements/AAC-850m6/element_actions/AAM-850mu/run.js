function(instance, properties, context) {
    const { text } = properties;
    if (text == null || !instance.data.quill) return;

    const delta = instance.data.quill.setText(text);
    instance.publishState("change", JSON.stringify(delta));
}