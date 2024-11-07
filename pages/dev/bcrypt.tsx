import ToolPageHeader from "@/components/ToolPageHeader";
import TextAreaCopyable from "@/components/ui/TextAreaCopyable";
import {
  Card,
  Col,
  Input,
  InputNumber,
  Row,
  Space,
  Typography,
  theme as antdTheme,
} from "antd";
import { ChangeEvent, useState } from "react";
import { compareSync, hashSync } from "bcryptjs";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { NextSeo } from "next-seo";
import BcryptDesc from "@/components/pageDescription/BcryptDesc";

const { Title } = Typography;

export default function Bcrypt() {
  const { t } = useTranslation("toolList");
  const { useToken } = antdTheme;
  const { token } = useToken();

  const [input, setInput] = useState("");
  const [saltCount, setSaltCount] = useState(10);
  const [output, setOutput] = useState("");

  const [compareString, setCompareString] = useState("");
  const [compareHash, setCompareHash] = useState("");
  const [isMatch, setIsMatch] = useState(false);

  const handleSaltCount = (value: number | null) => {
    value = value ?? 0;
    setSaltCount(value);
    setOutput(hashSync(input, value));
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setInput(value);
    setOutput(hashSync(value, saltCount));
  };

  const handleCompareString = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setCompareString(value);
    setIsMatch(compareSync(value, compareHash));
  };

  const handleCompareHash = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setCompareHash(value);
    setIsMatch(compareSync(compareString, value));
  };

  return (
    <>
      <NextSeo
        title={t("bcrypt.title")}
        description={t("bcrypt.description")}
      />
      <ToolPageHeader title={t("bcrypt.title")} toolName="bcrypt" />
      <Row className="w-full" gutter={[16, 16]} justify="center">
        <Col flex="0 1 600px">
          <Card className="w-full">
            <Space direction="vertical" className="w-full">
              <Title level={2}>Hash</Title>
              <Row align="middle">
                <Col flex="0 1 80px">{t("bcrypt.hash_from")}:</Col>
                <Col flex="1">
                  <Input value={input} onChange={handleInput} />
                </Col>
              </Row>
              <Row>
                <Col flex="0 1 80px">{t("bcrypt.salt_count")}:</Col>
                <Col flex={1}>
                  <InputNumber
                    value={saltCount}
                    min={0}
                    max={100}
                    className="w-full"
                    onChange={handleSaltCount}
                  />
                </Col>
              </Row>
              <TextAreaCopyable
                value={output}
                readOnly
                autoSize={{ minRows: 5 }}
              />
            </Space>
          </Card>
        </Col>
        <Col flex="0 1 600px">
          <Card className="w-full">
            <Space direction="vertical" className="w-full">
              <Title level={2}>{t("bcrypt.compare_title")}</Title>
              <Row align="middle">
                <Col flex="0 1 80px">{t("bcrypt.compare_from")}:</Col>
                <Col flex={1}>
                  <Input value={compareString} onChange={handleCompareString} />
                </Col>
              </Row>
              <Row>
                <Col flex="0 1 80px">{t("bcrypt.compare_to")}:</Col>
                <Col flex={1}>
                  <Input value={compareHash} onChange={handleCompareHash} />
                </Col>
              </Row>
              <Row>
                <Col flex="0 1 80px">{t("bcrypt.match")}?</Col>
                <Col
                  style={{
                    color: isMatch ? token.colorSuccess : token.colorError,
                  }}
                >
                  {isMatch ? "Yes" : "No"}
                </Col>
              </Row>
            </Space>
          </Card>
        </Col>
      </Row>
      <BcryptDesc />
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
