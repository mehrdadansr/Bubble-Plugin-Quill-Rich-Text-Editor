function(instance, properties, context) {
  var delta = JSON.parse(properties.contents)
  instance.data.quill.setContents(delta)
}