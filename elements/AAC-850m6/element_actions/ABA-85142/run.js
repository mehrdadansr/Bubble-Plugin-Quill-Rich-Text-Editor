function(instance, properties, context) {
    const arr = properties.formats;
  const metadata = arr.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {});
    
  var delta = instance.data.quill.insertText(properties.index, properties.text, metadata)
  instance.publishState("change", JSON.stringify(delta))
}