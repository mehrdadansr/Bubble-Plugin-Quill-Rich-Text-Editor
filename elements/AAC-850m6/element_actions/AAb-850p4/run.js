function(instance, properties, context) {
    var delta = JSON.parse(properties.delta)
  instance.data.quill.updateContents(delta)
}