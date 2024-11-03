import ErrorMsg from "@/components/ErrorMsg";
import OneColumn from "@/components/OneColumn";
import ToolPageHeader from "@/components/ToolPageHeader";
import TextAreaCopyable from "@/components/ui/TextAreaCopyable";
import { generateKeyPair } from "@/utils/components/rsa-key-pair-generator.utils";
import { getErrorMsg } from "@/utils/error";
import { Button, Col, InputNumber, message, Row, Space } from "antd";
import { useState } from "react";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
const defaultValue = {
  isErr: false,
  errMsg: "",
  certs: { publicKeyPem: "", privateKeyPem: "" },
};

export default function RsaKeyPairGenerator() {
  const { t } = useTranslation("toolList");
  const [bits, setBits] = useState<number | null>(1024);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<{
    isErr: boolean;
    errMsg?: string;
    certs?: {
      publicKeyPem: string;
      privateKeyPem: string;
    };
  }>({
    isErr: false,
    errMsg: "",
    certs: { publicKeyPem: "", privateKeyPem: "" },
  });

  const generateKeys = async (value: number | null) => {
    if (value === null) {
      setOutput(defaultValue);
      return;
    }

    messageApi.open({
      type: "loading",
      content: "generating...",
      duration: 0,
    });
    setLoading(true);
    try {
      const result = await generateKeyPair({ bits: value });
      setOutput({
        isErr: false,
        errMsg: "",
        certs: result,
      });
    } catch (error) {
      setOutput({
        isErr: true,
        errMsg: getErrorMsg(error),
      });
    } finally {
      messageApi.destroy();
      setLoading(false);
    }
  };

  const handleBitsChange = async (value: number | null) => {
    setBits(value);
    if (value === null) {
      return;
    }
    if (!(value >= 256 && value <= 16384 && value % 8 === 0)) {
      setOutput({
        isErr: true,
        errMsg: "Bits should be 256 <= bits <= 16384 and be a multiple of 8",
      });
      return;
    }
    // generateKeys(value);
  };

  const handleRefresh = () => {
    generateKeys(bits);
  };

  return (
    <>
      {contextHolder}
      <ToolPageHeader
        title={t("rsa.title")}
        toolName="rsa-key-pair-generator"
      />
      <OneColumn>
        <Space direction="vertical" size="middle" className="w-full mt-6">
          <Row justify="center" gutter={16}>
            <Col flex="0 1 200px">
              <Row align="middle" gutter={8}>
                <Col flex="0 1 100px" className="text-right">
                  {t("rsa.bits")}:
                </Col>
                <Col flex="1">
                  <InputNumber
                    className="w-full"
                    disabled={loading}
                    value={bits}
                    onChange={handleBitsChange}
                  />
                </Col>
              </Row>
            </Col>
            <Col flex="0 1 200px">
              <Button
                disabled={loading}
                type="primary"
                onClick={handleRefresh}
                className="w-full"
              >
                {t("rsa.generate")}
              </Button>
            </Col>
          </Row>
          {output.isErr && <ErrorMsg errMsg={output.errMsg ?? ""} />}
          <Row justify="center" gutter={[16, 16]}>
            <Col flex="0 1 600px">
              <Space direction="vertical" className="w-full">
                {t("rsa.public_key")}
                <TextAreaCopyable
                  readOnly
                  autoSize={{ minRows: 5 }}
                  value={output.certs?.publicKeyPem}
                />
              </Space>
            </Col>
            <Col flex="0 1 600px">
              <Space direction="vertical" className="w-full">
                {t("rsa.private_key")}
                <TextAreaCopyable
                  readOnly
                  autoSize={{ minRows: 5 }}
                  value={output.certs?.privateKeyPem}
                />
              </Space>
            </Col>
          </Row>
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
