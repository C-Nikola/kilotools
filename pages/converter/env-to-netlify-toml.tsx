import ToolPageHeader from "@/components/ToolPageHeader";
import TransformTextAreaToCode from "@/components/TransformTextAreaToCode";
import { envToToml } from "@/utils/components/env-to-toml.utils";
import { useCallback, useState } from "react";

export default function EnvToNetlifyToml() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = event.currentTarget;
      setInput(value);

      try {
        setOutput(envToToml(value.trim()));
        setIsError(false);
      } catch {
        setOutput("Invalid input");
        setIsError(true);
      }
    },
    []
  );
  return (
    <>
      <ToolPageHeader
        title=".env to netlify.toml"
        toolName="env-to-netlify-toml"
      />
      <TransformTextAreaToCode
        inputLabel="Env"
        outputLable="Toml"
        inputPlaceholder="Paste .env here"
        outputLanguage="toml"
        handleChange={handleChange}
        input={input}
        output={output}
        isError={isError}
      />
    </>
  );
}
