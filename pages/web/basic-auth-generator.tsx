import OneColumn from "@/components/OneColumn";
import ToolPageHeader from "@/components/ToolPageHeader";
import TextAreaCopyable from "@/components/ui/TextAreaCopyable";
import { toBase64 } from "@/utils/components/base64.utils";
import { Col, Divider, Input, Row, Space } from "antd";
import { ChangeEvent, useMemo, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { NextSeo } from "next-seo";

export default function BasicAuthGenerator() {
  const { t } = useTranslation("toolList");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setUsername(value);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setPassword(value);
  };

  const output = useMemo(() => {
    return `Authorization: Basic ${toBase64(`${username}:${password}`)}`;
  }, [username, password]);

  return (
    <>
      <NextSeo
        title={t("basicAuthGenerator.title")}
        description={t("basicAuthGenerator.description")}
      />
      <ToolPageHeader
        title={t("basicAuthGenerator.title")}
        toolName="basic-auth-genrator"
      />
      <OneColumn>
        <Space direction="vertical" className="w-full">
          <Row gutter={8}>
            <Col flex="80px">Username</Col>
            <Col flex={1}>
              <Input
                value={username}
                onChange={handleUsername}
                placeholder="Enter your username..."
                allowClear
              />
            </Col>
          </Row>
          <Row gutter={8}>
            <Col flex="80px">Password</Col>
            <Col flex={1}>
              <Input.Password
                value={password}
                onChange={handlePassword}
                placeholder="Enter your password..."
                allowClear
                visibilityToggle
              />
            </Col>
          </Row>
          <Divider />
          Authorization header:
          <TextAreaCopyable value={output} readOnly autoSize={{ minRows: 4 }} />
        </Space>
      </OneColumn>
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
