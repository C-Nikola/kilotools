import yaml from "js-yaml";
import { ChangeEvent, useCallback, useState } from "react";
import TransformTextAreaToCode from "@/components/TransformTextAreaToCode";
import { getErrorMsg } from "@/utils/error";
import ToolPageHeader from "@/components/ToolPageHeader";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { NextSeo } from "next-seo";
import YAMLtoJSONDesc from "@/components/pageDescription/YAMLtoJSONDesc";

export default function YAMLtoJSON() {
  const { t } = useTranslation("toolList");
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
      <NextSeo
        title={t("YAMLToJSON.title")}
        description={t("YAMLToJSON.description")}
      />
      <ToolPageHeader title={t("YAMLToJSON.title")} toolName="yaml-to-json" />
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
      <YAMLtoJSONDesc />
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
