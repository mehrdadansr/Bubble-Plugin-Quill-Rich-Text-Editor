function(instance, properties, context) {

    var container = document.getElementById(instance.data.divName);

    //$("div[class^='ql-']")



    var toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
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
    } else {

        instance.data.quill = new Quill(container, options);
    }

    var quill = instance.data.quill;

    if (properties.initial_text) {
        quill.setText(properties.initial_text);
    }

    if (properties.initial_content) {
        quill.setContents(properties.initial_content);
    }

    // Get Elements
    var parentElement = container.parentNode
    var qlToolbar = parentElement.querySelector('.ql-toolbar');
    var qlContainer = parentElement.querySelector('.ql-container');

    /**
     * CSS of containers
     */
    // qlToolbar CSS
    if (qlToolbar) {
        qlToolbar.style.border = (properties.toolbar_border_width > 0)? 'solid' : 'none'
        qlToolbar.style.backgroundColor = properties.toolbar_bg;
        qlToolbar.style.borderColor = (properties.toolbar_border_width > 0)? toolbar_border_color :'none'
        qlToolbar.style.padding = '${properties.toolbar_padding}px';
    }

    if (qlContainer) {
        qlContainer.style.border = (properties.container_border_width > 0)? 'solid' : 'none'
        qlContainer.style.backgroundColor = properties.container_bg;
        qlContainer.style.borderColor = (properties.container_border_width > 0)? Container_border_color :'none'
        //qlContainer.style.padding = '${properties.Container_padding}px';
    }

    //quill.setText(properties.in);

    /*
    *Events Trigger
    */
    //on text change
    quill.on('text-change', function (delta, oldDelta, source) {
        instance.publishState("change", JSON.stringify(delta))
        instance.publishState("beforechange", JSON.stringify(oldDelta))
        instance.publishState("lastcontents", JSON.stringify(quill.getContents()))
        instance.publishState("lasttext", JSON.stringify(quill.getText()))
        instance.publishState("lastlength", JSON.stringify(quill.getLength()))
        instance.triggerEvent("textchange")
    });
    //on selection change
    quill.on('selection-change', function (range, oldRange, source) {
        if (range) {
            instance.publishState("selectionindex", range.index + 1)
            instance.publishState("selectionlength", range.length)
        }
    });
}