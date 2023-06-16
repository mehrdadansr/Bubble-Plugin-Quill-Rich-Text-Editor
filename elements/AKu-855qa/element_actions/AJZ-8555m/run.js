function(instance, properties, context) {
  var delta = instance.data.quill.format(properties.name, properties.value)
  instance.publishState("change", JSON.stringify(delta))
}