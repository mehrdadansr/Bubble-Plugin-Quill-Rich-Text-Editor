function(instance, properties, context) {
  const { index, text, formats } = properties;
  if (index == null || text == null || formats == null || !instance.data.quill) return;

  const metadata = formats.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {});

  const delta = instance.data.quill.insertText(index, text, metadata);
  instance.publishState("change", JSON.stringify(delta));
}