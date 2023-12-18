function(instance, properties, context) {

    // Construct the CSS string using template literals
    const CSSString = `
    .ql-mention-list-container{
        background-color: ${properties["list-background-color"]};
        border: ${properties["list-border-width"]} ${properties["list-border-style"]} ${properties["list-border-color"]};
        border-radius: ${properties["list-border-radius"]};
        box-shadow:0 2px 12px 0 rgba(30,30,30,.08);
        overflow: auto;
        min-width: ${properties["list-width"]};
        z-index: 9001
    }
    .ql-mention-loading{font-size:${properties["list-item-font-size"]};line-height:${properties["list-item-line-height"]};padding: 0 ${properties["list-item-h-padding"]};vertical-align:middle}
    .ql-mention-list{list-style:none;margin:0;overflow:hidden;padding:0}

    .ql-mention-list-item{
        cursor:pointer;
        font-size: ${properties["list-item-font-size"]};
        line-height: ${properties["list-item-line-height"]};
        padding: 0 ${properties["list-item-h-padding"]}
    }
    .ql-mention-list-item.disabled{cursor:auto}
    .ql-mention-list-item.selected{
        background-color: ${properties["mention-background-color"]};
        text-decoration: none
    }
    
    .mention{
        cursor:pointer;
        background-color: ${properties["mention-background-color"]};
        border-radius: ${properties["mention-border-radius"]};
        height: ${properties["mention-height"]};
        margin-right: 2px;
        padding: 3px 0;
        user-select: all;
        width: 64px
    }
    
    .mention>span{margin:0 3px}
    `;

    // Add the CSS string as a style tag to the head of the document
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(CSSString));
    document.head.appendChild(style);

}