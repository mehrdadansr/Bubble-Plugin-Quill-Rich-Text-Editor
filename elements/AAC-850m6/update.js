function(instance, properties, context) {

    var container = document.getElementById(instance.data.divName);

    //$("div[class^='ql-']")



    var toolbarOptions;
    //Basic Formatting,Advanced Formatting,Content Creation,Full Formatting,Custom
    //customtoolbar
    switch (properties.toolbarpreset) {
        case 'Basic Formatting':
            toolbarOptions = [
                ['Bold', 'Italic', 'Underline'],
                [{ 'header': [1, 2, 3, false] }],
                [{ 'color': [] }, { 'background': [] }, 'link'],
            ]
            break;
        case 'Advanced Formatting':
            toolbarOptions = [
                ['Bold', 'Italic', 'Underline', 'strike', { 'script': 'sub' }, { 'script': 'super' }],
                [{ 'indent': '-1' }, { 'indent': '+1' }],
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                [{ 'color': [] }, { 'background': [] }, { 'font': [] }, { 'size': ['small', false, 'large', 'huge'] }],
                [{ 'direction': 'rtl' }, { 'align': [] }],
                ['clean']
            ]
            break;
        case 'Content Creation':
            toolbarOptions = [
                ['Bold', 'Italic', 'Underline', { 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'header': [1, 2, 3, false] }, 'blockquote', 'code-block'],
                [{ 'color': [] }, { 'background': [] }, { 'font': [] }, { 'size': ['small', false, 'large'] }, { 'align': [] }, { 'direction': 'rtl' }],
                ['link', 'image', 'video'],
                ['clean']
            ]
            break;
        case 'Full Formatting':
            toolbarOptions = [
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote', 'code-block'],

                [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
                [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
                [{ 'direction': 'rtl' }],                         // text direction

                [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                ['link', 'image', 'video', 'formula'],          // add's image support
                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                [{ 'font': [] }],
                [{ 'align': [] }],

                ['clean']                                         // remove formatting button
            ];
            break;
        case 'Custom':
            toolbarOptions = [
                ['Bold', 'Italic', 'Underline', 'link'],
                [{ 'header': [1, 2, 3, false] }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['clean']
            ]
            break;
        default:
            toolbarOptions = [
                ['Bold', 'Italic', 'Underline', 'link'],
                [{ 'header': [1, 2, 3, false] }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['clean']
            ]
            break;
    }

    var options = {
        modules: {
            syntax: properties.syntax,
            toolbar: toolbarOptions
        },
        placeholder: properties.placeholder,
        readOnly: properties.readOnly,
        theme: properties.theme
    };


    /**
    * New Quill
    */
    if (instance.data.quill) {
        instance.data.quill.update()
    } else {

        instance.data.quill = new Quill(container, options);
    }

    // Insert Initials
    var quill = instance.data.quill;
    if (properties.initial_content) {

        if (properties.initial_type === "Content") {
            var initial_content = JSON.parse(properties.initial_content)
            quill.setContents(initial_content);
        } else {
            quill.setText(properties.initial_content);
        }
    }

    //quill.root.dataset.placeholder = (properties.placeholder)? properties.placeholder: '' ;

    // Get Elements
    var parentElement = container.parentNode
    var qlToolbar = parentElement.querySelector('.ql-toolbar');
    var qlContainer = parentElement.querySelector('.ql-container');
    var qlPlaceholder = parentElement.querySelector('.ql-editor.ql-blank::before');


    /**
     * CSS of containers
     */
    // qlToolbar CSS


    /*if (qlPlaceholder) {
    qlPlaceholder.style.color = properties.placeholder_color;
    qlContainer.style.fontSize = "40px"
}*/

    const pElement = document.querySelector('.ql-editor.ql-blank p');

    //const element = document.querySelector('.ql-editor.ql-blank::before');
    if (pElement) {
        pElement.style.color = 'red';

    }

    if (qlToolbar) {
        qlToolbar.style.border = (properties.toolbar_border_width > 0) ? `${properties.toolbar_border_width}px solid ${properties.toolbar_border_color}` : 'none';
        qlToolbar.style.backgroundColor = properties.toolbar_bg;

        qlToolbar.style.padding = `${properties.toolbar_padding}px`;
    }

    var toolbarHeight = qlToolbar.offsetHeight;
    //var containerHeight = parseInt(properties.bubble.min_height_css(),10)
    //console.log(containerHeight);

    if (qlContainer) {

        qlContainer.style.border = (properties.container_border_width > 0) ? `${properties.container_border_width}px solid ${properties.container_border_color}` : 'none';


        qlContainer.style.backgroundColor = properties.container_bg;
        qlContainer.style.padding = `${properties.container_padding}px`;
        qlContainer.style.color = properties.bubble.font_color()
        qlContainer.style.minHeight = `${parseInt(properties.bubble.min_height_css(), 10) - toolbarHeight}px`;
        qlContainer.style.maxHeight = `${parseInt(properties.bubble.max_height_css(), 10) - toolbarHeight}px`;
        qlContainer.style.height = `${parseInt(properties.bubble.height(), 10) - toolbarHeight}px`;
        qlContainer.style.fontFamily = "inherit"
        qlContainer.style.fontSize = "inherit"
    }





    //quill.root.draggable = true;
    //console.log(quill)
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
            instance.triggerEvent("selectionchange")
        }
    });
}