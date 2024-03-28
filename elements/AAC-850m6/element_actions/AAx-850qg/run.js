function(instance, properties, context) {
  const { index, length } = properties;
  if (index == null || length == null || !instance.data.quill) return;

  const delta = instance.data.quill.deleteText(index, length);
  instance.publishState("change", JSON.stringify(delta));

  instance.data.saveAutoBinding();
}