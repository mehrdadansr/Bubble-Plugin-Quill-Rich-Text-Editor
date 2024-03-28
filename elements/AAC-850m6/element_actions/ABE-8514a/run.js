function(instance, properties, context) {

  const { name, value } = properties;
  if (name == null || value == null || !instance.data.quill) return;

  const delta = instance.data.quill.format(properties.name, properties.value);
  instance.publishState("change", JSON.stringify(delta));

  instance.data.saveAutoBinding();
}