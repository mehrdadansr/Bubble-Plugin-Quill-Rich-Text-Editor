function(instance, properties, context) {
  const { index, length, current } = properties;
  if (!instance.data.quill) return;

  let format;

  if (current) format = instance.data.quill.getFormat();
  else if (index != null && length != null) format = instance.data.quill.getFormat(properties.index, properties.length);

  instance.publishState("getformat", JSON.stringify(format || ''));
}