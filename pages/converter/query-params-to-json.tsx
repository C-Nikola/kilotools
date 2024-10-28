import ToolPageHeader from "@/components/ToolPageHeader";
import TransformTextAreaToCode from "@/components/TransformTextAreaToCode";
import { convertQueryParamsToJSON } from "@/utils/components/query-params-to-json.utils";
import { useCallback, useState } from "react";

export default function QueryParamsToJSON() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = event.currentTarget;
      setInput(value);

      if (value.trim() === "") {
        setOutput("");
        return;
      }

      try {
        setIsError(false);
        const output = convertQueryParamsToJSON(value.trim());
        setOutput(output);
      } catch (error) {
        setIsError(true);
        setOutput("Invalid input, please provide valid query parameters");
      }
    },
    []
  );

  return (
    <>
      <ToolPageHeader
        title="Query Params to JSON"
        toolName="query-params-to-json"
      />
      <TransformTextAreaToCode
        inputLabel="Query Params"
        outputLable="json"
        inputPlaceholder="Enter your query params here..."
        outputLanguage="json"
        handleChange={handleChange}
        input={input}
        output={output}
        isError={isError}
      />
    </>
  );
}
