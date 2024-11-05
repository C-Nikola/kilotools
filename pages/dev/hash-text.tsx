import ToolPageHeader from "@/components/ToolPageHeader";
import InputCopyable from "@/components/ui/InputCopyable";
import { convertHexToBin } from "@/utils/components/hash.utils";
import { Card, Col, Divider, Row, Select, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import {
  MD5,
  RIPEMD160,
  SHA1,
  SHA224,
  SHA256,
  SHA3,
  SHA384,
  SHA512,
  enc,
  lib,
} from "crypto-js";
import { ChangeEvent, useState } from "react";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { NextSeo } from "next-seo";

const algos = {
  MD5,
  SHA1,
  SHA256,
  SHA224,
  SHA512,
  SHA384,
  SHA3,
  RIPEMD160,
} as const;
type AlgoNames = keyof typeof algos;
type Encoding = keyof typeof enc | "Bin";
const algoNames = Object.keys(algos) as AlgoNames[];

function formatWithEncoding(words: lib.WordArray, encoding: Encoding) {
  if (encoding === "Bin") {
    return convertHexToBin(words.toString(enc.Hex));
  }

  return words.toString(enc[encoding]);
}

export default function HashText() {
  const { t } = useTranslation("toolList");
  const [input, setInput] = useState("");
  const [encoding, setEncoding] = useState<Encoding>("Hex");

  const hashText = (algo: AlgoNames, value: string) =>
    formatWithEncoding(algos[algo](value), encoding);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.currentTarget.value;
    setInput(value);
  };

  return (
    <>
      <NextSeo
        title={t("hashText.title")}
        description={t("hashText.description")}
      />
      <ToolPageHeader title={t("hashText.title")} toolName="hash-text" />
      <Row className="w-full" justify="center">
        <Col flex="0 1 600px">
          <Card className="w-full">
            <Space direction="vertical" className="w-full">
              <TextArea
                placeholder="Enter your text here..."
                autoSize={{ minRows: 5 }}
                value={input}
                onChange={handleChange}
              />
              <Divider />
              <Space direction="vertical" className="w-full">
                Digest encoding
                <Select
                  value={encoding}
                  className="w-full"
                  onChange={(value) => {
                    setEncoding(value);
                  }}
                  options={[
                    {
                      label: "Binary (base 2)",
                      value: "Bin",
                    },
                    {
                      label: "Hexadecimal (base 16)",
                      value: "Hex",
                    },
                    {
                      label: "Base64 (base 64)",
                      value: "Base64",
                    },
                    {
                      label: "Base64url (base 64 with url safe chars)",
                      value: "Base64url",
                    },
                  ]}
                />
                {algoNames.map((algoName) => {
                  return (
                    <InputCopyable
                      addonBefore={
                        <span className="w-[73px] inline-block">
                          {algoName}
                        </span>
                      }
                      key={algoName}
                      value={hashText(algoName, input)}
                    />
                  );
                })}
              </Space>
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
