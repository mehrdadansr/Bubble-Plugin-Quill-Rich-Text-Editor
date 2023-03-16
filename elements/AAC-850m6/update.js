function(instance, properties, context) {
//$("div[class^='ql-']")
    var container = document.getElementById(instance.data.divName); 

    /**
     * toolbar
     */
    var toolbarOptions;
    switch (properties.toolbarpreset) {
        case 'Basic Formatting':
            toolbarOptions = [
                ['bold', 'italic', 'underline'],
                [{ 'indent': '-1' }, { 'indent': '+1' }],
                [{ 'color': [] }, { 'background': [] }, 'link'],
                [{ 'header': [1, 2, 3, false] }]
            ]
            break;
        case 'Advanced Formatting':
            toolbarOptions = [
                ['bold', 'italic', 'underline', 'strike', { 'script': 'sub' }, { 'script': 'super' }],
                [{ 'list': 'bullet' }, { 'indent': '+1' }],
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                [{ 'color': [] }, { 'background': [] }, { 'font': [] }, { 'size': ['small', false, 'large', 'huge'] }],
                [{ 'direction': 'rtl' }, { 'align': [] }],
                ['clean']
            ]
            break;
        case 'Content Creation':
            toolbarOptions = [
                ['bold', 'italic', 'underline', { 'list': 'ordered' }, { 'list': 'bullet' }],
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
            toolbarOptions = JSON.parse(properties.customtoolbar)
            break;
        default:
            toolbarOptions = [
                ['bold', 'italic', 'underline', 'link'],
                [{ 'header': [1, 2, 3, false] }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['clean']
            ]
            break;
    }

    /**
    * New Quill
    */
    if (instance.data.quill) {
        instance.data.quill.update()
    } else {
        /**
         * options
         **/
        var options = {
            modules: {
                syntax: properties.syntax,
                toolbar: toolbarOptions
            },
            readOnly: properties.readOnly,
            theme: properties.theme
        };
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

    quill.root.dataset.placeholder = (properties.placeholder)? properties.placeholder: '' ;

    // Get Elements
    var parentElement = container.parentNode
    var qlToolbar = parentElement.querySelector('.ql-toolbar');
    var qlContainer = parentElement.querySelector('.ql-container');
    var qlp = parentElement.querySelector('.ql-container p');

    /**
     * Container Css
     */
    

    if (qlp) {
        qlp.style.color = properties.bubble.font_color();
        qlp.style.fontFamily = "inherit"
        qlp.style.fontSize = "inherit"
    }

    /**
     * Toolbar CSS
     */
    if (qlToolbar) {
        qlToolbar.style.border = (properties.toolbar_border_width > 0) ? `${properties.toolbar_border_width}px solid ${properties.toolbar_border_color}` : 'none';
        qlToolbar.style.backgroundColor = properties.toolbar_bg;
        qlToolbar.style.padding = `${properties.toolbar_padding}px`;
    }

    /**
     *item_hover_color
    */
    const iconStroke = parentElement.querySelectorAll('.ql-stroke');
    for (let i = 0; i < iconStroke.length; i++) {
        iconStroke[i].style.stroke = properties.toolbar_icon_color;
    }
    const iconFill = parentElement.querySelectorAll('.ql-fill');
    for (let i = 0; i < iconFill.length; i++) {
        iconFill[i].style.fill = properties.toolbar_icon_color;
    }

    const pickers = parentElement.querySelectorAll('.ql-picker');
    for (let i = 0; i < pickers.length; i++) {
        pickers[i].style.fill = properties.toolbar_picker_color;
    }

    const qlhover = parentElement.querySelectorAll('.ql-snow.ql-toolbar button:hover, .ql-snow .ql-toolbar button:hover, .ql-snow.ql-toolbar button:focus, .ql-snow .ql-toolbar button:focus, .ql-snow.ql-toolbar button.ql-active, .ql-snow .ql-toolbar button.ql-active, .ql-snow.ql-toolbar .ql-picker-label:hover, .ql-snow .ql-toolbar .ql-picker-label:hover, .ql-snow.ql-toolbar .ql-picker-label.ql-active, .ql-snow .ql-toolbar .ql-picker-label.ql-active, .ql-snow.ql-toolbar .ql-picker-item:hover, .ql-snow .ql-toolbar .ql-picker-item:hover, .ql-snow.ql-toolbar .ql-picker-item.ql-selected, .ql-snow .ql-toolbar .ql-picker-item.ql-selected')
    for (let i = 0; i < qlhover.length; i++) {
        qlhover[i].style.color = properties.item_hover_color;
    }

    const buttons = parentElement.querySelectorAll('.ql-toolbar button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.height = `${properties.toolbar_icon_size}px`;
        buttons[i].style.width = `${properties.toolbar_icon_size}px`;
    }

    const pickerOption = parentElement.querySelectorAll('.ql-picker-options');
    for (let i = 0; i < pickerOption.length; i++) {
        pickerOption[i].style.backgroundColor = `${properties.toolbar_bg}px`;
    }

    var toolbarHeight = qlToolbar.offsetHeight;
    if (qlContainer && toolbarHeight) {
        qlContainer.style.border = (properties.container_border_width > 0) ? `${properties.container_border_width}px solid ${properties.container_border_color}` : 'none';
        qlContainer.style.backgroundColor = properties.container_bg;
        qlContainer.style.padding = `${properties.container_padding}px`;
        qlContainer.style.color = properties.placeholder_color;
        qlContainer.style.minHeight = `${parseInt(properties.bubble.min_height_css(), 10) - toolbarHeight}px`;
        qlContainer.style.maxHeight = `${parseInt(properties.bubble.max_height_css(), 10) - toolbarHeight}px`;
        qlContainer.style.height = `${parseInt(properties.bubble.height(), 10) - toolbarHeight}px`;
        qlContainer.style.fontFamily = "inherit"
        qlContainer.style.fontSize = "inherit"
    }
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
    //on editor change
    quill.on('editor-change', function (delta, oldDelta, source) {
        quill.update();
        instance.publishState("hasfocus", quill.hasFocus());
    });
}