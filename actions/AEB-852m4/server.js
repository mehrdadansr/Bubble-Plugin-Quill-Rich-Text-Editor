function(properties, context) {


var {convertHtmlToDelta} = require('node-quill-converter');

var htmlString = properties.html;
var delta = convertHtmlToDelta(htmlString);

return {
    	 delta: JSON.stringify(delta)
		}


}