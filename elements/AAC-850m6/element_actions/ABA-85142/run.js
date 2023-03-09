function(instance, properties, context) {
  var delta = instance.data.quill.insertText(properties.index, properties.text, properties.formats)
  instance.publishState("change", JSON.stringify(delta))
}