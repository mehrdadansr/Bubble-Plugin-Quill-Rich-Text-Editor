function(instance, properties, context) {
  const { delta } = properties;
  if (delta == null || !instance.data.quill) return;

  try {
    const contents = JSON.parse(delta);
    instance.data.quill.updateContents(contents);
      instance.data.saveAutoBinding();
  } catch (error) {
    console.log('There is a problem with parse the delta', error.message);
  }



}