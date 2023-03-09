function(instance, properties, context) {
  var delta = instance.data.quill.formatText(properties.index, properties.length, properties.formats)
  instance.publishState("change", JSON.stringify(delta))
}