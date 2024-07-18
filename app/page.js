"use client";

import { Editor } from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc"
import { MonacoBinding } from "y-monaco"

export default function Home() {

  const editorRef = useRef(null);

  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    try {
      if (!window.navigator.userAgentData.brands[0].brand === "Google Chrome") {
        alert("Please use Google Chrome to use this app");
        setIsSupported(false);
      }
    } catch (e) {
      alert("This app only works on Google Chrome");
    }
  }, []);

  function handleEditorDidMount(editor, monaco) {
    try {
      if (!isSupported) return;
      editorRef.current = editor;
      const doc = new Y.Doc();
      const provider = new WebrtcProvider("test-room", doc);
      const type = doc.getText("monaco");
      const binding = new MonacoBinding(type, editorRef.current.getModel(), new Set([editorRef.current]), provider.awareness);
    } catch (e) {
      console.log("ERROR");
    }
  }

  return (
    <main>
      {isSupported && <Editor
        className="w-screen h-[100vh]"
        defaultLanguage="python"
        defaultValue="# Write your code here"
        onMount={handleEditorDidMount}
        theme="vs-dark"
        defaultPath="test.py"
      />}
    </main>
  )
}
