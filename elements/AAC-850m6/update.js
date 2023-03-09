function(instance, properties, context) {
	
    var container = document.getElementById(instance.data.divName);
    
    //container.style.padding = "50px 10px 20px 30px";
    //$("div[class^='ql-']")
    
   

    var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']                                         // remove formatting button
];
    
    var options = {
  modules: {
         syntax: true,
    toolbar: toolbarOptions
  },
  placeholder: properties.placeholder,
  readOnly: properties.readOnly,
  theme: properties.theme
};
    
    if (instance.data.quill) {
        instance.data.quill.update()
    }else{

    instance.data.quill = new Quill(container,options);
    }
    
    var quill = instance.data.quill;
    // Select Quill Elements
    
    var parentElement = container.parentNode
    var qlToolbar = parentElement.querySelector('.ql-toolbar');
	var qlContainer = parentElement.querySelector('.ql-container');


    // Change the background color of the element
	/*if(toolbar){
    qlContainer.style.border = 'none'
       qlToolbar.style.backgroundColor = 'none';
    	qlToolbar.style.border = 'none'
       }*/
    
    //quill.setText(properties.in);
    
    /*
    *Events
    */
    
    /*
    quill.on('editor-change', function(eventName, ...args) {
        
         if (eventName === 'text-change') {
			// args[0] will be delta
             instance.publishState("change",JSON.stringify(args[0]))
             instance.publishState("beforechange",JSON.stringify(args[1]))
             instance.triggerEvent("textchange")
             
		} else if (eventName === 'selection-change' && args[2] !== 'silent') {
			// args[0] will be old range
       		
            instance.publishState("change",JSON.stringify(args[0]))
			//instance.publishState("selectionindex",range.Range.index)
			//instance.publishState("selectionlength",range.Range.length)
         
            
            
            instance.triggerEvent("selectionchange")
		}
        
        //console.log(eventName,args)
        instance.publishState("getcontents",JSON.stringify(quill.getContents()))
		instance.triggerEvent("editorchange")

    })
    */
    
    
             
}