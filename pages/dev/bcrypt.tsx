import ToolPageHeader from "@/components/ToolPageHeader";
import TextAreaCopyable from "@/components/ui/TextAreaCopyable";
import {
  Card,
  Col,
  Input,
  InputNumber,
  Row,
  Space,
  Typography,
  theme as antdTheme,
} from "antd";
import { ChangeEvent, useState } from "react";
import { compareSync, hashSync } from "bcryptjs";

const { Title } = Typography;

export default function Bcrypt() {
  const { useToken } = antdTheme;
  const { token } = useToken();

  const [input, setInput] = useState("");
  const [saltCount, setSaltCount] = useState(10);
  const [output, setOutput] = useState("");

  const [compareString, setCompareString] = useState("");
  const [compareHash, setCompareHash] = useState("");
  const [isMatch, setIsMatch] = useState(false);

  const handleSaltCount = (value: number | null) => {
    value = value ?? 0;
    setSaltCount(value);
    setOutput(hashSync(input, value));
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setInput(value);
    setOutput(hashSync(value, saltCount));
  };

  const handleCompareString = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setCompareString(value);
    setIsMatch(compareSync(value, compareHash));
  };

  const handleCompareHash = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setCompareHash(value);
    setIsMatch(compareSync(compareString, value));
  };

  return (
    <>
      <ToolPageHeader title="Bcrypt" toolName="bcrypt" />
      <Row className="w-full" gutter={[16, 16]} justify="center">
        <Col flex="0 1 600px">
          <Card style={{ width: "100%", margin: "0 auto" }}>
            <Space direction="vertical" className="w-full">
              <Title level={2}>Hash</Title>
              <Row>
                <Col flex="0 1 80px">Your string:</Col>
                <Col flex="1">
                  <Input value={input} onChange={handleInput} />
                </Col>
              </Row>
              <Row>
                <Col flex="0 1 80px">Salt count:</Col>
                <Col flex={1}>
                  <InputNumber
                    value={saltCount}
                    min={0}
                    max={100}
                    className="w-full"
                    onChange={handleSaltCount}
                  />
                </Col>
              </Row>
              <TextAreaCopyable
                value={output}
                readOnly
                autoSize={{ minRows: 5 }}
              />
            </Space>
          </Card>
        </Col>
        <Col flex="0 1 600px">
          <Card style={{ width: "100%", margin: "0 auto" }}>
            <Space direction="vertical" className="w-full">
              <Title level={2}>Compare string with hash</Title>
              <Row>
                <Col flex="0 1 80px">Your string:</Col>
                <Col flex={1}>
                  <Input value={compareString} onChange={handleCompareString} />
                </Col>
              </Row>
              <Row>
                <Col flex="0 1 80px">Your Hash:</Col>
                <Col flex={1}>
                  <Input value={compareHash} onChange={handleCompareHash} />
                </Col>
              </Row>
              <Row>
                <Col flex="0 1 80px">Match?</Col>
                <Col
                  style={{
                    color: isMatch ? token.colorSuccess : token.colorError,
                  }}
                >
                  {isMatch ? "Yes" : "No"}
                </Col>
              </Row>
            </Space>
          </Card>
        </Col>
      </Row>
    </>
  );
}
