function(instance, properties, context) {
  var delta = instance.data.quill.getContents(properties.index, properties.length)
  instance.publishState("getcontents", JSON.stringify(delta))
}