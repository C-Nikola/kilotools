import ToolPageHeader from "@/components/ToolPageHeader";
import TextAreaCopyable from "@/components/ui/TextAreaCopyable";
import { decodeJWT } from "@/utils/components/jwt-parser.utils";
import { Card, Col, Divider, Row, Space, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import { ChangeEvent, useCallback, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const { Text } = Typography;

export default function JwtParser() {
  const { t } = useTranslation("toolList");
  const [input, setInput] = useState("");
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");
  const [signature, setSignature] = useState("");

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      const value = event.currentTarget.value;
      setInput(value);

      try {
        const { header, payload, signature } = decodeJWT(value.trim());
        setHeader(JSON.stringify(header, null, 2));
        setPayload(JSON.stringify(payload, null, 2));
        setSignature(signature || "");
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Invalid Input.";
        setHeader(errorMessage);
        setPayload(errorMessage);
        setSignature(errorMessage);
      }
    },
    []
  );

  return (
    <>
      <ToolPageHeader title={t("JWTParser.title")} toolName="jwt-parser" />
      <Row className="w-full" justify="center">
        <Col flex="0 1 600px">
          <Card className="w-full">
            <Space direction="vertical" className="w-full">
              <div>
                <Text strong>JWT Token</Text>
                <TextArea
                  value={input}
                  onChange={handleChange}
                  autoSize={{ minRows: 5 }}
                />
              </div>
              <Divider />
              <div>
                <Text strong>Header</Text>
                <TextAreaCopyable
                  value={header}
                  autoSize={{ minRows: 2 }}
                  readOnly
                />
              </div>
              <Divider />
              <div>
                <Text strong>Payload</Text>
                <TextAreaCopyable
                  value={payload}
                  autoSize={{ minRows: 2 }}
                  readOnly
                />
              </div>
              <Divider />
              <div>
                <Text strong>Signature</Text>
                <TextAreaCopyable
                  value={signature}
                  autoSize={{ minRows: 2 }}
                  readOnly
                />
              </div>
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
