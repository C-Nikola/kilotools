import ToolPageHeader from "@/components/ToolPageHeader";
import TransformTextAreaToCode from "@/components/TransformTextAreaToCode";
import { getErrorMsg } from "@/utils/error";
import { parseTOML } from "confbox";
import { useState } from "react";

export default function TOMLToJSON() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState({
    isErr: false,
    result: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.currentTarget.value;
    setInput(value);

    if (value.trim() === "") {
      setOutput({
        isErr: false,
        result: "",
      });
      return;
    }

    try {
      const result = parseTOML(value);
      setOutput({
        isErr: false,
        // TODO
        result: result as string,
      });
    } catch (error) {
      setOutput({
        isErr: true,
        result: getErrorMsg(error),
      });
    }
  };

  return (
    <>
      <ToolPageHeader title="TOML to JSON" toolName="toml-to-json" />
      <TransformTextAreaToCode
        inputLabel="TOML"
        outputLable="JSON"
        inputPlaceholder="Paste TOML here..."
        outputLanguage="json"
        handleChange={handleChange}
        input={input}
        output={output.result}
        isError={output.isErr}
      />
    </>
  );
}
