import CopyButton from "@/components/CopyButton";
import ToolPageHeader from "@/components/ToolPageHeader";
import TextAreaCopyable from "@/components/ui/TextAreaCopyable";
import { Card, Col, Row, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";

export default function UrlEncoder() {
  const [encodeInput, setEncodeInput] = useState("");
  const [encodeOutput, setEncodeOutput] = useState("");
  const [decodeInput, setDecodeInput] = useState("");
  const [decodeOutput, setDecodeOutput] = useState("");

  const handleEncode = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setEncodeInput(value);

    try {
      const output = encodeURIComponent(value);
      setEncodeOutput(output);
    } catch (error) {
      setEncodeOutput("Invalid input");
    }
  };

  const handleDecode = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setDecodeInput(value);

    try {
      const output = decodeURIComponent(value);
      setDecodeOutput(output);
    } catch (error) {
      setDecodeOutput("Invalid input");
    }
  };

  return (
    <>
      <ToolPageHeader title="URL encoder/decoder" toolName="url-encoder" />
      <Row className="w-full" gutter={[16, 16]} justify="center">
        <Col flex="0 1 600px">
          <Card className="w-full">
            <h2>URL encoder</h2>
            <Space direction="vertical" className="w-full">
              <TextArea
                onChange={handleEncode}
                autoSize={{ minRows: 5 }}
                value={encodeInput}
                placeholder="Paste here"
              />
              <TextAreaCopyable
                autoSize={{ minRows: 5 }}
                value={encodeOutput}
                readOnly
              />
            </Space>
          </Card>
        </Col>
        <Col flex="0 1 600px">
          <Card className="w-full">
            <h2>URL decoder</h2>
            <Space direction="vertical" className="w-full">
              <TextArea
                onChange={handleDecode}
                autoSize={{ minRows: 5 }}
                value={decodeInput}
                placeholder="Paste here"
              />
              <TextAreaCopyable
                autoSize={{ minRows: 5 }}
                value={decodeOutput}
                readOnly
              />
            </Space>
          </Card>
        </Col>
      </Row>
    </>
  );
}
