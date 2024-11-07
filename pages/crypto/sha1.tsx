import OneColumnWithCard from "@/components/OneColumnWithCard";
import ToolPageHeader from "@/components/ToolPageHeader";
import TextAreaUI from "@/components/ui/TextAreaUI";
import { Col, Row, Select, Space, Typography } from "antd";
import { ChangeEvent, useMemo, useState } from "react";
import { SHA1, SHA224, SHA256, SHA3, SHA384, SHA512 } from "crypto-js";
import { getErrorMsg } from "@/utils/error";
import TextAreaCopyable from "@/components/ui/TextAreaCopyable";
import { SHA_ALGORITHM } from "@/utils/const";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { NextSeo } from "next-seo";
import SHA1PageDesc from "@/components/pageDescription/SHA1PageDesc";

const { Text } = Typography;

export default function SHA1Page() {
  const { t } = useTranslation("toolList");
  const [input, setInput] = useState("");
  const [algorithm, setAlgorithm] = useState("SHA1");
  const [hashLength, setHashLength] = useState(512);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;
    setInput(value);
  };

  const handleAlgorithmChange = (value: string) => {
    setAlgorithm(value);
  };

  const handleChangeHashLength = (value: number) => {
    setHashLength(value);
  };

  const output = useMemo(() => {
    try {
      switch (algorithm) {
        case SHA_ALGORITHM.SHA1:
          return {
            isError: false,
            result: SHA1(input).toString(),
          };
        case SHA_ALGORITHM.SHA256:
          return {
            isError: false,
            result: SHA256(input).toString(),
          };
        case SHA_ALGORITHM.SHA512:
          return {
            isError: false,
            result: SHA512(input).toString(),
          };
        case SHA_ALGORITHM.SHA224:
          return {
            isError: false,
            result: SHA224(input).toString(),
          };
        case SHA_ALGORITHM.SHA384:
          return {
            isError: false,
            result: SHA384(input).toString(),
          };
        case SHA_ALGORITHM.SHA3:
          return {
            isError: false,
            result: SHA3(input, { outputLength: hashLength }).toString(),
          };
        default:
          return {
            isError: false,
            result: "",
          };
      }
    } catch (err) {
      return {
        isError: true,
        result: getErrorMsg(err),
      };
    }
  }, [input, algorithm, hashLength]);

  return (
    <>
      <NextSeo title={t("SHA.title")} description={t("SHA.description")} />
      <ToolPageHeader title={t("SHA.title")} toolName="sha1" />
      <OneColumnWithCard>
        <Space direction="vertical" size="middle" className="w-full">
          <Space direction="vertical" className="w-full">
            <Row gutter={8} align="middle">
              <Col flex="0 1 100px">{t("SHA.algorithm")}:</Col>
              <Col flex={1}>
                <Select
                  className="w-full"
                  options={algorithmList}
                  value={algorithm}
                  onChange={handleAlgorithmChange}
                />
              </Col>
            </Row>
            {algorithm === SHA_ALGORITHM.SHA3 && (
              <Row align="middle" gutter={8}>
                <Col flex="0 1 100px">{t("SHA.hash_length")}:</Col>
                <Col flex={1}>
                  <Select
                    className="w-full"
                    options={hashLengthList}
                    value={hashLength}
                    onChange={handleChangeHashLength}
                  />
                </Col>
              </Row>
            )}
          </Space>
          <Space direction="vertical" className="w-full">
            <Text strong>{t("SHA.from")}</Text>
            <TextAreaUI
              isErr={output.isError}
              errMsg={output.result}
              value={input}
              onChange={handleInputChange}
              autoSize={{ minRows: 5 }}
            />
          </Space>
          <Space direction="vertical" className="w-full">
            <Text strong>{t("SHA.to")}</Text>
            <TextAreaCopyable
              readOnly
              autoSize={{ minRows: 5 }}
              value={output.result}
            />
          </Space>
        </Space>
      </OneColumnWithCard>
      <SHA1PageDesc />
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

const algorithmList = [
  {
    label: SHA_ALGORITHM.SHA1,
    value: SHA_ALGORITHM.SHA1,
  },
  {
    label: SHA_ALGORITHM.SHA256,
    value: SHA_ALGORITHM.SHA256,
  },
  {
    label: SHA_ALGORITHM.SHA512,
    value: SHA_ALGORITHM.SHA512,
  },
  {
    label: SHA_ALGORITHM.SHA224,
    value: SHA_ALGORITHM.SHA224,
  },
  {
    label: SHA_ALGORITHM.SHA384,
    value: SHA_ALGORITHM.SHA384,
  },
  {
    label: SHA_ALGORITHM.SHA3,
    value: SHA_ALGORITHM.SHA3,
  },
];

const hashLengthList = [
  {
    label: 224,
    value: 224,
  },
  {
    label: 256,
    value: 256,
  },
  {
    label: 384,
    value: 384,
  },
  {
    label: 512,
    value: 512,
  },
];
