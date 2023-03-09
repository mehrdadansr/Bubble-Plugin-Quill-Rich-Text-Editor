function(instance, properties, context) {

  if (properties.current) {
    var formatiu = instance.data.quill.getFormat()
    instance.publishState("getformat", JSON.stringify(formatiu))
  } else if (properties.index) {
    var format = instance.data.quill.getFormat(properties.index, properties.length)
    instance.publishState("getformat", JSON.stringify(format))
  }

}