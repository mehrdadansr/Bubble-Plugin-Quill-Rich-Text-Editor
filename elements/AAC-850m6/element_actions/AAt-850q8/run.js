function(instance, properties, context) {
  const { index, type, value } = properties;
  if (index == null || type == null || value == null || !instance.data.quill) return;

  const delta = instance.data.quill.insertEmbed(index, type, value);
  instance.publishState("change", JSON.stringify(delta));
}