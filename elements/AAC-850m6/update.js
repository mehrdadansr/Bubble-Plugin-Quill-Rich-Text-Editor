function(instance, properties, context) {

    const container = document.getElementById(instance.data.divName);
    if (instance.data.round === 0) {
        const { bubble, ...otherProp } = properties;
        instance.data.qabli = otherProp;

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
    const existingQuillScript = document.querySelector('head script[src="https://cdn.quilljs.com/1.3.6/quill.js"]');
    if (!existingQuillScript && instance.data.round === 0) {
        instance.data.round = 1;
        const quillStylesheet = document.createElement('link');
        quillStylesheet.rel = 'stylesheet';
        quillStylesheet.href = (properties.theme === "snow") ? 'https://cdn.quilljs.com/1.3.6/quill.snow.css' : 'https://cdn.quilljs.com/1.3.6/quill.bubble.css';

        document.head.appendChild(quillStylesheet);

        const quillScript = document.createElement('script');
        quillScript.src = "https://cdn.quilljs.com/1.3.6/quill.js";

        document.body.appendChild(quillScript);


        // Initialize Quill editor after library and stylesheet have loaded
        quillScript.onload = () => {



            /**
             * toolbar
             */
            // let toolbarOptions;
            const getToolbarOptions = (properties) => {
                const toolbarPresets = {
                    'Basic Formatting': [
                        ['bold', 'italic', 'underline'],
                        [{ 'indent': '-1' }, { 'indent': '+1' }],
                        [{ 'color': [] }, { 'background': [] }, 'link'],
                        [{ 'header': [1, 2, 3, false] }]
                    ],
                    'Advanced Formatting': [
                        ['bold', 'italic', 'underline', 'strike', { 'script': 'sub' }, { 'script': 'super' }],
                        [{ 'list': 'bullet' }, { 'indent': '+1' }],
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                        [{ 'color': [] }, { 'background': [] }, { 'font': [] }, { 'size': ['small', false, 'large', 'huge'] }],
                        [{ 'direction': 'rtl' }, { 'align': [] }],
                        ['clean']
                    ],
                    'Content Creation': [
                        ['bold', 'italic', 'underline', { 'list': 'ordered' }, { 'list': 'bullet' }],
                        [{ 'header': [1, 2, 3, false] }, 'blockquote', 'code-block'],
                        [{ 'color': [] }, { 'background': [] }, { 'font': [] }, { 'size': ['small', false, 'large'] }, { 'align': [] }, { 'direction': 'rtl' }],
                        ['link', 'image', 'video'],
                        ['clean']
                    ],
                    'Full Formatting': [
                        ['bold', 'italic', 'underline', 'strike'],
                        ['blockquote', 'code-block'],
                        [{ 'header': 1 }, { 'header': 2 }],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        [{ 'script': 'sub' }, { 'script': 'super' }],
                        [{ 'indent': '-1' }, { 'indent': '+1' }],
                        [{ 'direction': 'rtl' }],
                        [{ 'size': ['small', false, 'large', 'huge'] }],
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                        ['link', 'image', 'video', 'formula'],
                        [{ 'color': [] }, { 'background': [] }],
                        [{ 'font': [] }],
                        [{ 'align': [] }],
                        ['clean']
                    ],
                    'Custom': () => {
                        try {
                            return JSON.parse('[' + properties.customtoolbar + ']');
                        } catch (error) {
                            if (window.app.app_version === 'test')
                                console.error("Error parsing custom toolbar:", error.message);
                            return [
                                ['bold', 'italic', 'underline', 'link'],
                                [{ 'header': [1, 2, 3, false] }],
                                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                ['clean']
                            ]; // Return a default value.
                        }
                    },
                    'default': [
                        ['bold', 'italic', 'underline', 'link'],
                        [{ 'header': [1, 2, 3, false] }],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        ['clean']
                    ]
                };

                const toolbarOption = toolbarPresets[properties.toolbarpreset];

                // If toolbarOption is a function ('Custom')
                return (typeof toolbarOption === "function" ? toolbarOption() : toolbarOption) || toolbarPresets.default;
            };


            const toolbarOptions = getToolbarOptions(properties);




            /**
            * New Quill
            */

            if (properties.dropImage) addImageDrop();


            if (instance.data.quill) {
                instance.data.quill.update();
                makeChanges();
                instance.data.quill.root.dataset.placeholder = (properties.placeholder) ? properties.placeholder : '';

            } else {
                /**
                 * options
                 **/

                let options = {
                    modules: {
                        syntax: properties.syntax,
                        imageDrop: properties.dropImage,
                        toolbar: toolbarOptions
                    },
                    readOnly: properties.readOnly,
                    theme: properties.theme
                };


                instance.data.quill = new Quill(container, options);


                /*
                *Events Trigger
                */
                // Define a debounce function
                function debounce(func, wait, immediate) {
                    var timeout;
                    return function () {
                        var context = this, args = arguments;
                        var later = function () {
                            timeout = null;
                            if (!immediate) func.apply(context, args);
                        };
                        var callNow = immediate && !timeout;
                        clearTimeout(timeout);
                        timeout = setTimeout(later, wait);
                        if (callNow) func.apply(context, args);
                    };
                }

                // The function you want to run when the user has stopped typing
                function onTextChange() {
                    saveAutoBinding(instance);
                    instance.triggerEvent("textchange");
                }

                function onEditorChange() {
                    instance.triggerEvent("anyChange");
                }

                // Wrap the onTextChange function with a debounce
                const delay = properties.debounceDelay || 0;
                const debouncedTextChange = debounce(onTextChange, delay);
                const debouncedEditorChange = debounce(onEditorChange, delay);


                //on text change
                var quill = instance.data.quill;
                quill.on('text-change', function (delta, oldDelta, source) {
                    instance.publishState("change", JSON.stringify(delta));
                    instance.publishState("beforechange", JSON.stringify(oldDelta));
                    instance.publishState("lastlength", JSON.stringify(quill.getLength() - 1));
                    instance.publishState("getHTML", quill.root.innerHTML);

                    // Use the debounced function instead of the direct call
                    debouncedTextChange();
                });
                //on selection change
                quill.on('selection-change', function (range, oldRange, source) {
                    if (range) {
                        instance.publishState("selectionindex", range.index + 1);
                        instance.publishState("selectionlength", range.length);
                        instance.triggerEvent("selectionchange");
                    }
                });
                //on editor change
                quill.on('editor-change', function (eventName, ...args) {
                    quill.update();
                    if (eventName === 'selection-change') {
                        let range = args[0];
                        if (range) instance.publishState("caretIndex", range.index + 1);
                    }
                    if (eventName === 'text-change') {
                        //	 let delta = args[0]
                        instance.publishState("lasttext", quill.getText());
                        instance.publishState("lastcontents", JSON.stringify(quill.getContents()));
                        //instance.publishState("lastlength", quill.getLength())
                    }

                    instance.publishState("hasfocus", quill.hasFocus());
                    if (!quill.hasFocus()) instance.publishState("caretIndex", null);
                    debouncedEditorChange();

                });

                // Set Initial Value & Place Holder
                if (typeof properties.initial_content !== 'undefined' && properties.autobinding == null) {

                    switch (properties.initial_type) {
                        case "Content":
                            var initial_content = JSON.parse(properties.initial_content);
                            quill.setContents(initial_content);
                            break;
                        case "Text":
                            quill.setText(properties.initial_content);
                            break;
                        case "HTML":
                            quill.clipboard.dangerouslyPasteHTML(properties.initial_content);
                            break;
                        default:
                            console.log("Type not detected");
                            break;
                    }
                } else {
                    setAutoBinding(instance, properties);
                }
                quill.root.dataset.placeholder = (properties.placeholder) ? properties.placeholder : '';
            };
            makeChanges();
        };
    } else {
        setAutoBinding(instance, properties);
        const { bubble, ...otherProp } = properties;
        if (instance.data.qabli !== otherProp) {
            makeChanges();
        }
    }



    function makeChanges() {
        const quill = instance.data.quill;
        // Get Elements
        if (!container) return;
        let parentElement = instance.canvas[0];
        //container.parentNode;
        if (!parentElement) return;
        parentElement.classList.add('ql-parent');
        // let qlToolbar = parentElement.querySelector('.ql-toolbar');
        let qlContainer = parentElement.querySelector('.ql-editor');
        let babaConti = parentElement.querySelector('.ql-container');

        /**
         * Parent Element Styles
        */
        if (properties.theme === 'bubble') parentElement.style.overflow = "visible";
        parentElement.id = instance.data.parentID;

        /**
         * Toolbar CSS
         */

        styleQuillToolbar(parentElement, properties);

        styleQuillContainer(qlContainer, babaConti, properties);



        let toolbarCss = false;
        let classRule = ['toolbar_icon_color', 'item_hover_color'];
        classRule.forEach(key => {
            toolbarCss = (instance.data.qabli[key] !== properties[key]) ? true : toolbarCss;
        });

        // Apply Customized CSS Classes [One Time]
        if (instance.data.kardam === 0 || toolbarCss) {
            let css;
            const thisID = `#${instance.data.parentID}`;
            if (properties.theme === 'snow') {

                css = `${thisID} .ql-snow.ql-toolbar button:hover, ${thisID} .ql-snow .ql-toolbar button:hover, ${thisID} .ql-snow.ql-toolbar button:focus, ${thisID} .ql-snow .ql-toolbar button:focus, ${thisID} .ql-snow.ql-toolbar button.ql-active, ${thisID} .ql-snow .ql-toolbar button.ql-active, ${thisID} .ql-snow.ql-toolbar .ql-picker-label:hover, ${thisID} .ql-snow .ql-toolbar .ql-picker-label:hover, ${thisID} .ql-snow.ql-toolbar .ql-picker-label.ql-active, ${thisID} .ql-snow .ql-toolbar .ql-picker-label.ql-active, ${thisID} .ql-snow.ql-toolbar .ql-picker-item:hover, ${thisID} .ql-snow .ql-toolbar .ql-picker-item:hover, ${thisID} .ql-snow.ql-toolbar .ql-picker-item.ql-selected, ${thisID} .ql-snow .ql-toolbar .ql-picker-item.ql-selected { color: ${properties.item_hover_color}; } ${thisID} .ql-snow.ql-toolbar button:hover .ql-fill, ${thisID} .ql-snow .ql-toolbar button:hover .ql-fill, ${thisID} .ql-snow.ql-toolbar button:focus .ql-fill, ${thisID} .ql-snow .ql-toolbar button:focus .ql-fill, ${thisID} .ql-snow.ql-toolbar button.ql-active .ql-fill, ${thisID} .ql-snow .ql-toolbar button.ql-active .ql-fill, ${thisID} .ql-snow.ql-toolbar .ql-picker-label:hover .ql-fill, ${thisID} .ql-snow .ql-toolbar .ql-picker-label:hover .ql-fill, ${thisID} .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill, ${thisID} .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-fill, ${thisID} .ql-snow.ql-toolbar .ql-picker-item:hover .ql-fill, ${thisID} .ql-snow .ql-toolbar .ql-picker-item:hover .ql-fill, ${thisID} .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-fill, ${thisID} .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-fill, ${thisID} .ql-snow.ql-toolbar button:hover .ql-stroke.ql-fill, ${thisID} .ql-snow .ql-toolbar button:hover .ql-stroke.ql-fill, ${thisID} .ql-snow.ql-toolbar button:focus .ql-stroke.ql-fill, ${thisID} .ql-snow .ql-toolbar button:focus .ql-stroke.ql-fill, ${thisID} .ql-snow.ql-toolbar button.ql-active .ql-stroke.ql-fill, ${thisID} .ql-snow .ql-toolbar button.ql-active .ql-stroke.ql-fill, ${thisID} .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill, ${thisID} .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill, ${thisID} .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill, ${thisID} .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill, ${thisID} .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill, ${thisID} .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill, ${thisID} .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill, ${thisID} .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill { fill: ${properties.item_hover_color}; } ${thisID} .ql-snow.ql-toolbar button:hover .ql-stroke, ${thisID} .ql-snow .ql-toolbar button:hover .ql-stroke, ${thisID} .ql-snow.ql-toolbar button:focus .ql-stroke, ${thisID} .ql-snow .ql-toolbar button:focus .ql-stroke, ${thisID} .ql-snow.ql-toolbar button.ql-active .ql-stroke, ${thisID} .ql-snow .ql-toolbar button.ql-active .ql-stroke, ${thisID} .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke, ${thisID} .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke, ${thisID} .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke, ${thisID} .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke, ${thisID} .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke, ${thisID} .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke, ${thisID} .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke,.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke, ${thisID} .ql-snow.ql-toolbar button:hover .ql-stroke-miter, ${thisID} .ql-snow .ql-toolbar button:hover .ql-stroke-miter, ${thisID} .ql-snow.ql-toolbar button:focus .ql-stroke-miter,${thisID} .ql-snow .ql-toolbar button:focus .ql-stroke-miter, ${thisID} .ql-snow.ql-toolbar button.ql-active .ql-stroke-miter, ${thisID} .ql-snow .ql-toolbar button.ql-active .ql-stroke-miter, ${thisID} .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke-miter, ${thisID} .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke-miter, ${thisID} .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter, ${thisID} .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter, ${thisID} .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke-miter, ${thisID} .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke-miter,.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter, ${thisID} .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter {  stroke: ${properties.item_hover_color};} ${thisID} .ql-snow .ql-stroke {fill: none;  stroke: ${properties.toolbar_icon_color};  stroke-linecap: round;  stroke-linejoin: round; stroke-width: 2;} ${thisID} .ql-snow .ql-stroke-miter {  fill: none;  stroke: ${properties.toolbar_icon_color};  stroke-miterlimit: 10;  stroke-width: 2;} ${thisID} .ql-snow .ql-fill, ${thisID} .ql-snow .ql-stroke .ql-fill {  fill: ${properties.toolbar_icon_color};} ${thisID} .ql-snow .ql-empty {  fill: none;} ${thisID} .ql-snow .ql-picker {  color: ${properties.toolbar_icon_color};  display: inline-block;  float: left;  font-size: 14px;  font-weight: 500;  height: 24px;  position: relative;  vertical-align: middle;} ${thisID} .ql-snow .ql-picker-options {  background-color: ${properties.toolbar_bg}; min-width: 100%;  padding: 4px 8px;} ${thisID} .ql-snow .ql-picker.ql-expanded .ql-picker-label {  color: ${properties.toolbar_bg};  z-index: 2;} ${thisID} .ql-snow .ql-picker.ql-expanded .ql-picker-label .ql-fill {  fill: ${properties.toolbar_icon_color};} ${thisID} .ql-snow .ql-picker.ql-expanded .ql-picker-label .ql-stroke {  stroke: ${properties.toolbar_border_color};} ${thisID} .ql-editor p, .ql-editor ol, ${thisID} .ql-editor ul, .ql-editor pre, .ql-editor blockquote, .ql-editor h1, ${thisID} .ql-editor h2, ${thisID} .ql-editor h3, ${thisID} .ql-editor h4, ${thisID} .ql-editor h5, ${thisID} .ql-editor h6 {  color: ${properties.bubble.font_color()};} ${thisID} .ql-snow .ql-editor pre.ql-syntax { color: ${properties.syntax_font_color}; background-color: ${properties.syntax_bg}; border-radius: ${properties.syntax_border_radius}px;} ${thisID} .ql-snow .ql-editor blockquote { border-left: ${properties.quote_border_width}px solid ${properties.quote_border_color}; padding-left: 16px;   background-color: ${properties.quote_bg};} ${thisID} .ql-editor .ql-font-serif { font-family: ${properties.font_serif};} ${thisID} .ql-editor .ql-font-monospace { font-family: ${properties.font_mono};} ${thisID} .ql-formats button {  color: ${properties.toolbar_icon_color};}`;
            } else {
                css = `${thisID} .ql-bubble.ql-toolbar button:hover, ${thisID} .ql-bubble .ql-toolbar button:hover, ${thisID} .ql-bubble.ql-toolbar button:focus, ${thisID} .ql-bubble .ql-toolbar button:focus, ${thisID} .ql-bubble.ql-toolbar button.ql-active, ${thisID} .ql-bubble .ql-toolbar button.ql-active, ${thisID} .ql-bubble.ql-toolbar .ql-picker-label:hover, ${thisID} .ql-bubble .ql-toolbar .ql-picker-label:hover, ${thisID} .ql-bubble.ql-toolbar .ql-picker-label.ql-active, ${thisID} .ql-bubble .ql-toolbar .ql-picker-label.ql-active, ${thisID} .ql-bubble.ql-toolbar .ql-picker-item:hover, ${thisID} .ql-bubble .ql-toolbar .ql-picker-item:hover, ${thisID} .ql-bubble.ql-toolbar .ql-picker-item.ql-selected, ${thisID} .ql-bubble .ql-toolbar .ql-picker-item.ql-selected { color: ${properties.item_hover_color}; } ${thisID} .ql-bubble.ql-toolbar button:hover .ql-fill, ${thisID} .ql-bubble .ql-toolbar button:hover .ql-fill, ${thisID} .ql-bubble.ql-toolbar button:focus .ql-fill, ${thisID} .ql-bubble .ql-toolbar button:focus .ql-fill, ${thisID} .ql-bubble.ql-toolbar button.ql-active .ql-fill, ${thisID} .ql-bubble .ql-toolbar button.ql-active .ql-fill, ${thisID} .ql-bubble.ql-toolbar .ql-picker-label:hover .ql-fill, ${thisID} .ql-bubble .ql-toolbar .ql-picker-label:hover .ql-fill, ${thisID} .ql-bubble.ql-toolbar .ql-picker-label.ql-active .ql-fill, ${thisID} .ql-bubble .ql-toolbar .ql-picker-label.ql-active .ql-fill, ${thisID} .ql-bubble.ql-toolbar .ql-picker-item:hover .ql-fill, ${thisID} .ql-bubble .ql-toolbar .ql-picker-item:hover .ql-fill, ${thisID} .ql-bubble.ql-toolbar .ql-picker-item.ql-selected .ql-fill, ${thisID} .ql-bubble .ql-toolbar .ql-picker-item.ql-selected .ql-fill, ${thisID} .ql-bubble.ql-toolbar button:hover .ql-stroke.ql-fill, ${thisID} .ql-bubble .ql-toolbar button:hover .ql-stroke.ql-fill, ${thisID} .ql-bubble.ql-toolbar button:focus .ql-stroke.ql-fill, ${thisID} .ql-bubble .ql-toolbar button:focus .ql-stroke.ql-fill, ${thisID} .ql-bubble.ql-toolbar button.ql-active .ql-stroke.ql-fill, ${thisID} .ql-bubble .ql-toolbar button.ql-active .ql-stroke.ql-fill, ${thisID} .ql-bubble.ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill, ${thisID} .ql-bubble .ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill, ${thisID} .ql-bubble.ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill, ${thisID} .ql-bubble .ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill, ${thisID} .ql-bubble.ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill, ${thisID} .ql-bubble .ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill, ${thisID} .ql-bubble.ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill, ${thisID} .ql-bubble .ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill { fill: ${properties.item_hover_color}; } ${thisID} .ql-bubble.ql-toolbar button:hover .ql-stroke, ${thisID} .ql-bubble .ql-toolbar button:hover .ql-stroke, ${thisID} .ql-bubble.ql-toolbar button:focus .ql-stroke, ${thisID} .ql-bubble .ql-toolbar button:focus .ql-stroke, ${thisID} .ql-bubble.ql-toolbar button.ql-active .ql-stroke,${thisID} .ql-bubble .ql-toolbar button.ql-active .ql-stroke, ${thisID} .ql-bubble.ql-toolbar .ql-picker-label:hover .ql-stroke, ${thisID} .ql-bubble .ql-toolbar .ql-picker-label:hover .ql-stroke, ${thisID} .ql-bubble.ql-toolbar .ql-picker-label.ql-active .ql-stroke, ${thisID} .ql-bubble .ql-toolbar .ql-picker-label.ql-active .ql-stroke, ${thisID} .ql-bubble.ql-toolbar .ql-picker-item:hover .ql-stroke,${thisID} .ql-bubble .ql-toolbar .ql-picker-item:hover .ql-stroke, ${thisID} .ql-bubble.ql-toolbar .ql-picker-item.ql-selected .ql-stroke,${thisID} .ql-bubble .ql-toolbar .ql-picker-item.ql-selected .ql-stroke, ${thisID} .ql-bubble.ql-toolbar button:hover .ql-stroke-miter, ${thisID} .ql-bubble .ql-toolbar button:hover .ql-stroke-miter, ${thisID} .ql-bubble.ql-toolbar button:focus .ql-stroke-miter, ${thisID} .ql-bubble .ql-toolbar button:focus .ql-stroke-miter, ${thisID} .ql-bubble.ql-toolbar button.ql-active .ql-stroke-miter, ${thisID} .ql-bubble .ql-toolbar button.ql-active .ql-stroke-miter, ${thisID} .ql-bubble.ql-toolbar .ql-picker-label:hover .ql-stroke-miter, ${thisID} .ql-bubble .ql-toolbar .ql-picker-label:hover .ql-stroke-miter, ${thisID} .ql-bubble.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter, ${thisID} .ql-bubble .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter, ${thisID} .ql-bubble.ql-toolbar .ql-picker-item:hover .ql-stroke-miter, ${thisID} .ql-bubble .ql-toolbar .ql-picker-item:hover .ql-stroke-miter,${thisID} .ql-bubble.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter,${thisID} .ql-bubble .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter {  stroke: ${properties.item_hover_color};} ${thisID} .ql-bubble .ql-stroke {  fill: none;  stroke: ${properties.toolbar_icon_color};  stroke-linecap: round;  stroke-linejoin: round;  stroke-width: 2;} ${thisID} .ql-bubble .ql-stroke-miter {  fill: none;  stroke: ${properties.toolbar_icon_color};  stroke-miterlimit: 10;  stroke-width: 2;} ${thisID} .ql-bubble .ql-fill, ${thisID} .ql-bubble .ql-stroke .ql-fill {  fill: ${properties.toolbar_icon_color};} ${thisID} .ql-bubble .ql-empty {  fill: none;} ${thisID} .ql-bubble .ql-picker {  color: ${properties.toolbar_icon_color};  display: inline-block;  float: left;  font-size: 14px;  font-weight: 500;  height: 24px;  position: relative;  vertical-align: middle;} ${thisID} .ql-bubble .ql-picker-options {  background-color: ${properties.toolbar_bg};   min-width: 100%;  padding: 4px 8px;} ${thisID} .ql-bubble .ql-picker.ql-expanded .ql-picker-label {  color: ${properties.toolbar_bg};  z-index: 2;} ${thisID} .ql-bubble .ql-picker.ql-expanded .ql-picker-label .ql-fill {  fill: ${properties.toolbar_icon_color};} ${thisID} .ql-bubble .ql-picker.ql-expanded .ql-picker-label .ql-stroke {  stroke: ${properties.toolbar_border_color};} .ql-editor p, .ql-editor ol, .ql-editor ul, .ql-editor pre, .ql-editor blockquote, .ql-editor h1, .ql-editor h2, .ql-editor h3, .ql-editor h4, .ql-editor h5, .ql-editor h6 {  color: ${properties.bubble.font_color()};} ${thisID} .ql-bubble .ql-editor pre.ql-syntax { color: ${properties.syntax_font_color}; background-color: ${properties.syntax_bg}; border-radius: ${properties.syntax_border_radius}px;} ${thisID} .ql-bubble .ql-editor blockquote { border-left: ${properties.quote_border_width}px solid ${properties.quote_border_color}; margin-bottom: 5px; margin-top: 5px; padding-left: 16px;   background-color: ${properties.quote_bg};} .ql-editor .ql-font-serif { font-family: ${properties.font_serif};} .ql-editor .ql-font-monospace { font-family: ${properties.font_mono};} ${thisID} .ql-formats button { color: ${properties.toolbar_icon_color};}`;
            }

            appendStyles(css);
            setBubbleStyles(instance, properties);
            instance.data.kardam = 1;

        }
        const { bubble, ...otherProperties } = properties;
        instance.data.qabli = otherProperties;
    }

    function appendStyles(css) {
        const head = document.head || document.getElementsByTagName('head')[0];
        const styleElement = document.createElement('style');
        styleElement.appendChild(document.createTextNode(css));
        head.appendChild(styleElement);
    }


    /**
    * Modify the styles of the Quill toolbar and its elements based on provided properties.
    *
    * @param {Element} parentElement - The parent element to start the query from.
    * @param {Object} properties - The properties to modify the styles.
    */
    function styleQuillToolbar(parentElement, properties) {
        /** @type {HTMLElement | null} */
        const qlToolbar = parentElement.querySelector('.ql-toolbar');

        if (!qlToolbar) return; // Exit if the toolbar is not found

        if (properties.toolbar_hide) {
            qlToolbar.classList.add("hide-toolbar");
        } else {
            qlToolbar.classList.remove("hide-toolbar"); // Fixed the class name here (removed the dot)
        }

        qlToolbar.style.border = (properties.toolbar_border_width > 0) ? `${properties.toolbar_border_width}px solid ${properties.toolbar_border_color}` : 'none';
        qlToolbar.style.backgroundColor = properties.toolbar_bg;
        qlToolbar.style.padding = `${properties.toolbar_padding}px`;

        // Modify buttons styles
        const buttons = parentElement.querySelectorAll('.ql-toolbar button');
        for (let button of buttons) {
            button.style.height = `${properties.toolbar_icon_size}px`;
            button.style.width = `${properties.toolbar_icon_size}px`;
        }

        // Modify picker options styles
        const pickerOptions = parentElement.querySelectorAll('.ql-picker-options');

        for (let option of pickerOptions) {
            option.style.backgroundColor = properties.toolbar_bg;
        }
    }


    function styleQuillContainer(qlContainer, babaConti, properties) {
        try {
            if (!qlContainer) {
                throw new Error("The qlContainer element is not provided or is null.");
            }

            // Style the container
            qlContainer.style.backgroundColor = properties.container_bg;
            qlContainer.style.padding = `${properties.container_padding}px`;
            qlContainer.style.color = properties.placeholder_color;
            qlContainer.style.fontStyle = properties.placeholder_style;

            if (properties.bubble.fit_height()) {
                qlContainer.style.overflowY = "visible"; // Let the container grow with the content
                qlContainer.style.flexGrow = "1"; // Do not occupy the remaining space
            } else {
                qlContainer.style.overflowY = "auto"; // Show scrollbar if the content exceeds
                qlContainer.style.flexGrow = "1"; // Occupy the remaining space
            }

            // Style the 'babaConti' element
            babaConti.style.border = properties.container_border_width > 0
                ? `${properties.container_border_width}px solid ${properties.container_border_color}`
                : 'none';
            babaConti.style.fontFamily = "inherit";
            babaConti.style.fontSize = "inherit";

        } catch (error) {
            if (window.app.app_version === 'test')
                console.error("Error styling Quill container:", error.message);
        }
    }

    function addImageDrop() {
        var exports = {};
        "use strict"; Object.defineProperty(exports, "__esModule", { value: true }); var _createClass = function () { function e(e, t) { for (var a = 0; a < t.length; a++) { var i = t[a]; i.enumerable = i.enumerable || false; i.configurable = true; if ("value" in i) i.writable = true; Object.defineProperty(e, i.key, i); } } return function (t, a, i) { if (a) e(t.prototype, a); if (i) e(t, i); return t; }; }(); function _classCallCheck(e, t) { if (!(e instanceof t)) { throw new TypeError("Cannot call a class as a function"); } } var ImageDrop = exports.ImageDrop = function () { function e(t) { var a = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}; _classCallCheck(this, e); this.quill = t; this.handleDrop = this.handleDrop.bind(this); this.handlePaste = this.handlePaste.bind(this); this.quill.root.addEventListener("drop", this.handleDrop, false); this.quill.root.addEventListener("paste", this.handlePaste, false); } _createClass(e, [{ key: "handleDrop", value: function e(t) { t.preventDefault(); if (t.dataTransfer && t.dataTransfer.files && t.dataTransfer.files.length) { if (document.caretRangeFromPoint) { var a = document.getSelection(); var i = document.caretRangeFromPoint(t.clientX, t.clientY); if (a && i) { a.setBaseAndExtent(i.startContainer, i.startOffset, i.startContainer, i.startOffset); } } this.readFiles(t.dataTransfer.files, this.insert.bind(this)); } } }, { key: "handlePaste", value: function e(t) { var a = this; if (t.clipboardData && t.clipboardData.items && t.clipboardData.items.length) { this.readFiles(t.clipboardData.items, function (e) { var t = a.quill.getSelection(); if (t) { } else { setTimeout(function () { return a.insert(e); }, 0); } }); } } }, { key: "insert", value: function e(t) { var a = (this.quill.getSelection() || {}).index || this.quill.getLength(); this.quill.insertEmbed(a, "image", t, "user"); } }, { key: "readFiles", value: function e(t, a) { [].forEach.call(t, function (e) { if (!e.type.match(/^image\/(gif|jpe?g|a?png|svg|webp|bmp|vnd\.microsoft\.icon)/i)) { return; } var t = new FileReader; t.onload = function (e) { a(e.target.result); }; var i = e.getAsFile ? e.getAsFile() : e; if (i instanceof Blob) { t.readAsDataURL(i); } }); } }]); return e; }();
        window.Quill.register('modules/imageDrop', exports.ImageDrop);
    }


    function setBubbleStyles(instance, properties) {
        const { bubbleStyles } = properties;
        if (!bubbleStyles) return;
        const styleNames = bubbleStyles.split(',');
        const thisID = instance.data.parentID;
        const styleProps = styleNames.map(name => stylePropsByName(name));
        // console.log(styleProps);
        if (!styleProps || !styleProps[0]) return;

        createCssRules(thisID, styleProps);
    }

    function createCssRules(id, objectsArray) {
        const styleElement = document.createElement('style');
        document.head.appendChild(styleElement);

        // CSS properties mapping
        const cssPropertyMap = {
            '%b': value => value ? 'font-weight: bold;' : '',
            '%f': value => `font-family: ${value.split(':::')[0]};`,
            '%i': value => value ? 'font-style: italic;' : '',
            '%u': value => value ? 'text-decoration: underline;' : '',
            '%bc': value => `border-color: ${value};`,
            '%br': value => `border-radius: ${value}px;`,
            '%bw': value => `border-width: ${value}px;`,
            '%fc': value => `color: ${value};`,
            '%fs': value => `font-size: ${value}px;`,
            '%lh': value => `line-height: ${value};`,
            '%ls': value => `letter-spacing: ${value}px;`,
            '%vc': value => value ? 'display: flex; align-items: center;' : '',
            '%ws': value => `word-spacing: ${value}px;`,
            '%bas': value => `background-style: ${value};`,
            '%bgc': value => `background-color: ${value};`,
            '%bos': value => `border-style: ${value};`,
            '%tes': value => value ? 'text-shadow: 1px 1px 2px #000;' : '',
            '%tsb': value => `text-shadow-blur: ${value}px;`,
            'opacity': value => `opacity: ${value / 100};`,
            'font_weight': value => `font-weight: ${value};`,
            'padding_top': value => `padding-top: ${value}px;`,
            'padding_left': value => `padding-left: ${value}px;`,
            'padding_right': value => `padding-right: ${value}px;`,
            'padding_bottom': value => `padding-bottom: ${value}px;`,
            // Other properties can be added here
        };

        let cssContent = '';

        objectsArray.forEach(obj => {
            // Construct the selector
            const selector = `#${id} .ql-editor ${obj.tag_type}`;

            // Construct the CSS rule set
            let rules = Object.entries(obj)
                .map(([key, value]) => {
                    // Use the mapping object to convert object keys to CSS properties
                    const cssPropertyFunction = cssPropertyMap[key];
                    return cssPropertyFunction ? cssPropertyFunction(value) : '';
                })
                .join(' ');

            // Append the complete rule to the cssContent
            cssContent += `${selector} { ${rules} }\n`;
        });

        // Add the CSS content to the style element
        styleElement.appendChild(document.createTextNode(cssContent));
    }

    function stylePropsByName(style) {
        // @ts-ignore
        let obj = window.app.styles;
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (obj[key]['%x'] === 'Text' && obj[key]['%d'] === style) {
                    return obj[key]['%p'];
                }
            }
        }
        return null;
    }

    function setAutoBinding(instance, properties) {
        const quill = instance.data.quill;
        if (!quill || typeof properties.autobinding === 'undefined') return;

        const content = properties.autobinding;
        if (content === getContentByType(instance, properties.initial_type)) return;
        try {
            const updateContent = {
                Content: (content) => quill.updateContents(JSON.parse(content)),
                Text: (content) => quill.setText(content),
                HTML: (content) => quill.clipboard.dangerouslyPasteHTML(content)
            };
            if (updateContent[properties.initial_type])
                updateContent[properties.initial_type](content);

        } catch (error) {
            if (window.app.app_version === 'test')
                console.log(error.message);
        }

    }

    function getContentByType(instance, type) {
        const quill = instance.data.quill;
        if (!quill) return;
        const updatedContent = {
            Content: () => JSON.stringify(quill.getContents()),
            Text: () => quill.getText(),
            HTML: () => quill.root.innerHTML
        };
        return updatedContent[type]();
    }




    function saveAutoBinding(instance) {
        const updatedContentText = getContentByType(instance, properties.initial_type);
        instance.publishAutobinding(updatedContentText);
    }


}