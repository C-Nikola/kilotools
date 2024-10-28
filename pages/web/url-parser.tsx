import OneColumn from "@/components/OneColumn";
import ToolPageHeader from "@/components/ToolPageHeader";
import InputCopyable from "@/components/ui/InputCopyable";
import TextAreaUI from "@/components/ui/TextAreaUI";
import { getErrorMsg } from "@/utils/error";
import { IconChevronDownLeft } from "@tabler/icons-react";
import { Col, Divider, Row, Space } from "antd";
import { ChangeEvent, useEffect, useState } from "react";

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
      <ToolPageHeader title="URL parser" toolName="url-parser" />
      <OneColumn>
        <Space direction="vertical" className="w-full">
          <Space direction="vertical" className="w-full">
            Your url to parse:
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
      </OneColumn>
    </>
  );
}
