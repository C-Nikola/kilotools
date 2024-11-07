import { fromBase64, toBase64 } from "@/utils/components/base64.utils";
import { Space, Switch, Typography } from "antd";
import { useMemo, useState } from "react";
import { NextSeo } from "next-seo";
import TowColumns from "@/components/TowColumns";
import TextAreaUI from "@/components/ui/TextAreaUI";
import { getErrorMsg } from "@/utils/error";
import TextAreaCopyable from "@/components/ui/TextAreaCopyable";
import ToolPageHeader from "@/components/ToolPageHeader";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Base64EncoderDesc from "@/components/pageDescription/Base64EncoderDesc";

const { Title, Text } = Typography;

export default function Base64Encoder() {
  const { t } = useTranslation("toolList");

  const [encodeInput, setEncodeInput] = useState("");
  const [encodeUrlSafe, setEncodeUrlSafe] = useState(false);
  const [decodeInput, setDecodeInput] = useState("");
  const [decodeUrlSafe, setDecodeUrlSafe] = useState(false);

  const handleEncodeInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.currentTarget;
    setEncodeInput(value);
  };

  const handleEncodeUrlSafeChange = (checked: boolean) => {
    setEncodeUrlSafe(checked);
  };

  const encodeOutput = useMemo(() => {
    try {
      const result = toBase64(encodeInput, { urlSafe: encodeUrlSafe });
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
  }, [encodeInput, encodeUrlSafe]);

  const handledecodeInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.currentTarget;
    setDecodeInput(value);
  };

  const handleDecodeUrlSafeChange = (checked: boolean) => {
    setDecodeUrlSafe(checked);
  };

  const decodeOutput = useMemo(() => {
    try {
      const result = fromBase64(decodeInput, { urlSafe: decodeUrlSafe });
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
  }, [decodeInput, decodeUrlSafe]);

  return (
    <>
      <NextSeo
        title={t("base64EncodeDecode.title")}
        description={t("base64EncodeDecode.description")}
      />
      <ToolPageHeader title="Base64 Encode/Decode" toolName="base64-encode" />
      <TowColumns
        children1={
          <Space direction="vertical" className="w-full">
            <Title level={2}>{t("base64EncodeDecode.encode_title")}</Title>
            <Space>
              Url safe
              <Switch
                value={encodeUrlSafe}
                onChange={handleEncodeUrlSafeChange}
              />
            </Space>
            <Text strong>{t("base64EncodeDecode.encode_from")}</Text>
            <TextAreaUI
              onChange={handleEncodeInput}
              autoSize={{ minRows: 5 }}
              value={encodeInput}
              placeholder="Paste here..."
              isErr={encodeOutput.isErr}
              errMsg={encodeOutput.result}
            />
            <Text strong>{t("base64EncodeDecode.encode_to")}</Text>
            <TextAreaCopyable
              readOnly
              autoSize={{ minRows: 5 }}
              placeholder="Encoded string..."
              value={encodeOutput.result}
            />
          </Space>
        }
        children2={
          <Space direction="vertical" className="w-full">
            <Title level={2}>{t("base64EncodeDecode.decode_title")}</Title>
            <Space>
              Url safe
              <Switch
                value={decodeUrlSafe}
                onChange={handleDecodeUrlSafeChange}
              />
            </Space>
            <Text strong>{t("base64EncodeDecode.decode_from")}</Text>
            <TextAreaUI
              onChange={handledecodeInput}
              autoSize={{ minRows: 5 }}
              value={decodeInput}
              placeholder="Paste here..."
              isErr={decodeOutput.isErr}
              errMsg={decodeOutput.result}
            />
            <Text strong>{t("base64EncodeDecode.decode_to")}</Text>
            <TextAreaCopyable
              readOnly
              autoSize={{ minRows: 5 }}
              placeholder="Decoded string..."
              value={decodeOutput.result}
            />
          </Space>
        }
      />
      <Base64EncoderDesc />
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
