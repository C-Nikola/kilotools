import ToolPageHeader from "@/components/ToolPageHeader";
import TextAreaCopyable from "@/components/ui/TextAreaCopyable";
import { Button, Card, Col, Flex, InputNumber, Row, Space, Switch } from "antd";
import { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { generateMultiple } from "generate-password";
import { NextSeo } from "next-seo";
import TokenGeneratorDesc from "@/components/pageDescription/TokenGeneratorDesc";

export default function TokenGenerator() {
  const { t } = useTranslation("toolList");
  const [params, setParams] = useState<TokenGeneratorParams>({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    length: 8,
  });
  const [tokenList, setTokenList] = useState<string[]>([]);

  const generateToken = (props: {
    uppercase: boolean;
    lowercase: boolean;
    numbers: boolean;
    symbols: boolean;
    length: number;
  }) => {
    const tokenArr = generateMultiple(10, { ...params, strict: true });
    setTokenList(tokenArr);
  };

  return (
    <>
      <NextSeo
        title={t("tokenGenerator.title")}
        description={t("tokenGenerator.description")}
      />
      <ToolPageHeader
        title={t("tokenGenerator.title")}
        toolName="token-generator"
      />
      <Row className="w-full" justify="center">
        <Col flex="0 1 600px">
          <Card className="w-full">
            <Space direction="vertical" className="w-full" size="middle">
              <Flex justify="space-around" wrap>
                <Space direction="vertical" size="middle">
                  <Space>
                    <Switch
                      value={params.uppercase}
                      onChange={(value) => {
                        setParams({
                          ...params,
                          uppercase: value,
                        });
                        generateToken({
                          ...params,
                          uppercase: value,
                        });
                      }}
                    />
                    {t("tokenGenerator.uppercase")} (ABC...)
                  </Space>
                  <Space>
                    <Switch
                      value={params.numbers}
                      onChange={(value) => {
                        setParams({
                          ...params,
                          numbers: value,
                        });
                        generateToken({
                          ...params,
                          numbers: value,
                        });
                      }}
                    />
                    {t("tokenGenerator.number")} (123...)
                  </Space>
                  <Space>
                    {t("tokenGenerator.length")}:
                    <InputNumber
                      min={1}
                      max={512}
                      value={params.length}
                      onChange={(value) => {
                        setParams({
                          ...params,
                          length: value as number,
                        });
                        generateToken({
                          ...params,
                          length: value as number,
                        });
                      }}
                    />
                  </Space>
                </Space>

                <Space direction="vertical" size="middle">
                  <Space>
                    <Switch
                      value={params.lowercase}
                      onChange={(value) => {
                        setParams({
                          ...params,
                          lowercase: value,
                        });
                        generateToken({
                          ...params,
                          lowercase: value,
                        });
                      }}
                    />
                    {t("tokenGenerator.lowercase")} (abc...)
                  </Space>
                  <Space>
                    <Switch
                      value={params.symbols}
                      onChange={(value) => {
                        setParams({
                          ...params,
                          symbols: value,
                        });
                        generateToken({
                          ...params,
                          symbols: value,
                        });
                      }}
                    />
                    {t("tokenGenerator.symbols")} (!-;...)
                  </Space>
                  <Button onClick={() => generateToken(params)}>
                    {t("tokenGenerator.generate")}
                  </Button>
                </Space>
              </Flex>
              {tokenList.map((token, i) => (
                <TextAreaCopyable
                  key={i}
                  value={token}
                  readOnly
                  autoSize={{ minRows: 2 }}
                />
              ))}
            </Space>
          </Card>
        </Col>
      </Row>
      <TokenGeneratorDesc />
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
