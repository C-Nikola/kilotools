import ToolPageHeader from "@/components/ToolPageHeader";
import TextAreaCopyable from "@/components/ui/TextAreaCopyable";
import { createToken } from "@/utils/components/token-generator.utils";
import { Button, Card, Col, Flex, InputNumber, Row, Space, Switch } from "antd";
import { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

interface Params {
  withUppercase: boolean;
  withLowercase: boolean;
  withNumbers: boolean;
  withSymbols: boolean;
  length: number;
}

export default function TokenGenerator() {
  const { t } = useTranslation("toolList");
  const [params, setParams] = useState<Params>({
    withUppercase: true,
    withLowercase: true,
    withNumbers: true,
    withSymbols: true,
    length: 8,
  });
  const [token, setToken] = useState<string[]>([]);

  const generateToken = (props: {
    withUppercase: boolean;
    withLowercase: boolean;
    withNumbers: boolean;
    withSymbols: boolean;
    length: number;
  }) => {
    let tokenArr = [];
    for (let i = 0; i < 10; i++) {
      tokenArr[i] = createToken(props);
    }
    setToken(tokenArr);
  };

  return (
    <>
      <ToolPageHeader title="Token generator" toolName="token-generator" />
      <Row className="w-full" justify="center">
        <Col flex="0 1 600px">
          <Card className="w-full">
            <Space direction="vertical" className="w-full" size="middle">
              <Flex justify="space-around" wrap>
                <Space direction="vertical" size="middle">
                  <Space>
                    <Switch
                      value={params.withUppercase}
                      onChange={(value) => {
                        setParams({
                          ...params,
                          withUppercase: value,
                        });
                        generateToken({
                          ...params,
                          withUppercase: value,
                        });
                      }}
                    />
                    {t("tokenGenerator.uppercase")} (ABC...)
                  </Space>
                  <Space>
                    <Switch
                      value={params.withNumbers}
                      onChange={(value) => {
                        setParams({
                          ...params,
                          withNumbers: value,
                        });
                        generateToken({
                          ...params,
                          withNumbers: value,
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
                      value={params.withLowercase}
                      onChange={(value) => {
                        setParams({
                          ...params,
                          withLowercase: value,
                        });
                        generateToken({
                          ...params,
                          withLowercase: value,
                        });
                      }}
                    />
                    {t("tokenGenerator.lowercase")} (abc...)
                  </Space>
                  <Space>
                    <Switch
                      value={params.withSymbols}
                      onChange={(value) => {
                        setParams({
                          ...params,
                          withSymbols: value,
                        });
                        generateToken({
                          ...params,
                          withSymbols: value,
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
              {token.map((token, i) => (
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
