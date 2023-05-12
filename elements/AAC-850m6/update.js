function(instance, properties, context) {
    let p = properties;
    var container = document.getElementById(instance.data.divName);
    if (instance.data.round === 0) {
        instance.data.qabli = p;
        instance.data.round = 1
    }

    /**
     * Import styles and script
     */
    if (properties.syntax) {
        // Check if a script with the same src attribute already exists in the head element
        let existingScript = document.querySelector('head script[src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js"]');
        if (!existingScript) {
            // Create a new link element
            let link = document.createElement('link');
            // Set the link element's attributes
            link.rel = 'stylesheet';
            link.href = '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/monokai-sublime.min.css';
            // Append the link element to the head of the document
            document.head.appendChild(link);
            // If the script doesn't exist, create a new script element and append it to the head element
            let script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js';
            script.type = 'text/javascript';
            document.head.appendChild(script);
        }
    }
    if (properties.math) {
        // Check if a script with the same src attribute already exists in the head element
        let existingScript = document.querySelector('head script[src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.js"]');
        if (!existingScript) {
            // Create a new link element
            let link = document.createElement('link');
            // Set the link element's attributes
            link.rel = 'stylesheet';
            link.href = 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.css';
            // Append the link element to the head of the document
            document.head.appendChild(link);
            // If the script doesn't exist, create a new script element and append it to the head element
            let script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.js';
            script.type = 'text/javascript';
            document.head.appendChild(script);
        }
    }
    var existingQuillScript = document.querySelector('head script[src="https://cdn.quilljs.com/1.3.6/quill.js"]');
    if (!existingQuillScript) {
        const quillStylesheet = document.createElement('link');
        quillStylesheet.rel = 'stylesheet';
        quillStylesheet.href = (properties.theme === "snow") ? 'https://cdn.quilljs.com/1.3.6/quill.snow.css' : 'https://cdn.quilljs.com/1.3.6/quill.bubble.css';

        document.head.appendChild(quillStylesheet);

        const quillScript = document.createElement('script');
        quillScript.src = 'https://cdn.quilljs.com/1.3.6/quill.js';

        document.body.appendChild(quillScript);


        // Initialize Quill editor after library and stylesheet have loaded
        quillScript.onload = () => {


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
                    toolbarOptions = JSON.parse('[' + properties.customtoolbar + ']')
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
                instance.data.quill.update();


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


                if (properties.editHTML) {
                    loadjs(['https://cdn.polyfill.io/v2/polyfill.min.js?features=Promise', '//meta.cdn.bubble.io/f1680953833915x329763331470189100/quill.htmlEditButton.min.js'], 'htmlButton');

                    loadjs.ready('htmlButton', function () {
                        Quill.register("modules/htmlEditButton", htmlEditButton);
                        options.modules["htmlEditButton"] = {
                            syntax: false
                        }
                    });
                    loadjs('//meta.cdn.bubble.io/f1680953833915x329763331470189100/quill.htmlEditButton.min.js', function () {

                    });

                }




                instance.data.quill = new Quill(container, options);

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
                    instance.publishState("getHTML", quill.root.innerHTML)

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

                // Set Initial Value & Place Holder
                if (properties.initial_content) {
                    if (!instance.data.initial_content) {
                        instance.data["initial_content"] = `${properties.initial_content}`
                    }

                    switch (properties.initial_type) {
                        case "Content":
                            var initial_content = JSON.parse(properties.initial_content)
                            quill.setContents(initial_content);
                            break;
                        case "Text":
                            quill.setText(properties.initial_content);
                            break;
                        case "HTML":
                            quill.clipboard.dangerouslyPasteHTML(properties.initial_content)
                            break;
                        default:
                            console.log("Type not detected")
                            break;
                    }
                }
                quill.root.dataset.placeholder = (properties.placeholder) ? properties.placeholder : '';
            }
            makeChanges();
        }
        //} else if (instance.data.qabli !== properties) {
    } else {
        makeChanges();
        console.log("make changes")

    }


    function makeChanges() {
        var quill = instance.data.quill;
          console.log("make changu")
        // Get Elements

        if (properties.initial_content && instance.data.initial_content !== `${properties.initial_content}`) {

            switch (properties.initial_type) {
                case "Content":
                    var initial_content = JSON.parse(properties.initial_content)
                    quill.setContents(initial_content);
                    break;
                case "Text":
                    quill.setText(properties.initial_content);
                    break;
                case "HTML":
                    quill.clipboard.dangerouslyPasteHTML(properties.initial_content)
                    break;
                default:
                    console.log("Type not detected")
                    break;
            }
        }
        quill.root.dataset.placeholder = (properties.placeholder) ? properties.placeholder : '';

        var parentElement = container.parentNode
        var qlToolbar = parentElement.querySelector('.ql-toolbar');
        var qlContainer = parentElement.querySelector('.ql-editor');
        var babaConti = parentElement.querySelector('.ql-container');

        /**
         * Parent Element Styles
        */
        parentElement.style.display = "flex";
        parentElement.style.overflow = "visible";
        parentElement.style.flexDirection = "column";
        parentElement.id = instance.data.parentID

        /**
         * Toolbar CSS
         */
        if (qlToolbar) {
            if (properties.toolbar_hide) {
                qlToolbar.classList.add("hide-toolbar")
            } else {
                qlToolbar.classList.remove(".hide-toolbar")
            }
            qlToolbar.style.border = (properties.toolbar_border_width > 0) ? `${properties.toolbar_border_width}px solid ${properties.toolbar_border_color}` : 'none';
            qlToolbar.style.backgroundColor = properties.toolbar_bg;
            qlToolbar.style.padding = `${properties.toolbar_padding}px`;

            const buttons = parentElement.querySelectorAll('.ql-toolbar button');
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].style.height = `${properties.toolbar_icon_size}px`;
                buttons[i].style.width = `${properties.toolbar_icon_size}px`;
            }
            const pickerOption = parentElement.querySelectorAll('.ql-picker-options');
            for (let i = 0; i < pickerOption.length; i++) {
                pickerOption[i].style.backgroundColor = `${properties.toolbar_bg}px`;
            }
        }

        if (qlContainer) {
            var parentHeighDiff = properties.bubble.height() - parentElement.clientHeight;
            var toolbarHeight = qlToolbar.offsetHeight + parentHeighDiff;

            babaConti.style.border = (properties.container_border_width > 0) ? `${properties.container_border_width}px solid ${properties.container_border_color}` : 'none';
            qlContainer.style.backgroundColor = properties.container_bg;
            qlContainer.style.padding = `${properties.container_padding}px`;
            qlContainer.style.color = properties.placeholder_color;
            qlContainer.style.minHeight = `${parseInt(properties.bubble.min_height_css(), 10) - toolbarHeight}px`;
            qlContainer.style.maxHeight = `${parseInt(properties.bubble.max_height_css(), 10) - toolbarHeight}px`;
            if (!properties.bubble.fit_height()) {
                qlContainer.style.height = `${parentElement.clientHeight - qlToolbar.offsetHeight}px`;
            }
            babaConti.style.fontFamily = "inherit"
            babaConti.style.fontSize = "inherit"
        }

        var tooliCss = false;
        let classRule = ['toolbar_icon_color', 'item_hover_color']
        classRule.forEach(key => {
            tooliCss = (instance.data.qabli[key] != properties[key]) ? true : tooliCss;
        })

        // Apply Customized CSS Classes [One Time]
        if (instance.data.kardam === 0 || tooliCss) {
            var css;
            var thisID = `#${instance.data.parentID}`;
            if (properties.theme === 'snow') {

                css = `${thisID} .ql-snow.ql-toolbar button:hover, ${thisID} .ql-snow .ql-toolbar button:hover, ${thisID} .ql-snow.ql-toolbar button:focus, ${thisID} .ql-snow .ql-toolbar button:focus, ${thisID} .ql-snow.ql-toolbar button.ql-active, ${thisID} .ql-snow .ql-toolbar button.ql-active, ${thisID} .ql-snow.ql-toolbar .ql-picker-label:hover, ${thisID} .ql-snow .ql-toolbar .ql-picker-label:hover, ${thisID} .ql-snow.ql-toolbar .ql-picker-label.ql-active, ${thisID} .ql-snow .ql-toolbar .ql-picker-label.ql-active, ${thisID} .ql-snow.ql-toolbar .ql-picker-item:hover, ${thisID} .ql-snow .ql-toolbar .ql-picker-item:hover, ${thisID} .ql-snow.ql-toolbar .ql-picker-item.ql-selected, ${thisID} .ql-snow .ql-toolbar .ql-picker-item.ql-selected { color: ${properties.item_hover_color}; } ${thisID} .ql-snow.ql-toolbar button:hover .ql-fill, ${thisID} .ql-snow .ql-toolbar button:hover .ql-fill, ${thisID} .ql-snow.ql-toolbar button:focus .ql-fill, ${thisID} .ql-snow .ql-toolbar button:focus .ql-fill, ${thisID} .ql-snow.ql-toolbar button.ql-active .ql-fill, ${thisID} .ql-snow .ql-toolbar button.ql-active .ql-fill, ${thisID} .ql-snow.ql-toolbar .ql-picker-label:hover .ql-fill, ${thisID} .ql-snow .ql-toolbar .ql-picker-label:hover .ql-fill, ${thisID} .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill, ${thisID} .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-fill, ${thisID} .ql-snow.ql-toolbar .ql-picker-item:hover .ql-fill, ${thisID} .ql-snow .ql-toolbar .ql-picker-item:hover .ql-fill, ${thisID} .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-fill, ${thisID} .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-fill, ${thisID} .ql-snow.ql-toolbar button:hover .ql-stroke.ql-fill, ${thisID} .ql-snow .ql-toolbar button:hover .ql-stroke.ql-fill, ${thisID} .ql-snow.ql-toolbar button:focus .ql-stroke.ql-fill, ${thisID} .ql-snow .ql-toolbar button:focus .ql-stroke.ql-fill, ${thisID} .ql-snow.ql-toolbar button.ql-active .ql-stroke.ql-fill, ${thisID} .ql-snow .ql-toolbar button.ql-active .ql-stroke.ql-fill, ${thisID} .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill, ${thisID} .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill, ${thisID} .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill, ${thisID} .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill, ${thisID} .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill, ${thisID} .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill, ${thisID} .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill, ${thisID} .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill { fill: ${properties.item_hover_color}; } ${thisID} .ql-snow.ql-toolbar button:hover .ql-stroke, ${thisID} .ql-snow .ql-toolbar button:hover .ql-stroke, ${thisID} .ql-snow.ql-toolbar button:focus .ql-stroke, ${thisID} .ql-snow .ql-toolbar button:focus .ql-stroke, ${thisID} .ql-snow.ql-toolbar button.ql-active .ql-stroke, ${thisID} .ql-snow .ql-toolbar button.ql-active .ql-stroke, ${thisID} .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke, ${thisID} .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke, ${thisID} .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke, ${thisID} .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke, ${thisID} .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke, ${thisID} .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke, ${thisID} .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke,.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke, ${thisID} .ql-snow.ql-toolbar button:hover .ql-stroke-miter, ${thisID} .ql-snow .ql-toolbar button:hover .ql-stroke-miter, ${thisID} .ql-snow.ql-toolbar button:focus .ql-stroke-miter,${thisID} .ql-snow .ql-toolbar button:focus .ql-stroke-miter, ${thisID} .ql-snow.ql-toolbar button.ql-active .ql-stroke-miter, ${thisID} .ql-snow .ql-toolbar button.ql-active .ql-stroke-miter, ${thisID} .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke-miter, ${thisID} .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke-miter, ${thisID} .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter, ${thisID} .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter, ${thisID} .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke-miter, ${thisID} .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke-miter,.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter, ${thisID} .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter {  stroke: ${properties.item_hover_color};} ${thisID} .ql-snow .ql-stroke {fill: none;  stroke: ${properties.toolbar_icon_color};  stroke-linecap: round;  stroke-linejoin: round; stroke-width: 2;} ${thisID} .ql-snow .ql-stroke-miter {  fill: none;  stroke: ${properties.toolbar_icon_color};  stroke-miterlimit: 10;  stroke-width: 2;} ${thisID} .ql-snow .ql-fill, ${thisID} .ql-snow .ql-stroke .ql-fill {  fill: ${properties.toolbar_icon_color};} ${thisID} .ql-snow .ql-empty {  fill: none;} ${thisID} .ql-snow .ql-picker {  color: ${properties.toolbar_icon_color};  display: inline-block;  float: left;  font-size: 14px;  font-weight: 500;  height: 24px;  position: relative;  vertical-align: middle;} ${thisID} .ql-snow .ql-picker-options {  background-color: ${properties.toolbar_bg}; min-width: 100%;  padding: 4px 8px;} ${thisID} .ql-snow .ql-picker.ql-expanded .ql-picker-label {  color: ${properties.toolbar_bg};  z-index: 2;} ${thisID} .ql-snow .ql-picker.ql-expanded .ql-picker-label .ql-fill {  fill: ${properties.toolbar_icon_color};} ${thisID} .ql-snow .ql-picker.ql-expanded .ql-picker-label .ql-stroke {  stroke: ${properties.toolbar_border_color};} ${thisID} .ql-editor p, .ql-editor ol, ${thisID} .ql-editor ul, .ql-editor pre, .ql-editor blockquote, .ql-editor h1, ${thisID} .ql-editor h2, ${thisID} .ql-editor h3, ${thisID} .ql-editor h4, ${thisID} .ql-editor h5, ${thisID} .ql-editor h6 {  color: ${properties.bubble.font_color()};} ${thisID} .ql-snow .ql-editor pre.ql-syntax { color: ${properties.syntax_font_color}; background-color: ${properties.syntax_bg}; border-radius: ${properties.syntax_border_radius}px;} ${thisID} .ql-snow .ql-editor blockquote { border-left: ${properties.quote_border_width}px solid ${properties.quote_border_color}; padding-left: 16px;   background-color: ${properties.quote_bg};} ${thisID} .ql-editor .ql-font-serif { font-family: ${properties.font_serif};} ${thisID} .ql-editor .ql-font-monospace { font-family: ${properties.font_mono};} ${thisID} .ql-formats button {  color: ${properties.toolbar_icon_color};}`;
            } else {
                css = `${thisID} .ql-bubble.ql-toolbar button:hover, ${thisID} .ql-bubble .ql-toolbar button:hover, ${thisID} .ql-bubble.ql-toolbar button:focus, ${thisID} .ql-bubble .ql-toolbar button:focus, ${thisID} .ql-bubble.ql-toolbar button.ql-active, ${thisID} .ql-bubble .ql-toolbar button.ql-active, ${thisID} .ql-bubble.ql-toolbar .ql-picker-label:hover, ${thisID} .ql-bubble .ql-toolbar .ql-picker-label:hover, ${thisID} .ql-bubble.ql-toolbar .ql-picker-label.ql-active, ${thisID} .ql-bubble .ql-toolbar .ql-picker-label.ql-active, ${thisID} .ql-bubble.ql-toolbar .ql-picker-item:hover, ${thisID} .ql-bubble .ql-toolbar .ql-picker-item:hover, ${thisID} .ql-bubble.ql-toolbar .ql-picker-item.ql-selected, ${thisID} .ql-bubble .ql-toolbar .ql-picker-item.ql-selected { color: ${properties.item_hover_color}; } ${thisID} .ql-bubble.ql-toolbar button:hover .ql-fill, ${thisID} .ql-bubble .ql-toolbar button:hover .ql-fill, ${thisID} .ql-bubble.ql-toolbar button:focus .ql-fill, ${thisID} .ql-bubble .ql-toolbar button:focus .ql-fill, ${thisID} .ql-bubble.ql-toolbar button.ql-active .ql-fill, ${thisID} .ql-bubble .ql-toolbar button.ql-active .ql-fill, ${thisID} .ql-bubble.ql-toolbar .ql-picker-label:hover .ql-fill, ${thisID} .ql-bubble .ql-toolbar .ql-picker-label:hover .ql-fill, ${thisID} .ql-bubble.ql-toolbar .ql-picker-label.ql-active .ql-fill, ${thisID} .ql-bubble .ql-toolbar .ql-picker-label.ql-active .ql-fill, ${thisID} .ql-bubble.ql-toolbar .ql-picker-item:hover .ql-fill, ${thisID} .ql-bubble .ql-toolbar .ql-picker-item:hover .ql-fill, ${thisID} .ql-bubble.ql-toolbar .ql-picker-item.ql-selected .ql-fill, ${thisID} .ql-bubble .ql-toolbar .ql-picker-item.ql-selected .ql-fill, ${thisID} .ql-bubble.ql-toolbar button:hover .ql-stroke.ql-fill, ${thisID} .ql-bubble .ql-toolbar button:hover .ql-stroke.ql-fill, ${thisID} .ql-bubble.ql-toolbar button:focus .ql-stroke.ql-fill, ${thisID} .ql-bubble .ql-toolbar button:focus .ql-stroke.ql-fill, ${thisID} .ql-bubble.ql-toolbar button.ql-active .ql-stroke.ql-fill, ${thisID} .ql-bubble .ql-toolbar button.ql-active .ql-stroke.ql-fill, ${thisID} .ql-bubble.ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill, ${thisID} .ql-bubble .ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill, ${thisID} .ql-bubble.ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill, ${thisID} .ql-bubble .ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill, ${thisID} .ql-bubble.ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill, ${thisID} .ql-bubble .ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill, ${thisID} .ql-bubble.ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill, ${thisID} .ql-bubble .ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill { fill: ${properties.item_hover_color}; } ${thisID} .ql-bubble.ql-toolbar button:hover .ql-stroke, ${thisID} .ql-bubble .ql-toolbar button:hover .ql-stroke, ${thisID} .ql-bubble.ql-toolbar button:focus .ql-stroke, ${thisID} .ql-bubble .ql-toolbar button:focus .ql-stroke, ${thisID} .ql-bubble.ql-toolbar button.ql-active .ql-stroke,${thisID} .ql-bubble .ql-toolbar button.ql-active .ql-stroke, ${thisID} .ql-bubble.ql-toolbar .ql-picker-label:hover .ql-stroke, ${thisID} .ql-bubble .ql-toolbar .ql-picker-label:hover .ql-stroke, ${thisID} .ql-bubble.ql-toolbar .ql-picker-label.ql-active .ql-stroke, ${thisID} .ql-bubble .ql-toolbar .ql-picker-label.ql-active .ql-stroke, ${thisID} .ql-bubble.ql-toolbar .ql-picker-item:hover .ql-stroke,${thisID} .ql-bubble .ql-toolbar .ql-picker-item:hover .ql-stroke, ${thisID} .ql-bubble.ql-toolbar .ql-picker-item.ql-selected .ql-stroke,${thisID} .ql-bubble .ql-toolbar .ql-picker-item.ql-selected .ql-stroke, ${thisID} .ql-bubble.ql-toolbar button:hover .ql-stroke-miter, ${thisID} .ql-bubble .ql-toolbar button:hover .ql-stroke-miter, ${thisID} .ql-bubble.ql-toolbar button:focus .ql-stroke-miter, ${thisID} .ql-bubble .ql-toolbar button:focus .ql-stroke-miter, ${thisID} .ql-bubble.ql-toolbar button.ql-active .ql-stroke-miter, ${thisID} .ql-bubble .ql-toolbar button.ql-active .ql-stroke-miter, ${thisID} .ql-bubble.ql-toolbar .ql-picker-label:hover .ql-stroke-miter, ${thisID} .ql-bubble .ql-toolbar .ql-picker-label:hover .ql-stroke-miter, ${thisID} .ql-bubble.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter, ${thisID} .ql-bubble .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter, ${thisID} .ql-bubble.ql-toolbar .ql-picker-item:hover .ql-stroke-miter, ${thisID} .ql-bubble .ql-toolbar .ql-picker-item:hover .ql-stroke-miter,${thisID} .ql-bubble.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter,${thisID} .ql-bubble .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter {  stroke: ${properties.item_hover_color};} ${thisID} .ql-bubble .ql-stroke {  fill: none;  stroke: ${properties.toolbar_icon_color};  stroke-linecap: round;  stroke-linejoin: round;  stroke-width: 2;} ${thisID} .ql-bubble .ql-stroke-miter {  fill: none;  stroke: ${properties.toolbar_icon_color};  stroke-miterlimit: 10;  stroke-width: 2;} ${thisID} .ql-bubble .ql-fill, ${thisID} .ql-bubble .ql-stroke .ql-fill {  fill: ${properties.toolbar_icon_color};} ${thisID} .ql-bubble .ql-empty {  fill: none;} ${thisID} .ql-bubble .ql-picker {  color: ${properties.toolbar_icon_color};  display: inline-block;  float: left;  font-size: 14px;  font-weight: 500;  height: 24px;  position: relative;  vertical-align: middle;} ${thisID} .ql-bubble .ql-picker-options {  background-color: ${properties.toolbar_bg};   min-width: 100%;  padding: 4px 8px;} ${thisID} .ql-bubble .ql-picker.ql-expanded .ql-picker-label {  color: ${properties.toolbar_bg};  z-index: 2;} ${thisID} .ql-bubble .ql-picker.ql-expanded .ql-picker-label .ql-fill {  fill: ${properties.toolbar_icon_color};} ${thisID} .ql-bubble .ql-picker.ql-expanded .ql-picker-label .ql-stroke {  stroke: ${properties.toolbar_border_color};} .ql-editor p, .ql-editor ol, .ql-editor ul, .ql-editor pre, .ql-editor blockquote, .ql-editor h1, .ql-editor h2, .ql-editor h3, .ql-editor h4, .ql-editor h5, .ql-editor h6 {  color: ${properties.bubble.font_color()};} ${thisID} .ql-bubble .ql-editor pre.ql-syntax { color: ${properties.syntax_font_color}; background-color: ${properties.syntax_bg}; border-radius: ${properties.syntax_border_radius}px;} ${thisID} .ql-bubble .ql-editor blockquote { border-left: ${properties.quote_border_width}px solid ${properties.quote_border_color}; margin-bottom: 5px; margin-top: 5px; padding-left: 16px;   background-color: ${properties.quote_bg};} .ql-editor .ql-font-serif { font-family: ${properties.font_serif};} .ql-editor .ql-font-monospace { font-family: ${properties.font_mono};} ${thisID} .ql-formats button { color: ${properties.toolbar_icon_color};}`;
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
        instance.data.qabli = properties;
    }
}