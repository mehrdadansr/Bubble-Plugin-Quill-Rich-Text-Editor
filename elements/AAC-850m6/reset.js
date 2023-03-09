function(instance, context) {

   // deleteText(index: Number, length: Number, source: String = 'api'): Delta
	
	instance.data.quill.deleteText(0, instance.data.quill.getLength());
}