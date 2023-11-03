function(instance, properties, context) {
  const { contents } = properties;
  if (contents == null || !instance.data.quill) return;

  try {
    const delta = JSON.parse(contents);
    instance.data.quill.setContents(delta);
  } catch (error) {
    console.log('There is a problem with parse the contents', error.message);
  }


}