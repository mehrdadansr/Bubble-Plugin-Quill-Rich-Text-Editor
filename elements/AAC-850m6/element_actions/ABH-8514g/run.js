function(instance, properties, context) {
  const { index, length, formats } = properties;
  if (index == null || length == null || formats == null || !instance.data.quill) return;

  const metadata = formats.reduce((acc, curr) => {

    acc[curr.key] = curr.value;
	if(curr.value === "true") acc[curr.key] = true;
	if(curr.value === "false") acc[curr.key] = false;
      
    return acc;
  }, {});

  const delta = instance.data.quill.formatText(index, length, metadata);
  instance.publishState("change", JSON.stringify(delta));

  instance.data.saveAutoBinding();
}