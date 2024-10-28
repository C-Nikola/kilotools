import ToolPageHeader from "@/components/ToolPageHeader";
import TextAreaCopyable from "@/components/ui/TextAreaCopyable";
import {
  Card,
  Col,
  Divider,
  Input,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { AES, RC4, Rabbit, TripleDES, enc } from "crypto-js";
import { ChangeEvent, useMemo, useState } from "react";

const algos = { AES, TripleDES, Rabbit, RC4 };

const { Title } = Typography;

export default function EncryptText() {
  const [encryptInput, setEncryptInput] = useState("");
  const [encryptAlgo, setEncryptAlgo] = useState<keyof typeof algos>("AES");
  const [encryptKey, setEncryptKey] = useState("");

  const encryptOutput = useMemo(() => {
    return algos[encryptAlgo].encrypt(encryptInput, encryptKey).toString();
  }, [encryptAlgo, encryptInput, encryptKey]);

  const handleEncryptInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEncryptInput(e.currentTarget.value);
  };

  const handleEncryptAlgo = (value: keyof typeof algos) => {
    setEncryptAlgo(value);
  };

  const handleEncryptSecretKey = (e: ChangeEvent<HTMLInputElement>) => {
    setEncryptKey(e.currentTarget.value);
  };

  const [decryptInput, setDecryptInput] = useState("");
  const [decryptAlgo, setDecryptAlgo] = useState<keyof typeof algos>("AES");
  const [decryptKey, setDecryptKey] = useState("");

  const decryptOutput = useMemo(() => {
    let result = "";
    try {
      result = algos[decryptAlgo]
        .decrypt(decryptInput, decryptKey)
        .toString(enc.Utf8);
    } catch {
      result = "Unable to decrypt your text";
    }
    return result;
  }, [decryptAlgo, decryptInput, decryptKey]);

  const handleDecryptInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDecryptInput(e.currentTarget.value);
  };

  const handleDecryptAlgo = (value: keyof typeof algos) => {
    setDecryptAlgo(value);
  };

  const handleDecryptSecretKey = (e: ChangeEvent<HTMLInputElement>) => {
    setDecryptKey(e.currentTarget.value);
  };

  return (
    <>
      <ToolPageHeader title="Encrypt / decrypt text" toolName="encrypt-text" />
      <Row className="w-full" gutter={[16, 16]} justify="center">
        <Col flex="0 1 600px">
          <Card style={{ width: "100%", margin: "0 auto" }}>
            <Space direction="vertical" className="w-full">
              <Title level={2}>Encrypt</Title>
              <Space size="small" className="w-full" direction="vertical">
                Text:
                <TextArea
                  placeholder="Your string to encrypt..."
                  value={encryptInput}
                  onChange={handleEncryptInput}
                  autoSize={{ minRows: 5 }}
                />
              </Space>
              <Row>
                <Col flex="0 1 80px">Secret key:</Col>
                <Col flex={1}>
                  <Input
                    placeholder="Your secret key here"
                    value={encryptKey}
                    onChange={handleEncryptSecretKey}
                  />
                </Col>
              </Row>
              <Row>
                <Col flex="0 1 80px">Algorithm:</Col>
                <Col flex={1}>
                  <Select
                    value={encryptAlgo}
                    onChange={handleEncryptAlgo}
                    className="w-full"
                    options={Object.keys(algos).map((label) => ({
                      label,
                      value: label,
                    }))}
                  />
                </Col>
              </Row>
              <Divider />
              <Space className="w-full" direction="vertical">
                Encrypted text:
                <TextAreaCopyable
                  placeholder="Your string encrypted"
                  value={encryptOutput}
                  readOnly
                  autoSize={{ minRows: 5 }}
                />
              </Space>
            </Space>
          </Card>
        </Col>
        <Col flex="0 1 600px">
          <Card style={{ width: "100%", margin: "0 auto" }}>
            <Space size="small" direction="vertical" className="w-full">
              <Title level={2}>Decrypt</Title>
              <Space size="small" className="w-full" direction="vertical">
                Text:
                <TextArea
                  placeholder="Your string to decrypt..."
                  onChange={handleDecryptInput}
                  value={decryptInput}
                  autoSize={{ minRows: 5 }}
                />
              </Space>
              <Row>
                <Col flex="0 1 80px">Secret key:</Col>
                <Col flex={1}>
                  <Input
                    placeholder="Your secret key here"
                    onChange={handleDecryptSecretKey}
                    value={decryptKey}
                  />
                </Col>
              </Row>
              <Row>
                <Col flex="0 1 80px">Algorithm:</Col>
                <Col flex={1}>
                  <Select
                    onChange={handleDecryptAlgo}
                    value={decryptAlgo}
                    className="w-full"
                    options={Object.keys(algos).map((label) => ({
                      label,
                      value: label,
                    }))}
                  />
                </Col>
              </Row>
              <Divider />
              <Space className="w-full" direction="vertical">
                Decrypted text:
                <TextAreaCopyable
                  placeholder="Your string decrypted..."
                  value={decryptOutput}
                  readOnly
                  autoSize={{ minRows: 5 }}
                />
              </Space>
            </Space>
          </Card>
        </Col>
      </Row>
    </>
  );
}
