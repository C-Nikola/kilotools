import ToolPageHeader from "@/components/ToolPageHeader";
import JSONEditorUI from "@/components/ui/JSONEditor";
import { useCallback, useState } from "react";
import yaml from "js-yaml";
import {
  Content,
  isTextContent,
  MenuItem,
  Mode,
  OnChangeStatus,
} from "vanilla-jsoneditor";
import TransformCustom from "@/components/TransformCustom";
import TextAreaCopyable from "@/components/ui/TextAreaCopyable";

export default function JsonToYaml() {
  const [output, setOutput] = useState("");

  const handleChange = useCallback(
    (content: Content, previousContent: Content, status: OnChangeStatus) => {
      // union types
      if (isTextContent(content) && status.contentErrors === undefined) {
        const value = content.text;
        if (value.trim() === "") {
          setOutput("");
          return;
        }

        try {
          const jsonObject = JSON.parse(value.trim());
          const yamlOutput = yaml.dump(jsonObject);
          setOutput(yamlOutput);
        } catch (errorMessage: unknown) {
          setOutput(errorMessage as string);
        }
      }
    },
    []
  );

  const handleRenderMenu = useCallback((items: MenuItem[]) => {
    return items.slice(4, items.length);
  }, []);
  return (
    <>
      <ToolPageHeader title="JSON to yaml" toolName="json-to-yaml" />
      <TransformCustom
        inputLabel="JSON"
        outputLable="YAML"
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
            autoSize={{ minRows: 20 }}
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
