import { CSVtoJSON } from "@/utils/components/csv-to-json.utils";
import { Checkbox } from "antd";
import { useCallback, useState } from "react";
import BaseUtils from "@/utils/baseUtils";
import TransformTextAreaToCode from "@/components/TransformTextAreaToCode";
import ToolPageHeader from "@/components/ToolPageHeader";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { NextSeo } from "next-seo";
import CSVToJsonDesc from "@/components/pageDescription/CSVToJsonDesc";

export default function CSVToJson() {
  const { t } = useTranslation("toolList");

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
      <NextSeo
        title={t("CSVToJSON.title")}
        description={t("CSVToJSON.description")}
      />
      <ToolPageHeader title={t("CSVToJSON.title")} toolName="csv-to-json" />
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
            {t("CSVToJSON.lowercase")}
          </Checkbox>
        </div>
      </TransformTextAreaToCode>
      <CSVToJsonDesc />
    </>
  );
}
export async function getStaticProps({ locale }: Locale) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["toolList"])),
    },
  };
}
