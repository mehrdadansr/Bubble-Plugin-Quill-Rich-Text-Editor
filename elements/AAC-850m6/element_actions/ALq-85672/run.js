function(instance, properties, context) {

    const quill = instance.data.quill;
    if (!quill) return;

    if(properties.isRedo){
        instance.data.quill.history.redo();
    } else {
		instance.data.quill.history.undo();
    }



}