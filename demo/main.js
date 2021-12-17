(function () {
  const inputEl = document.querySelector('#input');
  const outputEl = document.querySelector('#output');

  const schema = new tinymce.html.Schema({
    valid_classes: '',
    valid_elements: 'h1,h2,h3,h4,h5,h6,p[style],strong,em,span[style],sup,sub,code,blockquote,div,pre,ul,ol,li,br',
    valid_styles: {'*': 'text-decoration, text-align, padding-left'},
  });
  const domParser = new tinymce.html.DomParser({validate: true}, schema);
  const serializer = new tinymce.html.Serializer();

  const initalContent = `
    Lorem       
    
    <h2>Quadis</h2>
    
    <strong>Ipsum1</strong><em>Dolor1</em>
    
    <b>Ipsum2</b><i>Dolor2</i>
  
    <p>It
    
    Benem
    -.,;!'ˆ@#$%&|*+=<>(){}[]/"\`˜~?
    ÀàÂâÆæÇçÉéÈèÊêËëÎîÏïÔôŒœÙùÛûÜüŸÿ
    ÄäÖöÜüẞß
    Samet  
  `;

  function setupTextarea() {
    inputEl.value = initalContent;
    inputEl.addEventListener('change', (event) => sanitizeContent(event.target.value));
  }

  function sanitizeContent(content) {
    // Add <p> to ensure that content is wrapped in a block element. If content starts already with an block element it is preferred.
    content = '<p>' + content;
    const domParserOutput = domParser.parse(content);
    console.log('# domParserOutput', domParserOutput);
    const serializedOutput = serializer.serialize(domParserOutput);
    console.log('# serializedOutput', serializedOutput);
    outputEl.textContent = serializedOutput;
  }


  setupTextarea();
  sanitizeContent(initalContent);

  // Init an editor to check if TinyMCE works.
  tinymce.init({
    selector: '#editor',
    plugins: 'code',
  });
})();
