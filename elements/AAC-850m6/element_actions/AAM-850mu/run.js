function(instance, properties, context) {
	var text = properties.text 
    var delta = instance.data.quill.setText(text)
    instance.publishState("change", JSON.stringify(delta))
}