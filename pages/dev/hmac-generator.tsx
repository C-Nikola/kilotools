import OneColumn from "@/components/OneColumn";
import ToolPageHeader from "@/components/ToolPageHeader";
import TextAreaCopyable from "@/components/ui/TextAreaCopyable";
import TextAreaUI from "@/components/ui/TextAreaUI";
import { convertHexToBin } from "@/utils/components/hash.utils";
import { getErrorMsg } from "@/utils/error";
import { Col, Input, Row, Select, Space } from "antd";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import type { lib } from "crypto-js";
import {
  HmacMD5,
  HmacRIPEMD160,
  HmacSHA1,
  HmacSHA224,
  HmacSHA256,
  HmacSHA3,
  HmacSHA384,
  HmacSHA512,
  enc,
} from "crypto-js";
import { ChangeEvent, useMemo, useState } from "react";

const algos = {
  MD5: HmacMD5,
  RIPEMD160: HmacRIPEMD160,
  SHA1: HmacSHA1,
  SHA3: HmacSHA3,
  SHA224: HmacSHA224,
  SHA256: HmacSHA256,
  SHA384: HmacSHA384,
  SHA512: HmacSHA512,
} as const;

type Encoding = keyof typeof enc | "Bin";

export default function HmacGenerator() {
  const { t } = useTranslation("toolList");
  const [input, setInput] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [hashFunction, setHashFunction] =
    useState<keyof typeof algos>("SHA256");
  const [encoding, setEncoding] = useState<Encoding>("Hex");

  function formatWithEncoding(words: lib.WordArray, encoding: Encoding) {
    if (encoding === "Bin") {
      return convertHexToBin(words.toString(enc.Hex));
    }
    return words.toString(enc[encoding]);
  }

  const output = useMemo(() => {
    try {
      const result = formatWithEncoding(
        algos[hashFunction](input, secretKey),
        encoding
      );
      return {
        isErr: false,
        result,
      };
    } catch (err) {
      return {
        isErr: true,
        result: getErrorMsg(err),
      };
    }
  }, [input, secretKey, hashFunction, encoding]);

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.currentTarget.value);
  };

  const handleSecreKey = (e: ChangeEvent<HTMLInputElement>) => {
    setSecretKey(e.currentTarget.value);
  };

  const handleHashFunction = (value: keyof typeof algos) => {
    setHashFunction(value);
  };

  const handleEncoding = (value: Encoding) => {
    setEncoding(value);
  };

  return (
    <>
      <ToolPageHeader
        title={t("hmacGenerator.title")}
        toolName="hmac-generator"
      />
      <OneColumn>
        <Space className="w-full" direction="vertical" size="large">
          <Space className="w-full" direction="vertical">
            {t("hmacGenerator.text")}
            <TextAreaUI
              value={input}
              onChange={handleInput}
              placeholder="Plain text to compute the hash..."
              autoSize={{ minRows: 5 }}
              isErr={output.isErr}
              errMsg={output.result}
            />
          </Space>
          <Space className="w-full" direction="vertical">
            {t("hmacGenerator.secret_key")}
            <Input
              onChange={handleSecreKey}
              value={secretKey}
              placeholder="Enter the secret key..."
            />
          </Space>
          <Row gutter={16}>
            <Col span={10}>
              <Space direction="vertical" className="w-full">
                {t("hmacGenerator.algorithm")}
                <Select
                  value={hashFunction}
                  onChange={handleHashFunction}
                  className="w-full"
                  options={Object.keys(algos).map((label) => ({
                    label,
                    value: label,
                  }))}
                />
              </Space>
            </Col>
            <Col span={14}>
              <Space direction="vertical" className="w-full">
                {t("hmacGenerator.output_encode")}
                <Select
                  value={encoding}
                  onChange={handleEncoding}
                  className="w-full"
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
                      label: "Base64-url (base 64 with url safe chars)",
                      value: "Base64url",
                    },
                  ]}
                />
              </Space>
            </Col>
          </Row>
          <Space className="w-full" direction="vertical">
            {t("hmacGenerator.output")}
            <TextAreaCopyable
              value={output.result}
              autoSize={{ minRows: 5 }}
              readOnly
            />
          </Space>
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
