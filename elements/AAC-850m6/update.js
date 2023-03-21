function(instance, properties, context) {
    var container = document.getElementById(instance.data.divName);

    if(instance.data.round === 0){
    instance.data.qabli = properties
    instance.data.round = 1
    }
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

    if (instance.data.qabli !== properties || instance.data.kardam === 0) {
        makeChanges();
        instance.data.qabli = properties;
    }
    
    function makeChanges() {    
    var quill = instance.data.quill;
    if (properties.initial_content) {
        if (properties.initial_type === "Content") {
            var initial_content = JSON.parse(properties.initial_content)
            quill.setContents(initial_content);
        } else {
            quill.setText(properties.initial_content);
        }
    }

    quill.root.dataset.placeholder = (properties.placeholder) ? properties.placeholder : '';

    // Get Elements
    var parentElement = container.parentNode
    var qlToolbar = parentElement.querySelector('.ql-toolbar');
    var qlContainer = parentElement.querySelector('.ql-container');

    parentElement.style.overflow = "visible";

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
    const buttons = parentElement.querySelectorAll('.ql-toolbar button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.height = `${properties.toolbar_icon_size}px`;
        buttons[i].style.width = `${properties.toolbar_icon_size}px`;
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

    const pickerOption = parentElement.querySelectorAll('.ql-picker-options');
    for (let i = 0; i < pickerOption.length; i++) {
        pickerOption[i].style.backgroundColor = `${properties.toolbar_bg}px`;
    }
    var thisID = `#${instance.data.parentID}`;
    parentElement.id = instance.data.parentID
    console.log(thisID);
    // Apply Updated CSS Classes
   
        var css;
        if (properties.theme === 'snow') {
            css = `${thisID} .ql-snow.ql-toolbar button:hover, ${thisID} .ql-snow .ql-toolbar button:hover, ${thisID} .ql-snow.ql-toolbar button:focus, ${thisID} .ql-snow .ql-toolbar button:focus, ${thisID} .ql-snow.ql-toolbar button.ql-active, ${thisID} .ql-snow .ql-toolbar button.ql-active, ${thisID} .ql-snow.ql-toolbar .ql-picker-label:hover, ${thisID} .ql-snow .ql-toolbar .ql-picker-label:hover, ${thisID} .ql-snow.ql-toolbar .ql-picker-label.ql-active, ${thisID} .ql-snow .ql-toolbar .ql-picker-label.ql-active, ${thisID} .ql-snow.ql-toolbar .ql-picker-item:hover, ${thisID} .ql-snow .ql-toolbar .ql-picker-item:hover, ${thisID} .ql-snow.ql-toolbar .ql-picker-item.ql-selected, ${thisID} .ql-snow .ql-toolbar .ql-picker-item.ql-selected { color: ${properties.item_hover_color}; } ${thisID} .ql-snow.ql-toolbar button:hover .ql-fill, ${thisID} .ql-snow .ql-toolbar button:hover .ql-fill,${thisID} .ql-snow.ql-toolbar button:focus .ql-fill, ${thisID} .ql-snow .ql-toolbar button:focus .ql-fill, ${thisID} .ql-snow.ql-toolbar button.ql-active .ql-fill,${thisID} .ql-snow .ql-toolbar button.ql-active .ql-fill,${thisID} .ql-snow.ql-toolbar .ql-picker-label:hover .ql-fill,${thisID} .ql-snow .ql-toolbar .ql-picker-label:hover .ql-fill, ${thisID} .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill,${thisID} .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-fill,${thisID} .ql-snow.ql-toolbar .ql-picker-item:hover .ql-fill,${thisID} .ql-snow .ql-toolbar .ql-picker-item:hover .ql-fill,${thisID} .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-fill,${thisID} .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-fill,${thisID} .ql-snow.ql-toolbar button:hover .ql-stroke.ql-fill,${thisID} .ql-snow .ql-toolbar button:hover .ql-stroke.ql-fill,${thisID} .ql-snow.ql-toolbar button:focus .ql-stroke.ql-fill,${thisID} .ql-snow .ql-toolbar button:focus .ql-stroke.ql-fill,${thisID} .ql-snow.ql-toolbar button.ql-active .ql-stroke.ql-fill,${thisID} .ql-snow .ql-toolbar button.ql-active .ql-stroke.ql-fill,${thisID} .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,${thisID} .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,${thisID} .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,${thisID} .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,${thisID} .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,${thisID} .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill, ${thisID} .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill, ${thisID} .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill { fill: ${properties.item_hover_color}; } ${thisID} .ql-snow.ql-toolbar button:hover .ql-stroke,.ql-snow .ql-toolbar button:hover .ql-stroke,.ql-snow.ql-toolbar button:focus .ql-stroke,.ql-snow .ql-toolbar button:focus .ql-stroke,.ql-snow.ql-toolbar button.ql-active .ql-stroke,.ql-snow .ql-toolbar button.ql-active .ql-stroke,.ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke,.ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke,.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke,.ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke,.ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke,.ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke,.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke,.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke,.ql-snow.ql-toolbar button:hover .ql-stroke-miter,.ql-snow .ql-toolbar button:hover .ql-stroke-miter,.ql-snow.ql-toolbar button:focus .ql-stroke-miter,.ql-snow .ql-toolbar button:focus .ql-stroke-miter,.ql-snow.ql-toolbar button.ql-active .ql-stroke-miter,.ql-snow .ql-toolbar button.ql-active .ql-stroke-miter,.ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke-miter,.ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke-miter,.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,.ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,.ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke-miter,.ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke-miter,.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter,.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter {  stroke: ${properties.item_hover_color};} ${thisID} .ql-snow .ql-stroke {  fill: none;  stroke: ${properties.toolbar_icon_color};  stroke-linecap: round;  stroke-linejoin: round;  stroke-width: 2;} ${thisID} .ql-snow .ql-stroke-miter {  fill: none;  stroke: ${properties.toolbar_icon_color};  stroke-miterlimit: 10;  stroke-width: 2;} ${thisID} .ql-snow .ql-fill, ${thisID} .ql-snow .ql-stroke .ql-fill {  fill: ${properties.toolbar_icon_color};} ${thisID} .ql-snow .ql-empty {  fill: none;} ${thisID} .ql-snow .ql-picker {  color: ${properties.toolbar_icon_color};  display: inline-block;  float: left;  font-size: 14px;  font-weight: 500;  height: 24px;  position: relative;  vertical-align: middle;} ${thisID} .ql-snow .ql-picker-options {  background-color: ${properties.toolbar_bg};  display: none;  min-width: 100%;  padding: 4px 8px;  position: absolute;  white-space: nowrap;} ${thisID} .ql-snow .ql-picker.ql-expanded .ql-picker-label {  color: ${properties.toolbar_bg};  z-index: 2;} ${thisID} .ql-snow .ql-picker.ql-expanded .ql-picker-label .ql-fill {  fill: ${properties.toolbar_icon_color};} ${thisID} .ql-snow .ql-picker.ql-expanded .ql-picker-label .ql-stroke {  stroke: ${properties.toolbar_border_color};} .ql-editor p, .ql-editor ol, .ql-editor ul, .ql-editor pre, .ql-editor blockquote, .ql-editor h1, .ql-editor h2, .ql-editor h3, .ql-editor h4, .ql-editor h5, .ql-editor h6 {  color: ${properties.bubble.font_color()};} ${thisID} .ql-snow .ql-editor pre.ql-syntax { color: ${properties.syntax_font_color}; background-color: ${properties.syntax_bg}; border-radius: ${properties.syntax_border_radius}px;} ${thisID} .ql-snow .ql-editor blockquote { border-left: ${properties.quote_border_width}px solid ${properties.quote_border_color}; margin-bottom: 5px; margin-top: 5px; padding-left: 16px;   background-color: ${properties.quote_bg};} .ql-editor .ql-font-serif { font-family: ${properties.font_serif};} .ql-editor .ql-font-monospace { font-family: ${properties.font_mono};}`;
        } else {
            css = `${thisID} .ql-bubble.ql-toolbar button:hover, ${thisID} .ql-bubble .ql-toolbar button:hover, ${thisID} .ql-bubble.ql-toolbar button:focus, ${thisID} .ql-bubble .ql-toolbar button:focus, ${thisID} .ql-bubble.ql-toolbar button.ql-active, ${thisID} .ql-bubble .ql-toolbar button.ql-active, ${thisID} .ql-bubble.ql-toolbar .ql-picker-label:hover, ${thisID} .ql-bubble .ql-toolbar .ql-picker-label:hover, ${thisID} .ql-bubble.ql-toolbar .ql-picker-label.ql-active, ${thisID} .ql-bubble .ql-toolbar .ql-picker-label.ql-active, ${thisID} .ql-bubble.ql-toolbar .ql-picker-item:hover, ${thisID} .ql-bubble .ql-toolbar .ql-picker-item:hover, ${thisID} .ql-bubble.ql-toolbar .ql-picker-item.ql-selected, ${thisID} .ql-bubble .ql-toolbar .ql-picker-item.ql-selected { color: ${properties.item_hover_color}; } ${thisID} .ql-bubble.ql-toolbar button:hover .ql-fill, ${thisID} .ql-bubble .ql-toolbar button:hover .ql-fill, ${thisID} .ql-bubble.ql-toolbar button:focus .ql-fill, ${thisID} .ql-bubble .ql-toolbar button:focus .ql-fill, ${thisID} .ql-bubble.ql-toolbar button.ql-active .ql-fill, ${thisID} .ql-bubble .ql-toolbar button.ql-active .ql-fill, ${thisID} .ql-bubble.ql-toolbar .ql-picker-label:hover .ql-fill, ${thisID} .ql-bubble .ql-toolbar .ql-picker-label:hover .ql-fill, ${thisID} .ql-bubble.ql-toolbar .ql-picker-label.ql-active .ql-fill, ${thisID} .ql-bubble .ql-toolbar .ql-picker-label.ql-active .ql-fill, ${thisID} .ql-bubble.ql-toolbar .ql-picker-item:hover .ql-fill, ${thisID} .ql-bubble .ql-toolbar .ql-picker-item:hover .ql-fill, ${thisID} .ql-bubble.ql-toolbar .ql-picker-item.ql-selected .ql-fill, ${thisID} .ql-bubble .ql-toolbar .ql-picker-item.ql-selected .ql-fill, ${thisID} .ql-bubble.ql-toolbar button:hover .ql-stroke.ql-fill, ${thisID} .ql-bubble .ql-toolbar button:hover .ql-stroke.ql-fill, ${thisID} .ql-bubble.ql-toolbar button:focus .ql-stroke.ql-fill, ${thisID} .ql-bubble .ql-toolbar button:focus .ql-stroke.ql-fill, ${thisID} .ql-bubble.ql-toolbar button.ql-active .ql-stroke.ql-fill, ${thisID} .ql-bubble .ql-toolbar button.ql-active .ql-stroke.ql-fill, ${thisID} .ql-bubble.ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill, ${thisID} .ql-bubble .ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill, ${thisID} .ql-bubble.ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill, ${thisID} .ql-bubble .ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill, ${thisID} .ql-bubble.ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill, ${thisID} .ql-bubble .ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill, ${thisID} .ql-bubble.ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill, ${thisID} .ql-bubble .ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill { fill: ${properties.item_hover_color}; } ${thisID} .ql-bubble.ql-toolbar button:hover .ql-stroke,${thisID} .ql-bubble .ql-toolbar button:hover .ql-stroke,${thisID} .ql-bubble.ql-toolbar button:focus .ql-stroke,${thisID} .ql-bubble .ql-toolbar button:focus .ql-stroke,${thisID} .ql-bubble.ql-toolbar button.ql-active .ql-stroke,${thisID} .ql-bubble .ql-toolbar button.ql-active .ql-stroke,${thisID} .ql-bubble.ql-toolbar .ql-picker-label:hover .ql-stroke,${thisID} .ql-bubble .ql-toolbar .ql-picker-label:hover .ql-stroke,${thisID} .ql-bubble.ql-toolbar .ql-picker-label.ql-active .ql-stroke,${thisID} .ql-bubble .ql-toolbar .ql-picker-label.ql-active .ql-stroke,${thisID} .ql-bubble.ql-toolbar .ql-picker-item:hover .ql-stroke,${thisID} .ql-bubble .ql-toolbar .ql-picker-item:hover .ql-stroke,${thisID} .ql-bubble.ql-toolbar .ql-picker-item.ql-selected .ql-stroke,${thisID} .ql-bubble .ql-toolbar .ql-picker-item.ql-selected .ql-stroke,${thisID} .ql-bubble.ql-toolbar button:hover .ql-stroke-miter,${thisID} .ql-bubble .ql-toolbar button:hover .ql-stroke-miter,${thisID} .ql-bubble.ql-toolbar button:focus .ql-stroke-miter,${thisID} .ql-bubble .ql-toolbar button:focus .ql-stroke-miter,${thisID} .ql-bubble.ql-toolbar button.ql-active .ql-stroke-miter,${thisID} .ql-bubble .ql-toolbar button.ql-active .ql-stroke-miter,${thisID} .ql-bubble.ql-toolbar .ql-picker-label:hover .ql-stroke-miter,${thisID} .ql-bubble .ql-toolbar .ql-picker-label:hover .ql-stroke-miter,${thisID} .ql-bubble.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,${thisID} .ql-bubble .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,${thisID} .ql-bubble.ql-toolbar .ql-picker-item:hover .ql-stroke-miter,${thisID} .ql-bubble .ql-toolbar .ql-picker-item:hover .ql-stroke-miter,${thisID} .ql-bubble.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter,${thisID} .ql-bubble .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter {  stroke: ${properties.item_hover_color};} ${thisID} .ql-bubble .ql-stroke {  fill: none;  stroke: ${properties.toolbar_icon_color};  stroke-linecap: round;  stroke-linejoin: round;  stroke-width: 2;} ${thisID} .ql-bubble .ql-stroke-miter {  fill: none;  stroke: ${properties.toolbar_icon_color};  stroke-miterlimit: 10;  stroke-width: 2;} ${thisID} .ql-bubble .ql-fill, ${thisID} .ql-bubble .ql-stroke .ql-fill {  fill: ${properties.toolbar_icon_color};} ${thisID} .ql-bubble .ql-empty {  fill: none;} ${thisID} .ql-bubble .ql-picker {  color: ${properties.toolbar_icon_color};  display: inline-block;  float: left;  font-size: 14px;  font-weight: 500;  height: 24px;  position: relative;  vertical-align: middle;} ${thisID} .ql-bubble .ql-picker-options {  background-color: ${properties.toolbar_bg};  display: none;  min-width: 100%;  padding: 4px 8px;  position: absolute;  white-space: nowrap;} ${thisID} .ql-bubble .ql-picker.ql-expanded .ql-picker-label {  color: ${properties.toolbar_bg};  z-index: 2;} ${thisID} .ql-bubble .ql-picker.ql-expanded .ql-picker-label .ql-fill {  fill: ${properties.toolbar_icon_color};} ${thisID} .ql-bubble .ql-picker.ql-expanded .ql-picker-label .ql-stroke {  stroke: ${properties.toolbar_border_color};} .ql-editor p, .ql-editor ol, .ql-editor ul, .ql-editor pre, .ql-editor blockquote, .ql-editor h1, .ql-editor h2, .ql-editor h3, .ql-editor h4, .ql-editor h5, .ql-editor h6 {  color: ${properties.bubble.font_color()};} ${thisID} .ql-bubble .ql-editor pre.ql-syntax { color: ${properties.syntax_font_color}; background-color: ${properties.syntax_bg}; border-radius: ${properties.syntax_border_radius}px;} ${thisID} .ql-bubble .ql-editor blockquote { border-left: ${properties.quote_border_width}px solid ${properties.quote_border_color}; margin-bottom: 5px; margin-top: 5px; padding-left: 16px;   background-color: ${properties.quote_bg};} .ql-editor .ql-font-serif { font-family: ${properties.font_serif};} .ql-editor .ql-font-monospace { font-family: ${properties.font_mono};}`;
        }
        var head = document.head || document.getElementsByTagName('head')[0];
        var style = document.createElement('style');
        head.appendChild(style);
        style.type = 'text/css';
        if (style.styleSheet) {
            // This is required for IE8 and below.
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        instance.data.kardam = 1;
    
    }

    /*
    *Events Trigger
    */
    //on text change
    
        var quill = instance.data.quill;
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