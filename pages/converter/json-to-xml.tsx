import ToolPageHeader from "@/components/ToolPageHeader";
import TransformCustom from "@/components/TransformCustom";
import JSONEditorUI from "@/components/ui/JSONEditor";
import SyntaxHighlighterUI from "@/components/ui/SyntaxHighligherUI";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useCallback, useState } from "react";
import {
  Content,
  isTextContent,
  MenuItem,
  Mode,
  OnChangeStatus,
} from "vanilla-jsoneditor";
import convert from "xml-js";
import JSON5 from "json5";
import { getErrorMsg } from "@/utils/error";

export default function JSONToXML() {
  const [output, setOutput] = useState({
    isErr: false,
    result: "",
  });

  const handleChange = (
    content: Content,
    previousContent: Content,
    status: OnChangeStatus
  ) => {
    // 由于是联合类型，所以需要做判断
    if (isTextContent(content) && status.contentErrors === undefined) {
      const value = content.text;
      if (value.trim() === "") {
        setOutput({
          isErr: false,
          result: "",
        });
        return;
      }

      try {
        const result = convert.js2xml(JSON5.parse(value), {
          compact: true,
          spaces: 2,
        });
        setOutput({
          isErr: false,
          result,
        });
      } catch (error) {
        setOutput({
          isErr: true,
          result: getErrorMsg(error),
        });
      }
    }
  };

  const handleRenderMenu = useCallback((items: MenuItem[]) => {
    return items.slice(4, items.length);
  }, []);
  return (
    <>
      <ToolPageHeader title="JSON to XML" toolName="json-to-xml" />
      <TransformCustom
        inputLabel="JSON"
        outputLable="XML"
        from={
          <div style={{ height: "calc(100% - 55px)" }}>
            <JSONEditorUI
              onChange={handleChange}
              mode={Mode.text}
              onRenderMenu={handleRenderMenu}
            />
          </div>
        }
        to={
          <OverlayScrollbarsComponent
            element="div"
            defer
            options={{ scrollbars: { autoHide: "scroll" } }}
            style={{
              height: "calc(100% - 55px)",
            }}
          >
            <SyntaxHighlighterUI
              outputLanguage="xml"
              output={output.result}
              isError={output.isErr}
            />
          </OverlayScrollbarsComponent>
        }
      />
    </>
  );
}
