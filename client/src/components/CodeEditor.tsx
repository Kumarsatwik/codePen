import CodeMirror from "@uiw/react-codemirror";
import React from "react";
import { tags as t } from "@lezer/highlight";
import { draculaInit } from "@uiw/codemirror-theme-dracula";
import { loadLanguage, langNames } from "@uiw/codemirror-extensions-langs";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function CodeEditor() {
  const currentLanugage = useSelector(
    (state: RootState) => state.compilerSlice.currentLanguage
  );
  console.log("langNames:", langNames);
  const [value, setValue] = React.useState("console.log('hello world!');");
  const onChange = React.useCallback((val: never) => {
    console.log("val:", val);
    setValue(val);
  }, []);

  return (
    <CodeMirror
      value={value}
      height="calc(100vh - 60px)"
      extensions={[loadLanguage(currentLanugage)!]}
      onChange={onChange}
      theme={draculaInit({
        settings: {
          caret: "#c6c6c6",
          fontFamily: "monospace",
        },
        styles: [{ tag: t.comment, color: "#6272a4" }],
      })}
    />
  );
}
