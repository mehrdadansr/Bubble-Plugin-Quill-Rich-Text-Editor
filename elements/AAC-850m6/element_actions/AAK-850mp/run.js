function(instance, properties, context) {
  const { contents } = properties;
  if (typeof contents  === 'undefined' || !instance.data.quill) return;

  try {
    const delta = JSON.parse(contents);
    instance.data.quill.setContents(delta);
      
      instance.data.saveAutoBinding();
  } catch (error) {
    console.log('There is a problem with parse the contents', error.message);
  }


}