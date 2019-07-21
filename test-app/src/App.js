import React from 'react';
import logo from './logo.svg';
import './App.css';
import MonacoEditor from 'react-monaco-editor';

function App() {
    // console.log(window.ReactNativeWebView, 'hello mojo')
    const [value, setValue] = React.useState('')

    React.useEffect(() => {
        window.ReactNativeWebView && window.ReactNativeWebView.postMessage("Hello!")
    }, [])

    const editorDidMount = (editor, monaco) => {
        console.log('editorDidMount', editor);
        editor.focus();

        editor.addCommand(monaco.KeyCode.Tab, function() {
            // services available in `ctx`
            alert('my command is executing!');

        })

        editor.addCommand(monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S), function() {
            console.log("saving")
            alert('my command is saving!!');
        })
    }

    const onChange = (newValue, e) => {
        console.log('onChange', newValue, e);
        setValue(newValue)
    }

    return (
        <MonacoEditor
            language="markdown"
            theme="vs-dark"
            value={value}
            onChange={onChange}
            editorDidMount={editorDidMount}
        />
    );
}

export default App;
