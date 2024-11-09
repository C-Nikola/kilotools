import ToolPageHeader from "@/components/ToolPageHeader";
import TextAreaCopyable from "@/components/ui/TextAreaCopyable";
import {
  Button,
  Card,
  Col,
  Input,
  InputNumber,
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
    exclude: "",
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

  const generateToken = (props: TokenGeneratorParams) => {
    const { exclude } = props;
    if (exclude) {
      if (numberCaseRegexp.test(exclude)) {
        setOutput({
          isErr: true,
          message: "all numbers are excluded",
          result: [],
        });
        return;
      }
      if (uppercaseRegexp.test(exclude)) {
        setOutput({
          isErr: true,
          message: "all uppercase letters are excluded",
          result: [],
        });
        return;
      }
      if (lowercaseRegexp.test(exclude)) {
        setOutput({
          isErr: true,
          message: "all lowercase letters are excluded",
          result: [],
        });
        return;
      }
      if (symbolsRegexp.test(exclude)) {
        setOutput({
          isErr: true,
          message: "all symbols are excluded",
          result: [],
        });
        return;
      }
    }
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
              <Row>
                <Col span={12}>
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
                </Col>
                <Col span={12}>
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
                </Col>
              </Row>
              <Row>
                <Col span={12}>
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
                </Col>
                <Col span={12}>
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
                </Col>
              </Row>
              <Row align="middle">
                <Col flex="0 1 60px">Exclude:</Col>
                <Col flex={1}>
                  <Input
                    value={params.exclude}
                    placeholder="Every character here will not appear in passwords"
                    onChange={(e) => {
                      const value = e.currentTarget.value;
                      setParams({
                        ...params,
                        exclude: value,
                      });
                      generateToken({
                        ...params,
                        exclude: value,
                      });
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={12}>
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
                </Col>
                <Col span={12}>
                  <Button onClick={() => generateToken(params)}>
                    {t("passwordGenerator.generate")}
                  </Button>
                </Col>
              </Row>
              {output.isErr && <ErrorMsg errMsg={output.message} />}
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

const numberCaseRegexp =
  /^(?=.*0)(?=.*1)(?=.*2)(?=.*3)(?=.*4)(?=.*5)(?=.*6)(?=.*7)(?=.*8)(?=.*9).+$/;
const lowercaseRegexp =
  /^(?=.*a)(?=.*b)(?=.*c)(?=.*d)(?=.*e)(?=.*f)(?=.*g)(?=.*h)(?=.*i)(?=.*j)(?=.*k)(?=.*l)(?=.*m)(?=.*n)(?=.*o)(?=.*p)(?=.*q)(?=.*r)(?=.*s)(?=.*t)(?=.*u)(?=.*v)(?=.*w)(?=.*x)(?=.*y)(?=.*z).+$/;
const uppercaseRegexp =
  /^(?=.*A)(?=.*B)(?=.*C)(?=.*D)(?=.*E)(?=.*F)(?=.*G)(?=.*H)(?=.*I)(?=.*J)(?=.*K)(?=.*L)(?=.*M)(?=.*N)(?=.*O)(?=.*P)(?=.*Q)(?=.*R)(?=.*S)(?=.*T)(?=.*U)(?=.*V)(?=.*W)(?=.*X)(?=.*Y)(?=.*Z).+$/;
const symbolsRegexp =
  /^(?=.*!)(?=.*@)(?=.*#)(?=.*\$)(?=.*%)(?=.*\^)(?=.*&)(?=.*\*)(?=.*\()(?=.*\))(?=.*\+)(?=.*_)(?=.*\\)(?=.*-)(?=.*=)(?=.*\})(?=.*\{)(?=.*\[)(?=.*\])(?=.*\|)(?=.*:)(?=.*;)(?=.*")(?=.*\/)(?=.*\?)(?=.*\.)(?=.*>)(?=.*<)(?=.*,)(?=.*`)(?=.*~).+$/;
