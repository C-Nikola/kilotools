import OneColumn from "@/components/OneColumn";
import ToolPageHeader from "@/components/ToolPageHeader";
import TextAreaCopyable from "@/components/ui/TextAreaCopyable";
import { Col, Divider, Input, Row, Select, Space } from "antd";
import { ChangeEvent, useMemo, useState } from "react";
import forge from "node-forge";
import TextAreaUI from "@/components/ui/TextAreaUI";
import { getErrorMsg } from "@/utils/error";

export default function AESEncrypt() {
  const [mode, setMode] = useState<forge.cipher.Algorithm>("AES-CBC");
  const [key, setKey] = useState("");
  const [iv, setIv] = useState("");
  const [input, setInput] = useState("");
  const [additionalData, setAdditionalData] = useState("");
  const [tagLength, setTagLength] = useState(128);

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

  const output = useMemo(() => {
    if ([16, 24, 32].indexOf(key.length) < 0) {
      return {
        isErr: true,
        result: `Invalid key length: ${key.length} bytes.
A key size of 16 bytes will use AES-128, 24 => AES-192, 32 => AES-256`,
      };
    }
    try {
      const cipher = forge.cipher.createCipher(mode, key);
      mode !== "AES-GCM"
        ? cipher.start({ iv: iv })
        : cipher.start({
            iv: iv,
            additionalData: additionalData,
            tagLength: tagLength,
          });
      cipher.update(forge.util.createBuffer(input));
      cipher.finish();
      var encrypted = cipher.output.toHex();
      if (mode === "AES-GCM") {
        return {
          isErr: false,
          result: `${encrypted}    Tag: ${cipher.mode.tag.toHex()}`,
        };
      }
      return {
        isErr: false,
        result: encrypted,
      };
    } catch (err) {
      return {
        isErr: true,
        result: getErrorMsg(err),
      };
    }
  }, [additionalData, input, iv, key, mode, tagLength]);

  return (
    <>
      <ToolPageHeader title="AES encrypt" toolName="aes-encrypt" />
      <OneColumn>
        <Space direction="vertical" size="middle" className="w-full">
          <Row gutter={8}>
            <Col flex="0 1 80px">Mode:</Col>
            <Col flex={1}>
              <Select
                className="w-full"
                options={modeList}
                value={mode}
                onChange={handleChangeMode}
              />
            </Col>
          </Row>
          <Row gutter={8}>
            <Col flex="0 1 80px">Key:</Col>
            <Col flex={1}>
              <Input
                placeholder="Enter your key here..."
                allowClear
                value={key}
                onChange={handleChangeKey}
              />
            </Col>
          </Row>
          <Row gutter={8}>
            <Col flex="0 1 80px">IV:</Col>
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
              <Row gutter={8}>
                <Col flex="0 1 80px">Tag length:</Col>
                <Col flex={1}>
                  <Select
                    value={tagLength}
                    onChange={handleChangeTagLength}
                    options={tagLengthList}
                    className="w-full"
                  />
                </Col>
              </Row>
              <Row gutter={8}>
                <Col flex="0 1 80px">AdditionalData:</Col>
                <Col flex={1}>
                  <Input
                    placeholder="Enter additional data key here..."
                    allowClear
                    value={additionalData}
                    onChange={handleChangeAdditionalData}
                  />
                </Col>
              </Row>
            </>
          )}
          <Space direction="vertical" className="w-full">
            Your string:
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
            Encrypted string:
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
