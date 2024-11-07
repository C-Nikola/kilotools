import ToolPageHeader from "@/components/ToolPageHeader";
import TextAreaCopyable from "@/components/ui/TextAreaCopyable";
import {
  Button,
  Card,
  Col,
  Flex,
  InputNumber,
  message,
  Row,
  Space,
  Switch,
} from "antd";
import { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { generateMultiple } from "generate-password";
import { NextSeo } from "next-seo";
import PasswordGeneratorDesc from "@/components/pageDescription/PasswordGeneratorDesc";
import { getErrorMsg } from "@/utils/error";
import ErrorMsg from "@/components/ErrorMsg";

export default function PasswordGenerator() {
  const { t } = useTranslation("toolList");
  const [params, setParams] = useState<TokenGeneratorParams>({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    length: 8,
  });
  const [output, setOutput] = useState<{
    isErr: boolean;
    message: string;
    result: string[];
  }>({
    isErr: false,
    message: "",
    result: [],
  });

  const generateToken = (props: {
    uppercase: boolean;
    lowercase: boolean;
    numbers: boolean;
    symbols: boolean;
    length: number;
  }) => {
    try {
      const tokenArr = generateMultiple(10, { ...props, strict: true });
      setOutput({
        isErr: false,
        message: "",
        result: tokenArr,
      });
    } catch (err) {
      setOutput({
        isErr: true,
        message: getErrorMsg(err),
        result: [],
      });
    }
  };

  return (
    <>
      <NextSeo
        title={t("passwordGenerator.title")}
        description={t("passwordGenerator.description")}
      />
      <ToolPageHeader
        title={t("passwordGenerator.title")}
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
                    {t("passwordGenerator.uppercase")} (ABC...)
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
                    {t("passwordGenerator.number")} (123...)
                  </Space>
                  <Space>
                    {t("passwordGenerator.length")}:
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
                    {t("passwordGenerator.lowercase")} (abc...)
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
                    {t("passwordGenerator.symbols")} (!-;...)
                  </Space>
                  <Button onClick={() => generateToken(params)}>
                    {t("passwordGenerator.generate")}
                  </Button>
                </Space>
                {output.isErr && <ErrorMsg errMsg={output.message} />}
              </Flex>
              {output.result.map((token, i) => (
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
      <PasswordGeneratorDesc />
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
