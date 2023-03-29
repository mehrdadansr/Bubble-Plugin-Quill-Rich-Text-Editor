function(properties, context) {


 const { convertHtmlToDelta } = require('node-quill-converter');

let htmlString = '<p>hello, <strong>world</strong></p>';
let delta = convertHtmlToDelta(htmlString);

console.log(JSON.stringify(delta);


  //Do the operation



}