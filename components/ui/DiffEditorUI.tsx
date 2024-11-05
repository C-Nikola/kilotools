import { DiffEditor, Monaco, MonacoDiffEditor } from "@monaco-editor/react";

import { useTheme } from "next-themes";
import { forwardRef, useImperativeHandle, useRef } from "react";

const DiffEditorUI = forwardRef<
  {
    getOriginalValue: () => string | undefined;
    getModifiedValue: () => string | undefined;
  },
  {
    original?: string;
    modified?: string;
  }
>(({ original, modified }, ref) => {
  const { theme } = useTheme();
  const editorRef = useRef<MonacoDiffEditor | null>(null);

  // F3: go to next diff, F4: go to previous diff
  const onMount = (editor: MonacoDiffEditor, monaco: Monaco) => {
    editor.addCommand(monaco.KeyCode.F3, () => editor.goToDiff("next"));
    editor.addCommand(monaco.KeyCode.F4, () => editor.goToDiff("previous"));
    editorRef.current = editor;
  };

  useImperativeHandle(ref, () => {
    return {
      getOriginalValue: () => {
        return editorRef.current?.getOriginalEditor().getValue();
      },

      getModifiedValue: () => {
        return editorRef.current?.getModifiedEditor().getValue();
      },
    };
  });

  return (
    <DiffEditor
      theme={theme === "light" ? "light" : "vs-dark"}
      options={{
        originalEditable: true,
        minimap: {
          enabled: false,
        },
        quickSuggestions: false,
        scrollBeyondLastLine: false,
        renderGutterMenu: false,
      }}
      onMount={onMount}
      original={original}
      modified={modified}
    />
  );
});

DiffEditorUI.displayName = "DiffEditorUI";

export default DiffEditorUI;
