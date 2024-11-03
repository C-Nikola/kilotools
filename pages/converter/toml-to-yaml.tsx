import ToolPageHeader from "@/components/ToolPageHeader";
import TransformTextAreaToCode from "@/components/TransformTextAreaToCode";
import { parseTOML } from "confbox";
import { useState } from "react";
import yaml from "js-yaml";
import { getErrorMsg } from "@/utils/error";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export default function TOMLToYAML() {
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
      const result = yaml.dump(parseTOML(value));
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
      <ToolPageHeader title={t("TOMLToYAML.title")} toolName="toml-to-yaml" />
      <TransformTextAreaToCode
        inputLabel="TOML"
        outputLable="YAML"
        inputPlaceholder="Paste TOML here..."
        outputLanguage="yaml"
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
