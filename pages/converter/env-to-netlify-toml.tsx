import ToolPageHeader from "@/components/ToolPageHeader";
import TransformTextAreaToCode from "@/components/TransformTextAreaToCode";
import { envToToml } from "@/utils/components/env-to-toml.utils";
import { useCallback, useState } from "react";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { NextSeo } from "next-seo";

export default function EnvToNetlifyToml() {
  const { t } = useTranslation("toolList");

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
      <NextSeo
        title={t("envToNetlifyToml.title")}
        description={t("envToNetlifyToml.description")}
      />
      <ToolPageHeader
        title={t("envToNetlifyToml.title")}
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

export async function getStaticProps({ locale }: Locale) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["toolList"])),
    },
  };
}
