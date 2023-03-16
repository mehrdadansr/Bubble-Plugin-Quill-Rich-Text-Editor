function(instance, properties) {

    var div = $(`<div id="editor"></div>`);
    instance.canvas.append(div);


    if (window.Quill) {
        // If it is, initialize Quill editor
       /* console.log("1")
        let toolbarOptions = [
            ['bold', 'italic', 'underline'],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'color': [] }, { 'background': [] }, 'link'],
            [{ 'header': [1, 2, 3, false] }]
        ];
        let options = {
            modules: {
                toolbar: toolbarOptions
            },
            theme: "snow"
        };
        var quill = new Quill('#editor', options);*/
        console.log("2")
    } else {
        console.log("11")
        // Dynamically load Quill stylesheet
        const quillStylesheet = document.createElement('link');
        quillStylesheet.rel = 'stylesheet';
        quillStylesheet.href = 'https://cdn.quilljs.com/1.3.6/quill.snow.css';

        document.head.appendChild(quillStylesheet);

        // If not, dynamically load Quill library
        const quillScript = document.createElement('script');
        quillScript.src = 'https://cdn.quilljs.com/1.3.6/quill.js';
        document.body.appendChild(quillScript);

        console.log("22")

        // Initialize Quill editor after library and stylesheet have loaded
        quillScript.onload = () => {
            console.log("33")
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
            console.log("44")
            var qlContainer = document.getElementById('editor');
            var parentElement = qlContainer.parentNode
            var qlToolbar = document.querySelector('.ql-toolbar');
            var qlp = parentElement.querySelector('.ql-container p');
            //console.log("2qlToolbar",qlToolbar)
            var toolbarHeight = (qlToolbar) ? qlToolbar.offsetHeight : 48;
            if (qlContainer) {
                qlContainer.style.border = (properties.container_border_width > 0) ? `${properties.container_border_width}px solid ${properties.container_border_color}` : 'none';
                qlContainer.style.backgroundColor = properties.container_bg;
                qlContainer.style.padding = `${properties.container_padding}px`;
                qlContainer.style.color = properties.placeholder_color;
                //  qlContainer.style.minHeight = `${parseInt(properties.bubble.min_height_css(), 10) - toolbarHeight}px`;
                // qlContainer.style.maxHeight = `${parseInt(properties.bubble.max_height_css(), 10) - toolbarHeight}px`;
                qlContainer.style.height = `${parseInt(properties.bubble.height(), 10) - toolbarHeight}px`;
                qlContainer.style.fontFamily = "inherit"
                qlContainer.style.fontSize = "inherit"
            }
            console.log("55")
            var qlp = document.querySelector('.ql-container p');
            if (qlContainer) {
                /**
                 * Container Css
                 */
                console.log("66")

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
                    console.log("qlToolbar")
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
                    buttons[i].style.width = `${properties.toolbar_icon_size + 4}px`;
                }
                console.log("last")
            }
        }
    };
    console.log("lastlast")
}