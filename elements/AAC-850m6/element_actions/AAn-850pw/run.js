function(instance, properties, context) {
  const { index, length } = properties;
  if (index == null || length == null || !instance.data.quill) return;

  const delta = instance.data.quill.getContents(index, length);
  instance.publishState("getcontents", JSON.stringify(delta));
}