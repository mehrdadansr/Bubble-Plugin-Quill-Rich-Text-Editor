function(instance, properties) {
  /*  var iFrm = document.getElementById("iframe_container")
    iFrm.style.minHeight = properties.bubble.min_height_css()
        //properties.bubble.min_height_css()
//   Math.max(iframe_container.outerWidth(), window.innerWidth), Math.max(iframe_container.outerHeight(), window.innerHeight)
//let divName = "id" + Math.round(Math.random() * 1000000) + 1;
// const bubHeight = properties.bubble.min_height_css();
       
   //let toolbar = document.getElementsByClassName("ql-toolbar")[0]
   //let toobarHeight = toolbar.style.height()
   */

  var div = $(`<div id="editor"></div>`);
  instance.canvas.append(div);


  if (window.Quill) {
    // If it is, initialize Quill editor
    const quill = new Quill('#editor', {
      theme: 'snow'
    });
  } else {
    // If not, dynamically load Quill library
    const quillScript = document.createElement('script');
    quillScript.src = 'https://cdn.quilljs.com/1.3.6/quill.js';
    document.body.appendChild(quillScript);

    // Dynamically load Quill stylesheet
    const quillStylesheet = document.createElement('link');
    quillStylesheet.rel = 'stylesheet';
    quillStylesheet.href = 'https://cdn.quilljs.com/1.3.6/quill.snow.css';
    document.head.appendChild(quillStylesheet);

    // Initialize Quill editor after library and stylesheet have loaded
    quillScript.onload = () => {
      const quill = new Quill('#editor', {
        theme: 'snow'
      });
    };
  }

}