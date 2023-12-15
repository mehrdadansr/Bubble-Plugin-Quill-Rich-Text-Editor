function(instance, context) {
    
    const properties = instance.data.qabli;
    if (!instance.data.quill || properties.isAutobinding) return;
    const quill = instance.data.quill;
    if (!properties.initial_content) {
        quill.setText("");
        return;
    }

    if (typeof properties.initial_content === 'string') {
        switch (properties.initial_type) {
            case "Content":
                const initial_content = JSON.parse(properties.initial_content);
                quill.setContents(initial_content);
                break;
            case "Text":
                quill.setText(properties.initial_content);
                break;
            case "HTML":
                setHTMLContent(quill, properties.initial_content);
                break;
            default:
                console.log("Type not detected");
                break;
        }
    }

    function setHTMLContent(quill, value) {
        const scrollPosition = {
            x: window.scrollX,
            y: window.scrollY
        };
        quill.clipboard.dangerouslyPasteHTML(value);
        window.scrollTo(scrollPosition.x, scrollPosition.y);
        quill.blur();
    }
    
}