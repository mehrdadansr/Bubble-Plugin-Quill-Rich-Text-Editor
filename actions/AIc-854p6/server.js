function(properties, context) {


var {convertDeltaToHtml} = require('node-quill-converter');

var htmlString = properties.html;
var delta = convertDeltaToHtml (htmlString);

return {
    	 delta: delta
}


}