import ToolPageHeader from "@/components/ToolPageHeader";
import TransformTextAreaToCode from "@/components/TransformTextAreaToCode";
import { getErrorMsg } from "@/utils/error";
import { ChangeEvent, useState } from "react";
import convert from "xml-js";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export default function XmlToJson() {
  const { t } = useTranslation("toolList");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;
    setInput(value);
    try {
      setOutput(
        JSON.parse(
          JSON.stringify(convert.xml2js(value, { compact: true }), null, 2)
        )
      );
      setIsError(false);
    } catch (err: unknown) {
      setIsError(true);
      setOutput(getErrorMsg(err));
    }
  };

  return (
    <>
      <ToolPageHeader title={t("XMLToJSON.title")} toolName="xml-to-json" />
      <TransformTextAreaToCode
        inputLabel="XML"
        outputLable="json"
        inputPlaceholder="Paste XML here..."
        outputLanguage="json"
        handleChange={handleChange}
        input={input}
        output={output}
        isError={isError}
      />
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
