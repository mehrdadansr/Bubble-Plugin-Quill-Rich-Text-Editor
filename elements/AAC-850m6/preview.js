function(instance, properties) {

    var div = $(`<div id="editor"></div>`);
    instance.canvas.append(div);


    if (window.Quill) {
        // If it is, initialize Quill editor
        var element = document.querySelector('.ql-toolbar.ql-snow');
        if (element) {
            // console.log('Element found');
        } else {
            besaz()
            //console.log('Element not found');
        }
    } else {
        //console.log("11")
        // Dynamically load Quill stylesheet
        const quillStylesheet = document.createElement('link');
        quillStylesheet.rel = 'stylesheet';
        quillStylesheet.href = (properties.theme === "snow") ? 'https://cdn.quilljs.com/1.3.6/quill.snow.css' : 'https://cdn.quilljs.com/1.3.6/quill.bubble.css';

        document.head.appendChild(quillStylesheet);

        // If not, dynamically load Quill library
        const quillScript = document.createElement('script');
        quillScript.src = 'https://cdn.quilljs.com/1.3.6/quill.js';
        document.body.appendChild(quillScript);

        // Initialize Quill editor after library and stylesheet have loaded
        quillScript.onload = () => {
            var element = document.querySelector('.ql-toolbar.ql-snow');
            if (element) {
                //console.log('Element found');
            } else {
                besaz()
                // console.log('Element not found');
            }

        }
    };
    //console.log("lastlast")
    function besaz() {
        //console.log("33")
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
        let options = {
            modules: {
                syntax: properties.syntax,
                toolbar: toolbarOptions
            },
            placeholder: (properties.placeholder) ? properties.placeholder : '',
            theme: properties.theme
        };
        //New QUILL
        var quill = new Quill('#editor', options);
        if (properties.initial_content) {
            if (properties.initial_type === "Content") {
                var initial_content = JSON.parse(properties.initial_content)
                quill.setContents(initial_content);
            } else {
                quill.setText(properties.initial_content);
            }
        }
        //console.log("44")
        var qlContainer = document.getElementById('editor');
        var parentElement = qlContainer.parentNode
        var qlToolbar = document.querySelector('.ql-toolbar');
        var qlp = parentElement.querySelector('.ql-container p');
        //console.log("2qlToolbar",qlToolbar)

        //console.log("55")
        var qlp = document.querySelector('.ql-container p');
        if (qlContainer) {

            /**
             * Container Css
             */
            if (qlp) {
                qlp.style.color = properties.bubble.font_color();
                qlp.style.fontFamily = "inherit"
                qlp.style.fontSize = "inherit"
                console.log("qlp")
            }

            /**
             * Toolbar CSS
             */
            if (qlToolbar) {
                qlToolbar.style.border = (properties.toolbar_border_width > 0) ? `${properties.toolbar_border_width}px solid ${properties.toolbar_border_color}` : 'none';
                qlToolbar.style.backgroundColor = properties.toolbar_bg;
                qlToolbar.style.padding = `${properties.toolbar_padding}px`;
                // console.log("qlToolbar")
            }

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

            var css;
            if (properties.theme === 'snow') {
                css = `.ql-snow.ql-toolbar button:hover, .ql-snow .ql-toolbar button:hover, .ql-snow.ql-toolbar button:focus, .ql-snow .ql-toolbar button:focus, .ql-snow.ql-toolbar button.ql-active, .ql-snow .ql-toolbar button.ql-active, .ql-snow.ql-toolbar .ql-picker-label:hover, .ql-snow .ql-toolbar .ql-picker-label:hover, .ql-snow.ql-toolbar .ql-picker-label.ql-active, .ql-snow .ql-toolbar .ql-picker-label.ql-active, .ql-snow.ql-toolbar .ql-picker-item:hover, .ql-snow .ql-toolbar .ql-picker-item:hover, .ql-snow.ql-toolbar .ql-picker-item.ql-selected, .ql-snow .ql-toolbar .ql-picker-item.ql-selected { color: ${properties.item_hover_color}; } .ql-snow.ql-toolbar button:hover .ql-fill, .ql-snow .ql-toolbar button:hover .ql-fill, .ql-snow.ql-toolbar button:focus .ql-fill, .ql-snow .ql-toolbar button:focus .ql-fill, .ql-snow.ql-toolbar button.ql-active .ql-fill, .ql-snow .ql-toolbar button.ql-active .ql-fill, .ql-snow.ql-toolbar .ql-picker-label:hover .ql-fill, .ql-snow .ql-toolbar .ql-picker-label:hover .ql-fill, .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill, .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-fill, .ql-snow.ql-toolbar .ql-picker-item:hover .ql-fill, .ql-snow .ql-toolbar .ql-picker-item:hover .ql-fill, .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-fill, .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-fill, .ql-snow.ql-toolbar button:hover .ql-stroke.ql-fill, .ql-snow .ql-toolbar button:hover .ql-stroke.ql-fill, .ql-snow.ql-toolbar button:focus .ql-stroke.ql-fill, .ql-snow .ql-toolbar button:focus .ql-stroke.ql-fill, .ql-snow.ql-toolbar button.ql-active .ql-stroke.ql-fill, .ql-snow .ql-toolbar button.ql-active .ql-stroke.ql-fill, .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill, .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill, .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill, .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill, .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill, .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill, .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill, .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill { fill: ${properties.item_hover_color}; } .ql-snow.ql-toolbar button:hover .ql-stroke,.ql-snow .ql-toolbar button:hover .ql-stroke,.ql-snow.ql-toolbar button:focus .ql-stroke,.ql-snow .ql-toolbar button:focus .ql-stroke,.ql-snow.ql-toolbar button.ql-active .ql-stroke,.ql-snow .ql-toolbar button.ql-active .ql-stroke,.ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke,.ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke,.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke,.ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke,.ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke,.ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke,.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke,.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke,.ql-snow.ql-toolbar button:hover .ql-stroke-miter,.ql-snow .ql-toolbar button:hover .ql-stroke-miter,.ql-snow.ql-toolbar button:focus .ql-stroke-miter,.ql-snow .ql-toolbar button:focus .ql-stroke-miter,.ql-snow.ql-toolbar button.ql-active .ql-stroke-miter,.ql-snow .ql-toolbar button.ql-active .ql-stroke-miter,.ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke-miter,.ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke-miter,.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,.ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,.ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke-miter,.ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke-miter,.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter,.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter {  stroke: ${properties.item_hover_color};} .ql-snow .ql-stroke {  fill: none;  stroke: ${properties.toolbar_icon_color};  stroke-linecap: round;  stroke-linejoin: round;  stroke-width: 2;} .ql-snow .ql-stroke-miter {  fill: none;  stroke: ${properties.toolbar_icon_color};  stroke-miterlimit: 10;  stroke-width: 2;} .ql-snow .ql-fill, .ql-snow .ql-stroke .ql-fill {  fill: ${properties.toolbar_icon_color};} .ql-snow .ql-empty {  fill: none;} .ql-snow .ql-picker {  color: ${properties.toolbar_icon_color};  display: inline-block;  float: left;  font-size: 14px;  font-weight: 500;  height: 24px;  position: relative;  vertical-align: middle;} .ql-snow .ql-picker-options {  background-color: ${properties.toolbar_bg};  display: none;  min-width: 100%;  padding: 4px 8px;  position: absolute;  white-space: nowrap;} .ql-snow .ql-picker.ql-expanded .ql-picker-label {  color: ${properties.toolbar_bg};  z-index: 2;} .ql-snow .ql-picker.ql-expanded .ql-picker-label .ql-fill {  fill: ${properties.toolbar_icon_color};} .ql-snow .ql-picker.ql-expanded .ql-picker-label .ql-stroke {  stroke: ${properties.toolbar_border_color};} .ql-editor p, .ql-editor ol, .ql-editor ul, .ql-editor pre, .ql-editor blockquote, .ql-editor h1, .ql-editor h2, .ql-editor h3, .ql-editor h4, .ql-editor h5, .ql-editor h6 {  color: ${properties.bubble.font_color()};} `;
            } else {
                css = `.ql-bubble.ql-toolbar button:hover, .ql-bubble .ql-toolbar button:hover, .ql-bubble.ql-toolbar button:focus, .ql-bubble .ql-toolbar button:focus, .ql-bubble.ql-toolbar button.ql-active, .ql-bubble .ql-toolbar button.ql-active, .ql-bubble.ql-toolbar .ql-picker-label:hover, .ql-bubble .ql-toolbar .ql-picker-label:hover, .ql-bubble.ql-toolbar .ql-picker-label.ql-active, .ql-bubble .ql-toolbar .ql-picker-label.ql-active, .ql-bubble.ql-toolbar .ql-picker-item:hover, .ql-bubble .ql-toolbar .ql-picker-item:hover, .ql-bubble.ql-toolbar .ql-picker-item.ql-selected, .ql-bubble .ql-toolbar .ql-picker-item.ql-selected { color: ${properties.item_hover_color}; } .ql-bubble.ql-toolbar button:hover .ql-fill, .ql-bubble .ql-toolbar button:hover .ql-fill, .ql-bubble.ql-toolbar button:focus .ql-fill, .ql-bubble .ql-toolbar button:focus .ql-fill, .ql-bubble.ql-toolbar button.ql-active .ql-fill, .ql-bubble .ql-toolbar button.ql-active .ql-fill, .ql-bubble.ql-toolbar .ql-picker-label:hover .ql-fill, .ql-bubble .ql-toolbar .ql-picker-label:hover .ql-fill, .ql-bubble.ql-toolbar .ql-picker-label.ql-active .ql-fill, .ql-bubble .ql-toolbar .ql-picker-label.ql-active .ql-fill, .ql-bubble.ql-toolbar .ql-picker-item:hover .ql-fill, .ql-bubble .ql-toolbar .ql-picker-item:hover .ql-fill, .ql-bubble.ql-toolbar .ql-picker-item.ql-selected .ql-fill, .ql-bubble .ql-toolbar .ql-picker-item.ql-selected .ql-fill, .ql-bubble.ql-toolbar button:hover .ql-stroke.ql-fill, .ql-bubble .ql-toolbar button:hover .ql-stroke.ql-fill, .ql-bubble.ql-toolbar button:focus .ql-stroke.ql-fill, .ql-bubble .ql-toolbar button:focus .ql-stroke.ql-fill, .ql-bubble.ql-toolbar button.ql-active .ql-stroke.ql-fill, .ql-bubble .ql-toolbar button.ql-active .ql-stroke.ql-fill, .ql-bubble.ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill, .ql-bubble .ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill, .ql-bubble.ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill, .ql-bubble .ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill, .ql-bubble.ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill, .ql-bubble .ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill, .ql-bubble.ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill, .ql-bubble .ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill { fill: ${properties.item_hover_color}; } .ql-bubble.ql-toolbar button:hover .ql-stroke,.ql-bubble .ql-toolbar button:hover .ql-stroke,.ql-bubble.ql-toolbar button:focus .ql-stroke,.ql-bubble .ql-toolbar button:focus .ql-stroke,.ql-bubble.ql-toolbar button.ql-active .ql-stroke,.ql-bubble .ql-toolbar button.ql-active .ql-stroke,.ql-bubble.ql-toolbar .ql-picker-label:hover .ql-stroke,.ql-bubble .ql-toolbar .ql-picker-label:hover .ql-stroke,.ql-bubble.ql-toolbar .ql-picker-label.ql-active .ql-stroke,.ql-bubble .ql-toolbar .ql-picker-label.ql-active .ql-stroke,.ql-bubble.ql-toolbar .ql-picker-item:hover .ql-stroke,.ql-bubble .ql-toolbar .ql-picker-item:hover .ql-stroke,.ql-bubble.ql-toolbar .ql-picker-item.ql-selected .ql-stroke,.ql-bubble .ql-toolbar .ql-picker-item.ql-selected .ql-stroke,.ql-bubble.ql-toolbar button:hover .ql-stroke-miter,.ql-bubble .ql-toolbar button:hover .ql-stroke-miter,.ql-bubble.ql-toolbar button:focus .ql-stroke-miter,.ql-bubble .ql-toolbar button:focus .ql-stroke-miter,.ql-bubble.ql-toolbar button.ql-active .ql-stroke-miter,.ql-bubble .ql-toolbar button.ql-active .ql-stroke-miter,.ql-bubble.ql-toolbar .ql-picker-label:hover .ql-stroke-miter,.ql-bubble .ql-toolbar .ql-picker-label:hover .ql-stroke-miter,.ql-bubble.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,.ql-bubble .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,.ql-bubble.ql-toolbar .ql-picker-item:hover .ql-stroke-miter,.ql-bubble .ql-toolbar .ql-picker-item:hover .ql-stroke-miter,.ql-bubble.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter,.ql-bubble .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter {  stroke: ${properties.item_hover_color};} .ql-bubble .ql-stroke {  fill: none;  stroke: ${properties.toolbar_icon_color};  stroke-linecap: round;  stroke-linejoin: round;  stroke-width: 2;} .ql-bubble .ql-stroke-miter {  fill: none;  stroke: ${properties.toolbar_icon_color};  stroke-miterlimit: 10;  stroke-width: 2;} .ql-bubble .ql-fill, .ql-bubble .ql-stroke .ql-fill {  fill: ${properties.toolbar_icon_color};} .ql-bubble .ql-empty {  fill: none;} .ql-bubble .ql-picker {  color: ${properties.toolbar_icon_color};  display: inline-block;  float: left;  font-size: 14px;  font-weight: 500;  height: 24px;  position: relative;  vertical-align: middle;} .ql-bubble .ql-picker-options {  background-color: ${properties.toolbar_bg};  display: none;  min-width: 100%;  padding: 4px 8px;  position: absolute;  white-space: nowrap;} .ql-bubble .ql-picker.ql-expanded .ql-picker-label {  color: ${properties.toolbar_bg};  z-index: 2;} .ql-bubble .ql-picker.ql-expanded .ql-picker-label .ql-fill {  fill: ${properties.toolbar_icon_color};} .ql-bubble .ql-picker.ql-expanded .ql-picker-label .ql-stroke {  stroke: ${properties.toolbar_border_color};} .ql-editor p, .ql-editor ol, .ql-editor ul, .ql-editor pre, .ql-editor blockquote, .ql-editor h1, .ql-editor h2, .ql-editor h3, .ql-editor h4, .ql-editor h5, .ql-editor h6 {  color: ${properties.bubble.font_color()};}`;
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
            //console.log("last")
        }
    }
}