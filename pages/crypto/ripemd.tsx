import OneColumnWithCard from "@/components/OneColumnWithCard";
import ToolPageHeader from "@/components/ToolPageHeader";
import TextAreaUI from "@/components/ui/TextAreaUI";
import { Space, Typography } from "antd";
import { ChangeEvent, useState } from "react";
import { RIPEMD160 } from "crypto-js";
import { getErrorMsg } from "@/utils/error";
import TextAreaCopyable from "@/components/ui/TextAreaCopyable";
import { NextSeo } from "next-seo";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
const { Text } = Typography;

export default function Ripemd() {
  const { t } = useTranslation("toolList");
  const [input, setInput] = useState("");
  const [output, setOuput] = useState({
    isError: false,
    result: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;
    setInput(value);
    try {
      const result = RIPEMD160(value);
      setOuput({
        isError: false,
        result: result.toString(),
      });
    } catch (err) {
      setOuput({
        isError: true,
        result: getErrorMsg(err),
      });
    }
  };

  return (
    <>
      <NextSeo
        title={t("RIPEMD.title")}
        description={t("RIPEMD.description")}
      />
      <ToolPageHeader title={t("RIPEMD.title")} toolName="ripemd" />
      <OneColumnWithCard>
        <Space direction="vertical" size="middle" className="w-full">
          <Space direction="vertical" className="w-full">
            <Text strong>{t("RIPEMD.from")}</Text>
            <TextAreaUI
              isErr={output.isError}
              errMsg={output.result}
              value={input}
              onChange={handleInputChange}
              autoSize={{ minRows: 5 }}
            />
          </Space>
          <Space direction="vertical" className="w-full">
            <Text strong>{t("RIPEMD.to")}</Text>
            <TextAreaCopyable
              readOnly
              autoSize={{ minRows: 5 }}
              value={output.result}
            />
          </Space>
        </Space>
      </OneColumnWithCard>
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
