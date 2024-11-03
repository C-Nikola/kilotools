import ToolPageHeader from "@/components/ToolPageHeader";
import TowColumns from "@/components/TowColumns";
import TextAreaCopyable from "@/components/ui/TextAreaCopyable";
import {
  convertTextToUnicode,
  convertUnicodeToText,
} from "@/utils/components/text-to-unicode.utils";
import { Space, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import { ChangeEvent, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const { Title, Text } = Typography;

export default function TexToUnicode() {
  const { t } = useTranslation("toolList");
  const [textInput, setTextInput] = useState("");
  const [textOutput, setTextOutput] = useState("");
  const [unicodeInput, setUnicodeInput] = useState("");
  const [unicodeOuput, setunicodeOuput] = useState("");

  const handleTextInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;
    setTextInput(value);
    setTextOutput(value.trim() === "" ? "" : convertTextToUnicode(value));
  };

  const handleUnicodeInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;
    setUnicodeInput(value);
    setunicodeOuput(() =>
      value.trim() === "" ? "" : convertUnicodeToText(value)
    );
  };

  return (
    <>
      <ToolPageHeader title="Text to unicode" toolName="text-to-unicode" />
      <TowColumns
        children1={
          <Space direction="vertical" size="large" className="w-full">
            <Title level={2}>Text to Unicode</Title>
            <Space direction="vertical" className="w-full">
              <Text>Enter text to convert to unicode</Text>
              <TextArea
                value={textInput}
                onChange={handleTextInputChange}
                placeholder="e.g. Hello world!"
                autoSize={{ minRows: 5 }}
              />
            </Space>
            <Space direction="vertical" className="w-full">
              <Text>Unicode from your text</Text>
              <TextAreaCopyable
                placeholder="The unicode..."
                readOnly
                value={textOutput}
                autoSize={{ minRows: 5 }}
              />
            </Space>
          </Space>
        }
        children2={
          <Space direction="vertical" size="large" className="w-full">
            <Title level={2}>Unicode to Text</Title>
            <Space direction="vertical" className="w-full">
              <Text> Enter unicode to convert to text</Text>
              <TextArea
                value={unicodeInput}
                onChange={handleUnicodeInputChange}
                placeholder="Enter your unicode here..."
                autoSize={{ minRows: 5 }}
              />
            </Space>
            <Space direction="vertical" className="w-full">
              <Text>Text from your Unicode</Text>
              <TextAreaCopyable
                placeholder="The text..."
                readOnly
                autoSize={{ minRows: 5 }}
                value={unicodeOuput}
              />
            </Space>
          </Space>
        }
      />
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
