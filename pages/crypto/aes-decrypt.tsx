import OneColumn from "@/components/OneColumn";
import ToolPageHeader from "@/components/ToolPageHeader";
import TextAreaCopyable from "@/components/ui/TextAreaCopyable";
import { Col, Divider, Input, Row, Select, Space } from "antd";
import { ChangeEvent, useMemo, useState } from "react";
import forge from "node-forge";
import TextAreaUI from "@/components/ui/TextAreaUI";
import { getErrorMsg } from "@/utils/error";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { NextSeo } from "next-seo";

export default function AESDecrypt() {
  const { t } = useTranslation("toolList");
  const [mode, setMode] = useState<forge.cipher.Algorithm>("AES-CBC");
  const [key, setKey] = useState("");
  const [iv, setIv] = useState("");
  const [input, setInput] = useState("");
  const [additionalData, setAdditionalData] = useState("");
  const [tagLength, setTagLength] = useState(128);
  const [tag, setTag] = useState("");

  const handleChangeMode = (value: forge.cipher.Algorithm) => {
    setMode(value);
  };

  const handleChangeKey = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setKey(value);
  };

  const handleChangeIv = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setIv(value);
  };

  const handleChangeInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;
    setInput(value);
  };

  const handleChangeAdditionalData = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setAdditionalData(value);
  };

  const handleChangeTagLength = (value: number) => {
    setTagLength(value);
  };

  const handleTagChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setTag(value);
  };

  const output = useMemo(() => {
    if ([16, 24, 32].indexOf(key.length) < 0) {
      return {
        isErr: true,
        result: `Invalid key length: ${key.length} bytes.
    A key size of 16 bytes will use AES-128, 24 => AES-192, 32 => AES-256`,
      };
    }

    try {
      const cipher = forge.cipher.createDecipher(mode, key);
      mode !== "AES-GCM"
        ? cipher.start({ iv: iv })
        : cipher.start({
            iv: iv,
            additionalData: additionalData,
            tagLength: tagLength,
            tag: forge.util.createBuffer(forge.util.hexToBytes(tag)),
          });
      cipher.update(forge.util.createBuffer(forge.util.hexToBytes(input)));
      cipher.finish();
      var decrypted = cipher.output.toString();
      return {
        isErr: false,
        result: decrypted,
      };
    } catch (err) {
      return {
        isErr: true,
        result: getErrorMsg(err),
      };
    }
  }, [additionalData, input, iv, key, mode, tag, tagLength]);

  return (
    <>
      <NextSeo
        title={t("AESDecrypt.title")}
        description={t("AESDecrypt.description")}
      />
      <ToolPageHeader title={t("AESDecrypt.title")} toolName="aes-decrypt" />
      <OneColumn>
        <Space direction="vertical" size="middle" className="w-full">
          <Row gutter={8} align="middle">
            <Col flex="0 1 110px">Mode:</Col>
            <Col flex={1}>
              <Select
                className="w-full"
                options={modeList}
                value={mode}
                onChange={handleChangeMode}
              />
            </Col>
          </Row>
          <Row gutter={8} align="middle">
            <Col flex="0 1 110px">Key:</Col>
            <Col flex={1}>
              <Input
                placeholder="Enter your key here..."
                allowClear
                value={key}
                onChange={handleChangeKey}
              />
            </Col>
          </Row>
          <Row gutter={8} align="middle">
            <Col flex="0 1 110px">IV:</Col>
            <Col flex={1}>
              <Input
                placeholder="Enter your IV here..."
                allowClear
                value={iv}
                onChange={handleChangeIv}
              />
            </Col>
          </Row>
          {mode === "AES-GCM" && (
            <>
              <Row gutter={8} align="middle">
                <Col flex="0 1 110px">{t("AESDecrypt.tag_length")}:</Col>
                <Col flex={1}>
                  <Select
                    value={tagLength}
                    onChange={handleChangeTagLength}
                    options={tagLengthList}
                    className="w-full"
                  />
                </Col>
              </Row>
              <Row gutter={8} align="middle">
                <Col flex="0 1 110px">{t("AESDecrypt.additional_data")}:</Col>
                <Col flex={1}>
                  <Input
                    placeholder="Enter additional data key here..."
                    allowClear
                    value={additionalData}
                    onChange={handleChangeAdditionalData}
                  />
                </Col>
              </Row>
              <Row gutter={8} align="middle">
                <Col flex="0 1 110px">Tag:</Col>
                <Col flex={1}>
                  <Input
                    placeholder="Enter tag here..."
                    allowClear
                    value={tag}
                    onChange={handleTagChange}
                  />
                </Col>
              </Row>
            </>
          )}
          <Space direction="vertical" className="w-full">
            <span>{t("AESDecrypt.from")}:</span>
            <TextAreaUI
              placeholder="Enter your string here..."
              allowClear
              autoSize={{ minRows: 5 }}
              value={input}
              onChange={handleChangeInput}
              isErr={output.isErr}
              errMsg={output.result}
            />
          </Space>
          <Divider />
          <Space direction="vertical" className="w-full">
            <span>{t("AESDecrypt.to")}:</span>
            <TextAreaCopyable
              readOnly
              autoSize={{ minRows: 5 }}
              value={output.result}
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

const modeList = [
  {
    label: "AES-CBC",
    value: "AES-CBC",
  },
  {
    label: "AES-CFB",
    value: "AES-CFB",
  },
  {
    label: "AES-OFB",
    value: "AES-OFB",
  },
  {
    label: "AES-CTR",
    value: "AES-CTR",
  },
  {
    label: "AES-GCM",
    value: "AES-GCM",
  },
  {
    label: "AES-ECB",
    value: "AES-ECB",
  },
];

const tagLengthList = [
  { label: 96, value: 96 },
  { label: 104, value: 104 },
  { label: 112, value: 112 },
  { label: 120, value: 120 },
  { label: 128, value: 128 },
];
