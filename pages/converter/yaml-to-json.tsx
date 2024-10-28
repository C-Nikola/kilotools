import yaml from "js-yaml";
import { ChangeEvent, useCallback, useState } from "react";
import TransformTextAreaToCode from "@/components/TransformTextAreaToCode";
import { getErrorMsg } from "@/utils/error";
import ToolPageHeader from "@/components/ToolPageHeader";

export default function YAMLtoJSON() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<{
    isErr: boolean;
    result: string;
  }>({
    isErr: false,
    result: "",
  });

  const handleChagne = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;
    setInput(value);
    try {
      let jsonObject: unknown = yaml.load(value.trim());

      setOutput({
        isErr: false,
        // TODO
        result: jsonObject as string,
      });
    } catch (err) {
      setOutput({
        isErr: true,
        result: getErrorMsg(err),
      });
    }
  }, []);

  return (
    <>
      <ToolPageHeader title="YAML to JSON" toolName="yaml-to-json" />
      <TransformTextAreaToCode
        inputLabel="YAML"
        outputLable="json"
        inputPlaceholder="Paste YAML here"
        outputLanguage="json"
        handleChange={handleChagne}
        input={input}
        output={output.result}
        isError={output.isErr}
      />
    </>
  );
}
