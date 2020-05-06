// @ts-check
/// <reference path="../node_modules/monaco-editor/monaco.d.ts" />
/// <reference path="../typings.d.ts" />
// More info about config & dependencies:
// - https://github.com/hakimel/reveal.js#configuration
// - https://github.com/hakimel/reveal.js#dependencies
Reveal.initialize({
    width: '1100',
    dependencies: [
        { src: 'plugin/notes/notes.js', async: true },
        // { src: 'plugin/highlight/highlight.js', async: true }
    ]
});

var monacoEditors = [];

require.config({ paths: { 'vs': 'lib/monaco-editor/min/vs' } });
require(['vs/editor/editor.main'], function() {
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: false,
        noSyntaxValidation: false
    });
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        strictNullChecks: true,
        target: monaco.languages.typescript.ScriptTarget.ES2020,
        allowNonTsExtensions: true
        // noEmit: true,
        // target: monaco.languages.typescript.ScriptTarget.ES2020,
    });
    Reveal.addEventListener('slidechanged', function (event) {
        console.log(event.previousSlide, event.currentSlide, event.indexh, event.indexv);
    
        console.log('disposing monaco editors: ', monacoEditors);
        monacoEditors.forEach(editor => editor.dispose());
        monacoEditors = [];
    
        event.currentSlide.querySelectorAll('.monaco-widget')
            .forEach(initMonacoEditor);
    });
});



function initMonacoEditor(element) {
    const attrs = element.attributes;
    var newEditor = monaco.editor.create(element, {
        value: attrs.code.value.trimLeft(),
        language: 'typescript',
        theme: 'vs-dark',
        fontSize: 20,
        minimap: {
            enabled: false,
        },
        // dimension: {
        //   width: attrs.width ? attrs.width.value : 500,
        //   height: attrs.height ? attrs.height.value : 500,
        // }
    });
    monacoEditors.push(newEditor);
}
