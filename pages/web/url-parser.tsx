import OneColumnWithCard from "@/components/OneColumnWithCard";
import ToolPageHeader from "@/components/ToolPageHeader";
import InputCopyable from "@/components/ui/InputCopyable";
import TextAreaUI from "@/components/ui/TextAreaUI";
import { getErrorMsg } from "@/utils/error";
import { IconChevronDownLeft } from "@tabler/icons-react";
import { Col, Divider, Row, Space } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { NextSeo } from "next-seo";
import UrlParserDesc from "@/components/pageDescription/UrlParserDesc";

const properties: { title: string; key: keyof URL }[] = [
  { title: "Protocol", key: "protocol" },
  { title: "Username", key: "username" },
  { title: "Password", key: "password" },
  { title: "Hostname", key: "hostname" },
  { title: "Port", key: "port" },
  { title: "Path", key: "pathname" },
  { title: "hash", key: "hash" },
  { title: "Params", key: "search" },
];

const defaultValue =
  "https://user:pwd@example.com:3000/url-parser?key1=value&key2=value2#hash";

export default function UrlParser() {
  const { t } = useTranslation("toolList");
  const [input, setInput] = useState(defaultValue);
  const [output, setOutput] = useState<URL | undefined>(undefined);
  const [isErr, setIsErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const parseUrl = (url: string) => {
    try {
      const urlOBj = new URL(url);
      setOutput(urlOBj);
      setIsErr(false);
    } catch (err) {
      setIsErr(true);
      setErrMsg(getErrorMsg(err));
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;
    setInput(value);
    parseUrl(value);
  };

  useEffect(() => {
    parseUrl(defaultValue);
  }, []);

  return (
    <>
      <NextSeo
        title={t("URLParser.title")}
        description={t("URLParser.description")}
      />
      <ToolPageHeader title={t("URLParser.title")} toolName="url-parser" />
      <OneColumnWithCard>
        <Space direction="vertical" className="w-full">
          <Space direction="vertical" className="w-full">
            {t("URLParser.your_url")}
            <TextAreaUI
              autoSize={{ minRows: 3 }}
              onChange={handleInputChange}
              value={input}
              isErr={isErr}
              errMsg={errMsg}
            />
          </Space>
          <Divider />
          <Space direction="vertical" className="w-full">
            {properties.map(({ title, key }) => (
              <Row gutter={16} key={key}>
                <Col flex="0 1 100px" className="text-left">
                  {title}
                </Col>
                <Col flex={1}>
                  <InputCopyable
                    value={(output?.[key] as string) ?? ""}
                    readOnly
                  />
                </Col>
              </Row>
            ))}
            {Object.entries(
              Object.fromEntries(output?.searchParams.entries() ?? [])
            ).map(([k, v]) => {
              return (
                <Row gutter={16} key={k}>
                  <Col flex="0 1 100px">
                    <IconChevronDownLeft />
                  </Col>
                  <Col flex={1}>
                    <Row>
                      <Col span={12}>
                        <InputCopyable value={k} readOnly />
                      </Col>
                      <Col span={12}>
                        <InputCopyable value={v} readOnly />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              );
            })}
          </Space>
        </Space>
      </OneColumnWithCard>
      <UrlParserDesc />
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
