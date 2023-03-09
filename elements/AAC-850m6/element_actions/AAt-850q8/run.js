function(instance, properties, context) {
  var delta = instance.data.quill.insertEmbed(properties.index, properties.type, properties.value)
  instance.publishState("change", JSON.stringify(delta))
}