import ToolPageHeader from "@/components/ToolPageHeader";
import JSONEditorUI from "@/components/ui/JSONEditor";
import { JSONtoCSV } from "@/utils/components/json-to-csv.utils";
import { useCallback, useState } from "react";
import {
  Content,
  isTextContent,
  MenuItem,
  Mode,
  OnChangeStatus,
} from "vanilla-jsoneditor";
import TransformCustom from "@/components/TransformCustom";
import TextAreaCopyable from "@/components/ui/TextAreaCopyable";

export default function JsonToCsv() {
  const [output, setOutput] = useState("");

  const handleChange = (
    content: Content,
    previousContent: Content,
    status: OnChangeStatus
  ) => {
    if (isTextContent(content) && status.contentErrors === undefined) {
      const value = content.text;
      if (value.trim() === "") {
        setOutput("");
        return;
      }

      try {
        const json = JSONtoCSV(value.trim());
        setOutput(json);
      } catch (errorMessage: unknown) {
        setOutput(errorMessage as string);
      }
    }
  };

  const handleRenderMenu = useCallback((items: MenuItem[]) => {
    return items.slice(4, items.length);
  }, []);

  return (
    <>
      <ToolPageHeader title="JSON to CSV" toolName="json-to-csv" />
      <TransformCustom
        inputLabel="JSON"
        outputLable="CSV"
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
          <TextAreaCopyable
            value={output}
            readOnly
            autoSize={{ minRows: 5 }}
            styles={{
              textarea: {
                borderWidth: 0,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                boxShadow: "none",
                borderColor: "var(--ant-color-border)",
              },
            }}
          />
        }
      />
    </>
  );
}
