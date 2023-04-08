function(instance, properties, context) {
        const arr = properties.formats;
  const metadata = arr.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {});
  var delta = instance.data.quill.formatText(properties.index, properties.length, metadata)
  instance.publishState("change", JSON.stringify(delta))
}