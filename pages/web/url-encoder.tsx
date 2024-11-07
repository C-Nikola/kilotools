import ToolPageHeader from "@/components/ToolPageHeader";
import TextAreaCopyable from "@/components/ui/TextAreaCopyable";
import { Card, Col, Row, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { NextSeo } from "next-seo";
import UrlEncoderDesc from "@/components/pageDescription/UrlEncoderDesc";

export default function UrlEncoder() {
  const { t } = useTranslation("toolList");
  const [encodeInput, setEncodeInput] = useState("");
  const [encodeOutput, setEncodeOutput] = useState("");
  const [decodeInput, setDecodeInput] = useState("");
  const [decodeOutput, setDecodeOutput] = useState("");

  const handleEncode = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setEncodeInput(value);

    try {
      const output = encodeURIComponent(value);
      setEncodeOutput(output);
    } catch (error) {
      setEncodeOutput("Invalid input");
    }
  };

  const handleDecode = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setDecodeInput(value);

    try {
      const output = decodeURIComponent(value);
      setDecodeOutput(output);
    } catch (error) {
      setDecodeOutput("Invalid input");
    }
  };

  return (
    <>
      <NextSeo
        title={t("URLEncodeDecoder.title")}
        description={t("URLEncodeDecoder.description")}
      />
      <ToolPageHeader
        title={t("URLEncodeDecoder.title")}
        toolName="url-encoder"
      />
      <Row className="w-full" gutter={[16, 16]} justify="center">
        <Col flex="0 1 600px">
          <Card className="w-full">
            <h2>{t("URLEncodeDecoder.encode_title")}</h2>
            <Space direction="vertical" className="w-full">
              <TextArea
                onChange={handleEncode}
                autoSize={{ minRows: 5 }}
                value={encodeInput}
                placeholder="Paste here"
              />
              <TextAreaCopyable
                autoSize={{ minRows: 5 }}
                value={encodeOutput}
                readOnly
              />
            </Space>
          </Card>
        </Col>
        <Col flex="0 1 600px">
          <Card className="w-full">
            <h2>{t("URLEncodeDecoder.decode_title")}</h2>
            <Space direction="vertical" className="w-full">
              <TextArea
                onChange={handleDecode}
                autoSize={{ minRows: 5 }}
                value={decodeInput}
                placeholder="Paste here"
              />
              <TextAreaCopyable
                autoSize={{ minRows: 5 }}
                value={decodeOutput}
                readOnly
              />
            </Space>
          </Card>
        </Col>
      </Row>
      <UrlEncoderDesc />
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
