import ToolPageHeader from "@/components/ToolPageHeader";
import TowColumns from "@/components/TowColumns";
import TextAreaCopyable from "@/components/ui/TextAreaCopyable";
import { Space, Typography } from "antd";
import { ChangeEvent, useState } from "react";
import { escape, unescape } from "lodash";
import { getErrorMsg } from "@/utils/error";
import TextAreaUI from "@/components/ui/TextAreaUI";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { NextSeo } from "next-seo";

const { Title, Text } = Typography;

export default function EscapeHTMLEntities() {
  const { t } = useTranslation("toolList");

  const [escapeInput, setEscapeInput] = useState("");
  const [escapeOutput, setEscapeOutput] = useState({
    isErr: false,
    result: "",
  });
  const [unescapeInput, setunescapeInput] = useState("");
  const [unescapeOutput, setUnescapeOutput] = useState({
    isErr: false,
    result: "",
  });

  const handleEscapeInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;
    setEscapeInput(value);
    try {
      const result = escape(value);
      setEscapeOutput({
        isErr: false,
        result,
      });
    } catch (err) {
      setEscapeOutput({
        isErr: true,
        result: getErrorMsg(err),
      });
    }
  };

  const handleUnescapeInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;
    setunescapeInput(value);
    try {
      const result = unescape(value);
      setUnescapeOutput({
        isErr: false,
        result,
      });
    } catch (err) {
      setUnescapeOutput({
        isErr: true,
        result: getErrorMsg(err),
      });
    }
  };

  return (
    <>
      <NextSeo
        title={t("escapeHTMLEntities.title")}
        description={t("escapeHTMLEntities.description")}
      />
      <ToolPageHeader
        title={t("escapeHTMLEntities.title")}
        toolName="escape-html-entities"
      />
      <TowColumns
        children1={
          <Space className="w-full" direction="vertical" size="large">
            <Title level={2}>{t("escapeHTMLEntities.escape_title")}</Title>
            <Space className="w-full" direction="vertical">
              <Text strong>{t("escapeHTMLEntities.escape_from")}</Text>
              <TextAreaUI
                autoSize={{ minRows: 5 }}
                value={escapeInput}
                onChange={handleEscapeInput}
                placeholder="Paste your html here..."
                isErr={escapeOutput.isErr}
                errMsg={escapeOutput.result}
              />
            </Space>
            <Space className="w-full" direction="vertical">
              <Text strong> {t("escapeHTMLEntities.escape_to")}</Text>
              <TextAreaCopyable
                autoSize={{ minRows: 5 }}
                readOnly
                value={escapeOutput.result}
                placeholder="Escaped string here"
              />
            </Space>
          </Space>
        }
        children2={
          <Space className="w-full" direction="vertical" size="large">
            <Title level={2}>{t("escapeHTMLEntities.unescape_title")}</Title>
            <Space className="w-full" direction="vertical">
              <Text strong>{t("escapeHTMLEntities.unescape_from")}</Text>
              <TextAreaUI
                placeholder="Paste your html entities here..."
                autoSize={{ minRows: 5 }}
                value={unescapeInput}
                onChange={handleUnescapeInput}
                isErr={unescapeOutput.isErr}
                errMsg={unescapeOutput.result}
              />
            </Space>
            <Space className="w-full" direction="vertical">
              <Text strong>{t("escapeHTMLEntities.unescape_to")}</Text>
              <TextAreaCopyable
                autoSize={{ minRows: 5 }}
                readOnly
                value={unescapeOutput.result}
                placeholder="Unescaped string here"
              />
            </Space>
          </Space>
        }
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
