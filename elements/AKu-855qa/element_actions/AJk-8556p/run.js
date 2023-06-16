function(instance, properties, context) {
  var delta = instance.data.quill.removeFormat(properties.index, properties.length)
  instance.publishState("change", JSON.stringify(delta))

}