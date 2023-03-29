function(instance, context) {
    
    if(instance.data.quill){
   instance.data.quill.deleteText(0, instance.data.quill.getLength());
    }
}