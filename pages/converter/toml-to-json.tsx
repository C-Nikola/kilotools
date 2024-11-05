import ToolPageHeader from "@/components/ToolPageHeader";
import TransformTextAreaToCode from "@/components/TransformTextAreaToCode";
import { getErrorMsg } from "@/utils/error";
import { parseTOML } from "confbox";
import { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { NextSeo } from "next-seo";

export default function TOMLToJSON() {
  const { t } = useTranslation("toolList");
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
      <NextSeo
        title={t("TOMLToJSON.title")}
        description={t("TOMLToJSON.description")}
      />
      <ToolPageHeader title={t("TOMLToJSON.title")} toolName="toml-to-json" />
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
export async function getStaticProps({ locale }: Locale) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["toolList"])),
    },
  };
}
