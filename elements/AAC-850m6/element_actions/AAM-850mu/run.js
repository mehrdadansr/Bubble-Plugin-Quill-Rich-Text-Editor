function(instance, properties, context) {
    let { text } = properties;
    if (!instance.data.quill) return;
    text = text || ""
    const delta = instance.data.quill.setText(text);
    instance.publishState("change", JSON.stringify(delta));
}