function(instance, properties, context) {
  var delta = instance.data.quill.getText(properties.index, properties.length)
  instance.publishState("gettext", delta)
}