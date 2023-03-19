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

    quill.root.dataset.placeholder = (properties.placeholder) ? properties.placeholder : '';

    // Get Elements
    var parentElement = container.parentNode
    var qlToolbar = parentElement.querySelector('.ql-toolbar');
    var qlContainer = parentElement.querySelector('.ql-container');

    /**
     * Container Css
     */



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
    
        // Apply the normal rule to iconStroke
    
         /*
        
            const pickers = parentElement.querySelectorAll('.ql-picker');
            for (let i = 0; i < pickers.length; i++) {
                pickers[i].style.fill = properties.toolbar_picker_color;
                pickers[i].style.color = properties.toolbar_picker_color;
        
            }
        
            // Apply the normal rule to iconStroke, iconFill, and iconStrokeMiter
            const iconStroke1 = parentElement.querySelectorAll('button .ql-stroke');
            for (let i = 0; i < iconStroke1.length; i++) {
                iconStroke1[i].style.stroke = properties.toolbar_icon_color;
                iconStroke1[i].style.fill = 'none';
                iconStroke1[i].style.strokeLinecap = 'round';
                iconStroke1[i].style.strokeLinejoin = 'round';
                iconStroke1[i].style.strokeWidth = '2';
            }
            const iconFill1 = parentElement.querySelectorAll('button .ql-fill');
            for (let i = 0; i < iconFill1.length; i++) {
                iconFill1[i].style.fill = properties.toolbar_icon_color;
            }
        
            const iconStrokeMiter = parentElement.querySelectorAll('button .ql-stroke-miter');
            for (let i = 0; i < iconStrokeMiter.length; i++) {
                iconStrokeMiter[i].style.fill = 'none';
                iconStrokeMiter[i].style.stroke = properties.toolbar_icon_color;
                iconStrokeMiter[i].style.strokeMiterlimit = '10';
                iconStrokeMiter[i].style.strokeWidth = '2';
            }
        
            // Apply the hover/selected rule to qlhover
            
            const qlhover = parentElement.querySelectorAll('button:hover:not(.ql-active) .ql-stroke, button.ql-active .ql-stroke, .ql-picker-label:hover .ql-stroke, .ql-picker-label.ql-active .ql-stroke, .ql-picker-item:hover .ql-stroke, .ql-picker-item.ql-selected .ql-stroke, button:hover:not(.ql-active) .ql-fill, button.ql-active .ql-fill, .ql-picker-label:hover .ql-fill, .ql-picker-label.ql-active .ql-fill, .ql-picker-item:hover .ql-fill, .ql-picker-item.ql-selected .ql-fill, button:hover:not(.ql-active) .ql-stroke.ql-fill, button.ql-active .ql-stroke.ql-fill, .ql-picker-label:hover .ql-stroke.ql-fill, .ql-picker-label.ql-active .ql-stroke.ql-fill, .ql-picker-item:hover .ql-stroke.ql-fill, .ql-picker-item.ql-selected .ql-stroke.ql-fill, button:hover:not(.ql-active) .ql-stroke-miter, button.ql-active .ql-stroke-miter, .ql-picker-label:hover .ql-stroke-miter, .ql-picker-label.ql-active .ql-stroke-miter, .ql-picker-item:hover .ql-stroke-miter, .ql-picker-item.ql-selected .ql-stroke-miter');
            for (let i = 0; i < qlhover.length; i++) {
                qlhover[i].style.stroke = properties.item_hover_color;
                qlhover[i].style.fill = properties.item_hover_color;
            }
        
            // Apply the normal rule to iconStroke and iconFill
        
            const iconStroke = parentElement.querySelectorAll('.ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-stroke,  .ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-stroke,  .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-stroke-miter,  .ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-stroke-miter ');
            for (let i = 0; i < iconStroke.length; i++) {
                iconStroke[i].style.stroke = properties.toolbar_icon_color;
            }
            const iconColor = parentElement.querySelectorAll('.ql-snow.ql-toolbar button:hover:not(.ql-active),  .ql-snow .ql-toolbar button:hover:not(.ql-active)');
            for (let i = 0; i < iconColor.length; i++) {
                iconColor[i].style.stroke = properties.toolbar_icon_color;
            }
        
            const iconFill = parentElement.querySelectorAll('.ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-fill, .ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-fill, .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-stroke.ql-fill,  .ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-stroke.ql-fill');
            for (let i = 0; i < iconFill.length; i++) {
                iconFill[i].style.fill = properties.toolbar_icon_color;
            }
            */

    /*
    const iconStrokeNormal = parentElement.querySelectorAll('.ql-snow .ql-stroke, .ql-snow .ql-stroke-miter');
      for (let i = 0; i < iconStrokeNormal.length; i++) {
          iconStrokeNormal[i].style.fill = 'none';
          iconStrokeNormal[i].style.stroke = properties.toolbar_icon_color;
      }
  
      const iconFillNormal = parentElement.querySelectorAll('.ql-snow .ql-fill,.ql-snow .ql-stroke.ql-fill');
      for (let i = 0; i < iconFillNormal.length; i++) {
          iconFillNormal[i].style.fill = properties.toolbar_icon_color;
      }
  
      // Apply the hover/selected rule to qlhover
      const qlhoverStoke = parentElement.querySelectorAll('.ql-snow.ql-toolbar button:hover .ql-stroke, .ql-snow .ql-toolbar button:hover .ql-stroke, .ql-snow.ql-toolbar button:focus .ql-stroke, .ql-snow .ql-toolbar button:focus .ql-stroke, .ql-snow.ql-toolbar button.ql-active .ql-stroke, .ql-snow .ql-toolbar button.ql-active .ql-stroke, .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke, .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke, .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke, .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke, .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke, .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke, .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke, .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke, .ql-snow.ql-toolbar button:hover .ql-stroke-miter, .ql-snow .ql-toolbar button:hover .ql-stroke-miter, .ql-snow.ql-toolbar button:focus .ql-stroke-miter, .ql-snow .ql-toolbar button:focus .ql-stroke-miter, .ql-snow.ql-toolbar button.ql-active .ql-stroke-miter, .ql-snow .ql-toolbar button.ql-active .ql-stroke-miter, .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke-miter, .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke-miter, .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter, .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter, .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke-miter, .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke-miter, .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter, .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter, .ql-active .ql-stroke');
      for (let i = 0; i < qlhoverStoke.length; i++) {
          qlhoverStoke[i].style.stroke = properties.item_hover_color;
      }
  
  
      const qlhoverFill = parentElement.querySelectorAll('.ql-snow.ql-toolbar button:hover .ql-fill, .ql-snow .ql-toolbar button:hover .ql-fill, .ql-snow.ql-toolbar button:focus .ql-fill, .ql-snow .ql-toolbar button:focus .ql-fill, .ql-snow.ql-toolbar button.ql-active .ql-fill, .ql-snow .ql-toolbar button.ql-active .ql-fill, .ql-snow.ql-toolbar .ql-picker-label:hover .ql-fill, .ql-snow .ql-toolbar .ql-picker-label:hover .ql-fill, .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill, .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-fill, .ql-snow.ql-toolbar .ql-picker-item:hover .ql-fill, .ql-snow .ql-toolbar .ql-picker-item:hover .ql-fill, .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-fill, .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-fill, .ql-snow.ql-toolbar button:hover .ql-stroke.ql-fill, .ql-snow .ql-toolbar button:hover .ql-stroke.ql-fill, .ql-snow.ql-toolbar button:focus .ql-stroke.ql-fill, .ql-snow .ql-toolbar button:focus .ql-stroke.ql-fill, .ql-snow.ql-toolbar button.ql-active .ql-stroke.ql-fill, .ql-snow .ql-toolbar button.ql-active .ql-stroke.ql-fill, .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill, .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill, .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill, .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill, .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill, .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill, .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill, .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill');
      for (let i = 0; i < qlhoverFill.length; i++) {
          qlhoverFill[i].style.fill = properties.item_hover_color;
      }
  

  

    var qlp = qlContainer.querySelectorAll('*');
    if (qlp) {
        for (let i = 0; i < qlp.length; i++) {
            qlp[i].style.color = properties.bubble.font_color();
            qlp[i].style.fontSize = properties.bubble.font_size();
        }
    }
    */

    if (instance.data.kardam === 0) {
        var css = `.ql-snow.ql-toolbar button:hover, .ql-snow .ql-toolbar button:hover, .ql-snow.ql-toolbar button:focus, .ql-snow .ql-toolbar button:focus, .ql-snow.ql-toolbar button.ql-active, .ql-snow .ql-toolbar button.ql-active, .ql-snow.ql-toolbar .ql-picker-label:hover, .ql-snow .ql-toolbar .ql-picker-label:hover, .ql-snow.ql-toolbar .ql-picker-label.ql-active, .ql-snow .ql-toolbar .ql-picker-label.ql-active, .ql-snow.ql-toolbar .ql-picker-item:hover, .ql-snow .ql-toolbar .ql-picker-item:hover, .ql-snow.ql-toolbar .ql-picker-item.ql-selected, .ql-snow .ql-toolbar .ql-picker-item.ql-selected { color: ${properties.item_hover_color}; } .ql-snow.ql-toolbar button:hover .ql-fill, .ql-snow .ql-toolbar button:hover .ql-fill, .ql-snow.ql-toolbar button:focus .ql-fill, .ql-snow .ql-toolbar button:focus .ql-fill, .ql-snow.ql-toolbar button.ql-active .ql-fill, .ql-snow .ql-toolbar button.ql-active .ql-fill, .ql-snow.ql-toolbar .ql-picker-label:hover .ql-fill, .ql-snow .ql-toolbar .ql-picker-label:hover .ql-fill, .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill, .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-fill, .ql-snow.ql-toolbar .ql-picker-item:hover .ql-fill, .ql-snow .ql-toolbar .ql-picker-item:hover .ql-fill, .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-fill, .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-fill, .ql-snow.ql-toolbar button:hover .ql-stroke.ql-fill, .ql-snow .ql-toolbar button:hover .ql-stroke.ql-fill, .ql-snow.ql-toolbar button:focus .ql-stroke.ql-fill, .ql-snow .ql-toolbar button:focus .ql-stroke.ql-fill, .ql-snow.ql-toolbar button.ql-active .ql-stroke.ql-fill, .ql-snow .ql-toolbar button.ql-active .ql-stroke.ql-fill, .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill, .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill, .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill, .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill, .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill, .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill, .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill, .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill { fill: ${properties.item_hover_color}; } .ql-snow.ql-toolbar button:hover .ql-stroke,.ql-snow .ql-toolbar button:hover .ql-stroke,.ql-snow.ql-toolbar button:focus .ql-stroke,.ql-snow .ql-toolbar button:focus .ql-stroke,.ql-snow.ql-toolbar button.ql-active .ql-stroke,.ql-snow .ql-toolbar button.ql-active .ql-stroke,.ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke,.ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke,.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke,.ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke,.ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke,.ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke,.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke,.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke,.ql-snow.ql-toolbar button:hover .ql-stroke-miter,.ql-snow .ql-toolbar button:hover .ql-stroke-miter,.ql-snow.ql-toolbar button:focus .ql-stroke-miter,.ql-snow .ql-toolbar button:focus .ql-stroke-miter,.ql-snow.ql-toolbar button.ql-active .ql-stroke-miter,.ql-snow .ql-toolbar button.ql-active .ql-stroke-miter,.ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke-miter,.ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke-miter,.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,.ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,.ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke-miter,.ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke-miter,.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter,.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter {  stroke: ${properties.item_hover_color};} .ql-snow .ql-stroke {  fill: none;  stroke: ${properties.toolbar_icon_color};  stroke-linecap: round;  stroke-linejoin: round;  stroke-width: 2;} .ql-snow .ql-stroke-miter {  fill: none;  stroke: ${properties.toolbar_icon_color};  stroke-miterlimit: 10;  stroke-width: 2;} .ql-snow .ql-fill, .ql-snow .ql-stroke .ql-fill {  fill: ${properties.toolbar_icon_color};} .ql-snow .ql-empty {  fill: none;} .ql-snow .ql-picker {  color: ${properties.toolbar_icon_color};  display: inline-block;  float: left;  font-size: 14px;  font-weight: 500;  height: 24px;  position: relative;  vertical-align: middle;} .ql-snow .ql-picker-options {  background-color: ${properties.toolbar_bg};  display: none;  min-width: 100%;  padding: 4px 8px;  position: absolute;  white-space: nowrap;} .ql-snow .ql-picker.ql-expanded .ql-picker-label {  color: ${properties.toolbar_bg};  z-index: 2;} .ql-snow .ql-picker.ql-expanded .ql-picker-label .ql-fill {  fill: ${properties.toolbar_icon_color};} .ql-snow .ql-picker.ql-expanded .ql-picker-label .ql-stroke {  stroke: ${properties.toolbar_border_color};} .ql-editor p, .ql-editor ol, .ql-editor ul, .ql-editor pre, .ql-editor blockquote, .ql-editor h1, .ql-editor h2, .ql-editor h3, .ql-editor h4, .ql-editor h5, .ql-editor h6 {  color: ${properties.bubble.font_size()};}` ;
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