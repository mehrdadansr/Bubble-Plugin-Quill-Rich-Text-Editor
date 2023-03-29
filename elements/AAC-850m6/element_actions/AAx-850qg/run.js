function(instance, properties, context) {
  var delta = instance.data.quill.deleteText(properties.index, properties.length)
  instance.publishState("change", JSON.stringify(delta))
}