function(instance, properties, context) {
  const { index, length } = properties;
  if (index == null || length == null || !instance.data.quill) return;
  var delta = instance.data.quill.removeFormat(index, length);
  instance.publishState("change", JSON.stringify(delta));

}