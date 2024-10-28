import { CSVtoJSON } from "@/utils/components/csv-to-json.utils";
import { Checkbox } from "antd";
import { useCallback, useState } from "react";
import BaseUtils from "@/utils/baseUtils";
import TransformTextAreaToCode from "@/components/TransformTextAreaToCode";
import ToolPageHeader from "@/components/ToolPageHeader";

export default function CSVToJson() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [lowercase, setLowercase] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = event.currentTarget.value;
      setInput(value);

      if (value.trim() === "") {
        setOutput("");
        return;
      }

      try {
        const json = CSVtoJSON(value.trim(), lowercase);
        setIsError(false);
        setOutput(JSON.parse(json));
      } catch (error) {
        setIsError(true);
        setOutput(BaseUtils.getErrorMessage(error));
      }
    },
    [lowercase]
  );

  const toggleLowercase = useCallback(() => {
    setLowercase((prevValue) => {
      const nextValue = !prevValue;

      if (input === "") {
        setOutput("");
        return nextValue;
      }

      try {
        const json = CSVtoJSON(input, nextValue);
        setOutput(JSON.parse(json));
      } catch (error) {
        setIsError(true);
        setOutput(BaseUtils.getErrorMessage(error));
      }

      return nextValue;
    });
  }, [input]);

  return (
    <>
      <ToolPageHeader title="CSV to JSON" toolName="csv-to-json" />
      <TransformTextAreaToCode
        inputLabel="CSV"
        outputLable="json"
        inputPlaceholder="Paste CSV here"
        outputLanguage="json"
        handleChange={handleChange}
        input={input}
        output={output}
        isError={isError}
      >
        <div className="text-right">
          <Checkbox id="lowercase" onChange={toggleLowercase} className="mr-1">
            lowercase keys
          </Checkbox>
        </div>
      </TransformTextAreaToCode>
    </>
  );
}
