function(instance, properties, context) {
  var delta = quill.getContents(properties.index, properties.length)
  instance.publishState("change", JSON.stringify(delta))
}