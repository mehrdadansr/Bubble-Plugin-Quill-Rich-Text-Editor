function(instance, properties, context) {
  const { index, length } = properties;
  if (index == null || length == null || !instance.data.quill) return;

  const delta = instance.data.quill.getText(index, length);
  instance.publishState("gettext", delta);
}