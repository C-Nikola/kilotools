import ToolPageHeader from "@/components/ToolPageHeader";
import TransformCustom from "@/components/TransformCustom";
import SyntaxHighlighterUI from "@/components/ui/SyntaxHighligherUI";
import TextAreaUI from "@/components/ui/TextAreaUI";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { ChangeEvent, useState } from "react";
import yaml from "js-yaml";
import { getErrorMsg } from "@/utils/error";
import { stringifyTOML } from "confbox";

export default function YAMLToTOML() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState({
    isErr: false,
    result: "",
  });

  const handleChangeInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;
    setInput(value);

    try {
      const result = [stringifyTOML(yaml.load(value))].flat().join("\n").trim();
      setOutput({
        isErr: false,
        result: result,
      });
    } catch (err) {
      setOutput({
        isErr: true,
        result: getErrorMsg(err),
      });
    }
  };

  return (
    <>
      <ToolPageHeader title="YAML to TOML" toolName="yaml-to-toml" />
      <TransformCustom
        inputLabel="YAML"
        outputLable="TOML"
        from={
          <OverlayScrollbarsComponent
            element="div"
            defer
            options={{ scrollbars: { autoHide: "scroll" } }}
            style={{
              height: "calc(100% - 55px)",
            }}
          >
            <TextAreaUI
              value={input}
              isErr={false}
              errMsg={output.result}
              autoSize={{ minRows: 10 }}
              styles={{
                textarea: { border: 0, outline: "none", boxShadow: "none" },
              }}
              onChange={handleChangeInput}
            />
          </OverlayScrollbarsComponent>
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
              outputLanguage="toml"
              output={output.result}
              isError={output.isErr}
            />
          </OverlayScrollbarsComponent>
        }
      />
    </>
  );
}
