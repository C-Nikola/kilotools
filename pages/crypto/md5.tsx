import OneColumnWithCard from "@/components/OneColumnWithCard";
import ToolPageHeader from "@/components/ToolPageHeader";
import TextAreaUI from "@/components/ui/TextAreaUI";
import { Space, Typography } from "antd";
import { ChangeEvent, useState } from "react";
import { MD5 } from "crypto-js";
import { getErrorMsg } from "@/utils/error";
import TextAreaCopyable from "@/components/ui/TextAreaCopyable";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { NextSeo } from "next-seo";

const { Text } = Typography;

export default function MD5Page() {
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
      const result = MD5(value);
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
      <NextSeo title={t("MD5.title")} description={t("MD5.description")} />
      <ToolPageHeader title={t("MD5.title")} toolName="md5" />
      <OneColumnWithCard>
        <Space direction="vertical" size="middle" className="w-full">
          <Space direction="vertical" className="w-full">
            <Text strong>{t("MD5.from")}</Text>
            <TextAreaUI
              isErr={output.isError}
              errMsg={output.result}
              value={input}
              onChange={handleInputChange}
              autoSize={{ minRows: 5 }}
            />
          </Space>
          <Space direction="vertical" className="w-full">
            <Text strong>{t("MD5.to")}</Text>
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
