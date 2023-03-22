function(instance, context) {
	instance.data.divName = "id"+Math.round(Math.random()*1000000) + 1;
    var newDiv = $('<div id="'+instance.data.divName+'" calss="ql-container"></div>');
    instance.data.newDiv = newDiv
    instance.canvas.append(newDiv);
	//newDiv.css("width", "100%");
	//newDiv.css("height", "100%");
    instance.data.kardam = 0;
	instance.data.round = 0;
	instance.data.parentID = "P"+instance.data.divName;

	/**
	 * <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/monokai-sublime.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js"></script>
<script src="https:////cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.js"></script>
<link rel="stylesheet" href="https:////cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.css">
<link rel="stylesheet" href="https://cdn.quilljs.com/1.3.6/quill.snow.css">
<link rel="stylesheet" href="https://cdn.quilljs.com/1.3.6/quill.bubble.css">
<script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>

	 */
}